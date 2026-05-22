<route type="page" lang="json5">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: '登录请求示例'
  }
}
</route>

<template>
  <button @click="login">登录请求</button>
  <div class="flex w-100vw justify-center items-center h-80rpx font-size-26rpx">
    【 accessToken 失效,有 refreshToken 获取列表会无感刷新】
  </div>
  <button @click="getList">获取列表</button>
  <button @click="accessTokenInvalid">accessToken 失效</button>
  <button @click="refreshTokenInvalid">refreshToken 失效</button>
  <div class="flex flex-col justify-center items-center mt-40rpx">
    <div>----- accessToken -----</div>
    <div class="w-80vw break-words mt-20rpx">{{ userInfo.accessToken }}</div>
    <div class="mt-40rpx">----- refreshToken -----</div>
    <div class="w-80vw break-words mt-20rpx">{{ userInfo.refreshToken }}</div>
    <div class="m-y-20rpx">----- list 数据 -----</div>
    <div>{{ list }}</div>
  </div>
</template>

<script setup lang="ts">
import { loginApi, getListApi } from '@/api/loginApi'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'
const store = useUserStore()
const { userInfo } = storeToRefs(store)

// 登录请求
const login = () => {
  loginApi({
    username: 'uniLin',
    password: '111111'
  })
}

// 获取 列表数据
const list = ref()
const getList = async () => {
  list.value = []
  list.value = await getListApi()
}

// token 失效
const accessTokenInvalid = () => {
  const str = userInfo.value.accessToken.split('')
  store.setUserInfo({
    accessToken: [...str].sort(() => Math.random() - 0.5).join('')
  })
}

// refreshToken 失效
const refreshTokenInvalid = () => {
  const str = userInfo.value.refreshToken.split('')
  store.setUserInfo({
    refreshToken: [...str].sort(() => Math.random() - 0.5).join('')
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
