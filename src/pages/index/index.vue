<!--
@description: DEMO 案例主导航页
-->

<route lang="json5" type="home">
{
  layout: 'theme', // 使用主题
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div class="min-h-100vh">
    <!-- 顶部自定义导航栏 -->
    <div class="w-[calc(100vw-60rpx)] p-x-30rpx bg-[var(--wot-color-theme)]">
      <!-- 状态栏高度 -->
      <div :style="{ height: `${statusBarHeight}px` }"></div>
      <div class="flex p-b-20rpx">
        <div class="w-160rpx h-100% flex">
          <img class="w-160rpx h-160rpx" :src="$assets('@/static/local/logo.png')" />
          <!-- <img class="w-160rpx h-160rpx" :src="'@/static/local/logo.png'" /> -->
        </div>
        <div class="ml-30rpx w-[calc(100%-160rpx)] flex flex-col">
          <div class="font-size-44rpx font-bold flex items-center" :style="{ height: `${barHeight}px` }">uni-plus</div>
          <div class="font-size-26rpx opacity-60 flex-1 flex flex-col justify-center">{{ t('about') }}</div>
        </div>
      </div>
    </div>
    <div class="p-x-30rpx flex flex-col items-center mt-30rpx">
      <!-- 切换主题色 -->
      <div
        class="bg-[var(--theme-bg-color)] rounded-20rpx overflow-hidden flex justify-evenly items-center w-100% h-120rpx font-size-20rpx line-height-28rpx shadow-sm"
      >
        <div
          class="w-94rpx h-50rpx rounded-25rpx bg-#ffc400 flex justify-center items-center"
          @click="changeTheme('#ffc400')"
        >
          {{ t('bgColor1') }}
        </div>
        <div
          class="w-94rpx h-50rpx rounded-25rpx bg-#ff5f2e color-#ffffff flex justify-center items-center"
          @click="changeTheme('#ff5f2e', '#ffffff')"
        >
          {{ t('bgColor2') }}
        </div>
        <div
          class="w-94rpx h-50rpx rounded-25rpx bg-#795548 color-#ffffff flex justify-center items-center"
          @click="changeTheme()"
        >
          {{ t('bgColor3') }}
        </div>
        <div class="flex justify-center items-center w-260rpx">
          <div class="font-size-28rpx mr-10rpx color-#9e9e9e flex-1 text-right">{{ t('darkMode') }}</div>
          <wd-switch
            v-model="theme"
            size="23px"
            active-value="dark"
            inactive-value="light"
            active-color="#272a2f"
            :disabled="userInfo.followSystem"
          />
        </div>
      </div>
      <!-- 功能列表 -->
      <div class="bg-[var(--theme-bg-color)] w-100% shadow-md rounded-20rpx overflow-hidden mt-40rpx">
        <wd-grid border :column="3" clickable>
          <wd-grid-item use-slot v-for="item in gridList" :key="item.iconName" link-type="navigateTo" :url="item.url">
            <wd-icon :name="item.iconName" size="36px" :color="item.color"></wd-icon>
            <div class="font-size-28rpx font-bold">{{ item.title }}</div>
            <div class="color-#9e9e9e font-size-22rpx">{{ item.text }}</div>
          </wd-grid-item>
        </wd-grid>
      </div>
      <!-- 多语言 -->
      <div
        class="bg-[var(--theme-bg-color)] rounded-20rpx overflow-hidden flex justify-between items-center w-[calc(100%-60rpx)] h-120rpx mt-40rpx p-x-30rpx shadow-sm"
        @click="setLocale"
      >
        <div class="flex items-center">
          <wd-icon name="setting" size="22px" color="#0163ff"></wd-icon>
          <div class="font-size-30rpx ml-30rpx">{{ t('nowLocaleText') }}</div>
        </div>
        <div class="flex items-center">
          <div class="font-size-28rpx color-#9e9e9e mr-5rpx h-22px line-height-22px">{{ t('nowLocale') }}</div>
          <wd-icon name="chevron-right" size="22px" color="#9e9e9e"></wd-icon>
        </div>
      </div>
      <!-- 暗黑模式 -->
      <div
        class="bg-[var(--theme-bg-color)] rounded-20rpx overflow-hidden flex justify-between items-center w-[calc(100%-60rpx)] h-120rpx mt-40rpx p-x-30rpx shadow-sm"
      >
        <div class="flex items-center">
          <wd-icon name="windows-filled" size="26px" color="#cf3d35"></wd-icon>
          <div class="font-size-30rpx ml-30rpx">{{ t('darkModeFollowText') }}</div>
        </div>
        <wd-checkbox
          custom-shape-class="w-[var(--wot-checkbox-size,22px)!important] h-[var(--wot-checkbox-size,22px)!important]"
          v-model="userInfo.followSystem"
          checked-color="#cf3d35"
          custom-style="margin:0"
          @change="setTheme"
        />
      </div>
      <!-- 底部作者信息 -->
      <div class="w-60% mt-10rpx opacity-60">
        <wd-divider>{{ t('authorText') }}</wd-divider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTheme } from '@/hooks/useTheme'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store'
