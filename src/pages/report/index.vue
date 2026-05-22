<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '报表统计'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <!-- 时间选择 -->
    <div class="bg-white p-30rpx">
      <wd-tab v-model="activeTab">
        <wd-tab-pane title="日报" name="day"></wd-tab-pane>
        <wd-tab-pane title="月报" name="month"></wd-tab-pane>
      </wd-tab>
    </div>

    <!-- 日报 -->
    <div class="p-30rpx" v-if="activeTab === 'day'">
      <!-- 日期选择 -->
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm mb-30rpx">
        <wd-datetime-picker v-model="selectedDate" type="date" title="选择日期">
          <div class="flex justify-between items-center">
            <span class="text-30rpx text-gray-600">日期</span>
            <span class="text-30rpx text-gray-800">{{ formatDate(selectedDate) }}</span>
          </div>
        </wd-datetime-picker>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-2 gap-30rpx mb-30rpx">
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-green-500">{{ dayStats.rechargeCount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">充值次数</div>
        </div>
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-blue-500">¥{{ dayStats.rechargeAmount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">充值金额</div>
        </div>
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-orange-500">{{ dayStats.consumptionCount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">消费次数</div>
        </div>
      </div>

      <!-- 服务类型统计 -->
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden mb-30rpx" v-if="Object.keys(dayServiceStats).length > 0">
        <wd-cell-group title="服务类型统计">
          <wd-cell v-for="(count, type) in dayServiceStats" :key="type" :title="type" :value="`${count} 次`"></wd-cell>
        </wd-cell-group>
      </div>

      <!-- 美发师统计 -->
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden" v-if="Object.keys(dayHairstylistStats).length > 0">
        <wd-cell-group title="美发师统计">
          <wd-cell v-for="(count, name) in dayHairstylistStats" :key="name" :title="name" :value="`${count} 次`"></wd-cell>
        </wd-cell-group>
      </div>
    </div>

    <!-- 月报 -->
    <div class="p-30rpx" v-if="activeTab === 'month'">
      <!-- 月份选择 -->
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm mb-30rpx">
        <wd-datetime-picker v-model="selectedMonth" type="year-month" title="选择月份">
          <div class="flex justify-between items-center">
            <span class="text-30rpx text-gray-600">月份</span>
            <span class="text-30rpx text-gray-800">{{ formatMonth(selectedMonth) }}</span>
          </div>
        </wd-datetime-picker>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-2 gap-30rpx mb-30rpx">
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-green-500">{{ monthStats.rechargeCount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">充值次数</div>
        </div>
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-blue-500">¥{{ monthStats.rechargeAmount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">充值金额</div>
        </div>
        <div class="bg-white rounded-20rpx p-30rpx shadow-sm text-center">
          <div class="text-56rpx font-bold text-orange-500">{{ monthStats.consumptionCount }}</div>
          <div class="text-26rpx text-gray-500 mt-10rpx">消费次数</div>
        </div>
      </div>

      <!-- 服务类型统计 -->
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden mb-30rpx" v-if="Object.keys(monthServiceStats).length > 0">
        <wd-cell-group title="服务类型统计">
          <wd-cell v-for="(count, type) in monthServiceStats" :key="type" :title="type" :value="`${count} 次`"></wd-cell>
        </wd-cell-group>
      </div>

      <!-- 美发师统计 -->
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden" v-if="Object.keys(monthHairstylistStats).length > 0">
        <wd-cell-group title="美发师统计">
          <wd-cell v-for="(count, name) in monthHairstylistStats" :key="name" :title="name" :value="`${count} 次`"></wd-cell>
        </wd-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { rechargeService } from '@/services/rechargeService'
import { consumptionService } from '@/services/consumptionService'

const activeTab = ref('day')
const now = new Date()
const selectedDate = ref(now.getTime())
const selectedMonth = ref(now.getTime())

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

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatMonth(timestamp: number): string {
  const date = new Date(timestamp)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}
</script>
