<route type="page" lang="json5">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: 'useRequest使用示例'
  }
}
</route>

<template>
  <button @click="prevPage">上一页</button>
  <button @click="nextPage">下一页</button>
  <button @click="getList">重新获取列表</button>
  <div v-if="loading">加载中...</div>
  <div v-else>
    <div class="w-100vw font-size-36rpx m-y-20rpx">当前页码：{{ page }}</div>
    <ul>
      <li v-for="item in filterData" :key="item.id" class="mb-10rpx">
        {{ item.title }}
      </li>
    </ul>
  </div>
  <div v-if="error">请求失败: {{ error }}</div>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/testApi'
import useRequest from '@/hooks/useRequest'

// data 数据处理
const filterData = computed(() => {
  return data.value?.map((item: any) => {
    return {
      ...item,
      title: item.title + '（这是额外添加的内容~）'
    }
  })
})

// useRequest 的使用
const page = ref(1)
const { loading, error, data, run } = useRequest({
  queryKey: [page],
  queryFn: () => getUserListApi({ page: page.value, limit: 10 }),
  options: { immediate: true }
})

// 上一页
const prevPage = () => {
  page.value = Math.max(page.value - 1, 1)
}

// 下一页
const nextPage = () => {
  page.value = page.value + 1
}

// 重新获取列表数据
const getList = () => {
  run()
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
