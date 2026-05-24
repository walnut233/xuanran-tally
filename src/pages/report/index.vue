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
      <div style="height: 32px;"></div>
      <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
        <div style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">报表统计</div>
        <div style="display: flex; gap: 6px; background-color: #f9fafb; padding: 6px;">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            style="flex: 1; padding: 10px 0; font-size: 14px; font-weight: 500; border: none; cursor: pointer;"
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
        <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;" @click="showDatePicker = true">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 14px; font-weight: 500; color: #1f2937;">日期</span>
            <span style="font-size: 14px; color: #4b5563;">{{ formatDate(selectedDate) }}</span>
          </div>
        </div>

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

        <!-- 服务类型统计 -->
        <div style="margin-bottom: 20px;" v-if="Object.keys(dayServiceStats).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务类型统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, type) in dayServiceStats" :key="type" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ type }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 次</span>
            </div>
          </div>
        </div>

        <!-- 美发师统计 -->
        <div v-if="Object.keys(dayHairstylistStats).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">美发师统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, name) in dayHairstylistStats" :key="name" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ name }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 次</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 月报 -->
      <div v-if="activeTab === 'month'">
        <!-- 月份选择 -->
        <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;" @click="showMonthPicker = true">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 14px; font-weight: 500; color: #1f2937;">月份</span>
            <span style="font-size: 14px; color: #4b5563;">{{ formatMonth(selectedMonth) }}</span>
          </div>
        </div>

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

        <!-- 服务类型统计 -->
        <div style="margin-bottom: 20px;" v-if="Object.keys(monthServiceStats).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务类型统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, type) in monthServiceStats" :key="type" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ type }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 次</span>
            </div>
          </div>
        </div>

        <!-- 美发师统计 -->
        <div v-if="Object.keys(monthHairstylistStats).length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">美发师统计</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(count, name) in monthHairstylistStats" :key="name" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ name }}</span>
              <span style="font-size: 14px; color: #4b5563;">{{ count }} 次</span>
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
            <div style="font-size: 30px; font-weight: 700; color: #0d9488;">{{ memberStats.totalRemaining }}</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px;">剩余总次数</div>
          </div>
        </div>

        <!-- 会员剩余次数排行 -->
        <div style="margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">会员剩余次数排行</div>
          <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
            <div v-for="(item, index) in remainingRanking" :key="item.id" style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="width: 28px; height: 28px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 14px; font-weight: 600; display: flex; align-items: center; justify-content: center;">{{ index + 1 }}</div>
                <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
              </div>
              <span :style="item.remainingHaircuts <= 3 ? 'font-weight: 600; color: #ef4444;' : 'font-size: 14px; color: #0d9488; font-weight: 600;'">剩余 {{ item.remainingHaircuts }} 次</span>
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

      <!-- 导出按钮 -->
      <div style="margin-top: 20px;">
        <button
          style="width: 100%; height: 52px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer;"
          @click="exportReport"
        >
          导出当前报表
        </button>
      </div>
    </div>

    <!-- 日期选择弹窗 -->
    <div v-if="showDatePicker" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: flex-end;" @click.self="showDatePicker = false">
      <div style="background-color: white; width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <button style="color: #6b7280; font-size: 14px; background: none; border: none; cursor: pointer;" @click="showDatePicker = false">取消</button>
          <span style="font-weight: 500; color: #1f2937;">选择日期</span>
          <button style="color: #0d9488; font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer;" @click="confirmDate">确定</button>
        </div>
        <div style="padding: 20px;">
          <input
            type="date"
            v-model="dateInputValue"
            style="width: 100%; height: 48px; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; box-sizing: border-box;"
          />
        </div>
      </div>
    </div>

    <!-- 月份选择弹窗 -->
    <div v-if="showMonthPicker" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: flex-end;" @click.self="showMonthPicker = false">
      <div style="background-color: white; width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <button style="color: #6b7280; font-size: 14px; background: none; border: none; cursor: pointer;" @click="showMonthPicker = false">取消</button>
          <span style="font-weight: 500; color: #1f2937;">选择月份</span>
          <button style="color: #0d9488; font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer;" @click="confirmMonth">确定</button>
        </div>
        <div style="padding: 20px;">
          <input
            type="month"
            v-model="monthInputValue"
            style="width: 100%; height: 48px; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; box-sizing: border-box;"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { rechargeService } from '@/services/rechargeService'
import { consumptionService } from '@/services/consumptionService'
import { memberService } from '@/services/memberService'

const activeTab = ref('day')
const now = new Date()
const selectedDate = ref(now.getTime())
const selectedMonth = ref(now.getTime())
const showDatePicker = ref(false)
const showMonthPicker = ref(false)

