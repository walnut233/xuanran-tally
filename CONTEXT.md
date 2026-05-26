# 渲染记账 - 项目上下文

## 项目概述

为实体理发店开发的单机版计费记卡管理系统，用于会员管理、消费记录、充值管理及报表统计。

- **项目名称**: 渲染记账
- **技术栈**: uni-app + Vue3 + TypeScript + Vite + Unocss + WotUi
- **目标平台**: Android（优先），iOS、微信小程序
- **数据存储**: Local Storage（uni.setStorageSync）
- **当前版本**: 1.0.0
- **开发进度**: 100%（核心功能已全部完成）

## 当前状态 (2026-05-26)

### ✅ 已完成
- 完整的项目基础框架（uni-plus）
- 底部导航栏配置与图标（首页、会员、充值、消费）
- 所有业务页面的UI和完整业务逻辑
- TypeScript 类型定义
- Services 层完整实现
- 本地数据持久化与自动迁移
- 会员梯度定价系统
- 完整的报表统计
- 数据备份与恢复功能
- 导出数据功能
- 应用图标与应用名称更新

---

## 核心领域概念

### 会员（Member）

理发店的会员用户。

**属性**:
- `id`: 会员唯一标识
- `name`: 姓名
- `phone`: 手机号（唯一标识）
- `gender`: 性别
- `birthday`: 生日
- `createDate`: 开卡日期
- `balance`: 会员余额（核心字段）
- `tierId`: 会员梯度ID（可选）
- `remark`: 备注

### 会员梯度（MemberTier）

会员价格梯度配置，根据初始充值金额区分不同的服务价格。

**属性**:
- `id`: 梯度ID
- `name`: 梯度名称（如"200元档"、"500元档"）
- `initialRecharge`: 初始充值金额
- `prices`: 各服务项目的价格数组（TierPrice）

### 梯度价格（TierPrice）

梯度下具体服务的价格配置。

**属性**:
- `serviceName`: 服务名称
- `price`: 对应价格

### 充值记录（Recharge）

会员的充值操作记录。

**属性**:
- `id`: 记录ID
- `memberId`: 会员ID
- `amount`: 充值金额
- `paymentMethod`: 支付方式
- `rechargeTime`: 充值时间
- `remark`: 备注

### 消费记录（Consumption）

会员的消费操作记录。

**属性**:
- `id`: 记录ID
- `memberId`: 会员ID
- `serviceType`: 服务类型
- `amount`: 消费金额
- `hairstylist`: 美发师
- `consumptionTime`: 消费时间
- `remark`: 备注

### 服务类型（ServiceType）

理发店提供的服务类型。

**属性**:
- `id`: 类型ID
- `name`: 类型名称

### 美发师（Hairstylist）

理发店的美发师。

**属性**:
- `id`: 美发师ID
- `name`: 姓名

---

## 业务流程

### 会员建档流程

1. 用户点击"新增会员"
2. 填写会员基本信息（姓名、手机号、性别、生日等）
3. 可选择初始余额和会员梯度
4. 系统保存会员记录
5. 如果有初始余额，自动生成"开卡充值"记录

### 充值流程

1. 选择会员（支持姓名/手机尾号搜索）
2. 输入充值金额
3. 选择支付方式
4. 确认充值，增加会员余额
5. 生成充值记录
6. 可按时间筛选查询充值历史

### 消费流程

1. 选择会员（支持姓名/手机尾号搜索）
2. 选择服务类型
3. 根据会员梯度自动计算消费金额
4. 选择美发师
5. 确认消费，扣减会员余额
6. 生成消费记录

### 报表统计流程

1. 选择报表类型（日报/月报/会员报表）
2. 日报/月报可选择日期
3. 查看统计数据

---

## 数据模型关系

```
Member (1) ──→ (N) Recharge
Member (1) ──→ (N) Consumption
Member (N) ──→ (1) MemberTier (可选)
Consumption (N) ──→ (1) Hairstylist
```

---

## 核心业务规则

1. **会员标识**: 手机号作为会员唯一标识
2. **余额模式**: 所有服务通过余额进行结算
3. **梯度定价**: 会员可归属不同梯度，享受不同服务价格
4. **开卡充值**: 新增会员时的初始余额会生成"开卡充值"记录
5. **支付方式**: 支持现金、微信、支付宝、开卡充值等
6. **时间记录**: 充值和消费时间自动记录
7. **数据安全**: 本地数据支持手动备份、恢复
8. **数据迁移**: 支持旧版本数据自动迁移到新版本

---

## 技术约定

### 目录结构

```
src/
├── pages/           # 页面视图
├── components/      # 公共组件
├── hooks/           # 自定义 hooks
├── services/        # 业务逻辑服务
├── utils/           # 工具函数
├── types/           # TypeScript 类型定义
└── static/          # 静态资源
```

### 命名约定

- 页面文件: 小写，如 `list.vue`，按目录组织
- 组件文件: 大驼峰
- 类型定义: 大驼峰
- Hooks: `use` 前缀

### UI 配色

- 主色调: #0d9488（青绿色）
- 辅助色: #14b8a6（浅青绿色）
- 警示色: #ef4444（红色）
- 背景色: #f9fafb（浅灰色）

### 配置文件注意事项

⚠️ **重要**:
- **不要手动编辑**: `src/pages.json` - 由插件自动生成
- **正确配置文件**: `pages.config.ts` - 用于全局配置和 tabBar
- **单页面配置**: 在各 `.vue` 文件的 `<route>` 块中配置

### 底部导航栏

已配置 4 个 tab:
1. 首页 - /pages/index/index
2. 会员 - /pages/member/list
3. 充值 - /pages/recharge/index
4. 消费 - /pages/consumption/index

图标位置: `src/static/tabbar/` (PNG 格式)

### 页面间数据传递

⚠️ **TabBar 页面跳转注意**:
- 跳转到 tabBar 页面必须使用 `uni.switchTab`
- 通过全局变量传递数据: `(getApp() as any).pendingMemberId = memberId`

### 页面刷新机制

所有页面在 `onShow` 生命周期中刷新数据，确保从其他页面返回时显示最新数据。

### 现有页面列表

| 页面 | 路径 | 状态 |
|------|------|------|
| 首页 | /pages/index/index | ✅ 完整实现 |
| 会员列表 | /pages/member/list | ✅ 完整实现 |
| 会员详情 | /pages/member/detail | ✅ 完整实现 |
| 会员编辑 | /pages/member/edit | ✅ 完整实现 |
| 充值 | /pages/recharge/index | ✅ 完整实现 |
| 消费 | /pages/consumption/index | ✅ 完整实现 |
| 报表 | /pages/report/index | ✅ 完整实现 |
| 服务类型 | /pages/serviceType/list | ✅ 完整实现 |
| 美发师 | /pages/hairstylist/list | ✅ 完整实现 |
| 设置 | /pages/settings/index | ✅ 完整实现 |
| 梯度设置 | /pages/tierSettings/index | ✅ 完整实现 |

### Services 层

所有服务都基于 `src/services/db.ts` 提供的数据持久化层：

- `memberService` - 会员 CRUD
- `rechargeService` - 充值记录 CRUD + 统计
- `consumptionService` - 消费记录 CRUD + 统计
- `serviceTypeService` - 服务类型 CRUD
- `hairstylistService` - 美发师 CRUD
- `settingsService` - 设置 + 备份/恢复/导出/导入

---

## 参考文档

- [项目设计文档](./CLAUDE.md)
- [uni-plus 文档](https://damaicoding.github.io/uni-plus-doc/)
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
