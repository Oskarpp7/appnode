<template>
  <div class="role-card p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <div v-if="showPeriodSelector" class="flex space-x-2">
        <button
          v-for="period in periods"
          :key="period.value"
          @click="selectedPeriod = period.value"
          :class="[
            'px-3 py-1 text-sm font-medium rounded-lg transition-colors',
            selectedPeriod === period.value
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          ]"
        >
          {{ period.label }}
        </button>
      </div>
    </div>
    
    <div class="relative" :style="{ height: height + 'px' }">
      <canvas ref="chartCanvas"></canvas>
      
      <!-- Loading skeleton -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div class="animate-pulse-soft">
          <div class="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div class="h-2 bg-gray-200 rounded w-24"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default {
  name: 'TrendLine',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true,
      validator: (data) => data.labels && data.datasets
    },
    variant: {
      type: String,
      default: 'default'
    },
    height: {
      type: Number,
      default: 300
    },
    showPeriodSelector: {
      type: Boolean,
      default: false
    },
    periods: {
      type: Array,
      default: () => [
        { label: '7D', value: '7d' },
        { label: '30D', value: '30d' },
        { label: '3M', value: '3m' },
        { label: '12M', value: '12m' }
      ]
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['period-change'],
  setup(props, { emit }) {
    const chartCanvas = ref(null)
    const chartInstance = ref(null)
    const selectedPeriod = ref('30d')

    const getColorsByVariant = (variant) => {
      const colorMap = {
        'super-admin': {
          primary: '#8b5cf6',
          gradient: ['rgba(139, 92, 246, 0.1)', 'rgba(139, 92, 246, 0.05)']
        },
        'admin-centre': {
          primary: '#3b82f6',
          gradient: ['rgba(59, 130, 246, 0.1)', 'rgba(59, 130, 246, 0.05)']
        },
        'coordinador': {
          primary: '#f97316',
          gradient: ['rgba(249, 115, 22, 0.1)', 'rgba(249, 115, 22, 0.05)']
        },
        'monitor': {
          primary: '#eab308',
          gradient: ['rgba(234, 179, 8, 0.1)', 'rgba(234, 179, 8, 0.05)']
        },
        'familia': {
          primary: '#ec4899',
          gradient: ['rgba(236, 72, 153, 0.1)', 'rgba(236, 72, 153, 0.05)']
        }
      }
      return colorMap[variant] || colorMap['admin-centre']
    }

    const createChart = () => {
      if (!chartCanvas.value || !props.data) return

      const colors = getColorsByVariant(props.variant)
      const ctx = chartCanvas.value.getContext('2d')

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, props.height)
      gradient.addColorStop(0, colors.gradient[0])
      gradient.addColorStop(1, colors.gradient[1])

      const config = {
        type: 'line',
        data: {
          ...props.data,
          datasets: props.data.datasets.map(dataset => ({
            ...dataset,
            borderColor: colors.primary,
            backgroundColor: gradient,
            pointBackgroundColor: colors.primary,
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: 0.4,
            fill: true
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: {
            intersect: false,
            mode: 'index'
          },
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: colors.primary,
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: false,
              titleFont: {
                size: 12,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              border: {
                display: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12
                }
              }
            },
            y: {
              grid: {
                color: '#f3f4f6',
                drawBorder: false
              },
              border: {
                display: false
              },
              ticks: {
                color: '#6b7280',
                font: {
                  size: 12
                },
                callback: function(value) {
                  if (value >= 1000000) {
                    return (value / 1000000).toFixed(1) + 'M'
                  } else if (value >= 1000) {
                    return (value / 1000).toFixed(1) + 'K'
                  }
                  return value
                }
              }
            }
          },
          elements: {
            point: {
              hoverBackgroundColor: colors.primary
            }
          }
        }
      }

      chartInstance.value = new Chart(ctx, config)
    }

    const updateChart = () => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }
      nextTick(() => {
        createChart()
      })
    }

    watch(() => props.data, updateChart, { deep: true })
    watch(() => props.variant, updateChart)

    watch(selectedPeriod, (newPeriod) => {
      emit('period-change', newPeriod)
    })

    onMounted(() => {
      createChart()
    })

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }
    })

    return {
      chartCanvas,
      selectedPeriod
    }
  }
}
</script>
