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
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="showEditDialog('name')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🏠</span>
            <span style="font-size: 14px; color: #1f2937;">店铺名称</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">{{ shopSettings.name }}</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 服务管理 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">服务管理</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('/pages/serviceType/list')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">🎫</span>
            <span style="font-size: 14px; color: #1f2937;">服务项目</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">{{ serviceTypeCount }}项</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleNavigate('/pages/tierSettings/index')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📊</span>
            <span style="font-size: 14px; color: #1f2937;">梯度设置</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">{{ tierCount }}档</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="handleNavigate('/pages/hairstylist/list')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">👥</span>
            <span style="font-size: 14px; color: #1f2937;">发型师管理</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">{{ hairstylistCount }}人</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 数据管理 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">数据管理</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="showBackupList">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">⏰</span>
            <span style="font-size: 14px; color: #1f2937;">备份管理</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">{{ backupCount }}个备份</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📊</span>
            <span style="font-size: 14px; color: #1f2937;">最近备份</span>
          </span>
          <div style="flex: 1;"></div>
          <span v-if="lastBackup" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background-color: #ccfbf1; color: #0d9488; font-size: 12px; font-weight: 500;">
            <span style="width: 6px; height: 6px; background-color: #0d9488;"></span>
            {{ lastBackupText }}
          </span>
          <span v-else style="color: #9ca3af; font-size: 12px;">暂无备份</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">⬆️</span>
            <span style="font-size: 14px; color: #1f2937;">立即备份</span>
          </span>
          <div style="flex: 1;"></div>
          <button style="background-color: #14b8a6; color: white; padding: 8px 16px; font-size: 12px; font-weight: 600; border: none; cursor: pointer;" @click="handleBackup">备份</button>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="handleExport">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📤</span>
            <span style="font-size: 14px; color: #1f2937;">导出数据</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #6b7280; font-size: 14px; margin-right: 8px;">JSON</span>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="showImportDialog">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">📥</span>
            <span style="font-size: 14px; color: #1f2937;">恢复数据</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>


      <!-- 其他 -->
      <div style="font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">其他</div>
      <div style="background-color: white; border: 1px solid #f3f4f6; overflow: hidden; margin-bottom: 16px;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="showFeatureToast('help')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">❓</span>
            <span style="font-size: 14px; color: #1f2937;">帮助与反馈</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6; cursor: pointer;" @click="showFeatureToast('guide')">
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
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; cursor: pointer;" @click="showFeatureToast('about')">
          <span style="display: flex; align-items: center; gap: 12px;">
            <span style="width: 28px; height: 28px; background-color: #ccfbf1; display: flex; align-items: center; justify-content: center; color: #0d9488; font-size: 18px;">ℹ️</span>
            <span style="font-size: 14px; color: #1f2937;">关于我们</span>
          </span>
          <div style="flex: 1;"></div>
          <span style="color: #9ca3af; font-size: 20px; font-weight: bold;">›</span>
        </div>
      </div>

      <!-- 应用信息 -->
      <div style="background-color: white; border: 1px solid #f3f4f6; padding: 24px; text-align: center; margin-bottom: 16px;">
        <image src="/static/logo.png" style="width: 76px; height: 76px; margin: 0 auto; margin-bottom: 14px; border-radius: 12px;" mode="aspectFit" />
        <div style="font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 4px;">渲染记账</div>
        <div style="font-size: 14px; color: #6b7280;">版本 1.0.0</div>
      </div>

      <!-- 危险操作 -->
      <div style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 16px; margin-bottom: 16px; position: relative;">
        <span style="background-color: #f9fafb; padding: 0 16px; position: relative; z-index: 10;">危险操作</span>
      </div>
      <button style="width: 100%; height: 52px; background-color: white; border: 1px solid #ef4444; color: #ef4444; font-size: 16px; font-weight: 600; cursor: pointer;" @click="handleClearAllData">
        清除所有数据
      </button>
    </div>

    <!-- 编辑弹窗 -->
    <div v-if="showDialog" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: flex-end;" @click.self="closeDialog">
      <div style="background-color: white; width: 100%;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <button style="color: #6b7280; font-size: 14px; background: none; border: none; cursor: pointer;" @click="closeDialog">取消</button>
          <span style="font-weight: 500; color: #1f2937;">{{ dialogTitle }}</span>
          <button style="color: #0d9488; font-size: 14px; font-weight: 500; background: none; border: none; cursor: pointer;" @click="saveDialog">确定</button>
        </div>
        <div style="padding: 20px;">
          <input
            v-if="dialogField !== 'lowCountThreshold'"
            v-model="dialogValue"
            :type="dialogField === 'phone' ? 'number' : 'text'"
            style="width: 100%; height: 48px; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; box-sizing: border-box; background-color: #f9fafb;"
          />
          <input
            v-else
            v-model.number="dialogValue"
            type="number"
            min="1"
            max="10"
            style="width: 100%; height: 48px; border: 1px solid #f3f4f6; padding: 0 16px; font-size: 16px; box-sizing: border-box; background-color: #f9fafb;"
          />
        </div>
      </div>
    </div>

    <!-- 备份列表弹窗 -->
    <div v-if="showBackupListDialog" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: flex-end;" @click.self="closeBackupList">
      <div style="background-color: white; width: 100%; max-height: 70vh; display: flex; flex-direction: column;">
        <div style="display: flex; align-items: center; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <button style="color: #6b7280; font-size: 14px; background: none; border: none; cursor: pointer; flex-shrink: 0;" @click="closeBackupList">关闭</button>
          <span style="flex: 1; text-align: center; font-weight: 500; color: #1f2937;">备份管理</span>
        </div>
        <div style="flex: 1; overflow-y: auto; padding: 16px;">
          <div v-if="backupList.length > 0" style="display: flex; flex-direction: column; gap: 10px;">
            <div
              v-for="backup in backupList"
              :key="backup.id"
              style="background-color: #f9fafb; padding: 16px; display: flex; align-items: center; justify-content: space-between;"
            >
              <div>
                <div style="font-size: 14px; font-weight: 500; color: #1f2937;">{{ formatBackupTime(backup.date) }}</div>
                <div style="font-size: 12px; color: #6b7280;">{{ formatBackupDate(backup.date) }}</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <button
                  style="padding: 6px 12px; background: #f0fdf4; color: #0d9488; border: 1px solid #bbf7d0; font-size: 12px; cursor: pointer;"
                  @click="restoreBackup(backup.id)"
                >
                  恢复
                </button>
                <button
                  style="padding: 6px 12px; background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; font-size: 12px; cursor: pointer;"
                  @click="deleteBackup(backup.id)"
                >
                  删除
                </button>
              </div>
            </div>
          </div>
          <div v-else style="text-align: center; padding: 64px 0; color: #9ca3af;">
            暂无备份
          </div>
        </div>
      </div>
    </div>


    <!-- 简单页面弹窗 -->
    <div v-if="showSimplePageFlag" style="position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.5); z-index: 50; display: flex; align-items: center; justify-content: center;">
      <div style="background-color: white; width: 90%; max-width: 400px; max-height: 80vh; border-radius: 12px; overflow: hidden;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px; padding-top: 16px; padding-bottom: 16px; border-bottom: 1px solid #f3f4f6;">
          <span style="font-weight: 500; color: #1f2937;">
            {{ simplePageType === 'help' ? '帮助与反馈' : simplePageType === 'guide' ? '使用说明' : '关于我们' }}
          </span>
          <button style="color: #6b7280; font-size: 24px; background: none; border: none; cursor: pointer;" @click="closeSimplePage">×</button>
        </div>
        <div style="padding: 20px; overflow-y: auto;">
          <div v-if="simplePageType === 'about'" style="text-align: center;">
            <image src="/static/logo.png" style="width: 80px; height: 80px; margin: 0 auto 16px auto; border-radius: 16px;" mode="aspectFit" />
            <h2 style="font-size: 20px; font-weight: 600; color: #1f2937; margin: 0 0 4px 0;">渲染记账</h2>
            <p style="font-size: 14px; color: #6b7280; margin: 0 0 16px 0;">版本 1.0.0</p>
            <p style="font-size: 14px; color: #4b5563; line-height: 1.6;">
              一款专为理发店设计的单机版会员记卡系统，方便管理会员、记录充值和消费。
            </p>
          </div>

          <div v-if="simplePageType === 'guide'">
            <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0 0 12px 0;">快速入门</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">1. 添加会员</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">在会员列表点击"+"按钮添加新会员</p>
              </div>
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">2. 会员充值</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">在充值页面选择会员，输入充值次数和金额</p>
              </div>
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">3. 会员消费</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">在消费页面选择会员，选择服务类型完成消费</p>
              </div>
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">4. 查看报表</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">在报表页面查看每日、每月的经营数据</p>
              </div>
            </div>
          </div>

          <div v-if="simplePageType === 'help'">
            <h3 style="font-size: 16px; font-weight: 600; color: #1f2937; margin: 0 0 12px 0;">常见问题</h3>
            <div style="display: flex; flex-direction: column; gap: 12px;">
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">如何备份数据？</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">在设置页面点击"立即备份"按钮</p>
              </div>
              <div>
                <p style="font-size: 14px; font-weight: 500; color: #1f2937; margin: 0 0 4px 0;">数据安全吗？</p>
                <p style="font-size: 13px; color: #6b7280; margin: 0;">所有数据都保存在本地，不会上传到服务器</p>
              </div>
            </div>
            <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #f3f4f6;">
              <p style="font-size: 14px; color: #6b7280; text-align: center;">
                如有其他问题，请联系开发者
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { settingsService, type ShopSettings, type SystemSettings } from '@/services/settingsService'
import { serviceTypeService } from '@/services/serviceTypeService'
import { hairstylistService } from '@/services/hairstylistService'

