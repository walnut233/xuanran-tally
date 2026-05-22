<!-- theme.vue -->
<template>
  <WdConfigProvider :theme="theme" :theme-vars="themeVars">
    <div class="min-h-100vh">
      <slot></slot>
    </div>
  </WdConfigProvider>
</template>

<script setup lang="ts">
import { useTheme } from '@/hooks/useTheme'
const { theme, themeVars } = useTheme()
</script>
