<template>
  <div class="flex items-center justify-between mb-6">
    <div class="flex-1">
      <!-- Breadcrumb -->
      <nav v-if="breadcrumb && breadcrumb.length" class="flex mb-2" aria-label="Breadcrumb">
        <ol class="flex items-center space-x-2">
          <li v-for="(item, index) in breadcrumb" :key="index" class="flex items-center">
            <router-link
              v-if="item.to && index < breadcrumb.length - 1"
              :to="item.to"
              class="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              {{ item.label }}
            </router-link>
            <span v-else class="text-sm text-gray-900 font-medium">
              {{ item.label }}
            </span>
            <ChevronRightIcon 
              v-if="index < breadcrumb.length - 1"
              class="h-4 w-4 text-gray-400 mx-2"
            />
          </li>
        </ol>
      </nav>

      <!-- Title and description -->
      <div class="flex items-center space-x-3">
        <component v-if="icon" :is="icon" class="h-8 w-8" :class="iconClasses" />
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ title }}</h1>
          <p v-if="description" class="text-gray-600 mt-1">{{ description }}</p>
        </div>
      </div>

      <!-- Context selector -->
      <div v-if="showContextSelector" class="flex items-center space-x-4 mt-4">
        <select
          v-if="centres && centres.length"
          v-model="selectedCentre"
          @change="$emit('centre-change', selectedCentre)"
          class="block w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Tots els centres</option>
          <option v-for="centre in centres" :key="centre.id" :value="centre.id">
            {{ centre.name }}
          </option>
        </select>

        <select
          v-if="services && services.length"
          v-model="selectedService"
          @change="$emit('service-change', selectedService)"
          class="block w-48 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
          <option value="">Tots els serveis</option>
          <option v-for="service in services" :key="service.id" :value="service.id">
            {{ service.name }}
          </option>
        </select>

        <input
          v-if="showDateSelector"
          v-model="selectedDate"
          @change="$emit('date-change', selectedDate)"
          type="date"
          class="block px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
        >
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center space-x-3">
      <slot name="actions" />
      
      <!-- Default action button -->
      <button
        v-if="primaryAction"
        @click="$emit('primary-action', primaryAction)"
        :class="primaryButtonClasses"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
      >
        <component v-if="primaryAction.icon" :is="primaryAction.icon" class="h-4 w-4 mr-2" />
        {{ primaryAction.label }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { ChevronRightIcon } from '@heroicons/vue/24/outline'

export default {
  name: 'PageHeader',
  components: {
    ChevronRightIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    icon: {
      type: [String, Object],
      default: null
    },
    breadcrumb: {
      type: Array,
      default: () => []
    },
    primaryAction: {
      type: Object,
      default: null
    },
    variant: {
      type: String,
      default: 'default'
    },
    showContextSelector: {
      type: Boolean,
      default: false
    },
    centres: {
      type: Array,
      default: () => []
    },
    services: {
      type: Array,
      default: () => []
    },
    showDateSelector: {
      type: Boolean,
      default: false
    }
  },
  emits: ['primary-action', 'centre-change', 'service-change', 'date-change'],
  setup(props) {
    const selectedCentre = ref('')
    const selectedService = ref('')
    const selectedDate = ref('')

    const iconClasses = computed(() => {
      const variantClasses = {
        'super-admin': 'text-super-admin-600',
        'admin-centre': 'text-admin-centre-600',
        'coordinador': 'text-coordinador-600',
        'monitor': 'text-monitor-600',
        'familia': 'text-familia-600'
      }
      return variantClasses[props.variant] || 'text-gray-600'
    })

    const primaryButtonClasses = computed(() => {
      const variantClasses = {
        'super-admin': 'bg-super-admin-600 hover:bg-super-admin-700 focus:ring-super-admin-500 text-white',
        'admin-centre': 'bg-admin-centre-600 hover:bg-admin-centre-700 focus:ring-admin-centre-500 text-white',
        'coordinador': 'bg-coordinador-600 hover:bg-coordinador-700 focus:ring-coordinador-500 text-white',
        'monitor': 'bg-monitor-600 hover:bg-monitor-700 focus:ring-monitor-500 text-white',
        'familia': 'bg-familia-600 hover:bg-familia-700 focus:ring-familia-500 text-white'
      }
      return variantClasses[props.variant] || 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white'
    })

    return {
      selectedCentre,
      selectedService,
      selectedDate,
      iconClasses,
      primaryButtonClasses
    }
  }
}
</script>
