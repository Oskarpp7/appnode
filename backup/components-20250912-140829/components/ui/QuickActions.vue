<template>
  <div class="role-card p-6">
    <h3 v-if="title" class="text-lg font-semibold text-gray-900 mb-4">{{ title }}</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        v-for="(action, index) in actions"
        :key="index"
        @click="handleAction(action)"
        :class="[
          'group relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl transition-all duration-200 focus-ring',
          getActionClasses(action, index)
        ]"
        :aria-label="action.ariaLabel || action.label"
      >
        <!-- Icon -->
        <div class="flex items-center justify-center w-12 h-12 mb-3 rounded-lg transition-colors group-hover:scale-110 transform duration-200">
          <component 
            :is="action.icon" 
            class="h-6 w-6 transition-colors"
            :class="getIconClasses(action, index)"
          />
        </div>
        
        <!-- Label -->
        <span class="text-sm font-medium text-center transition-colors group-hover:text-gray-900">
          {{ action.label }}
        </span>
        
        <!-- Hotkey badge -->
        <span 
          v-if="action.hotkey" 
          class="absolute top-2 right-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-mono opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {{ action.hotkey }}
        </span>
        
        <!-- Loading state -->
        <div 
          v-if="action.loading"
          class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-xl"
        >
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-current"></div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from 'vue'
import {
  PlusIcon,
  ListBulletIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  CalendarIcon,
  ChartBarIcon,
  BellIcon,
  EnvelopeIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'QuickActions',
  components: {
    PlusIcon,
    ListBulletIcon,
    DocumentTextIcon,
    Cog6ToothIcon,
    UserIcon,
    ClipboardDocumentListIcon,
    CalendarIcon,
    ChartBarIcon,
    BellIcon,
    EnvelopeIcon,
    PrinterIcon,
    ArrowDownTrayIcon
  },
  props: {
    title: {
      type: String,
      default: 'Accions Ràpides'
    },
    actions: {
      type: Array,
      required: true,
      validator: (actions) => {
        return actions.every(action => 
          action.label && 
          action.icon && 
          (typeof action.action === 'function' || typeof action.to === 'string')
        )
      }
    },
    variant: {
      type: String,
      default: 'default'
    }
  },
  emits: ['action-click'],
  setup(props, { emit }) {
    const handleAction = (action) => {
      if (action.loading) return

      emit('action-click', action)
      
      if (typeof action.action === 'function') {
        action.action()
      }
    }

    const getActionClasses = (action, index) => {
      const baseClasses = 'border-gray-300 text-gray-600 hover:text-gray-900'
      
      if (action.disabled) {
        return `${baseClasses} opacity-50 cursor-not-allowed`
      }

      const variantColors = {
        'super-admin': 'hover:border-super-admin-500 hover:bg-super-admin-50',
        'admin-centre': 'hover:border-admin-centre-500 hover:bg-admin-centre-50',
        'coordinador': 'hover:border-coordinador-500 hover:bg-coordinador-50',
        'monitor': 'hover:border-monitor-500 hover:bg-monitor-50',
        'familia': 'hover:border-familia-500 hover:bg-familia-50'
      }

      const variantClass = variantColors[props.variant] || 'hover:border-blue-500 hover:bg-blue-50'
      return `${baseClasses} ${variantClass} hover:shadow-soft-lg`
    }

    const getIconClasses = (action, index) => {
      if (action.disabled) {
        return 'text-gray-400'
      }

      const variantColors = {
        'super-admin': 'text-gray-400 group-hover:text-super-admin-600',
        'admin-centre': 'text-gray-400 group-hover:text-admin-centre-600',
        'coordinador': 'text-gray-400 group-hover:text-coordinador-600',
        'monitor': 'text-gray-400 group-hover:text-monitor-600',
        'familia': 'text-gray-400 group-hover:text-familia-600'
      }

      return variantColors[props.variant] || 'text-gray-400 group-hover:text-blue-600'
    }

    // Keyboard shortcuts
    const handleKeydown = (event) => {
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return

      const action = props.actions.find(a => a.hotkey === event.key.toUpperCase())
      if (action && !action.disabled && !action.loading) {
        event.preventDefault()
        handleAction(action)
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
      document.removeEventListener('keydown', handleKeydown)
    })

    return {
      handleAction,
      getActionClasses,
      getIconClasses
    }
  }
}
</script>
