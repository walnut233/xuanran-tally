<route lang="json5" type="page">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: '页面路由权限控制'
  }
}
</route>

<template>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">--------用户权限----------</div>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">{{ getUserPermissionKeys() }}</div>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">--------页面权限----------</div>
  <button @click="goToPage1">['vip']</button>
  <button @click="goToPage2">['vip', 'admin']</button>
  <button @click="goToPage3">['logined']</button>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">--------按钮权限----------</div>
  <button v-perms="['operation:user:create']">有按钮权限: operation:user:create</button>
  <button v-perms="['operation:user:delete']">无按钮权限: operation:user:delete</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'

const getUserPermissionKeys = () => {
  const userStore = useUserStore()
  return userStore.getUserPermissionKeys
}

// 跳转到页面1
const goToPage1 = () => {
  uni.navigateTo({
    url: '/pages/routerDemo/page1'
  })
}

// 跳转到页面2
const goToPage2 = () => {
  uni.navigateTo({
    url: '/pages/routerDemo/page2'
  })
}

// 跳转到页面3
const goToPage3 = () => {
  uni.navigateTo({
    url: '/pages/routerDemo/page3'
  })
}
</script>

<style>
/* 暗黑模式 start */
.wot-theme-dark {
  color: #f5f5f5;
  background: black;
  --theme-bg-color: #1b1b1b;
}
</style>
