import type { Consumption } from '@/types'
import { db } from './db'
import { memberService } from './memberService'

// 服务类型英文字段到中文的映射
const serviceTypeMap: Record<string, string> = {
  'haircut': '剪发',
  'dye': '染发',
  'perm': '烫发',
  'care': '护理',
  'wash': '洗发'
}

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const consumptionService = {
  // 获取所有消费记录
  getAll(): Consumption[] {
    const data = db.getDB()
    return data.consumptions.map(c => ({
      ...c,
      serviceType: c.serviceType // 数据迁移已经处理了转换，直接返回
    }))
  },

  // 根据ID获取消费记录
  getById(id: string): Consumption | undefined {
    const data = db.getDB()
    return data.consumptions.find(c => c.id === id)
  },

  // 根据会员ID获取消费记录
  getByMemberId(memberId: string): Consumption[] {
    const data = db.getDB()
    return data.consumptions.filter(c => c.memberId === memberId)
  },

  // 添加消费记录
  add(consumption: Omit<Consumption, 'id' | 'consumptionTime'>): Consumption | null {
    // 检查会员余额是否足够
    const member = memberService.getById(consumption.memberId)
    if (!member || member.balance < consumption.amount) {
      return null
    }

    const data = db.getDB()
    const newConsumption: Consumption = {
      ...consumption,
      id: generateId(),
      consumptionTime: new Date().toISOString()
    }
    data.consumptions.unshift(newConsumption)
    db.setDB(data)

    // 扣减会员余额
    memberService.updateBalance(consumption.memberId, -consumption.amount)

    return newConsumption
  },

  // 获取指定时间范围内的消费记录
  getByDateRange(startDate: string, endDate: string): Consumption[] {
    const data = db.getDB()
    return data.consumptions.filter(c =>
      c.consumptionTime >= startDate && c.consumptionTime <= endDate
    )
  },

  // 获取消费统计
  getStats(startDate?: string, endDate?: string): { totalCount: number; totalAmount: number } {
    let consumptions = this.getAll()
    if (startDate && endDate) {
      consumptions = this.getByDateRange(startDate, endDate)
    }
    return {
      totalCount: consumptions.length,
      totalAmount: consumptions.reduce((sum, c) => sum + c.amount, 0)
    }
  },

  // 按服务类型统计金额
  getStatsByServiceType(startDate?: string, endDate?: string): Record<string, number> {
    let consumptions = this.getAll()
    if (startDate && endDate) {
      consumptions = this.getByDateRange(startDate, endDate)
    }
    const stats: Record<string, number> = {}
    consumptions.forEach(c => {
      stats[c.serviceType] = (stats[c.serviceType] || 0) + c.amount
    })
    return stats
  },

  // 按服务类型统计人数
  getCountByServiceType(startDate?: string, endDate?: string): Record<string, number> {
    let consumptions = this.getAll()
    if (startDate && endDate) {
      consumptions = this.getByDateRange(startDate, endDate)
    }
    const stats: Record<string, number> = {}
    consumptions.forEach(c => {
      stats[c.serviceType] = (stats[c.serviceType] || 0) + 1
    })
    return stats
  },

  // 按美发师统计金额
  getStatsByHairstylist(startDate?: string, endDate?: string): Record<string, number> {
    let consumptions = this.getAll()
    if (startDate && endDate) {
      consumptions = this.getByDateRange(startDate, endDate)
    }
    const stats: Record<string, number> = {}
    consumptions.forEach(c => {
      if (c.hairstylist) {
        stats[c.hairstylist] = (stats[c.hairstylist] || 0) + c.amount
      }
    })
    return stats
  },

  // 按美发师统计人数
  getCountByHairstylist(startDate?: string, endDate?: string): Record<string, number> {
    let consumptions = this.getAll()
    if (startDate && endDate) {
      consumptions = this.getByDateRange(startDate, endDate)
    }
    const stats: Record<string, number> = {}
    consumptions.forEach(c => {
      if (c.hairstylist) {
        stats[c.hairstylist] = (stats[c.hairstylist] || 0) + 1
      }
    })
    return stats
  }
}
