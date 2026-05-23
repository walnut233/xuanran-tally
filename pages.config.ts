import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  // 你也可以定义 pages 字段，它具有最高的优先级。
  pages: [],
  globalStyle: {
    // 导航栏字体颜色
    navigationBarTextStyle: '@navTxtStyle',
    // 导航栏背景色
    navigationBarBackgroundColor: '@navBgColor',
    // 导航栏背景底色
    backgroundColor: '@bgColor'
  },
  tabBar: {
    color: '#9ca3af',
    selectedColor: '#0d9488',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/home-active.png',
      },
      {
        pagePath: 'pages/member/list',
        text: '会员',
        iconPath: 'static/tabbar/member.png',
        selectedIconPath: 'static/tabbar/member-active.png',
      },
      {
        pagePath: 'pages/recharge/index',
        text: '充值',
        iconPath: 'static/tabbar/recharge.png',
        selectedIconPath: 'static/tabbar/recharge-active.png',
      },
      {
        pagePath: 'pages/consumption/index',
        text: '消费',
        iconPath: 'static/tabbar/consume.png',
        selectedIconPath: 'static/tabbar/consume-active.png',
      },
    ],
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue'
    }
  }
})