import { useI18n } from '@/hooks/useI18n'
const store = useUserStore()
const { theme, themeVars, setTheme } = useTheme()
const { t, setLocale } = useI18n()
const { userInfo } = storeToRefs(store)
const statusBarHeight = ref(20)
const barHeight = ref(38)

/* 宫格列表 */
const gridList = ref([
  {
    iconName: 'layers',
    title: t('layersTitle', 'text'),
    text: 'SFC',
    color: '#0163ff',
    url: '/pages/layoutDemo/index'
  },
  {
    iconName: 'attach',
    title: t('attachTitle', 'text'),
    text: t('attachText', 'text'),
    color: '#ffc400',
    url: '/pages/piniaDemo/index'
  },
  {
    iconName: 'link-unlink',
    title: t('linkUnlinkTitle', 'text'),
    text: t('linkUnlinkText', 'text'),
    color: '#ca145d',
    url: '/pages/queryDemo/queryTestDemo'
  },
  {
    iconName: 'link',
    title: t('linkTitle', 'text'),
    text: t('linkText', 'text'),
    color: '#11cde8',
    url: '/pages/queryDemo/useRequestDemo'
  },
  {
    iconName: 'user',
    title: t('userTitle', 'text'),
    text: t('userText', 'text'),
    color: '#fe1c00',
    url: '/pages/queryDemo/loginDemo'
  },
  {
    iconName: 'lock-off',
    title: t('lockOffTitle', 'text'),
    text: t('lockOffText', 'text'),
    color: '#607d8b',
    url: '/pages/routerDemo/index'
  },
  {
    iconName: 'chart',
    title: t('chartTitle', 'text'),
    text: 'Echarts 5.14',
    color: '#795548',
    url: '/pages/echartsDemo/index'
  },
  {
    iconName: 'transfer',
    title: t('transferTitle', 'text'),
    text: t('transferText', 'text'),
    color: '#a61bc3',
    url: '/pages/wotUiDemo/index'
  },
  {
    iconName: 'view-module',
    title: t('viewModuleTitle', 'text'),
    text: 'z-padding',
    color: '#d4ed00',
    url: '/pages/queryDemo/zPagingDemo'
  },
  {
    iconName: 'bianjiliebiao',
    title: t('viewListTitle', 'text'),
    text: 'i18n',
    color: '#fea600',
    url: '/pages/i18nDemo/index'
  },
  {
    iconName: 'menu-fold',
    title: t('menuFoldTitle', 'text'),
    text: t('menuFoldText', 'text'),
    color: '#652df4',
    url: '/pages/customDemo/index'
  },
  {
    iconName: 'chart-bubble',
    title: 'Unocss',
    text: t('chartBubbleTitle', 'text'),
    color: '#ca145d',
    url: '/pages/unocssDemo/index'
  }
])

/* 切换主题色 */
const changeTheme = (bgColor?: string, fontColor?: string) => {
  themeVars.value = {
    colorTheme: bgColor ?? 'transparency',
    darkColor3: (fontColor ?? theme.value === 'dark') ? '#f5f5f5' : '#272a2f'
  }
}

onLoad(() => {
  // 状态栏高度
  statusBarHeight.value = (uni.getSystemInfoSync().statusBarHeight as number) || 20
  // #ifdef MP-WEIXIN
  // 胶囊数据
  const { top, height } = uni.getMenuButtonBoundingClientRect()
  // 自定义导航栏高度 = 胶囊高度 + 胶囊的 padding * 2, 如果获取不到设置为 38
  barHeight.value = height ? height + (top - statusBarHeight.value) * 2 : 38
  // #endif
})
</script>

<style>
/* 暗黑模式 start */
.wot-theme-dark {
  color: #f5f5f5;
  background: black;
  --theme-bg-color: #1b1b1b;
}
</style>
