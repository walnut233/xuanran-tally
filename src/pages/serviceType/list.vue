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
    <!-- Custom Header with Back Button -->
    <div style="background-color: #14b8a6; position: sticky; top: 0; z-index: 40;">
      <div style="height: 32px;"></div>
      <div style="padding: 0 20px; padding-top: 12px; padding-bottom: 12px; display: flex; align-items: center;">
        <button style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; flex-shrink: 0;" @click="goBack">
          <span style="font-size: 24px; font-weight: bold; color: white; line-height: 1;">‹</span>
        </button>
        <div style="flex: 1; text-align: center; font-size: 18px; font-weight: 600; color: white;">服务类型</div>
        <div style="width: 40px; flex-shrink: 0;"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px;">
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
        <div
          v-for="item in serviceTypes"
          :key="item.id"
          style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;"
        >
          <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
          <span style="font-size: 14px; color: #4b5563;">消耗 {{ item.haircutCost }} 次</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { serviceTypeService } from '@/services/serviceTypeService'
import type { ServiceType } from '@/types'

const serviceTypes = ref<ServiceType[]>([])

function goBack() {
  uni.navigateBack()
}

onShow(() => {
  serviceTypes.value = serviceTypeService.getAll()
})
</script>

<style>
</style>
