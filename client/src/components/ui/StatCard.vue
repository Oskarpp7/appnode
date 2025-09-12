<template>
  <div class="role-card p-6 animate-slide-in" :class="cardClasses">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm font-medium text-gray-600 mb-1">
          {{ title }}
        </p>
        <p class="text-3xl font-bold text-gray-900 tracking-tight">
          {{ formattedValue }}
        </p>
        <div v-if="trend" class="flex items-center mt-2">
          <component 
            :is="trendIcon" 
            :class="trendClasses" 
            class="h-4 w-4 mr-1"
          />
          <span :class="trendClasses" class="text-sm font-medium">
            {{ trend }}
          </span>
        </div>
        <p v-if="subtitle" class="text-sm text-gray-500 mt-1">
          {{ subtitle }}
        </p>
      </div>
      
      <div :class="iconBgClasses" class="flex-shrink-0 p-3 rounded-xl">
        <component :is="icon" class="h-6 w-6 text-white" />
      </div>
    </div>
    
    <!-- Progress bar if percentage -->
    <div v-if="showProgress" class="mt-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div 
          :class="progressClasses"
          class="h-2 rounded-full transition-all duration-500 ease-out"
          :style="{ width: progressWidth }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { 
  ArrowUpIcon, 
  ArrowDownIcon, 
  MinusIcon,
  ChartBarIcon,
  UsersIcon,
  CurrencyEuroIcon,
  AcademicCapIcon,
  BuildingOfficeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'StatCard',
  components: {
    ArrowUpIcon,
    ArrowDownIcon,
    MinusIcon,
    ChartBarIcon,
    UsersIcon,
    CurrencyEuroIcon,
    AcademicCapIcon,
    BuildingOfficeIcon,
    ClockIcon,
    ExclamationTriangleIcon,
    CheckCircleIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: [String, Object],
      default: 'ChartBarIcon'
    },
    trend: {
      type: String,
      default: null
    },
    trendType: {
      type: String,
      default: 'neutral',
      validator: (value) => ['positive', 'negative', 'neutral'].includes(value)
    },
    subtitle: {
      type: String,
      default: null
    },
    variant: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'super-admin', 'admin-centre', 'coordinador', 'monitor', 'familia'].includes(value)
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    progressValue: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const formattedValue = computed(() => {
      if (typeof props.value === 'number') {
        if (props.value >= 1000000) {
          return (props.value / 1000000).toFixed(1) + 'M'
        } else if (props.value >= 1000) {
          return (props.value / 1000).toFixed(1) + 'K'
        }
        return props.value.toLocaleString()
      }
      return props.value
    })

    const cardClasses = computed(() => {
      const variantClasses = {
        'super-admin': 'border-l-4 border-super-admin-500',
        'admin-centre': 'border-l-4 border-admin-centre-500',
        'coordinador': 'border-l-4 border-coordinador-500',
        'monitor': 'border-l-4 border-monitor-500',
        'familia': 'border-l-4 border-familia-500'
      }
      return variantClasses[props.variant] || ''
    })

    const iconBgClasses = computed(() => {
      const variantClasses = {
        'super-admin': 'bg-super-admin-500',
        'admin-centre': 'bg-admin-centre-500',
        'coordinador': 'bg-coordinador-500',
        'monitor': 'bg-monitor-500',
        'familia': 'bg-familia-500'
      }
      return variantClasses[props.variant] || 'bg-gray-500'
    })

    const trendIcon = computed(() => {
      switch (props.trendType) {
        case 'positive': return ArrowUpIcon
        case 'negative': return ArrowDownIcon
        default: return MinusIcon
      }
    })

    const trendClasses = computed(() => {
      switch (props.trendType) {
        case 'positive': return 'text-green-600'
        case 'negative': return 'text-red-600'
        default: return 'text-gray-600'
      }
    })

    const progressWidth = computed(() => {
      return Math.min(100, Math.max(0, props.progressValue)) + '%'
    })

    const progressClasses = computed(() => {
      const variantClasses = {
        'super-admin': 'bg-super-admin-500',
        'admin-centre': 'bg-admin-centre-500',
        'coordinador': 'bg-coordinador-500',
        'monitor': 'bg-monitor-500',
        'familia': 'bg-familia-500'
      }
      return variantClasses[props.variant] || 'bg-gray-500'
    })

    // Icon component resolver
    const iconComponent = computed(() => {
      if (typeof props.icon === 'string') {
        const iconMap = {
          ChartBarIcon,
          UsersIcon,
          CurrencyEuroIcon,
          AcademicCapIcon,
          BuildingOfficeIcon,
          ClockIcon,
          ExclamationTriangleIcon,
          CheckCircleIcon
        }
        return iconMap[props.icon] || ChartBarIcon
      }
      return props.icon
    })

    return {
      formattedValue,
      cardClasses,
      iconBgClasses,
      trendIcon,
      trendClasses,
      progressWidth,
      progressClasses,
      icon: iconComponent
    }
  }
}
</script>
