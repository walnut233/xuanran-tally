<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '理发店记卡系统'
  }
}
</route>

<template>
  <div class="min-h-100vh bg-gray-100">
    <!-- 顶部卡片 -->
    <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-30rpx">
      <div class="text-white text-44rpx font-bold mb-20rpx">理发店记卡系统</div>
      <div class="text-blue-100 text-26rpx">会员管理 · 充值消费 · 报表统计</div>
    </div>

    <!-- 功能入口 -->
    <div class="p-30rpx">
      <wd-grid border :column="2" clickable>
        <wd-grid-item use-slot link-type="navigateTo" url="/pages/member/list">
          <div class="flex flex-col items-center">
            <div class="w-100rpx h-100rpx bg-blue-100 rounded-full flex items-center justify-center mb-20rpx">
              <wd-icon name="user" size="40rpx" color="#409EFF"></wd-icon>
            </div>
            <div class="text-32rpx font-bold text-gray-800">会员管理</div>
            <div class="text-24rpx text-gray-500 mt-10rpx">会员建档、查询、编辑</div>
          </div>
        </wd-grid-item>

        <wd-grid-item use-slot link-type="navigateTo" url="/pages/recharge/index">
          <div class="flex flex-col items-center">
            <div class="w-100rpx h-100rpx bg-green-100 rounded-full flex items-center justify-center mb-20rpx">
              <wd-icon name="add-circle" size="40rpx" color="#67C23A"></wd-icon>
            </div>
            <div class="text-32rpx font-bold text-gray-800">充值</div>
            <div class="text-24rpx text-gray-500 mt-10rpx">会员充值、增加次数</div>
          </div>
        </wd-grid-item>

        <wd-grid-item use-slot link-type="navigateTo" url="/pages/consumption/index">
          <div class="flex flex-col items-center">
            <div class="w-100rpx h-100rpx bg-orange-100 rounded-full flex items-center justify-center mb-20rpx">
              <wd-icon name="check" size="40rpx" color="#E6A23C"></wd-icon>
            </div>
            <div class="text-32rpx font-bold text-gray-800">消费</div>
            <div class="text-24rpx text-gray-500 mt-10rpx">会员消费、扣减次数</div>
          </div>
        </wd-grid-item>

        <wd-grid-item use-slot link-type="navigateTo" url="/pages/report/index">
          <div class="flex flex-col items-center">
            <div class="w-100rpx h-100rpx bg-purple-100 rounded-full flex items-center justify-center mb-20rpx">
              <wd-icon name="chart" size="40rpx" color="#909399"></wd-icon>
            </div>
            <div class="text-32rpx font-bold text-gray-800">报表</div>
            <div class="text-24rpx text-gray-500 mt-10rpx">日报、月报统计</div>
          </div>
        </wd-grid-item>
      </wd-grid>
    </div>

    <!-- 快捷操作 -->
    <div class="p-x-30rpx">
      <div class="text-32rpx font-bold text-gray-800 mb-20rpx">快捷操作</div>
      <div class="bg-white rounded-20rpx p-30rpx shadow-sm">
        <wd-cell-group>
          <wd-cell title="快速新增会员" is-link link-type="navigateTo" url="/pages/member/edit" />
          <wd-cell title="服务类型管理" is-link link-type="navigateTo" url="/pages/serviceType/list" />
          <wd-cell title="美发师管理" is-link link-type="navigateTo" url="/pages/hairstylist/list" />
        </wd-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
