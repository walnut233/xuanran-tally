<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '充值'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <!-- 选择会员 -->
    <div class="p-30rpx" v-if="!selectedMember">
      <div class="text-32rpx font-bold text-gray-800 mb-20rpx">选择会员</div>
      <wd-search v-model="searchKeyword" placeholder="搜索会员姓名或手机号" />
      <div class="mt-20rpx bg-white rounded-20rpx shadow-sm overflow-hidden" v-if="searchResults.length > 0">
        <wd-cell-group>
          <wd-cell
            v-for="member in searchResults"
            :key="member.id"
            :title="member.name"
            :value="`剩余 ${member.remainingHaircuts} 次`"
            :label="member.phone"
            is-link
            @click="selectMember(member)"
          />
        </wd-cell-group>
      </div>
      <div v-else-if="searchKeyword" class="text-center py-100rpx text-gray-400">
        未找到会员
      </div>
    </div>

    <!-- 充值表单 -->
    <div class="p-30rpx" v-else>
      <!-- 会员信息 -->
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm mb-30rpx">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-34rpx font-bold text-gray-800">{{ selectedMember.name }}</div>
            <div class="text-26rpx text-gray-500 mt-10rpx">{{ selectedMember.phone }}</div>
          </div>
          <div class="text-right">
            <div class="text-44rpx font-bold text-blue-500">{{ selectedMember.remainingHaircuts }}</div>
            <div class="text-24rpx text-gray-400">剩余次数</div>
          </div>
        </div>
      </div>

      <!-- 表单 -->
      <wd-form ref="formRef" :model="form" :rules="rules" label-width="140rpx">
        <wd-cell-group inset>
          <wd-form-item label="充值次数" prop="haircutCount" required>
            <wd-input v-model="form.haircutCount" type="number" placeholder="请输入充值次数" />
          </wd-form-item>

          <wd-form-item label="充值金额" prop="amount" required>
            <wd-input v-model="form.amount" type="number" placeholder="请输入充值金额" />
          </wd-form-item>

          <wd-form-item label="支付方式" prop="paymentMethod" required>
            <wd-radio-group v-model="form.paymentMethod">
              <wd-radio value="现金">现金</wd-radio>
              <wd-radio value="微信">微信</wd-radio>
              <wd-radio value="支付宝">支付宝</wd-radio>
            </wd-radio-group>
          </wd-form-item>

          <wd-form-item label="备注" prop="remark">
            <wd-textarea v-model="form.remark" placeholder="请输入备注信息" />
          </wd-form-item>
        </wd-cell-group>
      </wd-form>

      <div class="mt-50rpx flex space-x-20rpx">
        <wd-button block size="large" @click="reset">
          重新选择
        </wd-button>
        <wd-button type="primary" block size="large" @click="handleSubmit">
          确认充值
        </wd-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onLoad } from 'vue'
import type { FormRulesData } from 'wot-design-uni'
import type { Member } from '@/types'
import { memberService } from '@/services/memberService'
import { rechargeService } from '@/services/rechargeService'
import { showToast, navigateBack } from '@/utils/router'

const formRef = ref()
const searchKeyword = ref('')
const selectedMember = ref<Member | null>(null)

const searchResults = computed(() => {
  if (!searchKeyword.value) return []
  return memberService.search(searchKeyword.value)
})

const form = reactive({
  haircutCount: '',
  amount: '',
  paymentMethod: '现金',
  remark: ''
})

const rules: FormRulesData = {
  haircutCount: [
    { required: true, message: '请输入充值次数' },
    { validator: (val: string) => Number(val) > 0, message: '次数必须大于0' }
  ],
  amount: [
    { required: true, message: '请输入充值金额' },
    { validator: (val: string) => Number(val) >= 0, message: '金额不能为负数' }
  ],
  paymentMethod: [
    { required: true, message: '请选择支付方式' }
  ]
}

function selectMember(member: Member) {
  selectedMember.value = member
}

function reset() {
  selectedMember.value = null
  searchKeyword.value = ''
  Object.assign(form, {
    haircutCount: '',
    amount: '',
    paymentMethod: '现金',
    remark: ''
  })
}

function handleSubmit() {
  if (!selectedMember.value) return

  formRef.value.validate().then(() => {
    rechargeService.add({
      memberId: selectedMember.value.id,
      haircutCount: Number(form.haircutCount),
      amount: Number(form.amount),
      paymentMethod: form.paymentMethod,
      remark: form.remark
    })
    showToast('充值成功')
    setTimeout(() => {
      navigateBack()
    }, 500)
  })
}

onLoad((options: any) => {
  if (options.memberId) {
    const member = memberService.getById(options.memberId)
    if (member) {
      selectedMember.value = member
    }
  }
})
</script>
