<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { logPromotional } from '@/utils/log'
onLaunch(() => {
  // 控制台打印项目宣传信息
  logPromotional()
  // #ifdef MP-WEIXIN
  // 更新版本提示
  if (wx.canIUse('getUpdateManager')) {
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      if (res.hasUpdate) {
        updateManager.onUpdateReady(function () {
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                updateManager.applyUpdate()
              }
            }
          })
        })
        updateManager.onUpdateFailed(function () {
          wx.showModal({
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
          })
        })
      }
    })
  } else {
    wx.showModal({
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    })
  }
  // #endif
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>

<style>
/* 默认主题 */
:root page {
  color: #000000;
  background: #f5f5f5;
  --theme-bg-color: #ffffff;
}
</style>
