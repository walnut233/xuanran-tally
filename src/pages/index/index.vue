<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb">
    <!-- Custom Status Bar & Header -->
    <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)">
      <!-- Status Bar Spacer -->
      <div style="height: 32px"></div>
      <!-- Header -->
      <div style="padding: 16px 20px">
        <div style="margin-bottom: 4px">
          <h1 style="font-size: 20px; font-weight: 600; color: white; margin: 0">{{ shopSettings.name }}</h1>
        </div>
        <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin: 0">今天是个好日子，祝你生意兴隆！</p>
      </div>
    </div>

    <!-- Page Content -->
    <div style="padding: 16px 20px 120px 20px">
      <!-- Stats Grid -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px">
        <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
          <div style="font-size: 24px; font-weight: 700; color: #0d9488">{{ todayStats.rechargeCount }}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值笔数</div>
        </div>
        <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
          <div style="font-size: 24px; font-weight: 700; color: #0d9488">{{ todayStats.consumeCount }}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日消费笔数</div>
        </div>
        <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
          <div style="font-size: 24px; font-weight: 700; color: #0d9488">¥{{ todayStats.rechargeAmount }}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值总金额</div>
        </div>
        <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
          <div style="font-size: 24px; font-weight: 700; color: #0d9488">{{ todayStats.memberCount }}</div>
          <div style="font-size: 12px; color: #6b7280; margin-top: 4px">当前会员总数</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div style="display: flex; gap: 12px; margin-bottom: 24px">
        <button
          v-for="action in quickActions"
          :key="action.id"
          style="
            flex: 1;
            height: 80px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            padding: 12px;
            background: white;
            border: 1px solid #f3f4f6;
          "
          @click="handleAction(action)"
        >
          <div
            style="
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #0d9488;
              font-size: 24px;
            "
          >
            <span v-if="action.icon === 'report'">📊</span>
            <span v-else>⚙️</span>
          </div>
          <span style="font-size: 14px; font-weight: 600; color: #1f2937">{{ action.name }}</span>
        </button>
      </div>

      <!-- Recent Activity -->
      <div style="margin-bottom: 24px">
        <div style="display: flex; align-items: center; margin-bottom: 12px">
          <h3
            style="
              font-size: 12px;
              font-weight: 600;
              color: #6b7280;
              letter-spacing: 0.05em;
              text-transform: uppercase;
              margin: 0;
            "
          >
            最近活动
          </h3>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px">
          <div
            v-for="item in recentActivity"
            :key="item.id"
            style="
              display: flex;
              align-items: center;
              gap: 14px;
              background: white;
              padding: 16px;
              border: 1px solid #f3f4f6;
            "
          >
            <div
              :style="[
                'width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px;',
                item.type === 'recharge'
                  ? 'background: #dcfce7; color: #16a34a;'
                  : 'background: #dbeafe; color: #2563eb;'
              ]"
            >
              <span v-if="item.type === 'recharge'">💰</span>
              <span v-else>💳</span>
            </div>
            <div style="flex: 1; min-width: 0">
              <div style="font-size: 14px; font-weight: 500; color: #1f2937; margin-bottom: 2px">
                {{ item.name }} - {{ item.action }}
              </div>
              <div style="font-size: 12px; color: #6b7280">{{ item.detail }}</div>
            </div>
            <div style="font-size: 12px; color: #9ca3af">{{ item.time }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { memberService } from '@/services/memberService'
import { rechargeService } from '@/services/rechargeService'
import { consumptionService } from '@/services/consumptionService'
import { settingsService, type ShopSettings } from '@/services/settingsService'

const shopSettings = ref<ShopSettings>(settingsService.getShopSettings())
const refreshKey = ref(0)

const quickActions = [
  { id: 'report', name: '报表', icon: 'report', route: '/pages/report/index' },
  { id: 'settings', name: '设置', icon: 'settings', route: '/pages/settings/index' }
]

// 获取今日统计数据
const todayStats = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value
  const today = new Date().toDateString()
  const todayRecharges = rechargeService.getAll().filter(r =>
    new Date(r.rechargeTime).toDateString() === today
  )
  const todayConsumes = consumptionService.getAll().filter(c =>
    new Date(c.consumptionTime).toDateString() === today
  )
  const totalMembers = memberService.getAll().length

  return {
    rechargeCount: todayRecharges.length,
    consumeCount: todayConsumes.length,
    rechargeAmount: todayRecharges.reduce((sum, r) => sum + r.amount, 0),
    memberCount: totalMembers
  }
})

// 获取最近活动
const recentActivity = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value
  const activities: any[] = []
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  // 充值记录
  const recharges = rechargeService.getAll().filter(r => {
    const recordDate = new Date(r.rechargeTime)
    const recordDateOnly = new Date(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate())
    return recordDateOnly.getTime() === today.getTime() || recordDateOnly.getTime() === yesterday.getTime()
  }).map(r => {
    const member = memberService.getById(r.memberId)
    const isOpeningCard = r.paymentMethod === '开卡充值' || (r.remark && r.remark.includes('开卡'))
    return {
      id: 'r-' + r.id,
      type: 'recharge' as const,
      name: member?.name || '未知会员',
      action: isOpeningCard ? '开卡充值' : '充值',
      detail: `+¥${r.amount}`,
      time: formatTime(r.rechargeTime),
      rawTime: r.rechargeTime
    }
  })
  activities.push(...recharges)

  // 消费记录
  const consumes = consumptionService.getAll().filter(c => {
    const recordDate = new Date(c.consumptionTime)
    const recordDateOnly = new Date(recordDate.getFullYear(), recordDate.getMonth(), recordDate.getDate())
    return recordDateOnly.getTime() === today.getTime() || recordDateOnly.getTime() === yesterday.getTime()
  }).map(c => {
    const member = memberService.getById(c.memberId)
    return {
      id: 'c-' + c.id,
      type: 'consume' as const,
      name: member?.name || '未知会员',
      action: c.serviceType,
      detail: `-¥${c.amount} · 发型师${c.hairstylist || '未指定'}`,
      time: formatTime(c.consumptionTime),
      rawTime: c.consumptionTime
    }
  })
  activities.push(...consumes)

  // 按时间倒序排列
  return activities.sort((a, b) => {
    return new Date(b.rawTime).getTime() - new Date(a.rawTime).getTime()
  })
})

function formatTime(timeStr: string) {
  const time = new Date(timeStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const recordDate = new Date(time.getFullYear(), time.getMonth(), time.getDate())

  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const timeText = `${hours}:${minutes}`

  if (recordDate.getTime() === today.getTime()) {
    return `今日 ${timeText}`
  } else {
    return `昨日 ${timeText}`
  }
}

const handleAction = (action: any) => {
  if (action.route) {
    uni.navigateTo({
      url: action.route
    })
  }
}

onShow(() => {
  shopSettings.value = settingsService.getShopSettings()
  // 强制刷新所有数据
  refreshKey.value++
})
</script>
