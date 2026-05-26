
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

# 理发店计费记卡系统 - 项目设计文档

## 1. 项目概述

为实体理发店开发的单机版计费记卡管理系统，用于会员管理、消费记录、充值管理及报表统计。

- **技术栈**: uni-plus (Uniapp + Vue3 + TS + Vite + Pinia + Unocss + WotUi)
- **数据存储**: uni.setStorageSync (Local Storage)
- **目标平台**: Android (优先), iOS, 小程序 (后续)

## 2. Common Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development
pnpm dev:h5              # H5 development
pnpm dev:mp-weixin       # WeChat mini program
pnpm dev:custom          # Custom platform selection

# Build
pnpm build:h5            # Build for H5
pnpm build:mp-weixin     # Build for WeChat mini program

# Code quality
pnpm type-check          # TypeScript type checking
pnpm cz                  # Commit with commitizen

# Lint (runs automatically on commit via husky)
# prettier, eslint, stylelint all configured
```

**Environment Requirements**: Node &gt;= 18, pnpm &gt;= 7.30

## 3. High-Level Architecture

### 3.1 Project Structure

```
src/
├── pages/                    # Page views
│   ├── index/index.vue      # Home (tabBar)
│   ├── member/              # Member module
│   │   ├── list.vue         # Member list (tabBar)
│   │   ├── detail.vue       # Member detail
│   │   └── edit.vue         # Add/edit member
│   ├── recharge/index.vue   # Recharge (tabBar)
│   ├── consumption/index.vue # Consumption (tabBar)
│   ├── report/index.vue     # Reports
│   ├── settings/index.vue   # Settings
│   ├── tierSettings/index.vue # Tier pricing settings
│   ├── serviceType/list.vue # Service types
│   └── hairstylist/list.vue # Hairstylists
├── services/                # Business logic layer
│   ├── db.ts                # Local storage DB wrapper
│   ├── memberService.ts
│   ├── rechargeService.ts
│   ├── consumptionService.ts
│   ├── serviceTypeService.ts
│   ├── hairstylistService.ts
│   └── settingsService.ts
├── components/              # Reusable components
│   └── BottomNavigation.vue # Custom bottom navigation
├── types/index.ts           # TypeScript interfaces
└── static/                  # Static assets (tabbar icons, etc.)
```

### 3.2 Core Types (src/types/index.ts)

| Type | Description |
|------|-------------|
| `Member` | Member profile with `balance` and `tierId` |
| `MemberTier` | Tiered pricing: initial recharge + service prices |
| `TierPrice` | Price per service for a tier |
| `Recharge` | Recharge record with `amount` (for reports) |
| `Consumption` | Consumption record with `amount` |
| `ServiceType` | Service definitions |
| `Hairstylist` | Hairstylist definitions |

### 3.3 Data Flow

```
Pages (Vue) → Services (CRUD) → db.ts → uni.setStorageSync
     ↑                                                      ↓
     └──────── computed properties / reactive refs ─────────┘
```

All services use `db.ts` which handles automatic data migration from older schema versions.

### 3.4 TabBar Navigation

4 main tabBar pages:
1. 首页 (Home)
2. 会员 (Member list)
3. 充值 (Recharge)
4. 消费 (Consumption)

**Important**: To navigate between tabBar pages, use `uni.switchTab` instead of `uni.navigateTo`. To pass data between tabBar pages, use `(getApp() as any).pendingMemberId`.

### 3.5 Page Refresh Pattern

All pages refresh data in `onShow()` lifecycle hook. Recharge and consumption pages also use `watch` on their active tab state to refresh data when switching tabs within the same page.

## 4. Key Implementation Details

### 4.1 Balance-Based System

The system was recently refactored from haircut-count-based to balance-based:
- `Member.balance`: Main currency (stored as number)
- `MemberTier`: Optional tier that defines service prices based on initial recharge
- `Recharge.amount`: Tracks recharge amounts (for reporting only - doesn't directly set balance; services update member balance via `updateBalance()`)
- `Consumption.amount`: Service cost deducted from balance

### 4.2 Tiered Pricing

Located in Settings → 梯度设置 (Tier Settings):
- Tiers define initial recharge amount and per-service prices
- Members can be assigned a tier during creation/edit
- Remaining haircut count is calculated as `floor(balance / tierPrice)`

### 4.3 Date Formatting

**No timezone suffixes** (GMT+0800) anywhere in the UI. Date helpers format times consistently across all pages.

### 4.4 Recent Activity (Home Page)

Only shows today and yesterday data, sorted reverse chronologically.

## 5. Current Status

### 5.1 Completed (as of 2026-05-25)

- ✅ Core features: Member management, recharge, consumption
- ✅ Tiered pricing system
- ✅ Balance-based accounting
- ✅ Reports (daily, monthly, member) with export
- ✅ Data persistence with uni.setStorageSync
- ✅ All UI pages and navigation
- ✅ Date/time formatting without timezone
- ✅ Page refresh onShow/tab switch
- ✅ Quick actions for consumption
- ✅ Search/filter for records

### 5.2 Pending Tasks

See task list in Claude Code for:
- Data visualization charts (Task #17)
- Member list sorting (Task #18)
- Settings page placeholder improvements (Task #19)

## 6. Configuration Files

| File | Purpose |
|------|---------|
| `pages.config.ts` | TabBar config, route definitions |
| `vite.config.ts` | Vite build config |
| `unocss.config.ts` | UnoCSS utility classes |
| `.eslintrc`, `.prettierrc`, `stylelint.config.*` | Linting/formatting |

