import type { Member } from '@/types'
import { db } from './db'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const memberService = {
  // 获取所有会员
  getAll(): Member[] {
    const data = db.getDB()
    return data.members
  },

  // 根据ID获取会员
  getById(id: string): Member | undefined {
    const data = db.getDB()
    return data.members.find(m => m.id === id)
  },

  // 根据手机号查找会员
  getByPhone(phone: string): Member | undefined {
    const data = db.getDB()
    return data.members.find(m => m.phone === phone)
  },

  // 搜索会员
  search(keyword: string): Member[] {
    const data = db.getDB()
    if (!keyword) return data.members
    const kw = keyword.toLowerCase()
    return data.members.filter(m =>
      m.name.toLowerCase().includes(kw) ||
      m.phone.includes(kw)
    )
  },

  // 添加会员
  add(member: Omit<Member, 'id' | 'createDate'>): Member {
    const data = db.getDB()
    const newMember: Member = {
      ...member,
      id: generateId(),
      createDate: new Date().toISOString()
    }
    data.members.unshift(newMember)
    db.setDB(data)
    return newMember
  },

  // 更新会员
  update(id: string, member: Partial<Member>): Member | undefined {
    const data = db.getDB()
    const index = data.members.findIndex(m => m.id === id)
    if (index === -1) return undefined
    data.members[index] = { ...data.members[index], ...member }
    db.setDB(data)
    return data.members[index]
  },

  // 删除会员
  delete(id: string): boolean {
    const data = db.getDB()
    const index = data.members.findIndex(m => m.id === id)
    if (index === -1) return false
    data.members.splice(index, 1)
    db.setDB(data)
    return true
  },

  // 更新会员余额
  updateBalance(id: string, delta: number): Member | undefined {
    const data = db.getDB()
    const index = data.members.findIndex(m => m.id === id)
    if (index === -1) return undefined
    data.members[index].balance += delta
    db.setDB(data)
    return data.members[index]
  }
}
