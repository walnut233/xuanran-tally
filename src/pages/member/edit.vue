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
      <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 16px; display: flex; align-items: center;">
        <button style="width: 36px; height: 36px; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; flex-shrink: 0;" @click="goBack">
          <span style="font-size: 24px; font-weight: bold; color: #374151; line-height: 1;">‹</span>
        </button>
        <h1 style="flex: 1; text-align: center; font-size: 20px; font-weight: 600; color: #1f2937; margin: 0;">{{ isEdit ? '编辑会员' : '添加会员' }}</h1>
        <div style="width: 36px; flex-shrink: 0;"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 20px; padding-bottom: 128px;">
      <!-- 基本信息 -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">基本信息</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">姓名 <span style="color: #ef4444;">*</span></span>
            <input
              v-model="form.name"
              style="flex: 1; font-size: 14px; color: #1f2937; outline: none; border: none; padding: 0;"
              placeholder="请输入会员姓名"
            />
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">手机号 <span style="color: #ef4444;">*</span></span>
            <input
              v-model="form.phone"
              type="tel"
              maxlength="11"
              style="flex: 1; font-size: 14px; color: #1f2937; outline: none; border: none; padding: 0;"
              placeholder="请输入手机号"
            />
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">性别</span>
            <div style="display: flex; gap: 12px; flex: 1;">
              <button
                v-for="g in ['男', '女', '保密']"
                :key="g"
                style="flex: 1; height: 40px; border: 1px solid #e5e7eb; font-size: 14px; font-weight: 500; background-color: white; cursor: pointer;"
                :style="form.gender === g ? 'border-color: #14b8a6; background-color: #ccfbf1; color: #0d9488;' : 'border-color: #e5e7eb; background-color: white; color: #6b7280;'"
                @click="form.gender = g as any"
              >
                {{ g }}
              </button>
            </div>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">生日</span>
            <picker
              mode="date"
              :value="form.birthday"
              :end="new Date().toISOString().split('T')[0]"
              @change="onBirthdayChange"
              style="flex: 1;"
            >
              <div style="display: flex; align-items: center; justify-content: space-between; background-color: #f9fafb; padding: 10px 16px;">
                <span style="font-size: 14px;" :style="form.birthday ? 'color: #1f2937;' : 'color: #9ca3af;'">
                  {{ form.birthday || '选择生日' }}
                </span>
                <span style="font-size: 18px; color: #9ca3af;">📅</span>
              </div>
            </picker>
          </div>
        </div>
      </div>

      <!-- 账户信息 -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">账户信息</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
          <div v-if="!isEdit" style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="showTierSelector = true">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">会员梯度</span>
            <span v-if="selectedTier" style="flex: 1; font-size: 14px; color: #1f2937;">{{ selectedTier.name }} (充¥{{ selectedTier.initialRecharge }})</span>
            <span v-else style="flex: 1; font-size: 14px; color: #9ca3af;">选择会员梯度</span>
            <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">{{ isEdit ? '当前余额' : '初始余额' }} <span style="color: #ef4444;">*</span></span>
            <span style="font-size: 14px; color: #1f2937; margin-right: 8px">¥</span>
            <input
              v-model="form.balance"
              type="number"
              style="flex: 1; font-size: 14px; color: #1f2937; outline: none; border: none; padding: 0"
              :placeholder="isEdit ? '请输入会员余额' : '请输入初始余额'"
            />
          </div>
        </div>
        <div style="padding: 0 20px; padding-top: 8px; padding-bottom: 8px; background-color: #f9fafb; margin-top: -2px">
          <p style="font-size: 12px; color: #6b7280; margin: 0">{{ isEdit ? '编辑会员账户余额' : '开卡时充值的余额' }}</p>
        </div>
      </div>

      <!-- 备注 -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">备注</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
          <div style="display: flex; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0; padding-top: 6px;">备注</span>
            <textarea
              v-model="form.remark"
              style="flex: 1; font-size: 14px; color: #1f2937; outline: none; border: none; resize: none; min-height: 80px; padding: 0;"
              placeholder="添加备注信息（选填）"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div style="position: fixed; bottom: 0; left: 0; right: 0; background-color: white; border-top: 1px solid #f3f4f6; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
      <button
        style="width: 100%; height: 48px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer;"
        :style="!canSubmit ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        {{ isEdit ? '保存修改' : '保存会员' }}
      </button>
    </div>

    <!-- 梯度选择弹窗 -->
    <div
      v-if="showTierSelector"
      style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50;"
      @click.self="showTierSelector = false"
    >
      <div style="position: absolute; bottom: 0; left: 0; right: 0; background-color: white; max-height: 70vh; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="font-weight: 600; color: #1f2937; font-size: 18px;">选择会员梯度</span>
          <button style="color: #9ca3af; font-size: 24px; background: none; border: none; cursor: pointer;" @click="showTierSelector = false">×</button>
        </div>
        <div style="flex: 1; overflow-y: auto; padding: 16px;">
          <div v-if="tiers.length > 0" style="display: flex; flex-direction: column; gap: 8px;">
            <div
              v-for="tier in tiers"
              :key="tier.id"
              style="display: flex; flex-direction: column; padding: 16px; border: 1px solid #f3f4f6; border-radius: 8px; cursor: pointer;"
              :style="selectedTier?.id === tier.id ? 'border-color: #14b8a6; background-color: #ccfbf1;' : ''"
              @click="selectTier(tier)"
            >
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 16px; font-weight: 600; color: #1f2937;">{{ tier.name }}</span>
                <span style="font-size: 14px; color: #0d9488; font-weight: 600;">充¥{{ tier.initialRecharge }}</span>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                <span
                  v-for="price in tier.prices"
                  :key="price.serviceName"
                  style="padding: 2px 8px; background-color: #f0fdf4; color: #0d9488; font-size: 12px; border-radius: 4px;"
                >
                  {{ price.serviceName }}：¥{{ price.price }}
                </span>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
            暂无梯度设置，请先在设置中添加
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { memberService } from '@/services/memberService'
import { rechargeService } from '@/services/rechargeService'
import { settingsService } from '@/services/settingsService'
import type { Member, MemberTier } from '@/types'

