<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <span class="text-2xl">{{ icon }}</span>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ title }}
            </dt>
            <dd class="text-lg font-medium text-gray-900">
              {{ description }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
    
    <div v-if="stats && stats.length > 0" :class="bgColorClass" class="px-5 py-3">
      <div class="text-sm">
        <div v-for="stat in stats" :key="stat.label" class="flex justify-between items-center">
          <span class="font-medium text-opacity-75" :class="textColorClass">{{ stat.label }}</span>
          <span class="font-bold" :class="textColorClass">{{ stat.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: 'blue'
  },
  stats: {
    type: Array,
    default: () => []
  }
})

const bgColorClass = computed(() => {
  const colorMap = {
    red: 'bg-red-50',
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    purple: 'bg-purple-50',
    indigo: 'bg-indigo-50'
  }
  return colorMap[props.color] || 'bg-gray-50'
})

const textColorClass = computed(() => {
  const colorMap = {
    red: 'text-red-800',
    blue: 'text-blue-800',
    green: 'text-green-800',
    yellow: 'text-yellow-800',
    purple: 'text-purple-800',
    indigo: 'text-indigo-800'
  }
  return colorMap[props.color] || 'text-gray-800'
})
</script>
