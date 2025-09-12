<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Crear Nova Sessió</h2>
          <button @click="$emit('close')" class="p-2 text-gray-400 hover:text-gray-600">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Formulari -->
      <form @submit.prevent="createSession" class="p-6 space-y-6">
        <!-- Informació Bàsica -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Informació Bàsica</h3>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nom de la Sessió *
            </label>
            <input
              v-model="form.session_name"
              type="text"
              required
              placeholder="Ex: Menjador Dimarts 15 Gener"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Tipus de Servei *
            </label>
            <select
              v-model="form.service_type"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar servei...</option>
              <option value="menjador">Menjador</option>
              <option value="extraescolars">Extraescolars</option>
              <option value="acollida_matinal">Acollida Matinal</option>
              <option value="acollida_tarda">Acollida Tarda</option>
              <option value="sortides_pedagogiques">Sortides Pedagògiques</option>
              <option value="colònies">Colònies</option>
              <option value="casals_estiu">Casals d'Estiu</option>
            </select>
          </div>
        </div>

        <!-- Data i Horari -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Data i Horari</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Data *
              </label>
              <input
                v-model="form.session_date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Hora d'Inici *
              </label>
              <input
                v-model="form.start_time"
                type="time"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Hora de Fi
              </label>
              <input
                v-model="form.end_time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Ubicació i Capacitat -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Ubicació i Capacitat</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Ubicació
              </label>
              <input
                v-model="form.location"
                type="text"
                placeholder="Ex: Menjador Principal, Aula 3A"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Capacitat Màxima
              </label>
              <input
                v-model="form.max_capacity"
                type="number"
                min="1"
                placeholder="Ex: 25"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Tipus de Sessió -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Tipus de Sessió</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label
              v-for="type in sessionTypes"
              :key="type.value"
              class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              :class="form.session_type === type.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200'"
            >
              <input
                v-model="form.session_type"
                :value="type.value"
                type="radio"
                class="sr-only"
              />
              <div class="text-center w-full">
                <div class="text-sm font-medium text-gray-900">{{ type.label }}</div>
                <div class="text-xs text-gray-600">{{ type.description }}</div>
              </div>
            </label>
          </div>
        </div>

        <!-- Notes -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Notes de la Sessió
          </label>
          <textarea
            v-model="form.session_notes"
            rows="3"
            placeholder="Observacions, instruccions especials, etc."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          ></textarea>
        </div>

        <!-- Previsualització d'Estudiants -->
        <div v-if="form.service_type" class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Estudiants Inscrits</h3>
          
          <div v-if="loadingEnrollments" class="text-center py-4">
            <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p class="text-sm text-gray-600 mt-2">Carregant estudiants...</p>
          </div>

          <div v-else-if="previewEnrollments.length > 0" class="bg-gray-50 p-4 rounded-lg">
            <p class="text-sm text-gray-700 mb-3">
              <strong>{{ previewEnrollments.length }}</strong> estudiants seran inclosos automàticament:
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              <div
                v-for="enrollment in previewEnrollments.slice(0, 10)"
                :key="enrollment.id"
                class="text-sm text-gray-600 bg-white px-2 py-1 rounded"
              >
                {{ enrollment.student.nom }} {{ enrollment.student.cognoms }}
              </div>
            </div>
            
            <p v-if="previewEnrollments.length > 10" class="text-xs text-gray-500 mt-2">
              I {{ previewEnrollments.length - 10 }} estudiants més...
            </p>
          </div>

          <div v-else class="bg-yellow-50 p-4 rounded-lg">
            <p class="text-sm text-yellow-800">
              No hi ha estudiants inscrits per aquest servei en aquesta data.
            </p>
          </div>
        </div>

        <!-- Botons -->
        <div class="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel·lar
          </button>
          <button
            type="submit"
            :disabled="isCreating"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <span v-if="isCreating">Creant...</span>
            <span v-else>Crear Sessió</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['close', 'created'])

const authStore = useAuthStore()

// Refs reactives
const isCreating = ref(false)
const loadingEnrollments = ref(false)
const previewEnrollments = ref([])

// Formulari
const form = reactive({
  session_name: '',
  service_type: '',
  session_date: new Date().toISOString().split('T')[0], // Avui per defecte
  start_time: '',
  end_time: '',
  location: '',
  max_capacity: null,
  session_type: 'regular',
  session_notes: ''
})

// Tipus de sessions disponibles
const sessionTypes = [
  {
    value: 'regular',
    label: 'Regular',
    description: 'Sessió habitual'
  },
  {
    value: 'special',
    label: 'Especial',
    description: 'Activitat especial'
  },
  {
    value: 'makeup',
    label: 'Recuperació',
    description: 'Sessió de recuperació'
  },
  {
    value: 'canceled',
    label: 'Cancel·lada',
    description: 'Sessió cancel·lada'
  }
]

// Watchers
watch([() => form.service_type, () => form.session_date], async ([serviceType, sessionDate]) => {
  if (serviceType && sessionDate) {
    await loadPreviewEnrollments()
  }
})

// Mètodes
const loadPreviewEnrollments = async () => {
  if (!form.service_type || !form.session_date) return

  loadingEnrollments.value = true
  try {
    const params = new URLSearchParams({
      service_type: form.service_type,
      active_only: 'true',
      start_date: form.session_date,
      end_date: form.session_date
    })

    const response = await fetch(`/api/attendance/enrollments?${params}`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      
      // Filtrar per dia de la setmana
      const sessionDayOfWeek = new Date(form.session_date).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()
      
      previewEnrollments.value = data.data.filter(enrollment => 
        enrollment.days_of_week.includes(sessionDayOfWeek)
      )
    }
  } catch (error) {
    console.error('Error carregant previsualització:', error)
  } finally {
    loadingEnrollments.value = false
  }
}

const createSession = async () => {
  isCreating.value = true
  
  try {
    const response = await fetch('/api/attendance/sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify(form)
    })

    if (response.ok) {
      const data = await response.json()
      emit('created', data.data)
    } else {
      console.error('Error creant sessió')
    }
  } catch (error) {
    console.error('Error creant sessió:', error)
  } finally {
    isCreating.value = false
  }
}

// Auto-emplenar horaris per defecte segons el tipus de servei
watch(() => form.service_type, (serviceType) => {
  const defaultTimes = {
    'menjador': { start: '12:00', end: '14:00' },
    'acollida_matinal': { start: '08:00', end: '09:00' },
    'acollida_tarda': { start: '16:30', end: '18:00' },
    'extraescolars': { start: '16:30', end: '17:30' }
  }

  if (defaultTimes[serviceType]) {
    form.start_time = defaultTimes[serviceType].start
    form.end_time = defaultTimes[serviceType].end
  }
})
</script>

<style scoped>
/* Millores per tablets */
@media (max-width: 768px) {
  .max-w-2xl {
    max-width: 100%;
    margin: 0;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
