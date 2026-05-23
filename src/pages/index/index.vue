<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <div style="min-height: 100vh; background-color: #f9fafb">
    <!-- Custom Status Bar & Header -->
    <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)">
      <!-- Status Bar Spacer -->
      <div style="height: 32px"></div>
      <!-- Header -->
      <div style="padding: 16px 20px">
        <div style="margin-bottom: 4px">
          <h1 style="font-size: 20px; font-weight: 600; color: white; margin: 0">渲染造型</h1>
        </div>
        <p style="color: rgba(255, 255, 255, 0.8); font-size: 14px; margin: 0">今天是个好日子，祝你生意兴隆！</p>
      </div>

      <!-- Tabs -->
      <div style="padding: 0 12px 16px 12px">
        <div style="display: flex; gap: 8px; background: rgba(255, 255, 255, 0.1); padding: 6px">
          <button
            v-for="(tab, index) in tabs"
            :key="tab.id"
            :style="[
              'flex: 1; padding: 10px 16px; font-size: 14px; font-weight: 600; border: none;',
              activeTab === tab.id
                ? 'background: white; color: #0d9488; box-shadow: 0 1px 2px rgba(0,0,0,0.1);'
                : 'color: white;'
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </div>

    <!-- Page Content -->
    <div style="padding: 16px 20px 120px 20px">
      <!-- Quick Tab -->
      <div v-show="activeTab === 'quick'">
        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px">
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">12</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值总人数</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">28</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日消费总人数</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">¥2,580</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值总金额</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">156</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">当前会员总数</div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px">
          <button
            v-for="action in quickActions"
            :key="action.id"
            style="
              aspect-ratio: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 8px;
              background: white;
              border: 1px solid #f3f4f6;
            "
            @click="handleAction(action)"
          >
            <div
              style="
                width: 28px;
                height: 28px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 4px;
                color: #0d9488;
                font-size: 20px;
              "
            >
              <span v-if="action.icon === 'users'">👥</span>
              <span v-else-if="action.icon === 'wallet'">💰</span>
              <span v-else-if="action.icon === 'ticket'">🎫</span>
              <span v-else-if="action.icon === 'settings'">⚙️</span>
              <span v-else>📊</span>
            </div>
            <span style="font-size: 11px; font-weight: 600; color: #1f2937">{{ action.name }}</span>
          </button>
        </div>

        <!-- Recent Activity -->
        <div style="margin-bottom: 24px">
          <div style="display: flex; align-items: center; margin-bottom: 12px">
            <h3
              style="
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                margin: 0;
              "
            >
              最近活动
            </h3>
            <div style="flex: 1"></div>
            <button style="font-size: 12px; font-weight: 500; color: #0d9488; border: none; background: none">
              查看全部
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div
              v-for="item in recentActivity"
              :key="item.id"
              style="
                display: flex;
                align-items: center;
                gap: 14px;
                background: white;
                padding: 16px;
                border: 1px solid #f3f4f6;
              "
            >
              <div
                :style="[
                  'width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 20px;',
                  item.type === 'recharge'
                    ? 'background: #dcfce7; color: #16a34a;'
                    : 'background: #dbeafe; color: #2563eb;'
                ]"
              >
                <span v-if="item.type === 'recharge'">💰</span>
                <span v-else>🎫</span>
              </div>
              <div style="flex: 1; min-width: 0">
                <div style="font-size: 14px; font-weight: 500; color: #1f2937; margin-bottom: 2px">
                  {{ item.name }} - {{ item.action }}
                </div>
                <div style="font-size: 12px; color: #6b7280">{{ item.detail }}</div>
              </div>
              <div style="font-size: 12px; color: #9ca3af">{{ item.time }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Today Tab -->
      <div v-show="activeTab === 'today'">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px">
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">12</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值总人数</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">28</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日消费总人数</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">¥2,580</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">今日充值总金额</div>
          </div>

        </div>

        <!-- Chart Placeholder -->
        <div style="background: white; padding: 20px; border: 1px solid #f3f4f6">
          <div style="font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 16px">今日消费时段分布</div>
          <div style="display: flex; align-items: flex-end; gap: 8px; height: 128px">
            <div style="flex: 1; background: #5eead4; position: relative; height: 30%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                9点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 70%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                10点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 45%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                11点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 25%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                12点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 40%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                13点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 60%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                14点
              </div>
            </div>
            <div style="flex: 1; background: #5eead4; position: relative; height: 85%">
              <div
                style="
                  position: absolute;
                  bottom: -20px;
                  left: 50%;
                  transform: translateX(-50%);
                  font-size: 12px;
                  color: #9ca3af;
                "
              >
                15点
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Month Tab -->
      <div v-show="activeTab === 'month'">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px">
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">620</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">本月消费</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">312</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">本月充值</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">¥68,500</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">充值金额</div>
          </div>
          <div style="background: white; padding: 16px; border: 1px solid #f3f4f6">
            <div style="font-size: 24px; font-weight: 700; color: #0d9488">189</div>
            <div style="font-size: 12px; color: #6b7280; margin-top: 4px">活跃会员</div>
          </div>
        </div>

        <!-- Service Type Distribution -->
        <div style="background: white; padding: 20px; border: 1px solid #f3f4f6; margin-bottom: 20px">
          <div style="font-size: 14px; font-weight: 600; color: #1f2937; margin-bottom: 16px">服务类型分布</div>
          <div style="display: flex; gap: 16px">
            <div style="flex: 1; text-align: center">
              <div style="font-size: 30px; font-weight: 700; color: #0d9488">65%</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px">剪发</div>
            </div>
            <div style="flex: 1; text-align: center">
              <div style="font-size: 30px; font-weight: 700; color: #ef4444">22%</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px">染发</div>
            </div>
            <div style="flex: 1; text-align: center">
              <div style="font-size: 30px; font-weight: 700; color: #9333ea">13%</div>
              <div style="font-size: 12px; color: #6b7280; margin-top: 4px">烫发</div>
            </div>
          </div>
        </div>

        <!-- Top Members -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px">
            <h3
              style="
                font-size: 12px;
                font-weight: 600;
                color: #6b7280;
                letter-spacing: 0.05em;
                text-transform: uppercase;
                margin: 0;
              "
            >
              本月会员充值排行
            </h3>
            <button style="font-size: 12px; font-weight: 500; color: #0d9488; border: none; background: none">
              查看详情
            </button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px">
            <div
              v-for="member in topMembers"
              :key="member.id"
              style="display: flex; align-items: center; gap: 12px; padding: 10px 0"
            >
              <div
                :style="[
                  'width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;',
                  member.rank === 1
                    ? 'background: linear-gradient(135deg, #facc15, #f97316); color: white;'
                    : member.rank === 2
                      ? 'background: linear-gradient(135deg, #d1d5db, #6b7280); color: white;'
                      : member.rank === 3
                        ? 'background: linear-gradient(135deg, #d97706, #92400e); color: white;'
                        : 'background: #ccfbf1; color: #0d9488;'
                ]"
              >
                {{ member.rank }}
              </div>
              <div style="flex: 1">
                <div style="font-size: 14px; font-weight: 500; color: #1f2937">{{ member.name }}</div>
                <div style="font-size: 12px; color: #6b7280">
                  充值 ¥{{ member.amount }} · 剩余 {{ member.remaining }}次
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('quick')

