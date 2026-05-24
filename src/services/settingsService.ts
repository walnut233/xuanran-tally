import { db } from './db'

// 店铺设置类型
export interface ShopSettings {
  name: string
  phone: string
  address: string
}

// 系统设置类型
export interface SystemSettings {
  autoBackup: boolean
  backupFrequency: string
  consumeReminder: boolean
  lowCountThreshold: number
  rechargePresets: number[]
  theme: string
}

// 默认设置
const DEFAULT_SHOP_SETTINGS: ShopSettings = {
  name: '发艺坊理发店',
  phone: '138-8888-8888',
  address: '北京市朝阳区...'
}

const DEFAULT_SYSTEM_SETTINGS: SystemSettings = {
  autoBackup: true,
  backupFrequency: '每天 02:00',
  consumeReminder: true,
  lowCountThreshold: 3,
  rechargePresets: [200, 500, 1000],
  theme: '青色主题'
}

// LocalStorage 键名
const SHOP_SETTINGS_KEY = 'shop_settings'
const SYSTEM_SETTINGS_KEY = 'system_settings'
const BACKUP_PREFIX = 'backup_'

export const settingsService = {
  // 获取店铺设置
  getShopSettings(): ShopSettings {
    try {
      const stored = uni.getStorageSync(SHOP_SETTINGS_KEY)
      if (stored) {
        return { ...DEFAULT_SHOP_SETTINGS, ...JSON.parse(stored) }
      }
    } catch (e) {
      console.error('获取店铺设置失败', e)
    }
    return { ...DEFAULT_SHOP_SETTINGS }
  },

  // 保存店铺设置
  saveShopSettings(settings: Partial<ShopSettings>): ShopSettings {
    const current = this.getShopSettings()
    const updated = { ...current, ...settings }
    try {
      uni.setStorageSync(SHOP_SETTINGS_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('保存店铺设置失败', e)
    }
    return updated
  },

  // 获取系统设置
  getSystemSettings(): SystemSettings {
    try {
      const stored = uni.getStorageSync(SYSTEM_SETTINGS_KEY)
      if (stored) {
        return { ...DEFAULT_SYSTEM_SETTINGS, ...JSON.parse(stored) }
      }
    } catch (e) {
      console.error('获取系统设置失败', e)
    }
    return { ...DEFAULT_SYSTEM_SETTINGS }
  },

  // 保存系统设置
  saveSystemSettings(settings: Partial<SystemSettings>): SystemSettings {
    const current = this.getSystemSettings()
    const updated = { ...current, ...settings }
    try {
      uni.setStorageSync(SYSTEM_SETTINGS_KEY, JSON.stringify(updated))
    } catch (e) {
      console.error('保存系统设置失败', e)
    }
    return updated
  },

  // 创建备份
  createBackup(): { success: boolean; timestamp: string; message?: string } {
    try {
      const data = db.getDB()
      const shopSettings = this.getShopSettings()
      const systemSettings = this.getSystemSettings()

      const backup = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        data,
        shopSettings,
        systemSettings
      }

      const timestamp = new Date().getTime().toString()
      uni.setStorageSync(BACKUP_PREFIX + timestamp, JSON.stringify(backup))

      // 最多保留10个备份
      this.cleanOldBackups()

      return {
        success: true,
        timestamp: backup.timestamp
      }
    } catch (e) {
      console.error('创建备份失败', e)
      return {
        success: false,
        timestamp: '',
        message: '备份失败: ' + (e as Error).message
      }
    }
  },

  // 获取备份列表
  getBackupList(): { id: string; timestamp: string; date: Date }[] {
    const backups: { id: string; timestamp: string; date: Date }[] = []

    try {
      // 获取所有存储的键
      const info = uni.getStorageInfoSync()
      for (const key of info.keys) {
        if (key.startsWith(BACKUP_PREFIX)) {
          try {
            const data = uni.getStorageSync(key)
            const backup = JSON.parse(data)
            backups.push({
              id: key.substring(BACKUP_PREFIX.length),
              timestamp: backup.timestamp,
              date: new Date(backup.timestamp)
            })
          } catch (e) {
            // 忽略无效备份
          }
        }
      }
    } catch (e) {
      console.error('获取备份列表失败', e)
    }

    // 按时间倒序排列
    return backups.sort((a, b) => b.date.getTime() - a.date.getTime())
  },

  // 恢复备份
  restoreBackup(backupId: string): { success: boolean; message?: string } {
    try {
      const key = BACKUP_PREFIX + backupId
      const data = uni.getStorageSync(key)

      if (!data) {
        return { success: false, message: '备份不存在' }
      }

      const backup = JSON.parse(data)

      // 恢复数据库
      db.setDB(backup.data)

      // 恢复设置
      if (backup.shopSettings) {
        this.saveShopSettings(backup.shopSettings)
      }
      if (backup.systemSettings) {
        this.saveSystemSettings(backup.systemSettings)
      }

      return { success: true }
    } catch (e) {
      console.error('恢复备份失败', e)
      return {
        success: false,
        message: '恢复失败: ' + (e as Error).message
      }
    }
  },

  // 删除备份
  deleteBackup(backupId: string): boolean {
    try {
      uni.removeStorageSync(BACKUP_PREFIX + backupId)
      return true
    } catch (e) {
      console.error('删除备份失败', e)
      return false
    }
  },

  // 清理旧备份，只保留最新的10个
  cleanOldBackups(): void {
    const backups = this.getBackupList()
    if (backups.length > 10) {
      for (let i = 10; i < backups.length; i++) {
        this.deleteBackup(backups[i].id)
      }
    }
  },

  // 导出数据为JSON
  exportToJSON(): string {
    const backup = {
      version: '1.0',
      exportTime: new Date().toISOString(),
      data: db.getDB(),
      shopSettings: this.getShopSettings(),
      systemSettings: this.getSystemSettings()
    }
    return JSON.stringify(backup, null, 2)
  },

  // 从JSON导入数据
  importFromJSON(jsonString: string): { success: boolean; message?: string } {
    try {
      const backup = JSON.parse(jsonString)

      if (!backup.data || !backup.version) {
        return { success: false, message: '无效的备份文件格式' }
      }

      // 恢复数据库
      db.setDB(backup.data)

      // 恢复设置
      if (backup.shopSettings) {
        this.saveShopSettings(backup.shopSettings)
      }
      if (backup.systemSettings) {
        this.saveSystemSettings(backup.systemSettings)
      }

      return { success: true }
    } catch (e) {
      console.error('导入数据失败', e)
      return {
        success: false,
        message: '导入失败: ' + (e as Error).message
      }
    }
  },

  // 清除所有数据
  clearAllData(): boolean {
    try {
      // 清除数据库
      db.clearDB()

      // 清除设置
      uni.removeStorageSync(SHOP_SETTINGS_KEY)
      uni.removeStorageSync(SYSTEM_SETTINGS_KEY)

      // 保留备份，不删除

      return true
    } catch (e) {
      console.error('清除数据失败', e)
      return false
    }
  }
}
