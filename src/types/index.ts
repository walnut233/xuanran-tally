// 会员类型
export interface Member {
  id: string
  name: string
  phone: string
  gender?: '男' | '女'
  birthday?: string
  createDate: string
  balance: number // 会员余额
  tierId?: string // 会员梯度ID
  remark?: string
}

// 梯度价格配置
export interface TierPrice {
  serviceName: string // 服务名称
  price: number // 对应价格
}

// 会员梯度类型
export interface MemberTier {
  id: string
  name: string // 梯度名称，如"200元档"、"500元档"
  initialRecharge: number // 初始充值金额
  prices: TierPrice[] // 各服务项目的价格
}

// 充值记录类型
export interface Recharge {
  id: string
  memberId: string
  amount: number // 充值金额
  paymentMethod: string
  rechargeTime: string
  remark?: string
}

// 消费记录类型
export interface Consumption {
  id: string
  memberId: string
  serviceType: string
  amount: number // 消费金额
  hairstylist?: string
  consumptionTime: string
  remark?: string
}

// 服务类型
export interface ServiceType {
  id: string
  name: string
}

// 美发师类型
export interface Hairstylist {
  id: string
  name: string
}
