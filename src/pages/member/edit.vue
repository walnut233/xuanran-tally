<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '新增会员'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <div class="p-30rpx">
      <wd-form ref="formRef" :model="form" :rules="rules" label-width="120rpx">
        <wd-cell-group inset>
          <wd-form-item label="姓名" prop="name" required>
            <wd-input v-model="form.name" placeholder="请输入会员姓名" />
          </wd-form-item>

          <wd-form-item label="手机号" prop="phone" required>
            <wd-input v-model="form.phone" type="number" placeholder="请输入手机号" maxlength="11" />
          </wd-form-item>

          <wd-form-item label="性别" prop="gender">
            <wd-radio-group v-model="form.gender">
              <wd-radio value="男">男</wd-radio>
              <wd-radio value="女">女</wd-radio>
            </wd-radio-group>
          </wd-form-item>

          <wd-form-item label="生日" prop="birthday">
            <wd-datetime-picker
              v-model="form.birthday"
              type="date"
              title="选择生日"
              :min="minDate"
              :max="maxDate"
            >
              <wd-cell :title="form.birthday || '请选择生日'" is-link value=""></wd-cell>
            </wd-datetime-picker>
          </wd-form-item>

          <wd-form-item label="初始次数" prop="remainingHaircuts">
            <wd-input v-model="form.remainingHaircuts" type="number" placeholder="请输入初始剪发次数" />
          </wd-form-item>

          <wd-form-item label="备注" prop="remark">
            <wd-textarea v-model="form.remark" placeholder="请输入备注信息" />
          </wd-form-item>
        </wd-cell-group>
      </wd-form>

      <div class="mt-50rpx">
        <wd-button type="primary" block size="large" @click="handleSubmit">
          保存
        </wd-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRulesData } from 'wot-design-uni'
import { useMemberStore } from '@/store'
import { showToast, navigateBack } from '@/utils/router'

const store = useMemberStore()
const formRef = ref()

const now = new Date()
const minDate = new Date(now.getFullYear() - 100, 0, 1).getTime()
const maxDate = now.getTime()

const form = reactive({
  name: '',
  phone: '',
  gender: undefined as '男' | '女' | undefined,
  birthday: '',
  remainingHaircuts: 0,
  remark: ''
})

const rules: FormRulesData = {
  name: [
    { required: true, message: '请输入会员姓名' }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' }
  ],
  remainingHaircuts: [
    { required: true, message: '请输入初始次数' },
    { validator: (value: number) => value >= 0, message: '次数不能为负数' }
  ]
}

function handleSubmit() {
  formRef.value.validate().then(() => {
    store.add({
      name: form.name,
      phone: form.phone,
      gender: form.gender,
      birthday: form.birthday,
      remainingHaircuts: Number(form.remainingHaircuts) || 0,
      remark: form.remark
    })
    showToast('保存成功')
    setTimeout(() => {
      navigateBack()
    }, 500)
  }).catch(() => {
    // 验证失败
  })
}
</script>
