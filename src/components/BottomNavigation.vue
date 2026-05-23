<template>
  <div style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 50; background-color: white; border-top: 1px solid #f3f4f6; padding-bottom: max(8px, env(safe-area-inset-bottom));">
    <div style="max-width: 768px; margin: 0 auto; display: flex; align-items: center; padding-top: 8px; padding-bottom: 8px;">
      <button
        v-for="item in navItems"
        :key="item.id"
        style="flex: 1; display: flex; flex-direction: column; align-items: center; padding-top: 8px; padding-bottom: 8px; padding-left: 12px; padding-right: 12px; background: none; border: none; cursor: pointer;"
        :style="activeTab === item.id ? 'background-color: #ccfbf1;' : ''"
        @click="handleNavigate(item.route, item.id)"
      >
        <span style="width: 24px; height: 20px; display: flex; align-items: center; justify-content: center; margin-bottom: 4px; font-size: 20px;" :style="activeTab === item.id ? 'color: #0d9488;' : 'color: #9ca3af;'">
          <span v-if="item.id === 'home'">🏠</span>
          <span v-else-if="item.id === 'members'">👥</span>
          <span v-else-if="item.id === 'recharge'">💰</span>
          <span v-else-if="item.id === 'consume'">🎫</span>
        </span>
        <span style="font-size: 12px; font-weight: 500;" :style="activeTab === item.id ? 'color: #0d9488;' : 'color: #9ca3af;'">
          {{ item.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps<{
  activeTab: "home" | "members" | "recharge" | "consume";
}>();

const navItems = [
  { id: "home", name: "首页", route: "/pages/index/index" },
  { id: "members", name: "会员", route: "/pages/member/list" },
  { id: "recharge", name: "充值", route: "/pages/recharge/index" },
  { id: "consume", name: "消费", route: "/pages/consumption/index" },
];

const { activeTab } = toRefs(props);

const handleNavigate = (route: string, id: string) => {
  // 如果已经是当前页面，不跳转
  if (activeTab.value === id) return;

  // 使用 switchTab 来切换 tabBar 页面，导航栏不会刷新
  uni.switchTab({
    url: route
  });
};
</script>

<style>
</style>
