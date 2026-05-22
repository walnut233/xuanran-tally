<template>
  <div class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
    <div class="max-w-md mx-auto flex items-center py-2 pb-safe">
      <button
        v-for="item in navItems"
        :key="item.id"
        class="flex-1 flex flex-col items-center py-2 px-3 rounded-xl transition-all"
        :class="activeTab === item.id ? 'bg-teal-50' : ''"
        @click="handleNavigate(item.route)"
      >
        <span class="w-6 h-6 flex items-center justify-center mb-1" :class="activeTab === item.id ? 'text-teal-600' : 'text-gray-400'">
          <svg v-if="item.id === 'home'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <svg v-else-if="item.id === 'members'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <svg v-else-if="item.id === 'recharge'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
            <line x1="1" y1="10" x2="23" y2="10"></line>
          </svg>
          <svg v-else-if="item.id === 'consume'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.5 2c.5 0 1 .2 1.4.6L20.4 7c.8.8.8 2 0 2.8L14 16.3l-1-1-6-6c-.8-.8-.8-2 0-2.8l2.1-2.1c.4-.4.9-.6 1.4-.6h5.5zM16 7c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"></path>
            <line x1="4.5" y1="16" x2="2.5" y2="21.5"></line>
            <line x1="10" y1="17.5" x2="7" y2="21.5"></line>
          </svg>
        </span>
        <span class="text-xs font-medium" :class="activeTab === item.id ? 'text-teal-600' : 'text-gray-400'">
          {{ item.name }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { navigateTo } from "@/utils/router";

const props = defineProps<{
  activeTab: "home" | "members" | "recharge" | "consume";
}>();

const navItems = [
  { id: "home", name: "首页", route: "/pages/index/index" },
  { id: "members", name: "会员", route: "/pages/member/list" },
  { id: "recharge", name: "充值", route: "/pages/recharge/index" },
  { id: "consume", name: "消费", route: "/pages/consume/index" },
];

const handleNavigate = (route: string) => {
  navigateTo(route);
};
</script>
