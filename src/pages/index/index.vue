<route lang="json5" type="home">
{
  layout: "default",
  style: {
    navigationStyle: "custom"
  }
}
</route>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Custom Status Bar & Header -->
    <div class="bg-gradient-to-br from-teal-500 to-teal-600">
      <!-- Status Bar Spacer -->
      <div class="h-8 bg-transparent"></div>
      <!-- Header -->
      <div class="px-5 py-4">
        <div class="flex items-center justify-between mb-1">
          <h1 class="text-xl font-semibold text-white">渲染造型</h1>
          <button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/20 border border-white/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82-.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
        </div>
        <p class="text-teal-100 text-sm">今天是个好日子，祝你生意兴隆！</p>
      </div>

      <!-- Tabs -->
      <div class="px-3 pb-4">
        <div class="flex gap-2 bg-white/10 p-1.5 rounded-xl">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :class="['flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all', activeTab === tab.id ? 'bg-white text-teal-600 shadow-sm' : 'text-white/80 hover:text-white']"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div class="px-5 pt-4 pb-24">
      <!-- Quick Tab -->
      <div v-show="activeTab === 'quick'">
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">12</div>
            <div class="text-xs text-gray-500 mt-1">今日充值总人数</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">28</div>
            <div class="text-xs text-gray-500 mt-1">今日消费总人数</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">¥2,580</div>
            <div class="text-xs text-gray-500 mt-1">今日充值总金额</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">156</div>
            <div class="text-xs text-gray-500 mt-1">当前会员总数</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-4 gap-3 mb-6">
          <button
            v-for="action in quickActions"
            :key="action.id"
            class="flex flex-col items-center py-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-teal-200 hover:bg-teal-50 transition-all"
            @click="handleAction(action)"
          >
            <div class="w-9 h-9 flex items-center justify-center mb-2 text-teal-600">
              <svg v-if="action.icon === 'users'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <svg v-else-if="action.icon === 'wallet'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              <svg v-else-if="action.icon === 'ticket'" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14.5 2c.5 0 1 .2 1.4.6L20.4 7c.8.8.8 2 0 2.8L14 16.3l-1-1-6-6c-.8-.8-.8-2 0-2.8l2.1-2.1c.4-.4.9-.6 1.4-.6h5.5zM16 7c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"></path>
                <line x1="4.5" y1="16" x2="2.5" y2="21.5"></line>
                <line x1="10" y1="17.5" x2="7" y2="21.5"></line>
              </svg>
              <svg v-else width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
            </div>
            <span class="text-xs font-medium text-gray-800">{{ action.name }}</span>
          </button>
        </div>

        <!-- Recent Activity -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">最近活动</h3>
            <button class="text-xs font-medium text-teal-600">查看全部</button>
          </div>
          <div class="space-y-2.5">
            <div
              v-for="item in recentActivity"
              :key="item.id"
              class="flex items-center gap-3.5 bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div class="w-10 h-10 flex items-center justify-center rounded-xl" :class="item.type === 'recharge' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'">
                <svg v-if="item.type === 'recharge'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.5 2c.5 0 1 .2 1.4.6L20.4 7c.8.8.8 2 0 2.8L14 16.3l-1-1-6-6c-.8-.8-.8-2 0-2.8l2.1-2.1c.4-.4.9-.6 1.4-.6h5.5zM16 7c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"></path>
                  <line x1="4.5" y1="16" x2="2.5" y2="21.5"></line>
                  <line x1="10" y1="17.5" x2="7" y2="21.5"></line>
                </svg>
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-800">{{ item.name }} - {{ item.action }}</div>
                <div class="text-xs text-gray-500 mt-0.5">{{ item.detail }}</div>
              </div>
              <div class="text-xs text-gray-400">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Today Tab -->
      <div v-show="activeTab === 'today'">
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">28</div>
            <div class="text-xs text-gray-500 mt-1">今日消费</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">12</div>
            <div class="text-xs text-gray-500 mt-1">今日充值</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">¥2,580</div>
            <div class="text-xs text-gray-500 mt-1">充值金额</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">5</div>
            <div class="text-xs text-gray-500 mt-1">服务人数</div>
          </div>
        </div>

        <!-- Chart Placeholder -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div class="text-sm font-semibold text-gray-800 mb-4">今日消费时段分布</div>
          <div class="flex items-end gap-2 h-32">
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 30%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">9点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 70%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">10点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 45%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">11点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 25%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">12点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 40%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">13点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 60%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">14点</div>
            </div>
            <div class="flex-1 bg-teal-200 rounded-t-lg relative" style="height: 85%">
              <div class="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-gray-400">15点</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Month Tab -->
      <div v-show="activeTab === 'month'">
        <div class="grid grid-cols-2 gap-3 mb-5">
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">620</div>
            <div class="text-xs text-gray-500 mt-1">本月消费</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">312</div>
            <div class="text-xs text-gray-500 mt-1">本月充值</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">¥68,500</div>
            <div class="text-xs text-gray-500 mt-1">充值金额</div>
          </div>
          <div class="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div class="text-2xl font-bold text-teal-600">189</div>
            <div class="text-xs text-gray-500 mt-1">活跃会员</div>
          </div>
        </div>

        <!-- Service Type Distribution -->
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5">
          <div class="text-sm font-semibold text-gray-800 mb-4">服务类型分布</div>
          <div class="flex gap-4">
            <div class="flex-1 text-center">
              <div class="text-3xl font-bold text-teal-600">65%</div>
              <div class="text-xs text-gray-500 mt-1">剪发</div>
            </div>
            <div class="flex-1 text-center">
              <div class="text-3xl font-bold text-red-500">22%</div>
              <div class="text-xs text-gray-500 mt-1">染发</div>
            </div>
            <div class="flex-1 text-center">
              <div class="text-3xl font-bold text-purple-600">13%</div>
              <div class="text-xs text-gray-500 mt-1">烫发</div>
            </div>
          </div>
        </div>

        <!-- Top Members -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide">本月会员充值排行</h3>
            <button class="text-xs font-medium text-teal-600">查看详情</button>
          </div>
          <div class="space-y-2.5">
            <div v-for="member in topMembers" :key="member.id" class="flex items-center gap-3 py-2.5">
              <div
                class="w-6 h-6 flex items-center justify-center rounded text-xs font-bold"
                :class="member.rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' : member.rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white' : member.rank === 3 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' : 'bg-teal-100 text-teal-600'"
              >
                {{ member.rank }}
              </div>
              <div class="flex-1">
                <div class="text-sm font-medium text-gray-800">{{ member.name }}</div>
                <div class="text-xs text-gray-500">充值 ¥{{ member.amount }} · 剩余 {{ member.remaining }}次</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <BottomNavigation activeTab="home" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BottomNavigation from "@/components/BottomNavigation.vue";
