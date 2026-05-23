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
        <div style="flex: 1; text-align: center; font-size: 18px; font-weight: 600; color: white;">美发师管理</div>
        <div style="width: 40px; flex-shrink: 0;"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px;">
      <!-- 添加美发师 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 16px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">添加美发师</div>
        <div style="display: flex; gap: 12px;">
          <input
            v-model="form.name"
            style="flex: 1; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box;"
            placeholder="请输入美发师姓名"
          />
          <button
            style="height: 48px; padding: 0 20px; background-color: #14b8a6; color: white; font-size: 14px; font-weight: 600; border: none; cursor: pointer;"
            :disabled="!form.name"
            @click="addHairstylist"
          >
            添加
          </button>
        </div>
      </div>

      <!-- 美发师列表 -->
      <div v-if="hairstylists.length > 0">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">美发师列表</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">
          <div
            v-for="item in hairstylists"
            :key="item.id"
            style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;"
          >
            <span style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ item.name }}</span>
            <button
              style="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; color: #ef4444; background: none; border: none; cursor: pointer;"
              @click="deleteHairstylist(item.id)"
            >
              <span style="font-size: 20px; font-weight: bold; line-height: 1;">×</span>
            </button>
          </div>
        </div>
      </div>

      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
        暂无美发师
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { hairstylistService } from '@/services/hairstylistService'
import type { Hairstylist } from '@/types'

const hairstylists = ref<Hairstylist[]>([])

const form = reactive({
  name: ''
})

function goBack() {
  uni.navigateBack()
}

function addHairstylist() {
  if (!form.name) return

  hairstylistService.add({ name: form.name })
  form.name = ''
  hairstylists.value = hairstylistService.getAll()
  uni.showToast({
    title: '添加成功',
    icon: 'success'
  })
}

function deleteHairstylist(id: string) {
  hairstylistService.delete(id)
  hairstylists.value = hairstylistService.getAll()
}

onShow(() => {
  hairstylists.value = hairstylistService.getAll()
})
</script>

<style>
</style>
