<route type="page" lang="json5">
{
  layout: 'theme', // 使用主题
  style: {
    navigationBarTitleText: '请求测试页面'
  }
}
</route>

<template>
  <div>
    <button @click="getTest">GET 请求</button>
    <button @click="postTest">POST 请求</button>
    <button @click="delayRequest">3S后返回数据, 可点击下面取消请求取消</button>
    <button @click="cancelRequest">取消 请求</button>
    <button @click="awaitToJs">awaitToJs</button>
    <div class="mt-40rpx">
      {{ pageData }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { awaitToJsTestApi, getTestApi, postTestApi, getLongRequestApi } from '@/api/testApi'
const pageData = ref()

// GET 请求
const getTest = async () => {
  pageData.value = await getTestApi({ name: 'uni-plus' })
}

// POST 请求
const postTest = async () => {
  pageData.value = await postTestApi({ name: 'uni-plus' }, { id: '123456' })
}

// 长时间请求（测试取消请求）
let requestTask = null
const delayRequest = () => {
  requestTask = getLongRequestApi({ name: 'uni-plus' }, { id: '123456' })
  requestTask
    .then(res => {
      pageData.value = res
    })
    .catch(err => {
      pageData.value = err
    })
}

// 取消 请求
const cancelRequest = () => {
  // 取消请求
  requestTask.abort()
  pageData.value = { msg: '取消请求' }
}

/* await-to-js 代替 try catch 用法，根据实际需求进行使用 */
const awaitToJs = async () => {
  const [data, err] = await awaitToJsTestApi({ name: 'uni-plus' })
  if (data) {
    pageData.value = data
  }
  if (err) {
    pageData.value = err
  }
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
