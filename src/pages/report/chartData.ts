// 今日消费时段分布柱状图
export const useTimeDistributionChart = (data: number[]) => {
  return {
    xAxis: {
      data: ['9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#14b8a6'
        }
      },
      axisLabel: {
        show: true,
        color: '#6b7280',
        fontSize: 10
      }
    },
    grid: {
      left: 30,
      right: 20,
      bottom: 30,
      top: 20,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      padding: [8, 12]
    },
    yAxis: {
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        color: '#6b7280',
        fontSize: 10
      }
    },
    series: {
      type: 'bar',
      data: data,
      animationDuration: 800,
      color: '#14b8a6',
      barWidth: 20,
      itemStyle: {
        borderRadius: [4, 4, 0, 0]
      }
    }
  }
}

// 服务类型分布饼图
export const useServiceTypePieChart = (data: { name: string; value: number }[]) => {
  return {
    tooltip: {
      trigger: 'item',
      padding: [8, 12]
    },
    legend: {
      bottom: 0,
      left: 'center',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#6b7280',
        fontSize: 11
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '40%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold',
            color: '#1f2937'
          }
        },
        labelLine: {
          show: false
        },
        data: data,
        color: ['#14b8a6', '#0d9488', '#ef4444', '#f59e0b', '#8b5cf6']
      }
    ]
  }
}

// 月度趋势折线图
export const useMonthlyTrendChart = (rechargeData: number[], consumeData: number[]) => {
  return {
    xAxis: {
      data: Array.from({ length: 31 }, (_, i) => `${i + 1}日`),
      boundaryGap: false,
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        show: true,
        color: '#6b7280',
        fontSize: 10,
        interval: 2
      }
    },
    grid: {
      left: 40,
      right: 20,
      bottom: 30,
      top: 30,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      },
      padding: [8, 12]
    },
    legend: {
      top: 0,
      left: 'center',
      data: ['充值次数', '消费次数'],
      textStyle: {
        color: '#6b7280',
        fontSize: 11
      }
    },
    yAxis: {
      axisTick: {
        show: false
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#f3f4f6',
          type: 'dashed'
        }
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        show: true,
        color: '#6b7280',
        fontSize: 10
      }
    },
    series: [
      {
        name: '充值次数',
        smooth: true,
        type: 'line',
        data: rechargeData,
        animationDuration: 800,
        symbol: 'circle',
        color: '#14b8a6',
        symbolSize: 6,
        lineStyle: {
          color: '#14b8a6',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(20, 184, 166, 0.3)' },
              { offset: 1, color: 'rgba(20, 184, 166, 0.05)' }
            ]
          }
        }
      },
      {
        name: '消费次数',
        smooth: true,
        type: 'line',
        data: consumeData,
        animationDuration: 800,
        symbol: 'circle',
        color: '#ef4444',
        symbolSize: 6,
        lineStyle: {
          color: '#ef4444',
          width: 2
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.05)' }
            ]
          }
        }
      }
    ]
  }
}
