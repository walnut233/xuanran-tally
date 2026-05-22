<route lang="json5" type="page">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: '页面2'
  },
  permissionKeys: ['vip', 'admin']
}
</route>

<template>
  <h1>页面2</h1>
</template>

<style>
/* 暗黑模式 start */
.wot-theme-dark {
  color: #f5f5f5;
  background: black;
  --theme-bg-color: #1b1b1b;
}
</style>
