import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { ref } from 'vue'
import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const theme = ref<'light' | 'dark'>('light')
const themeVars = ref<ConfigProviderThemeVars>()

export function useTheme(vars?: ConfigProviderThemeVars) {
  const store = useUserStore()
  const { userInfo } = storeToRefs(store)

  /* 替换 Wot 组件的样式 */
  vars && (themeVars.value = vars)

  const setTheme = () => {
    nextTick(() => {
      if (userInfo.value.followSystem) {
        // #ifdef APP-PLUS
        plus.nativeUI.setUIStyle('auto') // 设置应用主题为跟随系统（android下能够切换，IOS 未测试）
        theme.value = 'light'
        // #endif
        // #ifndef APP-PLUS
        uni.getSystemInfo({
          success: (res: any) => {
            const osThemeInfo = res.hostTheme ? res.hostTheme : res.osTheme
            store.setUserInfo({ theme: osThemeInfo })
            theme.value = osThemeInfo
            uni.setNavigationBarColor({
              frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
              backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
              animation: {
                duration: 400,
                timingFunc: 'easeIn'
              }
            })
          }
        })
        // #endif
      } else {
        // #ifdef APP-PLUS
        plus.nativeUI.setUIStyle('light') // 设置应用主题为跟随系统（android下能够切换，IOS 未测试）
        // #endif
        uni.setNavigationBarColor({
          frontColor: theme.value === 'light' ? '#000000' : '#ffffff',
          backgroundColor: theme.value === 'light' ? '#ffffff' : '#000000',
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
      }
    })
  }

  watch(theme, () => {
    store.setUserInfo({ theme: theme.value })
    setTheme()
  })

  onShow(() => {
    setTheme()
  })

  return {
    theme,
    themeVars,
    setTheme
  }
}
