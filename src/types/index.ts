// 会员类型
export interface Member {
  id: string
  name: string
  phone: string
  gender?: '男' | '女'
  birthday?: string
  createDate: string
  remainingHaircuts: number
  remark?: string
}

// 充值记录类型
export interface Recharge {
  id: string
  memberId: string
  haircutCount: number
  amount: number
  paymentMethod: string
  rechargeTime: string
  remark?: string
}

// 消费记录类型
export interface Consumption {
  id: string
  memberId: string
  serviceType: string
  usedHaircuts: number
  hairstylist?: string
  consumptionTime: string
  remark?: string
}

// 服务类型
export interface ServiceType {
  id: string
  name: string
  haircutCost: number
}

// 美发师类型
export interface Hairstylist {
  id: string
  name: string
}
