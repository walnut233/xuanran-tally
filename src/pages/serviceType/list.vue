<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '服务类型'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <div class="p-30rpx">
      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden">
        <wd-cell-group>
          <wd-cell
            v-for="item in serviceTypes"
            :key="item.id"
            :title="item.name"
            :value="`消耗 ${item.haircutCost} 次`"
          />
        </wd-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onShow } from 'vue'
import { serviceTypeService } from '@/services/serviceTypeService'
import type { ServiceType } from '@/types'

const serviceTypes = ref<ServiceType[]>([])

onShow(() => {
  serviceTypes.value = serviceTypeService.getAll()
})
</script>
