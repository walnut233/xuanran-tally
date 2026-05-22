# 理发店计费记卡系统 - 项目上下文

## 项目概述

为实体理发店开发的单机版计费记卡管理系统，用于会员管理、消费记录、充值管理及简单报表统计。

- **项目名称**: uni-plus 理发店系统
- **技术栈**: uni-app + Vue3 + TypeScript + Vite + Pinia + Unocss + WotUi
- **目标平台**: Android（优先），后续可扩展 iOS 和小程序
- **数据存储**: 本地 SQLite / Local Storage

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
- `remainingHaircuts`: 剩余剪发次数
- `remark`: 备注

### 充值记录（Recharge）

会员的充值操作记录（增加剪发次数）。

**属性**:
- `id`: 记录ID
- `memberId`: 会员ID
- `haircutCount`: 增加的剪发次数
- `amount`: 充值金额（仅用于报表统计，不关联会员余额）
- `paymentMethod`: 支付方式（现金/微信/支付宝等）
- `rechargeTime`: 充值时间
- `remark`: 备注

### 消费记录（Consumption）

会员的消费操作记录（使用剪发次数）。

**属性**:
- `id`: 记录ID
- `memberId`: 会员ID
- `serviceType`: 服务类型（剪发/染发/烫发等）
- `usedHaircuts`: 使用的剪发次数
- `hairstylist`: 美发师
- `consumptionTime`: 消费时间
- `remark`: 备注

### 服务类型（ServiceType）

理发店提供的服务类型。

**属性**:
- `id`: 类型ID
- `name`: 类型名称（剪发/染发/烫发等）
- `haircutCost`: 消耗的剪发次数

### 美发师（Hairstylist）

理发店的美发师。

**属性**:
- `id`: 美发师ID
- `name`: 姓名

## 业务流程

### 会员建档流程

1. 用户点击"新增会员"
2. 填写会员基本信息（姓名、手机号等）
3. 系统保存会员记录

### 充值流程

1. 选择会员（支持姓名/手机尾号搜索）
2. 输入增加的剪发次数
3. 输入充值金额（仅用于报表统计）
4. 选择支付方式
5. 确认充值，更新会员剩余剪发次数
6. 生成充值记录（包含金额用于报表）

### 消费流程

1. 选择会员
2. 选择服务类型
3. 系统确认需要消耗的剪发次数
4. 选择美发师
5. 确认消费，扣减会员剩余剪发次数
6. 生成消费记录

## 数据模型关系

```
Member (1) ──→ (N) Recharge
Member (1) ──→ (N) Consumption
Consumption (N) ──→ (1) Hairstylist
```

## 核心业务规则

1. **会员标识**: 手机号作为会员唯一标识
2. **计次方式**: 所有服务通过剪发次数进行结算
3. **充值金额**: 充值时记录金额，仅用于报表统计，不关联会员余额
4. **支付方式**: 支持现金、微信、支付宝等（仅用于充值时）
5. **时间记录**: 充值和消费时间自动记录
6. **数据安全**: 本地数据需支持备份

## 技术约定

### 目录结构

```
src/
├── views/           # 页面视图
├── components/      # 公共组件
├── stores/          # Pinia 状态管理
├── services/        # 业务逻辑服务
├── utils/           # 工具函数
├── types/           # TypeScript 类型定义
└── assets/          # 静态资源
```

### 命名约定

- 页面文件: 小写驼峰，如 `memberList.vue`
- 组件文件: 大驼峰，如 `MemberCard.vue`
- 类型定义: 大驼峰，如 `interface Member`
- Store: 小写驼峰 + `Store`，如 `useMemberStore`

### UI 配色

- 主色调: #409EFF（蓝色）
- 辅助色: #67C23A（绿色）
- 警示色: #F56C6C（红色）
- 背景色: #F5F7FA（浅灰色）

### 开发流程约定

1. **计划进度同步**: 每轮开发前，先告知用户当前还有哪些计划中的功能没有开发
2. **功能确认**: 向用户确定这轮对话中要开发的功能，得到明确答复后再开始开发
3. **单功能提交**: 开发完单个功能后，立即提交 git  commit，保持提交粒度适中
4. **提交信息**: 使用规范的 commit message，格式：`emoji type: 描述信息`

## 参考文档

- [项目设计文档](./CLAUDE.md)
- [uni-plus 文档](https://damaicoding.github.io/uni-plus-doc/)
- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