// 设置数据
const shopSettings = ref<ShopSettings>(settingsService.getShopSettings())
const systemSettings = ref<SystemSettings>(settingsService.getSystemSettings())
const settingsRefreshKey = ref(0)

// 计数
const serviceTypeCount = computed(() => {
  settingsRefreshKey.value
  return serviceTypeService.getAll().length
})
const tierCount = computed(() => {
  settingsRefreshKey.value
  return systemSettings.value.memberTiers?.length || 0
})
const hairstylistCount = computed(() => {
  settingsRefreshKey.value
  return hairstylistService.getAll().length
})

// 备份相关
const backupList = ref<any[]>([])
const backupRefreshKey = ref(0)
const lastBackup = computed(() => {
  backupRefreshKey.value // 依赖刷新 key
  const list = settingsService.getBackupList()
  return list.length > 0 ? list[0] : null
})
const backupCount = computed(() => {
  backupRefreshKey.value // 依赖刷新 key
  return settingsService.getBackupList().length
})
const lastBackupText = computed(() => {
  if (!lastBackup.value) return ''
  const now = new Date()
  const diff = now.getTime() - lastBackup.value.date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  return `${days}天前`
})

// 弹窗相关
const showDialog = ref(false)
const showBackupListDialog = ref(false)
const dialogField = ref<string>('')
const dialogValue = ref<string>('')
const dialogTitle = ref<string>('')

