<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '美发师'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <div class="p-30rpx">
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm mb-30rpx">
        <wd-form ref="formRef" :model="form" :rules="rules">
          <wd-input v-model="form.name" placeholder="请输入美发师姓名" />
          <div class="mt-20rpx">
            <wd-button type="primary" block @click="addHairstylist">添加</wd-button>
          </div>
        </wd-form>
      </div>

      <div class="bg-white rounded-20rpx shadow-sm overflow-hidden" v-if="hairstylists.length > 0">
        <wd-cell-group>
          <wd-cell
            v-for="item in hairstylists"
            :key="item.id"
            :title="item.name"
          >
            <template #right-icon>
              <wd-icon name="close" size="18px" color="#F56C6C" @click.stop="deleteHairstylist(item.id)" />
            </template>
          </wd-cell>
        </wd-cell-group>
      </div>

      <div v-else class="text-center py-100rpx text-gray-400">
        暂无美发师
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onShow } from 'vue'
import type { FormRulesData } from 'wot-design-uni'
import { hairstylistService } from '@/services/hairstylistService'
import type { Hairstylist } from '@/types'
import { showToast } from '@/utils/router'

const formRef = ref()
const hairstylists = ref<Hairstylist[]>([])

const form = reactive({
  name: ''
})

const rules: FormRulesData = {
  name: [
    { required: true, message: '请输入美发师姓名' }
  ]
}

function addHairstylist() {
  formRef.value.validate().then(() => {
    hairstylistService.add({ name: form.name })
    form.name = ''
    hairstylists.value = hairstylistService.getAll()
    showToast('添加成功')
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