import { navigateTo } from "@/utils/router";

const activeTab = ref("quick");

const tabs = [
  { id: "quick", name: "快捷入口" },
  { id: "today", name: "今日报表" },
  { id: "month", name: "本月报表" },
];

const quickActions = [
  { id: "members", name: "会员", icon: "users", route: "/pages/member/list" },
  { id: "recharge", name: "充值", icon: "wallet", route: "/pages/recharge/index" },
  { id: "consume", name: "消费", icon: "ticket", route: "/pages/consume/index" },
  { id: "reports", name: "详情", icon: "chart", route: "/pages/report/index" },
];

const recentActivity = [
  { id: 1, type: "recharge", name: "张三", action: "充值", detail: "+10次剪发 · 支付¥500", time: "10:23" },
  { id: 2, type: "consume", name: "李四", action: "剪发", detail: "-1次 · 发型师阿明", time: "10:15" },
  { id: 3, type: "consume", name: "王五", action: "染发", detail: "-2次 · 发型师阿杰", time: "09:45" },
];

const topMembers = [
  { id: 1, rank: 1, name: "张总", amount: "5,000", remaining: 88 },
  { id: 2, rank: 2, name: "李女士", amount: "3,000", remaining: 45 },
  { id: 3, rank: 3, name: "王先生", amount: "2,000", remaining: 32 },
];

const handleAction = (action: any) => {
  if (action.route) {
    navigateTo(action.route);
  }
};
</script>

<style>
</style>
