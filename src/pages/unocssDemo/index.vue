<!--
@description: Unocss 使用 dome
-->

<route type="page" lang="json5">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: 'Unocss 使用 dome'
  }
}
</route>

<template>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">--------unocss 图标----------</div>
  <div class="flex justify-center gap-3 text-5xl text-blue-300">
    <!-- 类目最前面加 i-  -->
    <!-- 写法一：图标库名称 + : + 图标名称 -->
    <i class="i-uiw-alipay" />
    <!-- 写法二：图标库名称 + - + 图标名称 -->
    <i class="i-uiw:apple" />
  </div>
  <div class="w-100vw flex justify-center items-center p-y-20rpx">--------传统图标----------</div>
  <div class="flex justify-center items-center gap-3">
    <img class="w-100rpx h-100rpx" src="https://api.iconify.design/uiw:github.svg?color=%23faa5a2" />
    <img class="w-100rpx h-100rpx" src="https://api.iconify.design/uiw:html5.svg?color=%23faa5a2" />
  </div>
</template>

<style>
/* 暗黑模式 start */
.wot-theme-dark {
  color: #f5f5f5;
  background: black;
  --theme-bg-color: #1b1b1b;
}
</style>
