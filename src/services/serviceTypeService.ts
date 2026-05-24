import type { ServiceType } from '@/types'
import { db } from './db'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// 默认服务类型
const defaultServiceTypes: Omit<ServiceType, 'id'>[] = [
  { name: '剪发' },
  { name: '染发' },
  { name: '烫发' },
  { name: '护理' }
]

export const serviceTypeService = {
  // 获取所有服务类型
  getAll(): ServiceType[] {
    const data = db.getDB()
    if (data.serviceTypes.length === 0) {
      // 初始化默认服务类型
      data.serviceTypes = defaultServiceTypes.map(st => ({
        ...st,
        id: generateId()
      }))
      db.setDB(data)
    }
    // 只返回需要的字段
    return data.serviceTypes.map(st => ({
      id: st.id,
      name: st.name
    }))
  },

  // 添加服务类型
  add(serviceType: Omit<ServiceType, 'id'>): ServiceType {
    const data = db.getDB()
    const newServiceType: ServiceType = {
      ...serviceType,
      id: generateId()
    }
    data.serviceTypes.push(newServiceType)
    db.setDB(data)
    return newServiceType
  },

  // 更新服务类型
  update(id: string, serviceType: Partial<ServiceType>): ServiceType | undefined {
    const data = db.getDB()
    const index = data.serviceTypes.findIndex(st => st.id === id)
    if (index === -1) return undefined
    data.serviceTypes[index] = { ...data.serviceTypes[index], ...serviceType }
    db.setDB(data)
    return data.serviceTypes[index]
  },

  // 删除服务类型
  delete(id: string): boolean {
    const data = db.getDB()
    const index = data.serviceTypes.findIndex(st => st.id === id)
    if (index === -1) return false
    data.serviceTypes.splice(index, 1)
    db.setDB(data)
    return true
  }
}
