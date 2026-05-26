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
        <div style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">消费记账</div>
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
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 120px;" v-if="activeTab === 'quick'">
      <!-- 选择会员 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;" @click="showMemberSelector = true">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">选择会员</div>
        <div style="display: flex; align-items: center; justify-content: space-between; background-color: #f9fafb; padding: 14px 16px;">
          <span :style="selectedMember ? 'color: #1f2937;' : 'color: #9ca3af;'">
            {{ selectedMember ? selectedMember.name : '点击选择或搜索会员' }}
          </span>
          <span style="font-size: 20px; font-weight: bold; color: #9ca3af; line-height: 1;">›</span>
        </div>
      </div>

      <!-- 会员卡片 -->
      <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 20px; margin-bottom: 20px;" v-if="selectedMember">
        <div style="font-size: 18px; font-weight: 700; color: white; margin-bottom: 4px;">{{ selectedMember.name }}</div>
        <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px;">
          余额 <strong style="font-size: 24px; font-weight: 700;">¥{{ selectedMember.balance }}</strong>
          <span v-if="selectedMember.balance < systemSettings.haircutPrice" style="color: #fef08a; margin-left: 8px;">(余额不足)</span>
        </div>
        <div v-if="getMemberTier()" style="color: rgba(255, 255, 255, 0.9); font-size: 13px; margin-top: 8px;">
          {{ getMemberTier()?.name }}
        </div>
      </div>

      <!-- 服务类型选择 -->
      <div style="margin-bottom: 20px;" v-if="selectedMember">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">选择服务</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div
            v-for="service in serviceTypes"
            :key="service.id"
            style="background-color: white; border: 2px solid #f3f4f6; padding: 16px; cursor: pointer; border-radius: 12px; transition: all 0.2s ease; position: relative;"
            :style="form.serviceType === service.name ? 'border-color: #14b8a6; background: linear-gradient(135deg, #ccfbf1 0%, #f0fdfa 100%); box-shadow: 0 4px 12px rgba(20, 184, 166, 0.15);' : 'border-color: #f3f4f6; background-color: white; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);'"
            @click="selectService(service)"
          >
            <div v-if="form.serviceType === service.name" style="position: absolute; top: 10px; right: 10px; width: 24px; height: 24px; background: #14b8a6; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
              <span style="color: white; font-size: 14px; font-weight: bold;">✓</span>
            </div>
            <div style="font-weight: 600; color: #1f2937; font-size: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
              <span v-if="service.name.includes('剪')">✂️</span>
              <span v-else-if="service.name.includes('染')">🎨</span>
              <span v-else-if="service.name.includes('烫')">💁</span>
              <span v-else-if="service.name.includes('洗')">🧴</span>
              <span v-else-if="service.name.includes('护')">💆</span>
              <span v-else>💇</span>
              {{ service.name }}
            </div>
            <div style="font-size: 18px; font-weight: 700; color: #0d9488;">
              -¥{{ getServicePrice(service) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 美发师选择 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;" v-if="selectedMember">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">发型师 <span style="color: #ef4444;">*</span></div>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <div
            v-for="stylist in hairstylists"
            :key="stylist.id"
            style="padding: 10px 18px; background-color: #f9fafb; border: 1px solid #f3f4f6; font-size: 14px; font-weight: 500; cursor: pointer;"
            :style="form.hairstylist === stylist.name ? 'border-color: #14b8a6; background-color: #ccfbf1; color: #0d9488;' : ''"
            @click="form.hairstylist = stylist.name"
          >
            {{ stylist.name }}
          </div>
        </div>
      </div>

      <!-- 备注 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; margin-bottom: 16px;" v-if="selectedMember">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">备注（可选）</div>
        <input
          v-model="form.remark"
          style="width: 100%; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; outline: none; box-sizing: border-box;"
          placeholder="填写备注信息"
        />
      </div>

      <!-- 提交按钮 -->
      <button
        style="width: 100%; height: 52px; background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer; margin-bottom: 24px;"
        :style="!canSubmit ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        :disabled="!canSubmit"
        @click="handleSubmit"
        v-if="selectedMember"
      >
        确认消费
      </button>

      <!-- 今日消费记录 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">今日消费</div>
      <div style="display: flex; flex-direction: column; gap: 10px;" v-if="todayConsumptions.length > 0">
        <div
          v-for="record in todayConsumptions"
          :key="record.id"
          style="background-color: white; border: 1px solid #f3f4f6; padding: 16px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 600; color: #1f2937; font-size: 16px;">{{ getMemberName(record.memberId) }}</span>
            <span style="font-weight: 700; color: #ef4444; font-size: 16px;">-¥{{ record.amount }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>{{ record.serviceType }} · {{ record.hairstylist || '未指定' }}</span>
            <span>{{ formatTime(getTimeField(record)) }}</span>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
        暂无消费记录
      </div>
    </div>

    <!-- 消费历史 Tab -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 120px;" v-else>
      <div style="display: flex; flex-direction: column; gap: 10px;" v-if="allConsumptions.length > 0">
        <div
          v-for="record in allConsumptions"
          :key="record.id"
          style="background-color: white; border: 1px solid #f3f4f6; padding: 16px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 600; color: #1f2937; font-size: 16px;">{{ getMemberName(record.memberId) }}</span>
            <span style="font-weight: 700; color: #ef4444; font-size: 16px;">-¥{{ record.amount }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>{{ record.serviceType }} · {{ record.hairstylist || '未指定' }}</span>
            <span>{{ formatDate(getTimeField(record)) }}</span>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
        暂无消费记录
      </div>
    </div>

    <!-- 会员选择弹窗 -->
    <div
      v-if="showMemberSelector"
      style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50;"
      @click.self="showMemberSelector = false"
    >
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: white; max-height: 70vh; display: flex; flex-direction: column;">
        <div style="padding: 20px; border-bottom: 1px solid #f3f4f6;">
          <div style="font-size: 18px; font-weight: 600; color: #1f2937;">选择会员</div>
        </div>
        <div style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
          <div style="display: flex; align-items: center; gap: 12px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 12px 16px;">
            <span style="font-size: 18px; color: #9ca3af;">🔍</span>
            <input
              v-model="memberSearchKeyword"
              style="flex: 1; background-color: transparent; font-size: 14px; outline: none; border: none;"
              placeholder="搜索姓名或手机号"
            />
          </div>
        </div>
        <div style="flex: 1; overflow-y: auto; padding: 16px;">
          <div style="display: flex; flex-direction: column; gap: 10px;" v-if="filteredMembers.length > 0">
            <div
              v-for="member in filteredMembers"
              :key="member.id"
              style="background-color: #f9fafb; padding: 16px; display: flex; align-items: center; gap: 14px; cursor: pointer;"
              @click="selectMember(member)"
            >
              <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600; color: white; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); flex-shrink: 0;">
                {{ member.name.charAt(0) }}
              </div>
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 4px;">{{ member.name }}</div>
                <div style="font-size: 14px; color: #6b7280;">{{ member.phone }}</div>
                <div
                  style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; margin-top: 4px;"
                  :style="member.balance < systemSettings.haircutPrice ? 'color: #ef4444;' : 'color: #0d9488;'"
                >
                  余额 ¥{{ member.balance }}
                </div>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
            暂无会员
          </div>
        </div>
        <div style="padding: 16px; border-top: 1px solid #f3f4f6;">
          <button style="width: 100%; height: 48px; background-color: #f3f4f6; color: #1f2937; font-size: 16px; font-weight: 600; border: none; cursor: pointer;" @click="showMemberSelector = false">
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { memberService } from '@/services/memberService'
import { serviceTypeService } from '@/services/serviceTypeService'
import { hairstylistService } from '@/services/hairstylistService'
import { consumptionService } from '@/services/consumptionService'
import { settingsService } from '@/services/settingsService'
import type { Member, ServiceType, Hairstylist } from '@/types'

const activeTab = ref('quick')
const showMemberSelector = ref(false)
const memberSearchKeyword = ref('')
const selectedMember = ref<Member | null>(null)
const initialMemberId = ref<string | null>(null)
const refreshKey = ref(0)

const systemSettings = settingsService.getSystemSettings()

const tabs = [
  { id: 'quick', name: '快速消费' },
  { id: 'history', name: '消费历史' }
]

const serviceTypes = ref<ServiceType[]>([])
const hairstylists = ref<Hairstylist[]>([])

const form = ref({
  serviceType: '',
  amount: 0,
  hairstylist: '',
  remark: ''
})

const canSubmit = computed(() => {
  return selectedMember.value &&
    form.value.serviceType &&
    form.value.hairstylist &&
    form.value.amount > 0 &&
    form.value.amount <= selectedMember.value.balance
})

const allMembers = computed(() => memberService.getAll())

const filteredMembers = computed(() => {
  if (!memberSearchKeyword.value) return allMembers.value
  const kw = memberSearchKeyword.value.toLowerCase()
  return allMembers.value.filter((m) =>
    m.name.toLowerCase().includes(kw) || m.phone.includes(kw)
  )
})

const todayConsumptions = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value
  const today = new Date().toDateString()
  return consumptionService.getAll().filter(r => {
    const timeField = r.consumptionTime || (r as any).consumeTime || ''
    const consumeDate = new Date(timeField).toDateString()
    return consumeDate === today
  }).sort((a, b) => {
    const timeA = new Date(a.consumptionTime || (a as any).consumeTime || '').getTime()
    const timeB = new Date(b.consumptionTime || (b as any).consumeTime || '').getTime()
    return timeB - timeA
  })
})

const allConsumptions = computed(() => {
  return [...consumptionService.getAll()].sort((a, b) => {
    const timeA = new Date(a.consumptionTime || (a as any).consumeTime || '').getTime()
    const timeB = new Date(b.consumptionTime || (b as any).consumeTime || '').getTime()
    return timeB - timeA
  })
})

function getServicePrice(service: ServiceType): number {
  // 如果选中了会员且会员有梯度，使用梯度价格
  if (selectedMember.value && selectedMember.value.tierId) {
    const tier = systemSettings.memberTiers?.find(t => t.id === selectedMember.value!.tierId)
    if (tier) {
      const tierPrice = tier.prices.find(p => p.serviceName === service.name)
      if (tierPrice) {
        return tierPrice.price
      }
    }
  }
  // 否则使用第一个梯度中的价格，如果没有梯度则使用默认值
  if (systemSettings.memberTiers && systemSettings.memberTiers.length > 0) {
    const firstTier = systemSettings.memberTiers[0]
    const tierPrice = firstTier.prices.find(p => p.serviceName === service.name)
    if (tierPrice) {
      return tierPrice.price
    }
  }
  return 30
}

function getMemberTier() {
  if (selectedMember.value && selectedMember.value.tierId) {
    return systemSettings.memberTiers?.find(t => t.id === selectedMember.value!.tierId)
  }
  return null
}

function getMemberName(memberId: string) {
  const member = memberService.getById(memberId)
  return member ? member.name : '未知会员'
}

function formatTime(timeStr: string) {
  const time = new Date(timeStr)
  const today = new Date()
  if (time.toDateString() === today.toDateString()) {
    const hours = String(time.getHours()).padStart(2, '0')
    const minutes = String(time.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }
  return '昨天'
}

function formatDate(timeStr: string) {
  const time = new Date(timeStr)
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hours = String(time.getHours()).padStart(2, '0')
  const minutes = String(time.getMinutes()).padStart(2, '0')
  return `${month}月${day}日 ${hours}:${minutes}`
}

// 兼容字段名
function getTimeField(record: any): string {
  return record.consumptionTime || record.consumeTime || ''
}

function selectMember(member: Member) {
  selectedMember.value = member
  showMemberSelector.value = false
}

function selectService(service: ServiceType) {
  if (form.value.serviceType === service.name) {
    // 已选中，取消选择
    form.value.serviceType = ''
    form.value.amount = 0
  } else {
    // 未选中，选中该服务
    form.value.serviceType = service.name
    form.value.amount = getServicePrice(service)
  }
}

function handleSubmit() {
  if (!canSubmit.value || !selectedMember.value) {
    if (!form.value.hairstylist) {
      uni.showToast({
        title: '请选择发型师',
        icon: 'none'
      })
    }
    return
  }

  const result = consumptionService.add({
    memberId: selectedMember.value.id,
    serviceType: form.value.serviceType,
    amount: form.value.amount,
    hairstylist: form.value.hairstylist,
    remark: form.value.remark
  })

  if (result === null) {
    uni.showToast({
      title: '余额不足',
      icon: 'none'
    })
    return
  }

  uni.showToast({
    title: '消费成功',
    icon: 'success'
  })

  Object.assign(form.value, {
    serviceType: '',
    amount: 0,
    hairstylist: '',
    remark: ''
  })

  if (selectedMember.value) {
    selectedMember.value = memberService.getById(selectedMember.value.id)
  }

  // 强制刷新今日消费记录
  refreshKey.value++
}

onLoad((options: any) => {
  console.log('消费页面 onLoad, options:', options)
  // 先尝试从URL参数获取
  if (options.memberId) {
    initialMemberId.value = options.memberId
    const member = memberService.getById(options.memberId)
    if (member) {
      console.log('从URL找到会员:', member.name)
      selectedMember.value = member
    }
  }
})

onShow(() => {
  console.log('消费页面 onShow, initialMemberId:', initialMemberId.value)

  // 尝试从全局变量获取待处理的会员ID
  const app = getApp() as any
  if (app.pendingMemberId) {
    console.log('从全局变量获取到会员ID:', app.pendingMemberId)
    initialMemberId.value = app.pendingMemberId
    const member = memberService.getById(app.pendingMemberId)
    if (member) {
      console.log('找到会员:', member.name)
      selectedMember.value = member
    }
    // 清除全局变量
    app.pendingMemberId = null
  }
  // 如果有初始会员ID，确保选中该会员
  else if (initialMemberId.value) {
    const member = memberService.getById(initialMemberId.value)
    if (member) {
      selectedMember.value = member
    }
  } else if (selectedMember.value) {
    // 刷新已选会员数据
    selectedMember.value = memberService.getById(selectedMember.value.id)
  }
  serviceTypes.value = serviceTypeService.getAll()
  hairstylists.value = hairstylistService.getAll()
})

// 监听tab切换，刷新数据
watch(activeTab, (newTab) => {
  if (newTab === 'history') {
    // 这里可以添加刷新消费历史数据的逻辑
  }
})

// 监听发型师列表变化，始终选中第一个
watch(hairstylists, (newHairstylists) => {
  if (newHairstylists.length > 0) {
    form.value.hairstylist = newHairstylists[0].name
  }
}, { immediate: true })

// 监听form.hairstylist，如果为空且有发型师列表，则自动选中第一个
watch(() => form.value.hairstylist, (newHairstylist) => {
  if (!newHairstylist && hairstylists.value.length > 0) {
    form.value.hairstylist = hairstylists.value[0].name
  }
})
</script>

<style>
</style>
