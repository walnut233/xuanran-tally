import type { Recharge } from '@/types'
import { db } from './db'
import { memberService } from './memberService'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const rechargeService = {
  // 获取所有充值记录
  getAll(): Recharge[] {
    const data = db.getDB()
    return data.recharges
  },

  // 根据ID获取充值记录
  getById(id: string): Recharge | undefined {
    const data = db.getDB()
    return data.recharges.find(r => r.id === id)
  },

  // 根据会员ID获取充值记录
  getByMemberId(memberId: string): Recharge[] {
    const data = db.getDB()
    return data.recharges.filter(r => r.memberId === memberId)
  },

  // 添加充值记录
  add(recharge: Omit<Recharge, 'id' | 'rechargeTime'>): Recharge {
    const data = db.getDB()
    const newRecharge: Recharge = {
      ...recharge,
      id: generateId(),
      rechargeTime: new Date().toISOString()
    }
    data.recharges.unshift(newRecharge)
    db.setDB(data)

    // 更新会员剩余剪发次数
    memberService.updateRemainingHaircuts(recharge.memberId, recharge.haircutCount)

    return newRecharge
  },

  // 获取指定时间范围内的充值记录
  getByDateRange(startDate: string, endDate: string): Recharge[] {
    const data = db.getDB()
    return data.recharges.filter(r =>
      r.rechargeTime >= startDate && r.rechargeTime <= endDate
    )
  },

  // 获取充值统计
  getStats(startDate?: string, endDate?: string): { totalCount: number; totalAmount: number } {
    let recharges = this.getAll()
    if (startDate && endDate) {
      recharges = this.getByDateRange(startDate, endDate)
    }
    return {
      totalCount: recharges.reduce((sum, r) => sum + r.haircutCount, 0),
      totalAmount: recharges.reduce((sum, r) => sum + r.amount, 0)
    }
  }
}
