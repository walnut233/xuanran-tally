<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb;">
    <!-- Custom Header with Back Button -->
    <div style="background-color: #14b8a6; position: sticky; top: 0; z-index: 40;">
      <div style="height: 32px;"></div>
      <div style="padding: 0 20px; padding-top: 12px; padding-bottom: 12px; display: flex; align-items: center;">
        <button style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; flex-shrink: 0;" @click="goBack">
          <span style="font-size: 24px; font-weight: bold; color: white; line-height: 1;">‹</span>
        </button>
        <div style="flex: 1; text-align: center; font-size: 18px; font-weight: 600; color: white;">设置</div>
        <div style="width: 40px; flex-shrink: 0;"></div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding: 0 20px; padding-top: 16px; padding-bottom: 96px;">
      <!-- 店铺设置 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px; margin-top: 4px;">店铺设置</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🏠</span>
            <span style="font-size: 14px; color: #1f2937;">店铺名称</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">发艺坊理发店</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📞</span>
            <span style="font-size: 14px; color: #1f2937;">联系电话</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">138-8888-8888</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📍</span>
            <span style="font-size: 14px; color: #1f2937;">店铺地址</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">北京市朝阳区...</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 服务管理 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务管理</div>      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('/pages/serviceType/list')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🎫</span>
            <span style="font-size: 14px; color: #1f2937;">服务项目</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">4项</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('/pages/hairstylist/list')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">👥</span>
            <span style="font-size: 14px; color: #1f2937;">发型师管理</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">4人</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 数据管理 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">数据管理</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📁</span>
            <span style="font-size: 14px; color: #1f2937;">自动备份</span>
          </span>
          <div style="flex: 1;"></div>
          <div style="width: 52px; height: 30px; position: relative; cursor: pointer;" :style="autoBackup ? 'background-color: #14b8a6;' : 'background-color: #e5e7eb;'" @click="autoBackup = !autoBackup">
            <div style="position: absolute; width: 26px; height: 26px; background-color: white; top: 2px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); transition: all 0.2s;" :style="autoBackup ? 'left: 24px;' : 'left: 2px;'"></div>
          </div>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">⏰</span>
            <span style="font-size: 14px; color: #1f2937;">备份频率</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">每天 02:00</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📊</span>
            <span style="font-size: 14px; color: #1f2937;">最近备份</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background-color: #ccfbf1; color: #0d9488; font-size: 12px; font-weight: 500;">
            <span style="width: 6px; height: 6px; background-color: #0d9488;"></span>
            2小时前
          </span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">⬆️</span>
            <span style="font-size: 14px; color: #1f2937;">立即备份</span>
          </span>
          <div style="flex: 1;"></div>
          <button style="background-color: #14b8a6; color: white; padding: 8px 16px; font-size: 12px; font-weight: 600; border: none; cursor: pointer;" @click="handleBackup">备份</button>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📤</span>
            <span style="font-size: 14px; color: #1f2937;">导出数据</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">Excel</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📥</span>
            <span style="font-size: 14px; color: #1f2937;">恢复数据</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 系统设置 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">系统设置</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🔔</span>            <span style="font-size: 14px; color: #1f2937;">消费提醒</span>
          </span>
          <div style="flex: 1;"></div>
          <div style="width: 52px; height: 30px; position: relative; cursor: pointer;" :style="consumeReminder ? 'background-color: #14b8a6;' : 'background-color: #e5e7eb;'" @click="consumeReminder = !consumeReminder">
            <div style="position: absolute; width: 26px; height: 26px; background-color: white; top: 2px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); transition: all 0.2s;" :style="consumeReminder ? 'left: 24px;' : 'left: 2px;'"></div>
          </div>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">⚠️</span>
            <span style="font-size: 14px; color: #1f2937;">次数不足提醒</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">剩余3次</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">💰</span>
            <span style="font-size: 14px; color: #1f2937;">充值金额预设</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">¥200/¥500/¥1000</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🎨</span>
            <span style="font-size: 14px; color: #1f2937;">主题设置</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">青色主题</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 其他 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">其他</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">❓</span>
            <span style="font-size: 14px; color: #1f2937;">帮助与反馈</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📖</span>
            <span style="font-size: 14px; color: #1f2937;">使用说明</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🔄</span>
            <span style="font-size: 14px; color: #1f2937;">检查更新</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background-color: #ccfbf1; color: #0d9488; font-size: 12px; font-weight: 500;">
            <span style="width: 6px; height: 6px; background-color: #0d9488;"></span>
            已是最新
          </span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('settings')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">ℹ️</span>
            <span style="font-size: 14px; color: #1f2937;">关于我们</span>
          </span>
          <div style="flex: 1;"></div>          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 应用信息 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 24px; text-align: center; margin-bottom: 16px;">
        <div style="width: 76px; height: 76px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); display: flex; align-items: center; justify-content: center; color: white; margin: 0 auto; margin-bottom: 14px; font-size: 30px;">💇</div>
        <div style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 4px;">理发店记卡系统</div>
        <div style="font-size: 14px; color: #6b7280;">版本 1.0.0</div>
      </div>

      <!-- 危险操作 -->
      <div style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 16px; margin-bottom: 16px; position: relative;">
        <span style="background-color: #f9fafb; padding: 0 16px; position: relative; z-index: 10;">危险操作</span>
      </div>
      <button style="width: 100%; height: 52px; background-color: white; border: 1px solid #ef4444; color: #ef4444; font-size: 16px; font-weight: 600; cursor: pointer;">
        清除所有数据
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const autoBackup = ref(true)
const consumeReminder = ref(true)

function goBack() {
  uni.navigateBack()
}

function handleNavigate(path: string) {
  if (path.startsWith('/pages/')) {
    uni.navigateTo({
      url: path
    })
  } else {
    uni.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }
}

function handleBackup() {
  uni.showToast({
    title: '备份成功',
    icon: 'success'
  })
}
</script>

<style>
</style>
