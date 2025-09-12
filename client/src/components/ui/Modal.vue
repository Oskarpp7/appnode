<template>
  <transition name="modal" appear>
    <div class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm"
        @click="onClose"
      ></div>
      
      <!-- Modal container -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div 
          class="relative bg-white rounded-xl shadow-xl max-w-md w-full transform transition-all"
          role="dialog"
          :aria-labelledby="titleId"
          :aria-describedby="descriptionId"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <div class="flex items-center space-x-3">
              <component 
                v-if="icon" 
                :is="icon" 
                :class="iconColorClass"
                class="h-6 w-6"
              />
              <h3 :id="titleId" class="text-lg font-semibold text-gray-900">
                {{ title }}
              </h3>
            </div>
            <button
              @click="onClose"
              class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
              :aria-label="$t('common.close')"
            >
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <p v-if="description" :id="descriptionId" class="text-gray-600 mb-4">
              {{ description }}
            </p>
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="showFooter" class="flex justify-end space-x-3 p-6 border-t border-gray-100">
            <button
              v-if="showCancel"
              @click="onCancel"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="onConfirm"
              :disabled="confirmDisabled"
              :class="confirmButtonClass"
              class="px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <component 
                v-if="confirmLoading" 
                is="div" 
                class="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2 inline-block"
              />
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/vue/24/solid'

export default {
  name: 'Modal',
  components: {
    XMarkIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'success', 'warning', 'error', 'info'].includes(value)
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    cancelText: {
      type: String,
      default: 'Cancelar'
    },
    confirmText: {
      type: String,
      default: 'Confirmar'
    },
    confirmDisabled: {
      type: Boolean,
      default: false
    },
    confirmLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'cancel', 'confirm'],
  computed: {
    titleId() {
      return `modal-title-${this.$attrs.id || 'default'}`
    },
    descriptionId() {
      return `modal-description-${this.$attrs.id || 'default'}`
    },
    icon() {
      const icons = {
        success: CheckCircleIcon,
        warning: ExclamationTriangleIcon,
        error: XCircleIcon,
        info: InformationCircleIcon
      }
      return icons[this.type]
    },
    iconColorClass() {
      const colors = {
        success: 'text-green-500',
        warning: 'text-yellow-500',
        error: 'text-red-500',
        info: 'text-blue-500'
      }
      return colors[this.type] || 'text-gray-500'
    },
    confirmButtonClass() {
      const classes = {
        default: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
        warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
        error: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
        info: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500'
      }
      return classes[this.type] || classes.default
    }
  },
  mounted() {
    // Trap focus within modal
    document.addEventListener('keydown', this.handleKeydown)
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    onCancel() {
      this.$emit('cancel')
    },
    onConfirm() {
      this.$emit('confirm')
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.onClose()
      }
    }
  }
}
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
