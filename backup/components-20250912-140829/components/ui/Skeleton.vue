<template>
  <div class="animate-pulse">
    <!-- Card skeleton -->
    <div v-if="type === 'card'" class="bg-white rounded-xl shadow-soft p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <div class="h-12 w-12 bg-gray-200 rounded-xl"></div>
          <div>
            <div class="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div class="h-6 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
        <div class="h-8 w-8 bg-gray-200 rounded-lg"></div>
      </div>
      <div v-if="showProgress" class="h-2 bg-gray-200 rounded-full w-full"></div>
    </div>

    <!-- Table skeleton -->
    <div v-else-if="type === 'table'" class="bg-white rounded-xl shadow-soft">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="h-6 bg-gray-200 rounded w-48"></div>
      </div>
      <div class="divide-y divide-gray-200">
        <div v-for="row in rows" :key="row" class="px-6 py-4">
          <div class="flex items-center space-x-4">
            <div class="h-4 bg-gray-200 rounded flex-1"></div>
            <div class="h-4 bg-gray-200 rounded w-20"></div>
            <div class="h-4 bg-gray-200 rounded w-16"></div>
            <div class="h-6 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chart skeleton -->
    <div v-else-if="type === 'chart'" class="bg-white rounded-xl shadow-soft p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="h-6 bg-gray-200 rounded w-32"></div>
        <div class="flex space-x-2">
          <div class="h-8 bg-gray-200 rounded w-12"></div>
          <div class="h-8 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
      <div class="h-64 bg-gray-200 rounded-lg"></div>
    </div>

    <!-- List skeleton -->
    <div v-else-if="type === 'list'" class="space-y-3">
      <div v-for="item in items" :key="item" class="flex items-center space-x-3 p-3 bg-white rounded-lg">
        <div class="h-10 w-10 bg-gray-200 rounded-full"></div>
        <div class="flex-1">
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div class="h-8 bg-gray-200 rounded w-16"></div>
      </div>
    </div>

    <!-- Text skeleton -->
    <div v-else class="space-y-2">
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value) => ['card', 'table', 'chart', 'list', 'text'].includes(value)
    },
    rows: {
      type: Number,
      default: 3
    },
    items: {
      type: Number,
      default: 3
    },
    showProgress: {
      type: Boolean,
      default: false
    }
  }
}
</script>
