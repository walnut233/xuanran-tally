<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb;">
    <!-- Custom Header -->
    <div style="background-color: white; border-bottom: 1px solid #f3f4f6; position: sticky; top: 0; z-index: 40;">
      <div style="height: 24px;"></div>
      <!-- 第一排：返回按钮和标题 -->
      <div style="padding: 0 20px; padding-top: 10px; display: flex; align-items: center;">
        <button style="width: 32px; height: 32px; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; flex-shrink: 0;" @click="goBack">
          <span style="font-size: 20px; font-weight: bold; color: #374151; line-height: 1;">‹</span>
        </button>
        <div style="flex: 1; text-align: center;">
          <div style="font-size: 17px; font-weight: 600; color: #1f2937;">报表统计</div>
        </div>
        <div style="width: 32px;"></div>
      </div>
      <!-- 第二排：选项卡 -->
      <div style="padding: 0 20px; padding-top: 8px; padding-bottom: 10px;">
        <div style="display: flex; gap: 6px; background-color: #f9fafb; padding: 4px;">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            style="flex: 1; padding: 7px 0; font-size: 13px; font-weight: 500; border: none; cursor: pointer;"
            :style="activeTab === tab.id ? 'background-color: white; color: #0d9488;' : 'background-color: transparent; color: #6b7280;'"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px;">
      <!-- 日报 -->
      <div v-if="activeTab === 'day'">
        <!-- 日期选择 -->
        <picker
          mode="date"
          :value="formatDateForPicker(selectedDate.value)"
          :start="'2020-01-01'"
          :end="formatDateForPicker(Date.now())"
          @change="onDateChange"
        >
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">日期</span>
              <span style="font-size: 14px; color: #4b5563;">{{ formatDate(selectedDate) }}</span>
            </div>
          </div>
        </picker>

        <!-- 统计卡片 -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ dayStats.rechargeCount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">充值次数</div>
          </div>
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">¥{{ dayStats.rechargeAmount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">充值金额</div>
          </div>
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ dayStats.consumptionCount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">消费次数</div>
          </div>
        </div>

        <!-- 服务类型统计列表 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务类型明细</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, type) in dayServiceCount" :key="type" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ type }}</span>
              <span style="font-size: 14px;" :style="count > 0 ? 'color: #4b5563;' : 'color: #9ca3af;'">{{ count }} 人</span>
            </div>
          </div>
        </div>

        <!-- 美发师统计 -->
        <div v-if="Object.keys(dayHairstylistCount).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">美发师统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, name) in dayHairstylistCount" :key="name" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ name }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 人</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 月报 -->
      <div v-if="activeTab === 'month'">
        <!-- 月份选择 -->
        <picker
          mode="date"
          fields="month"
          :value="formatMonthForPicker(selectedMonth.value)"
          :start="'2020-01'"
          :end="formatMonthForPicker(Date.now())"
          @change="onMonthChange"
        >
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">月份</span>
              <span style="font-size: 14px; color: #4b5563;">{{ formatMonth(selectedMonth) }}</span>
            </div>
          </div>
        </picker>

        <!-- 统计卡片 -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ monthStats.rechargeCount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">充值次数</div>
          </div>
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">¥{{ monthStats.rechargeAmount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">充值金额</div>
          </div>
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ monthStats.consumptionCount }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">消费次数</div>
          </div>
        </div>

        <!-- 服务类型统计列表 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务类型明细</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, type) in monthServiceCount" :key="type" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ type }}</span>
              <span style="font-size: 14px;" :style="count > 0 ? 'color: #4b5563;' : 'color: #9ca3af;'">{{ count }} 人</span>
            </div>
          </div>
        </div>

        <!-- 美发师统计 -->
        <div v-if="Object.keys(monthHairstylistCount).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">美发师统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, name) in monthHairstylistCount" :key="name" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ name }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 人</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 会员报表 -->
      <div v-if="activeTab === 'member'">
        <!-- 总览统计 -->
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 20px;">
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ memberStats.totalMembers }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">会员总数</div>
          </div>
          <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; text-align: center;">
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">¥{{ memberStats.totalBalance }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">会员总余额</div>
          </div>
        </div>

        <!-- 会员余额排行 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">会员余额排行</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(item, index) in remainingRanking" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center;">{{ index + 1 }}</div>
                <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
              </div>
              <span :style="item.remainingHaircuts <= 3 ? 'font-weight: 600; color: #ef4444;' : 'font-size: 14px; color: #0d9488; font-weight: 600;'">余额 ¥{{ item.remainingHaircuts }}</span>
            </div>
          </div>
        </div>

        <!-- 累计充值金额排行 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">累计充值金额排行</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(item, index) in rechargeRanking" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div :style="[
                  'width: 28px; height: 28px; color: white; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center;',
                  index === 0 ? 'background: linear-gradient(135deg, #facc15 0%, #f97316 100%);' :
                  index === 1 ? 'background: linear-gradient(135deg, #d1d5db 0%, #6b7280 100%);' :
                  index === 2 ? 'background: linear-gradient(135deg, #d97706 0%, #92400e 100%);' : 'background: #ccfbf1; color: #0d9488;'
                ]">
                  {{ index + 1 }}
                </div>
                <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
              </div>
              <span style="font-size: 14px; color: #0d9488; font-weight: 600;">¥{{ item.totalAmount }}</span>
            </div>
          </div>
        </div>

        <!-- 消费频次排行 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">消费频次排行</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(item, index) in consumptionRanking" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 28px; height: 28px; background: #ccfbf1; color: #0d9488; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center;">{{ index + 1 }}</div>
                <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
              </div>
              <span style="font-size: 14px; color: #0d9488; font-weight: 600;">{{ item.consumeCount }} 次</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { rechargeService } from '@/services/rechargeService'
