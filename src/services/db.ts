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

function getDB(): DBData {
  const data = uni.getStorageSync(DB_KEY)
  return data || {
    members: [],
    recharges: [],
    consumptions: [],
    serviceTypes: [],
    hairstylists: []
  }
}

function setDB(data: DBData) {
  uni.setStorageSync(DB_KEY, data)
}

export const db = {
  getDB,
  setDB
}
