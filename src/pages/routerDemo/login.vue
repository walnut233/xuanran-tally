<route lang="json5" type="page">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: '登录页'
  }
}
</route>

<template>
  <button @click="login">使用假数据模拟登录</button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { redirectRouteTo } from '@/utils'
const userStore = useUserStore()

/* 假登录 */
const login = () => {
  userStore.setUserInfo({
    accessToken: 'fakeAccessToken',
    refreshToken: 'fakeRefreshToken'
  })
  // 如果有重定向路径，跳转才有效
  redirectRouteTo()
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
