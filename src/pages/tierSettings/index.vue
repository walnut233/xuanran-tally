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
        <div style="flex: 1; text-align: center; font-size: 18px; font-weight: 600; color: white">梯度设置</div>
        <div style="width: 40px; flex-shrink: 0"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px">
      <!-- 添加梯度 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 16px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); margin-bottom: 16px">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px">
          {{ editingId ? '编辑梯度' : '添加梯度' }}
        </div>
        <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px">
          <input
            v-model="form.name"
            style="width: 100%; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box"
            placeholder="梯度名称，如200元档"
          />
          <input
            v-model.number="form.initialRecharge"
            type="number"
            style="width: 100%; height: 48px; background-color: #f9fafb; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 14px; outline: none; box-sizing: border-box"
            placeholder="初始充值金额"
          />
        </div>

        <!-- 服务价格设置 -->
        <div style="margin-bottom: 12px" v-if="serviceTypes.length > 0">
          <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px">服务价格</div>
          <div style="display: flex; flex-direction: column; gap: 8px">
            <div
              v-for="service in serviceTypes"
              :key="service.name"
              style="display: flex; align-items: center; gap: 12px; background-color: #f9fafb; padding: 12px; border-radius: 8px"
            >
              <span style="flex: 1; font-size: 14px; color: #1f2937">{{ service.name }}</span>
              <input
                v-model.number="form.prices[service.name]"
                type="number"
                style="width: 100px; height: 40px; background-color: white; border: 1px solid #e5e7eb; padding: 0 12px; font-size: 14px; outline: none; box-sizing: border-box; border-radius: 4px"
                placeholder="价格"
              />
            </div>
          </div>
        </div>

        <button
          style="width: 100%; height: 48px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; font-size: 16px; font-weight: 600; border: none; cursor: pointer"
          :disabled="!form.name || !form.initialRecharge"
          @click="handleAdd"
        >
          {{ editingId ? '保存修改' : '添加' }}
        </button>
        <button
          v-if="editingId"
          style="width: 100%; height: 48px; background-color: #f3f4f6; color: #6b7280; font-size: 14px; font-weight: 600; border: none; cursor: pointer; margin-top: 8px"
          @click="cancelEdit"
        >
          取消
        </button>
      </div>

      <!-- 梯度列表 -->
      <div v-if="tiers.length > 0">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px">梯度列表</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)">
          <div
            v-for="item in tiers"
            :key="item.id"
            style="padding: 16px 20px; border-bottom: 1px solid #f3f4f6"
          >
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px">
              <div style="font-size: 16px; font-weight: 600; color: #1f2937">{{ item.name }}</div>
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
            <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px">初始充值：¥{{ item.initialRecharge }}</div>
            <div style="display: flex; flex-wrap: wrap; gap: 8px">
              <span
                v-for="price in item.prices"
                :key="price.serviceName"
                style="padding: 4px 12px; background-color: #f0fdf4; color: #0d9488; font-size: 12px; border-radius: 4px"
              >
                {{ price.serviceName }}：¥{{ price.price }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af">
        暂无梯度设置
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { settingsService, type SystemSettings } from '@/services/settingsService'
import { serviceTypeService } from '@/services/serviceTypeService'
import type { MemberTier, ServiceType, TierPrice } from '@/types'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

const tiers = ref<MemberTier[]>([])
const serviceTypes = ref<ServiceType[]>([])
const editingId = ref<string | null>(null)
const systemSettings = ref<SystemSettings>(settingsService.getSystemSettings())

// 表单数据 - 使用 reactive 以便动态添加价格
const form = reactive({
  name: '',
  initialRecharge: 0,
  prices: {} as Record<string, number>
})

function goBack() {
  uni.navigateBack()
}

// 初始化价格表单
function initPriceForm() {
  form.prices = {}
  serviceTypes.value.forEach(service => {
    form.prices[service.name] = 0
  })
}

function startEdit(item: MemberTier) {
  editingId.value = item.id
  form.name = item.name
  form.initialRecharge = item.initialRecharge

  // 初始化价格
  initPriceForm()
  // 填充已有价格
  item.prices.forEach(price => {
    if (form.prices[price.serviceName] !== undefined) {
      form.prices[price.serviceName] = price.price
    }
  })
}

function cancelEdit() {
  editingId.value = null
  form.name = ''
  form.initialRecharge = 0
  initPriceForm()
}

function handleAdd() {
  if (!form.name || !form.initialRecharge) return

  // 构建价格列表
  const prices: TierPrice[] = serviceTypes.value
    .filter(service => form.prices[service.name] > 0)
    .map(service => ({
      serviceName: service.name,
      price: form.prices[service.name]
    }))

  if (editingId.value) {
    // 编辑模式
    const index = systemSettings.value.memberTiers.findIndex(t => t.id === editingId.value)
    if (index !== -1) {
      systemSettings.value.memberTiers[index] = {
        id: editingId.value,
        name: form.name,
        initialRecharge: form.initialRecharge,
        prices
      }
      saveTiers()
      uni.showToast({
        title: '修改成功',
        icon: 'success'
      })
    }
  } else {
    // 添加模式
    const newTier: MemberTier = {
      id: generateId(),
      name: form.name,
      initialRecharge: form.initialRecharge,
      prices
    }
    systemSettings.value.memberTiers.push(newTier)
    saveTiers()
    uni.showToast({
      title: '添加成功',
      icon: 'success'
    })
  }

  // 重置表单
  cancelEdit()
  refreshList()
}

function handleDelete(id: string) {
  uni.showModal({
    title: '确认删除',
    content: '删除后将无法恢复，确定要删除吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        const index = systemSettings.value.memberTiers.findIndex(t => t.id === id)
        if (index !== -1) {
          systemSettings.value.memberTiers.splice(index, 1)
          saveTiers()
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
          refreshList()
        }
      }
    }
  })
}

function saveTiers() {
  settingsService.saveSystemSettings({
    memberTiers: [...systemSettings.value.memberTiers]
  })
}

function refreshList() {
  systemSettings.value = settingsService.getSystemSettings()
  tiers.value = systemSettings.value.memberTiers || []
  serviceTypes.value = serviceTypeService.getAll()
  if (!editingId.value) {
    initPriceForm()
  }
}

onShow(() => {
  refreshList()
})
</script>

<style>
</style>