const memberId = ref<string | null>(null)
const isEdit = computed(() => !!memberId.value)
const showTierSelector = ref(false)
const tiers = ref<MemberTier[]>([])
const selectedTier = ref<MemberTier | null>(null)

const form = ref({
  name: '',
  phone: '',
  gender: undefined as '男' | '女' | '保密' | undefined,
  birthday: '',
  balance: 0,
  remark: ''
})

const canSubmit = computed(() => {
  return form.value.name && form.value.phone && form.value.phone.length === 11
})

function goBack() {
  uni.navigateBack()
}

function onBirthdayChange(e: any) {
  form.value.birthday = e.detail.value
}

function selectTier(tier: MemberTier) {
  selectedTier.value = tier
  // 自动设置初始余额为梯度的初始充值金额
  form.value.balance = tier.initialRecharge
  showTierSelector.value = false
}

function handleSubmit() {
  if (!canSubmit.value) return

  if (isEdit.value && memberId.value) {
    // 编辑模式 - 不修改梯度
    const updated = memberService.update(memberId.value, {
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      birthday: form.value.birthday,
      balance: Number(form.value.balance) || 0,
      remark: form.value.remark
    })
    if (updated) {
      uni.showToast({
        title: '保存成功',
        icon: 'success'
      })
      setTimeout(() => {
        uni.navigateBack()
      }, 500)
    }
  } else {
    // 新增模式
    const newMember = memberService.add({
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      birthday: form.value.birthday,
      balance: Number(form.value.balance) || 0,
      tierId: selectedTier.value?.id,
      remark: form.value.remark
    })

    // 如果有初始余额，创建一条充值记录
    if (form.value.balance > 0) {
      rechargeService.add({
        memberId: newMember.id,
        amount: form.value.balance,
        paymentMethod: '开卡充值',
        remark: selectedTier.value ? `${selectedTier.value.name}开卡` : '开卡充值'
      })
    }

    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  }
}

function refreshTiers() {
  const settings = settingsService.getSystemSettings()
  tiers.value = settings.memberTiers || []
}

onLoad((options: any) => {
  if (options.id) {
    memberId.value = options.id
  }
})

onShow(() => {
  refreshTiers()
  if (memberId.value) {
    // 加载会员数据
    const member = memberService.getById(memberId.value)
    if (member) {
      form.value = {
        name: member.name,
        phone: member.phone,
        gender: member.gender,
        birthday: member.birthday || '',
        balance: member.balance,
        remark: member.remark || ''
      }
      // 如果有梯度信息，找到对应的梯度
      if (member.tierId) {
        selectedTier.value = tiers.value.find(t => t.id === member.tierId) || null
      }
    }
  } else {
    // 新增模式，重置表单
    form.value = {
      name: '',
      phone: '',
      gender: undefined,
      birthday: '',
      balance: 0,
      remark: ''
    }
    selectedTier.value = null
  }
})
</script>

<style>
</style>
