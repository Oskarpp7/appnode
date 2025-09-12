<template>
  <div 
    v-if="show"
    :class="[
      'rounded-lg p-4 mb-6 border transition-all duration-300',
      bannerClasses
    ]"
    role="alert"
  >
    <div class="flex items-start">
      <div class="flex-shrink-0">
        <component :is="iconComponent" :class="iconClasses" class="h-5 w-5" />
      </div>
      <div class="ml-3 flex-1">
        <h3 v-if="title" :class="titleClasses" class="text-sm font-medium">
          {{ title }}
        </h3>
        <div :class="[messageClasses, 'text-sm', { 'mt-1': title }]">
          <slot>{{ message }}</slot>
        </div>
        <div v-if="actions && actions.length" class="mt-3 flex space-x-3">
          <button
            v-for="(action, index) in actions"
            :key="index"
            @click="handleAction(action)"
            :class="actionButtonClasses"
            class="text-sm font-medium underline hover:no-underline focus:outline-none"
          >
            {{ action.label }}
          </button>
        </div>
      </div>
      <div v-if="dismissible" class="ml-auto pl-3">
        <button
          @click="dismiss"
          :class="dismissButtonClasses"
          class="inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
        >
          <span class="sr-only">Tancar</span>
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'InfoBanner',
  components: {
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    XMarkIcon
  },
  props: {
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error'].includes(value)
    },
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: ''
    },
    actions: {
      type: Array,
      default: () => []
    },
    dismissible: {
      type: Boolean,
      default: false
    },
    autoHide: {
      type: Boolean,
      default: false
    },
    autoHideDelay: {
      type: Number,
      default: 5000
    }
  },
  emits: ['dismiss', 'action-click'],
  setup(props, { emit }) {
    const show = ref(true)
    let autoHideTimer = null

    const typeConfig = {
      info: {
        icon: InformationCircleIcon,
        bannerClasses: 'bg-blue-50 border-blue-200',
        iconClasses: 'text-blue-400',
        titleClasses: 'text-blue-800',
        messageClasses: 'text-blue-700',
        actionClasses: 'text-blue-800 hover:text-blue-600',
        dismissClasses: 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600'
      },
      success: {
        icon: CheckCircleIcon,
        bannerClasses: 'bg-green-50 border-green-200',
        iconClasses: 'text-green-400',
        titleClasses: 'text-green-800',
        messageClasses: 'text-green-700',
        actionClasses: 'text-green-800 hover:text-green-600',
        dismissClasses: 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600'
      },
      warning: {
        icon: ExclamationTriangleIcon,
        bannerClasses: 'bg-yellow-50 border-yellow-200',
        iconClasses: 'text-yellow-400',
        titleClasses: 'text-yellow-800',
        messageClasses: 'text-yellow-700',
        actionClasses: 'text-yellow-800 hover:text-yellow-600',
        dismissClasses: 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600'
      },
      error: {
        icon: XCircleIcon,
        bannerClasses: 'bg-red-50 border-red-200',
        iconClasses: 'text-red-400',
        titleClasses: 'text-red-800',
        messageClasses: 'text-red-700',
        actionClasses: 'text-red-800 hover:text-red-600',
        dismissClasses: 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600'
      }
    }

    const config = computed(() => typeConfig[props.type])

    const iconComponent = computed(() => config.value.icon)
    const bannerClasses = computed(() => config.value.bannerClasses)
    const iconClasses = computed(() => config.value.iconClasses)
    const titleClasses = computed(() => config.value.titleClasses)
    const messageClasses = computed(() => config.value.messageClasses)
    const actionButtonClasses = computed(() => config.value.actionClasses)
    const dismissButtonClasses = computed(() => config.value.dismissClasses)

    const dismiss = () => {
      show.value = false
      emit('dismiss')
      
      if (autoHideTimer) {
        clearTimeout(autoHideTimer)
      }
    }

    const handleAction = (action) => {
      emit('action-click', action)
      
      if (typeof action.action === 'function') {
        action.action()
      }
      
      if (action.dismiss) {
        dismiss()
      }
    }

    // Auto hide functionality
    if (props.autoHide) {
      autoHideTimer = setTimeout(() => {
        dismiss()
      }, props.autoHideDelay)
    }

    return {
      show,
      iconComponent,
      bannerClasses,
      iconClasses,
      titleClasses,
      messageClasses,
      actionButtonClasses,
      dismissButtonClasses,
      dismiss,
      handleAction
    }
  }
}
</script>
