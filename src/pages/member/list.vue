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
    <div style="background-color: white; border-bottom: 1px solid #f3f4f6; position: sticky; top: 0; z-index: 40;">
      <!-- Status Bar Spacer -->
      <div style="height: 32px;"></div>
      <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 16px;">
        <h1 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0;">会员管理</h1>
      </div>

      <!-- Search Bar -->
      <div style="padding: 0 20px; padding-bottom: 16px;">
        <div style="display: flex; align-items: center; gap: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 12px 16px;">
          <span style="font-size: 18px; color: #9ca3af;">🔍</span>
          <input
            v-model="searchKeyword"
            style="flex: 1; background-color: transparent; font-size: 14px; outline: none; border: none;"
            placeholder="搜索姓名或手机号尾号"
          />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 120px;">
      <!-- Section Header -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <span style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em;">全部会员</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <select
            v-model="sortBy"
            style="font-size: 12px; color: #0d9488; background-color: white; border: 1px solid #e5e7eb; padding: 4px 8px; border-radius: 4px;"
          >
            <option value="balance">余额</option>
            <option value="created">开卡时间</option>
            <option value="name">姓名</option>
          </select>
          <span style="font-size: 12px; color: #6b7280;">共 {{ members.length }} 人</span>
        </div>
      </div>

      <!-- Member List -->
      <div v-if="displayMembers.length > 0" style="display: flex; flex-direction: column; gap: 10px;">
        <div
          v-for="member in displayMembers"
          :key="member.id"
          style="background-color: white; padding: 16px; display: flex; align-items: center; gap: 14px; border: 1px solid #f3f4f6;"
          @click="goToDetail(member.id)"
        >
          <div style="width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 600; color: white; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); flex-shrink: 0;">
            {{ member.name.charAt(0) }}
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 4px;">{{ member.name }}</div>
            <div style="font-size: 14px; color: #6b7280;">{{ member.phone }}</div>
            <div
              style="display: inline-flex; align-items: center; gap: 6px; font-size: 14px; font-weight: 600; margin-top: 4px;"
              :style="member.balance <= 0 ? 'color: #ef4444;' : 'color: #0d9488;'"
            >
              余额 ¥{{ member.balance }}
            </div>
          </div>
          <div style="width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; color: #9ca3af;">
            <span style="font-size: 20px; font-weight: bold;">›</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 80px 0;">
        <div style="width: 80px; height: 80px; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 16px;">
          👥
        </div>
        <div style="color: #6b7280; font-size: 16px;">暂无会员</div>
      </div>
    </div>

    <!-- FAB -->
    <div style="position: fixed; right: 20px; bottom: 100px; z-index: 50;">
      <button
        style="width: 56px; height: 56px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 15px -3px rgba(20, 184, 166, 0.2); border: none; cursor: pointer; border-radius: 50%;"
        @click="goToAddMember"
      >
        <span style="font-size: 24px; font-weight: bold; line-height: 1; color: white;">+</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { memberService } from "@/services/memberService";
import type { Member } from "@/types";

const searchKeyword = ref("");
const sortBy = ref("remaining");
const members = ref<Member[]>([]);

const displayMembers = computed(() => {
  let result = [...members.value];

  // 搜索过滤
  if (searchKeyword.value) {
    const kw = searchKeyword.value.toLowerCase();
    result = result.filter((m) =>
      m.name.toLowerCase().includes(kw) || m.phone.includes(kw)
    );
  }

  // 排序
  switch (sortBy.value) {
    case "balance":
      result.sort((a, b) => b.balance - a.balance);
      break;
    case "created":
      result.sort((a, b) => new Date(b.createDate).getTime() - new Date(a.createDate).getTime());
      break;
    case "name":
      result.sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
      break;
  }

  return result;
});

const goToDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/member/detail?id=${id}`
  });
};

const goToAddMember = () => {
  uni.navigateTo({
    url: "/pages/member/edit"
  });
};

onShow(() => {
  members.value = memberService.getAll();
});
</script>

<style>
</style>
