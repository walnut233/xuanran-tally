import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Member } from '@/types'
import { memberService } from '@/services/memberService'

export const useMemberStore = defineStore('member', () => {
  const members = ref<Member[]>([])

  // 加载会员列表
  function load() {
    members.value = memberService.getAll()
  }

  // 添加会员
  function add(member: Omit<Member, 'id' | 'createDate'>) {
    const newMember = memberService.add(member)
    members.value.unshift(newMember)
    return newMember
  }

  // 更新会员
  function update(id: string, member: Partial<Member>) {
    const updated = memberService.update(id, member)
    if (updated) {
      const index = members.value.findIndex(m => m.id === id)
      if (index !== -1) {
        members.value[index] = updated
      }
    }
    return updated
  }

  // 删除会员
  function remove(id: string) {
    const success = memberService.delete(id)
    if (success) {
      members.value = members.value.filter(m => m.id !== id)
    }
    return success
  }

  // 搜索会员
  function search(keyword: string) {
    return memberService.search(keyword)
  }

  return {
    members,
    load,
    add,
    update,
    remove,
    search
  }
})
