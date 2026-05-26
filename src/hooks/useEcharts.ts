// 小程序中引入 echarts
// #ifndef APP-PLUS || H5
const echarts = require('../uni_modules/lime-echart/static/echarts.min')
// #endif

// APP 与 H5 引入 echarts
// #ifdef APP-PLUS || H5
import * as echartsAppOrH5 from 'echarts'
// #endif

import { ref, isRef } from 'vue'

// echarts 图表 Hooks
export const useEcharts = (options): any => {
  // echarts 图实例
  const chartRef = ref(null)
  // 创建响应式选项
  const chartOptions = ref(isRef(options) ? options.value : options)

  // echarts 图绘制函数
  const draw = () => {
    setTimeout(async () => {
      if (!chartRef.value) return
      // #ifndef APP-PLUS || H5
      const chart = await chartRef.value.init(echarts)
      chart.setOption(chartOptions.value, true)
      // #endif
      // #ifdef APP-PLUS || H5
      const chartAPP = await chartRef.value.init(echartsAppOrH5)
      chartAPP.setOption(chartOptions.value, true)
      // #endif
    }, 300)
  }
  // 这里就封装巧妙之处，如果是对象，那么需要重命名，而是是数组，无需重命名
  return [chartRef, chartOptions, draw]
}
