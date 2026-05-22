<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '会员详情'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100" v-if="member">
    <!-- 会员信息卡片 -->
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-30rpx">
      <div class="flex items-center">
        <div class="w-120rpx h-120rpx bg-white/20 rounded-full flex items-center justify-center text-50rpx text-white">
          {{ member.name.charAt(0) }}
        </div>
        <div class="ml-30rpx text-white">
          <div class="text-40rpx font-bold">{{ member.name }}</div>
          <div class="text-28rpx text-blue-100 mt-10rpx">{{ member.phone }}</div>
        </div>
      </div>
      <div class="mt-40rpx flex justify-around">
        <div class="text-center">
          <div class="text-56rpx font-bold text-white">{{ member.remainingHaircuts }}</div>
          <div class="text-26rpx text-blue-100 mt-10rpx">剩余次数</div>
        </div>
      </div>
    </div>

    <!-- 基本信息 -->
    <div class="p-30rpx">
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden">
        <wd-cell-group>
          <wd-cell title="性别" :value="member.gender || '-'"></wd-cell>
          <wd-cell title="生日" :value="member.birthday || '-'"></wd-cell>
          <wd-cell title="开卡时间" :value="formatDate(member.createDate)"></wd-cell>
          <wd-cell title="备注" :value="member.remark || '-'"></wd-cell>
        </wd-cell-group>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="p-x-30rpx mt-30rpx flex space-x-20rpx">
      <wd-button type="primary" block size="large" @click="goToRecharge">
        充值
      </wd-button>
      <wd-button type="warning" block size="large" @click="goToConsumption">
        消费
      </wd-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onLoad } from 'vue'
import type { Member } from '@/types'
import { memberService } from '@/services/memberService'
import { navigateTo } from '@/utils/router'

const member = ref<Member | null>(null)

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function goToRecharge() {
  if (member.value) {
    navigateTo('/pages/recharge/index', { memberId: member.value.id })
  }
}

function goToConsumption() {
  if (member.value) {
    navigateTo('/pages/consumption/index', { memberId: member.value.id })
  }
}

onLoad((options: any) => {
  if (options.id) {
    member.value = memberService.getById(options.id) || null
  }
})
</script>
