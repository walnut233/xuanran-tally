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
      <!-- Basic Info -->
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
            <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; background-color: #f9fafb; padding: 10px 16px;">
              <span style="font-size: 14px;" :style="form.birthday ? 'color: #1f2937;' : 'color: #9ca3af;'">
                {{ form.birthday || '选择生日' }}
              </span>
              <span style="font-size: 18px; color: #9ca3af;">📅</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Info -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">账户信息</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
            <span style="width: 80px; font-size: 14px; font-weight: 500; color: #1f2937; flex-shrink: 0;">{{ isEdit ? '当前次数' : '初始次数' }} <span style="color: #ef4444;">*</span></span>
            <input
              v-model="form.remainingHaircuts"
              type="number"
              style="flex: 1; font-size: 14px; color: #1f2937; outline: none; border: none; padding: 0;"
              :placeholder="isEdit ? '请输入剩余剪发次数' : '请输入初始剪发次数'"
            />
          </div>
        </div>
        <div style="padding: 0 20px; padding-top: 8px; padding-bottom: 8px; background-color: #f9fafb; margin-top: -2px;">
          <p style="font-size: 12px; color: #6b7280; margin: 0;">{{ isEdit ? '编辑会员剩余剪发次数' : '开卡时赠送或充值的剪发次数' }}</p>
        </div>
      </div>

      <!-- Remark -->
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
        style="width: 100%; height: 52px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer;"
        :style="!canSubmit ? 'opacity: 0.5; cursor: not-allowed;' : ''"
        :disabled="!canSubmit"
        @click="handleSubmit"
      >
        {{ isEdit ? '保存修改' : '保存会员' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { memberService } from '@/services/memberService'
import type { Member } from '@/types'

const memberId = ref<string | null>(null)
const isEdit = computed(() => !!memberId.value)

const form = ref({
  name: '',
  phone: '',
  gender: undefined as '男' | '女' | '保密' | undefined,
  birthday: '',
  remainingHaircuts: 0,
  remark: ''
})

const canSubmit = computed(() => {
  return form.value.name && form.value.phone && form.value.phone.length === 11
})

function goBack() {
  uni.navigateBack()
}

function handleSubmit() {
  if (!canSubmit.value) return

  if (isEdit.value && memberId.value) {
    // 编辑模式
    const updated = memberService.update(memberId.value, {
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      birthday: form.value.birthday,
      remainingHaircuts: Number(form.value.remainingHaircuts) || 0,
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
    memberService.add({
      name: form.value.name,
      phone: form.value.phone,
      gender: form.value.gender,
      birthday: form.value.birthday,
      remainingHaircuts: Number(form.value.remainingHaircuts) || 0,
      remark: form.value.remark
    })
    uni.showToast({
      title: '保存成功',
      icon: 'success'
    })
    setTimeout(() => {
      uni.navigateBack()
    }, 500)
  }
}

onLoad((options: any) => {
  if (options.id) {
    memberId.value = options.id
  }
})

onShow(() => {
  if (memberId.value) {
    // 加载会员数据
    const member = memberService.getById(memberId.value)
    if (member) {
      form.value = {
        name: member.name,
        phone: member.phone,
        gender: member.gender,
        birthday: member.birthday || '',
        remainingHaircuts: member.remainingHaircuts,
        remark: member.remark || ''
      }
    }
  }
})
</script>

<style>
</style>