function goBack() {
  uni.navigateBack()
}

function handleNavigate(path: string) {
  if (path.startsWith('/pages/')) {
    uni.navigateTo({
      url: path
    })
  }
}

function showFeatureToast(feature?: string) {
  if (feature === 'help' || feature === 'about' || feature === 'guide') {
    showSimplePage(feature)
    return
  }
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

// 简单页面展示
const showSimplePageFlag = ref(false)
const simplePageType = ref('')

function showSimplePage(type: string) {
  simplePageType.value = type
  showSimplePageFlag.value = true
}

function closeSimplePage() {
  showSimplePageFlag.value = false
}

// 店铺设置编辑
function showEditDialog(field: string) {
  dialogField.value = field
  if (field === 'name') {
    dialogTitle.value = '修改店铺名称'
    dialogValue.value = shopSettings.value.name
  }
  showDialog.value = true
}

function closeDialog() {
  showDialog.value = false
  dialogField.value = ''
  dialogValue.value = ''
}

function saveDialog() {
  if (dialogField.value === 'name') {
    shopSettings.value = settingsService.saveShopSettings({
      [dialogField.value]: dialogValue.value
    })
  }
  closeDialog()
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
  refreshSettings()
}


// 立即备份
function handleBackup() {
  uni.showLoading({ title: '备份中...' })
  const result = settingsService.createBackup()
  uni.hideLoading()

  if (result.success) {
    uni.showToast({
      title: '备份成功',
      icon: 'success'
    })
    refreshBackupList()
  } else {
    uni.showToast({
      title: result.message || '备份失败',
      icon: 'none'
    })
  }
  refreshSettings()
}

// 备份列表
function showBackupList() {
  refreshBackupList()
  showBackupListDialog.value = true
}

function closeBackupList() {
  showBackupListDialog.value = false
}

function refreshBackupList() {
  backupList.value = settingsService.getBackupList()
  backupRefreshKey.value++
}

function formatBackupTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

function formatBackupDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 恢复备份
function restoreBackup(id: string) {
  uni.showModal({
    title: '确认恢复',
    content: '恢复将覆盖当前所有数据，确定要恢复吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({ title: '恢复中...' })
        const result = settingsService.restoreBackup(id)
        uni.hideLoading()

        if (result.success) {
          closeBackupList()
          uni.showToast({
            title: '恢复成功',
            icon: 'success'
          })
          refreshSettings()
        } else {
          uni.showToast({
            title: result.message || '恢复失败',
            icon: 'none'
          })
        }
      }
    }
  })
}

