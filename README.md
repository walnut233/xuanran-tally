<p align="center">
  <a href="#">
    <img width="160" src="./src/static/logo.png">
  </a>
</p>

<h1 align="center">
  <b>渲染记账</b>
</h1>

<p align="center">
  一款专为理发店设计的单机版会员记卡系统，方便管理会员、记录充值和消费。
</p>

## 功能特性

- ✅ **会员管理** - 会员建档、编辑、余额查询
- ✅ **充值管理** - 会员充值、充值历史记录
- ✅ **消费管理** - 快速消费、消费历史记录
- ✅ **梯度定价** - 不同会员梯度享受不同服务价格
- ✅ **报表统计** - 日报、月报、会员报表统计
- ✅ **数据备份** - 本地数据备份与恢复
- ✅ **数据导出** - 导出数据为 JSON 格式

## 技术栈

- **框架**: uni-app + Vue3
- **语言**: TypeScript
- **构建**: Vite
- **样式**: Unocss + WotUi
- **存储**: Local Storage（uni.setStorageSync）

## 支持平台

| H5  | IOS | 安卓 | 微信小程序 |
| --- | --- | ---- | ---------- |
| ✔️  | ✔️  | ✔️   | ✔️         |

## 快速开始

```bash
# 安装依赖
pnpm i

# 开发 H5
pnpm dev:h5

# 开发微信小程序
pnpm dev:mp-weixin

# 打包
pnpm build:h5
pnpm build:mp-weixin
```

## 开发说明

- 推荐使用 **VSCode** 开发，项目已配置好开发环境
- 使用 **HBuilderX** 开发可直接打开项目，点击运行到对应平台即可
- 数据存储在本地，不需要后端服务器

## 项目结构

```
src/
├── pages/              # 页面视图
│   ├── index/         # 首页
│   ├── member/        # 会员模块
│   ├── recharge/      # 充值模块
│   ├── consumption/   # 消费模块
│   ├── report/        # 报表统计
│   └── settings/      # 设置页面
├── services/          # 业务逻辑服务
├── types/             # TypeScript 类型定义
└── static/            # 静态资源
```

## 主要页面

1. **首页** - 快速操作入口、最近记录
2. **会员** - 会员列表、会员详情、会员编辑
3. **充值** - 快速充值、充值历史
4. **消费** - 快速消费、消费历史
5. **报表** - 日报、月报、会员报表
6. **设置** - 店铺设置、数据管理

## 版本历史

查看 [CHANGELOG.md](./CHANGELOG.md) 了解版本更新历史。

## 许可证

MIT © 2024-present
