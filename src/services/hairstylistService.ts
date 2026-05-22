import type { Hairstylist } from '@/types'
import { db } from './db'

// 生成唯一ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

export const hairstylistService = {
  // 获取所有美发师
  getAll(): Hairstylist[] {
    const data = db.getDB()
    return data.hairstylists
  },

  // 添加美发师
  add(hairstylist: Omit<Hairstylist, 'id'>): Hairstylist {
    const data = db.getDB()
    const newHairstylist: Hairstylist = {
      ...hairstylist,
      id: generateId()
    }
    data.hairstylists.push(newHairstylist)
    db.setDB(data)
    return newHairstylist
  },

  // 更新美发师
  update(id: string, hairstylist: Partial<Hairstylist>): Hairstylist | undefined {
    const data = db.getDB()
    const index = data.hairstylists.findIndex(h => h.id === id)
    if (index === -1) return undefined
    data.hairstylists[index] = { ...data.hairstylists[index], ...hairstylist }
    db.setDB(data)
    return data.hairstylists[index]
  },

  // 删除美发师
  delete(id: string): boolean {
    const data = db.getDB()
    const index = data.hairstylists.findIndex(h => h.id === id)
    if (index === -1) return false
    data.hairstylists.splice(index, 1)
    db.setDB(data)
    return true
  }
}
