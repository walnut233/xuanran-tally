<!-- fullPage.vue -->
<template>
  <WdConfigProvider :theme="theme" :theme-vars="themeVars">
    <div class="flex-col-center min-h-100vh">
      <div class="w-100vw h-30vh bg-#f1bbba flex justify-center items-center">我是页头</div>
      <slot></slot>
      <div class="w-100vw h-30vh bg-#f8ecc9 flex justify-center items-center">我是页尾</div>
    </div>
  </WdConfigProvider>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme'
const { theme, themeVars } = useTheme()
</script>

<style>
/* 默认主题 */
:root page {
  color: #000000;
  background: #f5f5f5;
  --theme-bg-color: #ffffff;
}
</style>
