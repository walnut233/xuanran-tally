<route lang="json5">
{
  layout: "default",
  style: {
    navigationStyle: "custom"
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb;">
    <!-- Custom Header -->
    <div style="position: sticky; top: 0; z-index: 40;">
      <div style="height: 32px; background-color: transparent;"></div>
      <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 16px; display: flex; align-items: center; background-color: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px);">
        <button style="width: 40px; height: 40px; background-color: #f9fafb; display: flex; align-items: center; justify-content: center; border: none; cursor: pointer; flex-shrink: 0;" @click="goBack">
          <span style="font-size: 24px; font-weight: bold; color: #374151; line-height: 1;">‹</span>
        </button>
        <h1 style="flex: 1; text-align: center; font-size: 16px; font-weight: 600; color: #1f2937; margin: 0;">会员详情</h1>
        <button style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; color: #0d9488; background: transparent; border: none; cursor: pointer; flex-shrink: 0;" @click="goToEdit">
          <span style="font-size: 20px;">✏️</span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 8px; padding-bottom: 96px;" v-if="member">
      <!-- Member Header Card -->
      <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 24px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
          <div style="width: 72px; height: 72px; background-color: rgba(255, 255, 255, 0.2); display: flex; align-items: center; justify-content: center; font-size: 24px; font-weight: 600; color: white;">
            {{ member.name.charAt(0) }}
          </div>
          <div style="flex: 1;">
            <div style="font-size: 20px; font-weight: 700; color: white; margin-bottom: 4px;">{{ member.name }}</div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin-bottom: 4px;">{{ member.phone }}</div>
            <div style="color: rgba(255, 255, 255, 0.7); font-size: 12px;">{{ member.createDate ? new Date(member.createDate).toLocaleDateString() + ' 开卡' : '' }}</div>
          </div>
        </div>
        <div style="background-color: rgba(255, 255, 255, 0.15); padding: 16px; display: flex; align-items: center; justify-content: space-between;">
          <div>
            <div style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin-bottom: 4px;">剩余剪发次数</div>
            <div style="font-size: 30px; font-weight: 700; color: white;">{{ member.remainingHaircuts }} <span style="font-size: 16px; font-weight: 500;">次</span></div>
          </div>
          <div style="display: flex; gap: 10px;">
            <button
              style="height: 48px; padding: 0 20px; background-color: white; color: #0d9488; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; border: none; cursor: pointer;"
              @click="goToRecharge"
            >
              <span style="font-size: 18px;">💰</span>
              充值
            </button>
            <button
              style="height: 48px; padding: 0 20px; background-color: rgba(255, 255, 255, 0.2); border: 1px solid rgba(255, 255, 255, 0.3); color: white; font-size: 14px; font-weight: 600; display: flex; align-items: center; gap: 6px; cursor: pointer;"
              @click="goToConsume"
            >
              <span style="font-size: 18px;">🎫</span>
              消费
            </button>
          </div>
        </div>
      </div>

      <!-- Member Info -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">基本信息</div>
        <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden;">
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 88px; font-size: 14px; color: #6b7280;">姓名</span>
            <span style="flex: 1; font-size: 14px; font-weight: 500; color: #1f2937;">{{ member.name }}</span>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 88px; font-size: 14px; color: #6b7280;">手机号</span>
            <span style="flex: 1; font-size: 14px; font-weight: 500; color: #1f2937;">{{ member.phone }}</span>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 88px; font-size: 14px; color: #6b7280;">性别</span>
            <span style="flex: 1; font-size: 14px; font-weight: 500; color: #1f2937;">{{ member.gender || '-' }}</span>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
            <span style="width: 88px; font-size: 14px; color: #6b7280;">生日</span>
            <span style="flex: 1; font-size: 14px; font-weight: 500; color: #1f2937;">{{ member.birthday || '-' }}</span>
          </div>
          <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
            <span style="width: 88px; font-size: 14px; color: #6b7280;">备注</span>
            <span style="flex: 1; font-size: 14px; font-weight: 500; color: #1f2937;">{{ member.remark || '-' }}</span>
          </div>
        </div>
      </div>

      <!-- History Records -->
      <div style="margin-bottom: 20px;">
        <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">历史记录</div>
        <div style="display: flex; gap: 6px; background-color: #f9fafb; padding: 6px; margin-bottom: 12px;">
          <button
            v-for="tab in historyTabs"
            :key="tab.id"
            style="flex: 1; padding: 10px 0; font-size: 14px; font-weight: 500; border: none; cursor: pointer;"
            :style="activeTab === tab.id ? 'background-color: white; color: #1f2937;' : 'background-color: transparent; color: #6b7280;'"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>

        <div v-if="filteredHistory.length > 0" style="display: flex; flex-direction: column; gap: 10px;">
          <div
            v-for="item in filteredHistory"
            :key="item.id"
            style="background-color: white; padding: 16px; display: flex; align-items: center; gap: 12px; border: 1px solid #f3f4f6;"
          >
            <div
              style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;"
              :style="item.type === 'recharge' ? 'background-color: #ccfbf1; color: #0d9488;' : 'background-color: #dbeafe; color: #2563eb;'"
            >
              <span v-if="item.type === 'recharge'" style="font-size: 18px;">💰</span>
              <span v-else style="font-size: 18px;">🎫</span>
            </div>
            <div style="flex: 1; min-width: 0;">
              <div style="font-size: 14px; font-weight: 500; color: #1f2937; margin-bottom: 2px;">{{ item.title }}</div>
              <div style="font-size: 12px; color: #6b7280;">{{ item.detail }}</div>
            </div>
            <div
              style="font-size: 14px; font-weight: 700;"
              :style="item.type === 'recharge' ? 'color: #0d9488;' : 'color: #ef4444;'"
            >
              {{ item.amount }}
            </div>
          </div>
        </div>

        <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
          暂无记录
        </div>
      </div>

      <!-- Delete Button -->
      <div style="margin-top: 8px;">
        <button style="width: 100%; height: 52px; background-color: white; border: 1px solid #ef4444; color: #ef4444; font-size: 16px; font-weight: 600; cursor: pointer;" @click="handleDelete">
          删除会员
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { memberService } from "@/services/memberService";
import { rechargeService } from "@/services/rechargeService";
import { consumptionService } from "@/services/consumptionService";
import type { Member, Recharge, Consumption } from "@/types";

const memberId = ref<string>();
const member = ref<Member>();
const activeTab = ref("all");

const historyTabs = [
  { id: "all", name: "全部" },
  { id: "recharge", name: "充值" },
  { id: "consume", name: "消费" },
];

// 合并充值和消费记录
const allHistory = computed(() => {
  if (!memberId.value) return []

  const recharges = rechargeService.getByMemberId(memberId.value).map(r => ({
    id: r.id,
    type: 'recharge' as const,
    title: '充值',
    detail: `${formatDate(r.rechargeTime)} · ${r.paymentMethod}`,
    amount: `+${r.haircutCount} 次`,
    time: r.rechargeTime
  }))

  const consumes = consumptionService.getByMemberId(memberId.value).map(c => ({
    id: c.id,
    type: 'consume' as const,
    title: c.serviceType,
    detail: `${formatDate(c.consumptionTime)} · ${c.hairstylist || '未指定'}`,
    amount: `-${c.usedHaircuts} 次`,
    time: c.consumptionTime
  }))

  // 合并并按时间倒序排序
  return [...recharges, ...consumes].sort((a, b) => {
    return new Date(b.time).getTime() - new Date(a.time).getTime()
  })
})

const filteredHistory = computed(() => {
  if (activeTab.value === "all") return allHistory.value;
  return allHistory.value.filter((h) => h.type === activeTab.value);
})

// 辅助函数
function formatDate(timeStr: string) {
  const time = new Date(timeStr)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const recordDate = new Date(time.getFullYear(), time.getMonth(), time.getDate())

  if (recordDate.getTime() === today.getTime()) {
    return `今天 ${time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  } else if (recordDate.getTime() === yesterday.getTime()) {
    return `昨天 ${time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}`
  } else {
    return time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
  }
}

const goBack = () => {
  uni.navigateBack();
};

const goToRecharge = () => {
  if (member.value) {
    uni.navigateTo({
      url: `/pages/recharge/index?memberId=${member.value.id}`
    });
  }
};

const goToConsume = () => {
  if (member.value) {
    uni.navigateTo({
      url: `/pages/consumption/index?memberId=${member.value.id}`
    });
  }
};

const goToEdit = () => {
  if (member.value) {
    uni.navigateTo({
      url: `/pages/member/edit?id=${member.value.id}`
    });
  }
};

const handleDelete = () => {
  uni.showModal({
    title: '确认删除',
    content: '删除后该会员的所有数据将无法恢复，确定要删除吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm && memberId.value) {
        const deleted = memberService.delete(memberId.value)
        if (deleted) {
          uni.showToast({
            title: '删除成功',
            icon: 'success'
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 500)
        }
      }
    }
  })
};

onLoad((options: any) => {
  memberId.value = options.id;
});

onShow(() => {
  if (memberId.value) {
    member.value = memberService.getById(memberId.value);
  }
});
</script>

<style>
</style>
