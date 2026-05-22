<route type="page" lang="json5">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: 'z-paging 使用示例'
  }
}
</route>

<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <div>
      <ul>
        <li v-for="item in dataList" :key="item.id">
          {{ item.title }}
        </li>
      </ul>
    </div>
    <!-- 页面内容 -->
  </z-paging>
</template>

<script setup lang="ts">
import { getUserListApi } from '@/api/testApi'

const paging = ref(null)
const dataList = ref([])

const queryList = (pageNo, pageSize) => {
  // 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
  // 这里的请求只是演示，请替换成自己的项目的网络请求，并在网络请求回调中通过paging.value.complete(请求回来的数组)将请求结果传给z-paging
  getUserListApi({ page: pageNo, limit: pageSize })
    .then(res => {
      // 请勿在网络请求回调中给dataList赋值！！只需要调用complete就可以了
      // 如果你需要处理 res.data 的数据，请在 complete 之前处理
      paging.value.complete(res.data)
    })
    .catch(res => {
      console.log(res)
      // 如果请求失败写paging.value.complete(false)，会自动展示错误页面
      // 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
      // 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
      paging.value.complete(false)
    })
}

onMounted(() => {
  queryList(1, 10)
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
