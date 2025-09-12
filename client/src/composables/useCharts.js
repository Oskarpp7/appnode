import { ref, nextTick } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
)

export function useCharts() {
  const charts = ref(new Map())
  
  // Generate role-based color palette
  const generateRoleColors = (role) => {
    const palettes = {
      SUPER_ADMIN: {
        primary: '#9333ea',
        secondary: '#c084fc',
        gradient: ['#9333ea', '#a855f7', '#c084fc'],
        background: 'rgba(147, 51, 234, 0.1)'
      },
      ADMIN_CENTRE: {
        primary: '#2563eb',
        secondary: '#60a5fa',
        gradient: ['#2563eb', '#3b82f6', '#60a5fa'],
        background: 'rgba(37, 99, 235, 0.1)'
      },
      COORDINADOR: {
        primary: '#ea580c',
        secondary: '#fb923c',
        gradient: ['#ea580c', '#f97316', '#fb923c'],
        background: 'rgba(234, 88, 12, 0.1)'
      },
      MONITOR: {
        primary: '#ca8a04',
        secondary: '#facc15',
        gradient: ['#ca8a04', '#eab308', '#facc15'],
        background: 'rgba(202, 138, 4, 0.1)'
      },
      FAMILIA: {
        primary: '#db2777',
        secondary: '#f472b6',
        gradient: ['#db2777', '#ec4899', '#f472b6'],
        background: 'rgba(219, 39, 119, 0.1)'
      }
    }
    
    return palettes[role] || palettes.FAMILIA
  }
  
  // Create gradient
  const createGradient = (ctx, colors) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 400)
    gradient.addColorStop(0, colors[0])
    gradient.addColorStop(0.5, colors[1])
    gradient.addColorStop(1, colors[2])
    return gradient
  }
  
  // Default chart options
  const getDefaultOptions = (role = 'FAMILIA') => {
    const colors = generateRoleColors(role)
    
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index'
      },
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            font: {
              size: 12,
              family: 'Inter, system-ui, sans-serif'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: colors.primary,
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: true,
          titleFont: {
            size: 14,
            weight: 'bold'
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              size: 11,
              family: 'Inter, system-ui, sans-serif'
            },
            color: '#6b7280'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f3f4f6',
            drawBorder: false
          },
          ticks: {
            font: {
              size: 11,
              family: 'Inter, system-ui, sans-serif'
            },
            color: '#6b7280'
          }
        }
      },
      elements: {
        point: {
          radius: 4,
          hoverRadius: 6,
          borderWidth: 2,
          backgroundColor: 'white'
        },
        line: {
          tension: 0.4,
          borderWidth: 3
        }
      }
    }
  }
  
  // Line chart configuration
  const createLineChart = (canvasRef, data, role = 'FAMILIA') => {
    const ctx = canvasRef.getContext('2d')
    const colors = generateRoleColors(role)
    
    const config = {
      type: 'line',
      data: {
        ...data,
        datasets: data.datasets.map((dataset, index) => ({
          ...dataset,
          borderColor: colors.gradient[index] || colors.primary,
          backgroundColor: createGradient(ctx, [
            colors.gradient[index] + '40',
            colors.gradient[index] + '20',
            colors.gradient[index] + '00'
          ]),
          pointBorderColor: colors.gradient[index] || colors.primary,
          fill: true
        }))
      },
      options: getDefaultOptions(role)
    }
    
    const chart = new ChartJS(ctx, config)
    return chart
  }
  
  // Donut chart configuration
  const createDonutChart = (canvasRef, data, role = 'FAMILIA') => {
    const ctx = canvasRef.getContext('2d')
    const colors = generateRoleColors(role)
    
    const config = {
      type: 'doughnut',
      data: {
        ...data,
        datasets: data.datasets.map(dataset => ({
          ...dataset,
          backgroundColor: colors.gradient,
          borderColor: 'white',
          borderWidth: 2,
          hoverBorderWidth: 3
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12,
                family: 'Inter, system-ui, sans-serif'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: colors.primary,
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: function(context) {
                const total = context.dataset.data.reduce((a, b) => a + b, 0)
                const percentage = ((context.parsed / total) * 100).toFixed(1)
                return `${context.label}: ${context.parsed} (${percentage}%)`
              }
            }
          }
        }
      }
    }
    
    const chart = new ChartJS(ctx, config)
    return chart
  }
  
  // Bar chart configuration
  const createBarChart = (canvasRef, data, role = 'FAMILIA') => {
    const ctx = canvasRef.getContext('2d')
    const colors = generateRoleColors(role)
    
    const config = {
      type: 'bar',
      data: {
        ...data,
        datasets: data.datasets.map((dataset, index) => ({
          ...dataset,
          backgroundColor: colors.gradient[index] || colors.primary,
          borderColor: colors.gradient[index] || colors.primary,
          borderWidth: 0,
          borderRadius: 6,
          borderSkipped: false
        }))
      },
      options: {
        ...getDefaultOptions(role),
        scales: {
          ...getDefaultOptions(role).scales,
          x: {
            ...getDefaultOptions(role).scales.x,
            grid: {
              display: false
            }
          }
        }
      }
    }
    
    const chart = new ChartJS(ctx, config)
    return chart
  }
  
  // Chart management
  const registerChart = (id, chart) => {
    // Destroy existing chart if it exists
    if (charts.value.has(id)) {
      charts.value.get(id).destroy()
    }
    charts.value.set(id, chart)
  }
  
  const destroyChart = (id) => {
    if (charts.value.has(id)) {
      charts.value.get(id).destroy()
      charts.value.delete(id)
    }
  }
  
  const destroyAllCharts = () => {
    charts.value.forEach(chart => chart.destroy())
    charts.value.clear()
  }
  
  const updateChart = async (id, newData) => {
    if (charts.value.has(id)) {
      const chart = charts.value.get(id)
      chart.data = newData
      await nextTick()
      chart.update()
    }
  }
  
  return {
    generateRoleColors,
    createGradient,
    getDefaultOptions,
    createLineChart,
    createDonutChart,
    createBarChart,
    registerChart,
    destroyChart,
    destroyAllCharts,
    updateChart,
    charts: charts.value
  }
}
