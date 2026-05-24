// 本地数据库服务（使用 uni.setStorage 模拟）
// 后续可替换为 SQLite

const DB_KEY = 'haircut_salon_db'

interface DBData {
  members: any[]
  recharges: any[]
  consumptions: any[]
  serviceTypes: any[]
  hairstylists: any[]
}

// 数据迁移：将旧的 remainingHaircuts 转换为 balance
function migrateData(data: any): DBData {
  if (!data) {
    return {
      members: [],
      recharges: [],
      consumptions: [],
      serviceTypes: [],
      hairstylists: []
    }
  }

  // 迁移会员数据
  if (data.members && Array.isArray(data.members)) {
    data.members = data.members.map((member: any) => {
      if (typeof member.balance !== 'number') {
        member.balance = member.remainingHaircuts || 0
      }
      return member
    })
  }

  // 迁移充值数据
  if (data.recharges && Array.isArray(data.recharges)) {
    data.recharges = data.recharges.map((recharge: any) => {
      if (recharge.haircutCount !== undefined && recharge.amount === undefined) {
        recharge.amount = recharge.haircutCount * 30 // 默认按30元一次计算
      }
      return recharge
    })
  }

  // 迁移消费数据
  if (data.consumptions && Array.isArray(data.consumptions)) {
    data.consumptions = data.consumptions.map((consumption: any) => {
      if (consumption.usedHaircuts !== undefined && consumption.amount === undefined) {
        consumption.amount = consumption.usedHaircuts * 30 // 默认按30元一次计算
      }
      return consumption
    })
  }

  return data
}

function getDB(): DBData {
  const data = uni.getStorageSync(DB_KEY)
  return migrateData(data)
}

function setDB(data: DBData) {
  uni.setStorageSync(DB_KEY, data)
}

function clearDB() {
  const emptyData: DBData = {
    members: [],
    recharges: [],
    consumptions: [],
    serviceTypes: [],
    hairstylists: []
  }
  uni.setStorageSync(DB_KEY, emptyData)
}

export const db = {
  getDB,
  setDB,
  clearDB
}
