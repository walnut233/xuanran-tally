<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '会员管理'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <!-- 搜索栏 -->
    <div class="bg-white p-30rpx">
      <wd-search v-model="searchKeyword" placeholder="搜索会员姓名或手机号" />
    </div>

    <!-- 会员列表 -->
    <div class="p-30rpx">
      <div v-if="displayMembers.length === 0" class="text-center py-100rpx text-gray-400">
        <div class="text-100rpx mb-20rpx">👥</div>
        <div>暂无会员</div>
      </div>

      <div v-else class="space-y-20rpx">
        <div
          v-for="member in displayMembers"
          :key="member.id"
          class="bg-white rounded-20rpx p-30rpx shadow-sm"
          @click="goToDetail(member.id)"
        >
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center">
                <span class="text-34rpx font-bold text-gray-800">{{ member.name }}</span>
                <span v-if="member.gender" class="ml-20rpx text-26rpx text-gray-500">
                  {{ member.gender === '男' ? '♂' : '♀' }}
                </span>
              </div>
              <div class="text-28rpx text-gray-500 mt-10rpx">{{ member.phone }}</div>
            </div>
            <div class="text-right">
              <div class="text-40rpx font-bold text-blue-500">{{ member.remainingHaircuts }}</div>
              <div class="text-24rpx text-gray-400">剩余次数</div>
            </div>
          </div>
          <div class="mt-20rpx pt-20rpx border-t border-gray-100 flex justify-between items-center">
            <div class="text-24rpx text-gray-400">
              开卡时间: {{ formatDate(member.createDate) }}
            </div>
            <div class="flex space-x-20rpx">
              <wd-button size="small" type="primary" plain @click.stop="goToRecharge(member.id)">
                充值
              </wd-button>
              <wd-button size="small" type="warning" plain @click.stop="goToConsumption(member.id)">
                消费
              </wd-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 新增按钮 -->
    <wd-fab>
      <wd-icon name="add" size="24px"></wd-icon>
    </wd-fab>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onShow } from 'vue'
import { useMemberStore } from '@/store'
import { navigateTo } from '@/utils/router'

const store = useMemberStore()
const searchKeyword = ref('')

const displayMembers = computed(() => {
  if (!searchKeyword.value) {
    return store.members
  }
  return store.search(searchKeyword.value)
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function goToDetail(id: string) {
  navigateTo('/pages/member/detail', { id })
}

function goToRecharge(memberId: string) {
  navigateTo('/pages/recharge/index', { memberId })
}

function goToConsumption(memberId: string) {
  navigateTo('/pages/consumption/index', { memberId })
}

onShow(() => {
  store.load()
})
</script>