const dateInputValue = ref('')
const monthInputValue = ref('')

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
  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  return consumptionService.getStatsByServiceType(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
})

const dayHairstylistStats = computed(() => {
  const date = new Date(selectedDate.value)
  const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
  const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).getTime()

  return consumptionService.getStatsByHairstylist(new Date(startOfDay).toISOString(), new Date(endOfDay).toISOString())
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
  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  return consumptionService.getStatsByServiceType(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
})

const monthHairstylistStats = computed(() => {
  const date = new Date(selectedMonth.value)
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59).getTime()

  return consumptionService.getStatsByHairstylist(new Date(startOfMonth).toISOString(), new Date(endOfMonth).toISOString())
})

// 会员报表统计
const memberStats = computed(() => {
  const members = memberService.getAll()
  const totalRemaining = members.reduce((sum, m) => sum + m.remainingHaircuts, 0)

  return {
    totalMembers: members.length,
    totalRemaining
  }
})

const remainingRanking = computed(() => {
  const members = memberService.getAll()
  return [...members]
    .sort((a, b) => b.remainingHaircuts - a.remainingHaircuts)
    .map(m => ({
      id: m.id,
      name: m.name,
      remainingHaircuts: m.remainingHaircuts
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

function formatMonth(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function confirmDate() {
  if (dateInputValue.value) {
    selectedDate.value = new Date(dateInputValue.value).getTime()
  }
  showDatePicker.value = false
}

function confirmMonth() {
  if (monthInputValue.value) {
    const [year, month] = monthInputValue.value.split('-')
    selectedMonth.value = new Date(parseInt(year), parseInt(month) - 1).getTime()
  }
  showMonthPicker.value = false
}

onMounted(() => {
  const date = new Date(selectedDate.value)
  dateInputValue.value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  const monthDate = new Date(selectedMonth.value)
  monthInputValue.value = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}`
})

function exportReport() {
  let content = ''
  const title = activeTab.value === 'day' ? '日报表' : activeTab.value === 'month' ? '月报表' : '会员报表'
  content += `${title}\n`
  content += `导出时间: ${new Date().toLocaleString('zh-CN')}\n\n`

  if (activeTab.value === 'day') {
    content += `充值次数: ${dayStats.rechargeCount}\n`
    content += `充值金额: ¥${dayStats.rechargeAmount}\n`
    content += `消费次数: ${dayStats.consumptionCount}\n\n`

    if (Object.keys(dayServiceStats).length > 0) {
      content += `服务类型统计:\n`
      for (const [type, count] of Object.entries(dayServiceStats)) {
        content += `  ${type}: ${count}次\n`
      }
      content += '\n'
    }

    if (Object.keys(dayHairstylistStats).length > 0) {
      content += `美发师统计:\n`
      for (const [name, count] of Object.entries(dayHairstylistStats)) {
        content += `  ${name}: ${count}次\n`
      }
      content += '\n'
    }
  } else if (activeTab.value === 'month') {
    content += `充值次数: ${monthStats.rechargeCount}\n`
    content += `充值金额: ¥${monthStats.rechargeAmount}\n`
    content += `消费次数: ${monthStats.consumptionCount}\n\n`

    if (Object.keys(monthServiceStats).length > 0) {
      content += `服务类型统计:\n`
      for (const [type, count] of Object.entries(monthServiceStats)) {
        content += `  ${type}: ${count}次\n`
      }
      content += '\n'
    }

    if (Object.keys(monthHairstylistStats).length > 0) {
      content += `美发师统计:\n`
      for (const [name, count] of Object.entries(monthHairstylistStats)) {
        content += `  ${name}: ${count}次\n`
      }
      content += '\n'
    }
  } else if (activeTab.value === 'member') {
    content += `会员总数: ${memberStats.totalMembers}\n`
    content += `剩余总次数: ${memberStats.totalRemaining}\n\n`

    content += `会员剩余次数排行:\n`
    remainingRanking.slice(0, 10).forEach((item, index) => {
      content += `  ${index + 1}. ${item.name} - 剩余${item.remainingHaircuts}次\n`
    })
    content += '\n'

    content += `累计充值金额排行:\n`
    rechargeRanking.slice(0, 10).forEach((item, index) => {
      content += `  ${index + 1}. ${item.name} - ¥${item.totalAmount}\n`
    })
    content += '\n'

    content += `消费频次排行:\n`
    consumptionRanking.slice(0, 10).forEach((item, index) => {
      content += `  ${index + 1}. ${item.name} - ${item.consumeCount}次\n`
    })
    content += '\n'
  }

  uni.setClipboardData({
    data: content,
    success: () => {
      uni.showToast({
        title: '已复制到剪贴板',
        icon: 'success'
      })
    }
  })
}
</script>

<style>
</style>