import { consumptionService } from '@/services/consumptionService'
import { memberService } from '@/services/memberService'
import { serviceTypeService } from '@/services/serviceTypeService'

const activeTab = ref('day')
const now = new Date()
const selectedDate = ref(now.getTime())
const selectedMonth = ref(now.getTime())
const refreshKey = ref(0)

// 监听 tab 切换，刷新数据并回到顶部
watch(activeTab, () => {
  refreshKey.value++
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 0
  })
})

const tabs = [
  { id: 'day', name: '日报' },
  { id: 'month', name: '月报' },
  { id: 'member', name: '会员报表' }
]

// 日报统计
const dayStats = computed(() => {
  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  const rechargeStats = rechargeService.getStats(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
  const consumptionStats = consumptionService.getStats(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())

  return {
    rechargeCount: rechargeStats.totalCount,
    rechargeAmount: rechargeStats.totalAmount,
    consumptionCount: consumptionStats.totalCount
  }
})

const dayServiceStats = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value

  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  const stats = consumptionService.getStatsByServiceType(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
  const allServiceTypes = serviceTypeService.getAll()

  // 确保所有服务类型都显示，没有数据的显示0
  const result: Record<string, number> = {}
  allServiceTypes.forEach(st => {
    result[st.name] = stats[st.name] || 0
  })

  return result
})

const dayHairstylistStats = computed(() => {
  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  return consumptionService.getStatsByHairstylist(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
})

const dayServiceCount = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value

  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  const stats = consumptionService.getCountByServiceType(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
  const allServiceTypes = serviceTypeService.getAll()

  // 确保所有服务类型都显示，没有数据的显示0
  const result: Record<string, number> = {}
  allServiceTypes.forEach(st => {
    result[st.name] = stats[st.name] || 0
  })

  return result
})

const dayHairstylistCount = computed(() => {
  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  return consumptionService.getCountByHairstylist(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
})

// 月报统计
const monthStats = computed(() => {
  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  const rechargeStats = rechargeService.getStats(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
  const consumptionStats = consumptionService.getStats(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())

  return {
    rechargeCount: rechargeStats.totalCount,
    rechargeAmount: rechargeStats.totalAmount,
    consumptionCount: consumptionStats.totalCount
  }
})

const monthServiceStats = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value

  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  const stats = consumptionService.getStatsByServiceType(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
  const allServiceTypes = serviceTypeService.getAll()

  // 确保所有服务类型都显示，没有数据的显示0
  const result: Record<string, number> = {}
  allServiceTypes.forEach(st => {
    result[st.name] = stats[st.name] || 0
  })

  return result
})

const monthHairstylistStats = computed(() => {
  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  return consumptionService.getStatsByHairstylist(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
})

const monthServiceCount = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value

  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  const stats = consumptionService.getCountByServiceType(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
  const allServiceTypes = serviceTypeService.getAll()

  // 确保所有服务类型都显示，没有数据的显示0
  const result: Record<string, number> = {}
  allServiceTypes.forEach(st => {
    result[st.name] = stats[st.name] || 0
  })

  return result
})

const monthHairstylistCount = computed(() => {
  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  return consumptionService.getCountByHairstylist(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
})

// 会员报表统计
const memberStats = computed(() => {
  const members = memberService.getAll()
  const totalBalance = members.reduce((sum, m) => sum + m.balance, 0)

  return {
    totalMembers: members.length,
    totalBalance
  }
})

const remainingRanking = computed(() => {
  const members = memberService.getAll()
  return [...members]
    .sort((a, b) => b.balance - a.balance)
    .map(m => ({
      id: m.id,
      name: m.name,
      remainingHaircuts: m.balance
    }))
})

const rechargeRanking = computed(() => {
  const members = memberService.getAll()
  const recharges = rechargeService.getAll()

  const memberRechargeAmounts: Record<string, number> = {}
  for (const r of recharges) {
    if (memberRechargeAmounts[r.memberId]) {
      memberRechargeAmounts[r.memberId] += r.amount
    } else {
      memberRechargeAmounts[r.memberId] = r.amount
    }
  }

  return members
    .map(m => ({
      id: m.id,
      name: m.name,
      totalAmount: memberRechargeAmounts[m.id] || 0
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .filter(item => item.totalAmount > 0)
})

const consumptionRanking = computed(() => {
  const members = memberService.getAll()
  const consumptions = consumptionService.getAll()

  const memberConsumeCounts: Record<string, number> = {}
  for (const c of consumptions) {
    if (memberConsumeCounts[c.memberId]) {
      memberConsumeCounts[c.memberId] += 1
    } else {
      memberConsumeCounts[c.memberId] = 1
    }
  }

  return members
    .map(m => ({
      id: m.id,
      name: m.name,
      consumeCount: memberConsumeCounts[m.id] || 0
    }))
    .sort((a, b) => b.consumeCount - a.consumeCount)
    .filter(item => item.consumeCount > 0)
})

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatDateForPicker(timestamp: number): string {
  return formatDate(timestamp)
}

function formatMonth(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function formatMonthForPicker(timestamp: number): string {
  return formatMonth(timestamp)
}

function goBack() {
  uni.navigateBack()
}

function onDateChange(e: any) {
  selectedDate.value = new Date(e.detail.value).getTime()
}

function onMonthChange(e: any) {
  const [year, month] = e.detail.value.split('-')
  selectedMonth.value = new Date(parseInt(year), parseInt(month) - 1).getTime()
}

onShow(() => {
  // 强制刷新数据
  refreshKey.value++
})
</script>

<style>
</style>
