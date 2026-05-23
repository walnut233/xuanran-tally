<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb">
    <!-- Custom Header -->
    <div style="background-color: #14b8a6; position: sticky; top: 0; z-index: 40">
      <div style="height: 32px"></div>
      <div style="padding: 0 20px; padding-top: 12px; padding-bottom: 12px; display: flex; align-items: center">
        <button style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; flex-shrink: 0" @click="goBack">
          <span style="font-size: 24px; font-weight: bold; color: white; line-height: 1">‹</span>
        </button>
        <div style="flex: 1; text-align: center; font-size: 18px; font-weight: 600; color: white">服务类型</div>
        <div style="width: 40px; flex-shrink: 0"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px">
      <!-- 添加服务类型 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 16px">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px">添加服务类型</div>
        <div style="display: flex; gap: 12px; margin-bottom: 12px">
          <input
            v-model="form.name"
            style="flex: 1; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box"
            placeholder="服务名称"
          />
          <input
            v-model="form.haircutCost"
            type="number"
            style="width: 100px; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box"
            placeholder="消耗次数"
          />
        </div>
        <button
          style="width: 100%; height: 48px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer"
          :disabled="!form.name || !form.haircutCost"
          @click="handleAdd"
        >
          {{ editingId ? '保存修改' : '添加' }}
        </button>
      </div>

      <!-- 服务类型列表 -->
      <div v-if="serviceTypes.length > 0">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px">服务类型列表</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
          <div
            v-for="item in serviceTypes"
            :key="item.id"
            style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6"
          >
            <div style="flex: 1">
              <div style="font-size: 14px; font-weight: 500; color: #1f2937; margin-bottom: 4px">{{ item.name }}</div>
              <div style="font-size: 12px; color: #6b7280">消耗 {{ item.haircutCost }} 次</div>
            </div>
            <div style="display: flex; gap: 8px">
              <button
                style="padding: 6px 12px; background: #f0fdf4; color: #0d9488; border: 1px solid #bbf7d0; font-size: 14px; cursor: pointer"
                @click="startEdit(item)"
              >
                编辑
              </button>
              <button
                style="padding: 6px 12px; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; font-size: 14px; cursor: pointer"
                @click="handleDelete(item.id)"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af">
        暂无服务类型
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { serviceTypeService } from '@/services/serviceTypeService'
import type { ServiceType } from '@/types'

const serviceTypes = ref<ServiceType[]>([])
const editingId = ref<string | null>(null)

const form = ref({
  name: '',
  haircutCost: ''
})

function goBack() {
  uni.navigateBack()
}

function startEdit(item: ServiceType) {
  editingId.value = item.id
  form.value.name = item.name
  form.value.haircutCost = String(item.haircutCost)
}

function handleAdd() {
  if (!form.value.name || !form.value.haircutCost) return

  if (editingId.value) {
    // 编辑模式
    serviceTypeService.update(editingId.value, {
      name: form.value.name,
      haircutCost: Number(form.value.haircutCost),
      defaultHaircuts: Number(form.value.haircutCost)
    })
    uni.showToast({
      title: '修改成功',
      icon: 'success'
    })
  } else {
    // 添加模式
    serviceTypeService.add({
      name: form.value.name,
      haircutCost: Number(form.value.haircutCost),
      defaultHaircuts: Number(form.value.haircutCost)
    })
    uni.showToast({
      title: '添加成功',
      icon: 'success'
    })
  }

  // 重置表单
  form.value.name = ''
  form.value.haircutCost = ''
  editingId.value = null
  refreshList()
}

function handleDelete(id: string) {
  uni.showModal({
    title: '确认删除',
    content: '删除后将无法恢复，确定要删除吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        serviceTypeService.delete(id)
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        refreshList()
      }
    }
  })
}

function refreshList() {
  serviceTypes.value = serviceTypeService.getAll()
}

onShow(() => {
  refreshList()
})
</script>

<style>
</style>
