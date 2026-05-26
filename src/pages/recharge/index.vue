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
        <div style="font-size: 20px; font-weight: 600; color: #1f2937; margin-bottom: 12px;">充值记录</div>
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
        </div>
      </div>

      <!-- 表单 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 20px; margin-bottom: 16px;" v-if="selectedMember">
        <div style="margin-bottom: 20px;">
          <label style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; display: block;">充值金额（元）</label>
          <input
            v-model="form.amount"
            type="number"
            style="width: 100%; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; outline: none; box-sizing: border-box;"
            placeholder="请输入金额"
          />
        </div>
        <div style="margin-bottom: 20px;">
          <label style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; display: block;">支付方式</label>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
            <button
              v-for="method in paymentMethods"
              :key="method"
              style="padding: 14px 10px; text-align: center; background-color: #f9fafb; border: 1px solid #f3f4f6; font-size: 14px; font-weight: 500; cursor: pointer;"
              :style="form.paymentMethod === method ? 'border-color: #14b8a6; background-color: #ccfbf1; color: #0d9488;' : ''"
              @click="form.paymentMethod = method"
            >
              {{ method }}
            </button>
          </div>
        </div>
        <div>
          <label style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; display: block;">备注（可选）</label>
          <input
            v-model="form.remark"
            style="width: 100%; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; outline: none; box-sizing: border-box;"
            placeholder="填写备注信息"
          />
        </div>
      </div>

      <!-- 提交按钮 -->
      <button
        style="width: 100%; height: 52px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer; margin-bottom: 24px;"
        :style="!canSubmit ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        :disabled="!canSubmit"
        @click="handleSubmit"
        v-if="selectedMember"
      >
        确认充值
      </button>

      <!-- 今日充值记录 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">今日充值</div>
      <div style="display: flex; flex-direction: column; gap: 10px;" v-if="todayRecharges.length > 0">
        <div
          v-for="record in todayRecharges"
          :key="record.id"
          style="background-color: white; border: 1px solid #f3f4f6; padding: 16px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 600; color: #1f2937; font-size: 16px;">{{ getMemberName(record.memberId) }}</span>
            <span style="font-weight: 700; color: #0d9488; font-size: 16px;">+¥{{ record.amount }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>{{ record.paymentMethod === '开卡充值' ? '开卡' : record.paymentMethod }}</span>
            <span>{{ formatTime(record.rechargeTime) }}</span>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
        暂无充值记录
      </div>
    </div>

    <!-- 充值历史 Tab -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 120px;" v-else>
      <div style="display: flex; flex-direction: column; gap: 10px;" v-if="allRecharges.length > 0">
        <div
          v-for="record in allRecharges"
          :key="record.id"
          style="background-color: white; border: 1px solid #f3f4f6; padding: 16px;"
        >
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-weight: 600; color: #1f2937; font-size: 16px;">{{ getMemberName(record.memberId) }}</span>
            <span style="font-weight: 700; color: #0d9488; font-size: 16px;">+¥{{ record.amount }}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #6b7280;">
            <span>{{ record.paymentMethod === '开卡充值' ? '开卡' : record.paymentMethod }}</span>
            <span>{{ formatDate(record.rechargeTime) }}</span>
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
        暂无充值记录
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
                <div style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; margin-top: 4px; color: #0d9488;">
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
import { rechargeService } from '@/services/rechargeService'
import type { Member } from '@/types'

const activeTab = ref('quick')
const showMemberSelector = ref(false)
const memberSearchKeyword = ref('')
const selectedMember = ref<Member | null>(null)
const initialMemberId = ref<string | null>(null)
const refreshKey = ref(0)

const tabs = [
  { id: 'quick', name: '快速充值' },
  { id: 'history', name: '充值历史' }
]

const paymentMethods = ['现金', '微信', '支付宝']

const form = ref({
  amount: '',
  paymentMethod: '现金',
  remark: ''
})

const canSubmit = computed(() => {
  return selectedMember.value && form.value.amount && Number(form.value.amount) > 0
})

const allMembers = computed(() => memberService.getAll())

const filteredMembers = computed(() => {
  if (!memberSearchKeyword.value) return allMembers.value
  const kw = memberSearchKeyword.value.toLowerCase()
  return allMembers.value.filter((m) =>
    m.name.toLowerCase().includes(kw) || m.phone.includes(kw)
  )
})

const todayRecharges = computed(() => {
  // 依赖 refreshKey 来强制刷新
  refreshKey.value
  const today = new Date().toDateString()
  return rechargeService.getAll().filter(r => {
    const rechargeDate = new Date(r.rechargeTime).toDateString()
    return rechargeDate === today
  }).sort((a, b) => new Date(b.rechargeTime).getTime() - new Date(a.rechargeTime).getTime())
})

const allRecharges = computed(() => {
  return [...rechargeService.getAll()].sort((a, b) => new Date(b.rechargeTime).getTime() - new Date(a.rechargeTime).getTime())
})

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

function selectMember(member: Member) {
  selectedMember.value = member
  showMemberSelector.value = false
}

function handleSubmit() {
  if (!canSubmit.value || !selectedMember.value) return

  rechargeService.add({
    memberId: selectedMember.value.id,
    amount: Number(form.value.amount),
    paymentMethod: form.value.paymentMethod,
    remark: form.value.remark
  })

  uni.showToast({
    title: '充值成功',
    icon: 'success'
  })

  Object.assign(form.value, {
    amount: '',
    paymentMethod: '现金',
    remark: ''
  })

  if (selectedMember.value) {
    selectedMember.value = memberService.getById(selectedMember.value.id)
  }

  // 强制刷新今日充值记录
  refreshKey.value++
}

onLoad((options: any) => {
  console.log('充值页面 onLoad, options:', options)
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
  console.log('充值页面 onShow, initialMemberId:', initialMemberId.value)

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
})

// 监听tab切换，刷新数据
watch(activeTab, (newTab) => {
  if (newTab === 'history') {
    // tab切换时可以在这里添加刷新逻辑
  }
})
</script>

<style>
</style>
