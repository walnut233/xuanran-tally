<route lang="json5">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '消费'
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

    <!-- 消费表单 -->
    <div class="p-30rpx" v-else>
      <!-- 会员信息 -->
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm mb-30rpx">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-34rpx font-bold text-gray-800">{{ selectedMember.name }}</div>
            <div class="text-26rpx text-gray-500 mt-10rpx">{{ selectedMember.phone }}</div>
          </div>
          <div class="text-right">
            <div class="text-44rpx font-bold text-orange-500">{{ selectedMember.remainingHaircuts }}</div>
            <div class="text-24rpx text-gray-400">剩余次数</div>
          </div>
        </div>
      </div>

      <!-- 表单 -->
      <wd-form ref="formRef" :model="form" :rules="rules" label-width="140rpx">
        <wd-cell-group inset>
          <wd-form-item label="服务类型" prop="serviceType" required>
            <wd-picker v-model="form.serviceType" :columns="serviceTypeColumns" title="选择服务类型">
              <wd-cell :title="form.serviceType || '请选择服务类型'" is-link value=""></wd-cell>
            </wd-picker>
          </wd-form-item>

          <wd-form-item label="消费次数" prop="usedHaircuts" required>
            <wd-input v-model="form.usedHaircuts" type="number" placeholder="请输入消费次数" />
          </wd-form-item>

          <wd-form-item label="美发师" prop="hairstylist">
            <wd-picker v-model="form.hairstylist" :columns="hairstylistColumns" title="选择美发师">
              <wd-cell :title="form.hairstylist || '请选择美发师'" is-link value=""></wd-cell>
            </wd-picker>
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
          确认消费
        </wd-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onLoad, onShow } from 'vue'
import type { FormRulesData } from 'wot-design-uni'
import type { Member } from '@/types'
import { memberService } from '@/services/memberService'
import { serviceTypeService } from '@/services/serviceTypeService'
import { hairstylistService } from '@/services/hairstylistService'
import { consumptionService } from '@/services/consumptionService'
import { showToast, navigateBack } from '@/utils/router'

const formRef = ref()
const searchKeyword = ref('')
const selectedMember = ref<Member | null>(null)

const serviceTypes = ref(serviceTypeService.getAll())
const hairstylists = ref(hairstylistService.getAll())

const serviceTypeColumns = computed(() => [serviceTypes.value.map(st => st.name)])
const hairstylistColumns = computed(() => [hairstylists.value.map(h => h.name)])

const searchResults = computed(() => {
  if (!searchKeyword.value) return []
  return memberService.search(searchKeyword.value)
})

const form = reactive({
  serviceType: '',
  usedHaircuts: '',
  hairstylist: '',
  remark: ''
})

const rules: FormRulesData = {
  serviceType: [
    { required: true, message: '请选择服务类型' }
  ],
  usedHaircuts: [
    { required: true, message: '请输入消费次数' },
    {
      validator: (val: string) => {
        if (!selectedMember.value) return false
        return Number(val) > 0 && Number(val) <= selectedMember.value.remainingHaircuts
      },
      message: '次数必须大于0且不超过剩余次数'
    }
  ]
}

function selectMember(member: Member) {
  selectedMember.value = member
}

function reset() {
  selectedMember.value = null
  searchKeyword.value = ''
  Object.assign(form, {
    serviceType: '',
    usedHaircuts: '',
    hairstylist: '',
    remark: ''
  })
}

function handleSubmit() {
  if (!selectedMember.value) return

  formRef.value.validate().then(() => {
    const result = consumptionService.add({
      memberId: selectedMember.value.id,
      serviceType: form.serviceType,
      usedHaircuts: Number(form.usedHaircuts),
      hairstylist: form.hairstylist,
      remark: form.remark
    })

    if (result === null) {
      showToast('余额不足')
      return
    }

    showToast('消费成功')
    setTimeout(() => {
      navigateBack()
    }, 500)
  })
}

onShow(() => {
  serviceTypes.value = serviceTypeService.getAll()
  hairstylists.value = hairstylistService.getAll()
})

onLoad((options: any) => {
  if (options.memberId) {
    const member = memberService.getById(options.memberId)
    if (member) {
      selectedMember.value = member
    }
  }
})
</script>