// 删除备份
function deleteBackup(id: string) {
  uni.showModal({
    title: '确认删除',
    content: '删除备份后将无法恢复，确定要删除吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        settingsService.deleteBackup(id)
        refreshBackupList()
        uni.showToast({
          title: '删除成功',
          icon: 'success'
        })
        refreshSettings()
      }
    }
  })
}

// 导出数据
function handleExport() {
  const json = settingsService.exportToJSON()

  // 在H5或小程序中，可以通过复制到剪贴板来实现
  uni.setClipboardData({
    data: json,
    success: () => {
      uni.showToast({
        title: '已复制到剪贴板',
        icon: 'success'
      })
    }
  })
}

// 导入数据
function showImportDialog() {
  uni.showModal({
    title: '导入数据',
    content: '请将备份数据复制到剪贴板后，点击确定进行导入',
    confirmColor: '#0d9488',
    success: (res) => {
      if (res.confirm) {
        uni.getClipboardData({
          success: (clipRes) => {
            if (clipRes.data) {
              uni.showLoading({ title: '导入中...' })
              const result = settingsService.importFromJSON(clipRes.data)
              uni.hideLoading()

              if (result.success) {
                uni.showToast({
                  title: '导入成功',
                  icon: 'success'
                })
                refreshSettings()
              } else {
                uni.showToast({
                  title: result.message || '导入失败',
                  icon: 'none'
                })
              }
            }
          }
        })
      }
    }
  })
}

// 刷新设置数据
function refreshSettings() {
  shopSettings.value = settingsService.getShopSettings()
  systemSettings.value = settingsService.getSystemSettings()
  settingsRefreshKey.value++
}

// 清除所有数据
function handleClearAllData() {
  uni.showModal({
    title: '警告',
    content: '此操作将清除所有会员、充值、消费等数据，且无法恢复！确定要继续吗？',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        uni.showModal({
          title: '再次确认',
          content: '真的要清除所有数据吗？此操作无法撤销！',
          confirmColor: '#ef4444',
          success: (res2) => {
            if (res2.confirm) {
              const success = settingsService.clearAllData()
              if (success) {
                uni.showToast({
                  title: '数据已清除',
                  icon: 'success'
                })
                refreshSettings()
              }
            }
          }
        })
      }
    }
  })
}

onShow(() => {
  refreshSettings()
})
</script>

<style>
</style>
