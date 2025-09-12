<template>
  <div class="role-card">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
        <div class="flex items-center space-x-3">
          <!-- Search -->
          <div v-if="searchable" class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cercar..."
              class="pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            <MagnifyingGlassIcon class="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          </div>
          
          <!-- Actions slot -->
          <slot name="actions" />
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <!-- Header -->
        <thead class="bg-gray-50 sticky top-0">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              @click="column.sortable ? toggleSort(column.key) : null"
              :class="[
                'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                column.sortable ? 'cursor-pointer hover:bg-gray-100 select-none' : ''
              ]"
            >
              <div class="flex items-center space-x-1">
                <span>{{ column.label }}</span>
                <template v-if="column.sortable">
                  <ChevronUpIcon 
                    v-if="sortKey === column.key && sortOrder === 'asc'"
                    class="h-4 w-4 text-gray-400"
                  />
                  <ChevronDownIcon 
                    v-else-if="sortKey === column.key && sortOrder === 'desc'"
                    class="h-4 w-4 text-gray-400"
                  />
                  <ChevronUpDownIcon 
                    v-else
                    class="h-4 w-4 text-gray-300"
                  />
                </template>
              </div>
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Loading skeleton -->
          <tr v-if="loading" v-for="n in 5" :key="'skeleton-' + n">
            <td v-for="column in columns" :key="column.key" class="px-6 py-4">
              <div class="animate-pulse">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </td>
          </tr>

          <!-- Data rows -->
          <tr
            v-else
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            class="hover:bg-gray-50 transition-colors"
          >
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap"
            >
              <slot 
                :name="'cell-' + column.key" 
                :row="row" 
                :value="getNestedValue(row, column.key)"
                :index="index"
              >
                <div v-if="column.type === 'badge'" class="inline-flex">
                  <span :class="getBadgeClasses(getNestedValue(row, column.key), column.badgeConfig)">
                    {{ formatCellValue(getNestedValue(row, column.key), column) }}
                  </span>
                </div>
                <div v-else-if="column.type === 'progress'" class="w-full">
                  <div class="flex items-center">
                    <div class="flex-1">
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          :class="getProgressClasses(column)"
                          class="h-2 rounded-full transition-all duration-300"
                          :style="{ width: getNestedValue(row, column.key) + '%' }"
                        ></div>
                      </div>
                    </div>
                    <span class="ml-2 text-sm text-gray-600">
                      {{ getNestedValue(row, column.key) }}%
                    </span>
                  </div>
                </div>
                <span v-else :class="getCellClasses(column)">
                  {{ formatCellValue(getNestedValue(row, column.key), column) }}
                </span>
              </slot>
            </td>
          </tr>

          <!-- Empty state -->
          <tr v-if="!loading && filteredData.length === 0">
            <td :colspan="columns.length" class="px-6 py-12 text-center">
              <div class="text-gray-500">
                <ExclamationCircleIcon class="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p class="text-sm">{{ emptyMessage }}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="paginated && totalPages > 1" class="px-6 py-3 border-t border-gray-200">
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-500">
          Mostrant {{ ((currentPage - 1) * itemsPerPage) + 1 }} a 
          {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} de 
          {{ filteredData.length }} resultats
        </div>
        <div class="flex items-center space-x-2">
          <button
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Anterior
          </button>
          <span class="text-sm text-gray-700">
            Pàgina {{ currentPage }} de {{ totalPages }}
          </span>
          <button
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Següent
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import {
  MagnifyingGlassIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ExclamationCircleIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'DataTable',
  components: {
    MagnifyingGlassIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronUpDownIcon,
    ExclamationCircleIcon
  },
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    },
    paginated: {
      type: Boolean,
      default: true
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    emptyMessage: {
      type: String,
      default: 'No hi ha dades per mostrar'
    },
    variant: {
      type: String,
      default: 'default'
    }
  },
  setup(props) {
    const searchQuery = ref('')
    const sortKey = ref('')
    const sortOrder = ref('asc')
    const currentPage = ref(1)

    // Filtered data based on search
    const filteredData = computed(() => {
      if (!searchQuery.value) return props.data

      const query = searchQuery.value.toLowerCase()
      return props.data.filter(row => {
        return props.columns.some(column => {
          const value = getNestedValue(row, column.key)
          return String(value).toLowerCase().includes(query)
        })
      })
    })

    // Sorted data
    const sortedData = computed(() => {
      if (!sortKey.value) return filteredData.value

      return [...filteredData.value].sort((a, b) => {
        const aVal = getNestedValue(a, sortKey.value)
        const bVal = getNestedValue(b, sortKey.value)

        let comparison = 0
        if (aVal > bVal) comparison = 1
        if (aVal < bVal) comparison = -1

        return sortOrder.value === 'desc' ? -comparison : comparison
      })
    })

    // Paginated data
    const totalPages = computed(() => 
      Math.ceil(filteredData.value.length / props.itemsPerPage)
    )

    const paginatedData = computed(() => {
      if (!props.paginated) return sortedData.value

      const start = (currentPage.value - 1) * props.itemsPerPage
      const end = start + props.itemsPerPage
      return sortedData.value.slice(start, end)
    })

    // Reset pagination when search changes
    watch(searchQuery, () => {
      currentPage.value = 1
    })

    const toggleSort = (key) => {
      if (sortKey.value === key) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
      } else {
        sortKey.value = key
        sortOrder.value = 'asc'
      }
    }

    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, key) => current?.[key], obj)
    }

    const getRowKey = (row, index) => {
      return row.id || index
    }

    const formatCellValue = (value, column) => {
      if (value === null || value === undefined) return '-'

      switch (column.type) {
        case 'currency':
          return new Intl.NumberFormat('ca-ES', {
            style: 'currency',
            currency: 'EUR'
          }).format(value)
        case 'number':
          return new Intl.NumberFormat('ca-ES').format(value)
        case 'date':
          return new Intl.DateTimeFormat('ca-ES').format(new Date(value))
        case 'percentage':
          return value + '%'
        default:
          return value
      }
    }

    const getBadgeClasses = (value, config = {}) => {
      const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
      
      if (config.colorMap && config.colorMap[value]) {
        return `${baseClasses} ${config.colorMap[value]}`
      }

      // Default badge styling
      return `${baseClasses} bg-gray-100 text-gray-800`
    }

    const getCellClasses = (column) => {
      const baseClasses = 'text-sm'
      
      switch (column.type) {
        case 'number':
        case 'currency':
        case 'percentage':
          return `${baseClasses} font-medium text-gray-900`
        case 'secondary':
          return `${baseClasses} text-gray-500`
        default:
          return `${baseClasses} text-gray-900`
      }
    }

    const getProgressClasses = (column) => {
      const variantClasses = {
        'super-admin': 'bg-super-admin-500',
        'admin-centre': 'bg-admin-centre-500',
        'coordinador': 'bg-coordinador-500',
        'monitor': 'bg-monitor-500',
        'familia': 'bg-familia-500'
      }
      return variantClasses[props.variant] || 'bg-blue-500'
    }

    return {
      searchQuery,
      sortKey,
      sortOrder,
      currentPage,
      filteredData,
      paginatedData,
      totalPages,
      toggleSort,
      getNestedValue,
      getRowKey,
      formatCellValue,
      getBadgeClasses,
      getCellClasses,
      getProgressClasses
    }
  }
}
</script>