const tabs = [
  { id: 'quick', name: '快捷入口' },
  { id: 'today', name: '今日报表' },
  { id: 'month', name: '本月报表' }
]

const quickActions = [
  { id: 'members', name: '会员', icon: 'users', route: '/pages/member/list' },
  { id: 'recharge', name: '充值', icon: 'wallet', route: '/pages/recharge/index' },
  { id: 'consume', name: '消费', icon: 'ticket', route: '/pages/consumption/index' },
  { id: 'settings', name: '设置', icon: 'settings', route: '/pages/settings/index' }
]

const recentActivity = [
  { id: 1, type: 'recharge', name: '张三', action: '充值', detail: '+10次剪发 · 支付¥500', time: '10:23' },
  { id: 2, type: 'consume', name: '李四', action: '剪发', detail: '-1次 · 发型师阿明', time: '10:15' },
  { id: 3, type: 'consume', name: '王五', action: '染发', detail: '-2次 · 发型师阿杰', time: '09:45' }
]

const topMembers = [
  { id: 1, rank: 1, name: '张总', amount: '5,000', remaining: 88 },
  { id: 2, rank: 2, name: '李女士', amount: '3,000', remaining: 45 },
  { id: 3, rank: 3, name: '王先生', amount: '2,000', remaining: 32 }
]

const handleAction = (action: any) => {
  if (action.route) {
    uni.navigateTo({
      url: action.route
    })
  }
}
</script>
