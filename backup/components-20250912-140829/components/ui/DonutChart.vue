<template>
  <div class="role-card p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      <div v-if="showLegend" class="flex items-center space-x-4">
        <div 
          v-for="(dataset, index) in data.datasets" 
          :key="index"
          class="flex items-center space-x-2"
        >
          <div 
            class="w-3 h-3 rounded-full"
            :style="{ backgroundColor: dataset.backgroundColor[0] || dataset.backgroundColor }"
          ></div>
          <span class="text-sm text-gray-600">{{ dataset.label }}</span>
        </div>
      </div>
    </div>
    
    <div class="relative flex items-center justify-center" :style="{ height: height + 'px' }">
      <canvas ref="chartCanvas"></canvas>
      
      <!-- Center value display -->
      <div 
        v-if="showCenterValue && centerValue"
        class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
      >
        <div class="text-3xl font-bold text-gray-900">{{ centerValue.value }}</div>
        <div class="text-sm text-gray-500">{{ centerValue.label }}</div>
      </div>
      
      <!-- Loading skeleton -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
        <div class="animate-pulse-soft">
          <div class="w-24 h-24 bg-gray-200 rounded-full mb-2"></div>
          <div class="h-2 bg-gray-200 rounded w-16 mx-auto"></div>
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
  name: 'DonutChart',
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
    showLegend: {
      type: Boolean,
      default: true
    },
    showCenterValue: {
      type: Boolean,
      default: false
    },
    centerValue: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const chartCanvas = ref(null)
    const chartInstance = ref(null)

    const getColorsByVariant = (variant) => {
      const colorMap = {
        'super-admin': ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'],
        'admin-centre': ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe'],
        'coordinador': ['#f97316', '#fb923c', '#fdba74', '#fed7aa', '#ffedd5'],
        'monitor': ['#eab308', '#facc15', '#fde047', '#fef08a', '#fef9c3'],
        'familia': ['#ec4899', '#f472b6', '#f9a8d4', '#fbcfe8', '#fce7f3']
      }
      return colorMap[variant] || colorMap['admin-centre']
    }

    const createChart = () => {
      if (!chartCanvas.value || !props.data) return

      const colors = getColorsByVariant(props.variant)
      const ctx = chartCanvas.value.getContext('2d')

      const config = {
        type: 'doughnut',
        data: {
          ...props.data,
          datasets: props.data.datasets.map(dataset => ({
            ...dataset,
            backgroundColor: colors,
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 8
          }))
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: '#ffffff',
              bodyColor: '#ffffff',
              borderColor: colors[0],
              borderWidth: 1,
              cornerRadius: 8,
              displayColors: true,
              titleFont: {
                size: 12,
                weight: 'bold'
              },
              bodyFont: {
                size: 12
              },
              callbacks: {
                label: function(context) {
                  const total = context.dataset.data.reduce((sum, value) => sum + value, 0)
                  const percentage = ((context.parsed / total) * 100).toFixed(1)
                  return `${context.label}: ${context.parsed} (${percentage}%)`
                }
              }
            }
          },
          animation: {
            animateRotate: true,
            animateScale: false,
            duration: 1000,
            easing: 'easeOutQuint'
          },
          interaction: {
            intersect: false
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

    onMounted(() => {
      createChart()
    })

    onUnmounted(() => {
      if (chartInstance.value) {
        chartInstance.value.destroy()
      }
    })

    return {
      chartCanvas
    }
  }
}
</script>
