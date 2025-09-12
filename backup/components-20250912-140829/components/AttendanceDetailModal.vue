<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">
              {{ attendance.student.nom }} {{ attendance.student.cognoms }}
            </h2>
            <p class="text-sm text-gray-600">
              {{ attendance.student.curs }} - {{ attendance.student.grup }}
            </p>
          </div>
          <button @click="$emit('close')" class="p-2 text-gray-400 hover:text-gray-600">
            <XMarkIcon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Contingut -->
      <div class="p-6 space-y-6">
        <!-- Estat d'Assistència -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Estat d'Assistència</h3>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <button
              v-for="status in attendanceStatuses"
              :key="status.value"
              @click="updateAttendanceStatus(status.value)"
              :class="[
                'flex flex-col items-center p-3 rounded-lg border-2 transition-all',
                formData.attendance_status === status.value
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              ]"
            >
              <component :is="status.icon" class="h-6 w-6 mb-1" />
              <span class="text-xs font-medium">{{ status.label }}</span>
            </button>
          </div>

          <!-- Horaris -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hora d'Entrada</label>
              <input
                v-model="formData.check_in_time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Hora de Sortida</label>
              <input
                v-model="formData.check_out_time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <!-- Persona de Recollida -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Persona de Recollida</h3>
          
          <div class="space-y-4">
            <!-- Seleccionar persona autoritzada -->
            <div v-if="authorizedPersons.length > 0">
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Persona Autoritzada
              </label>
              <select
                v-model="selectedAuthorizedPerson"
                @change="selectAuthorizedPerson"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar persona autoritzada...</option>
                <option
                  v-for="person in authorizedPersons"
                  :key="person.id"
                  :value="person"
                >
                  {{ person.nom }} {{ person.cognoms }} ({{ person.relacio_familiar }})
                </option>
              </select>
            </div>

            <!-- Dades manuals -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom Complet</label>
                <input
                  v-model="formData.pickup_person_name"
                  type="text"
                  placeholder="Nom de qui recull"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">DNI/NIE</label>
                <input
                  v-model="formData.pickup_person_dni"
                  type="text"
                  placeholder="DNI/NIE"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Menjador -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Menjador</h3>
          
          <div class="flex items-center gap-4 mb-4">
            <label class="flex items-center">
              <input
                v-model="formData.meal_taken"
                type="checkbox"
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Ha menjat</span>
            </label>
          </div>

          <div v-if="formData.meal_taken">
            <label class="block text-sm font-medium text-gray-700 mb-1">Tipus de Menú</label>
            <select
              v-model="formData.meal_type"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seleccionar tipus...</option>
              <option value="normal">Normal</option>
              <option value="vegetaria">Vegetariana</option>
              <option value="celiac">Celíac</option>
              <option value="sense_lactosa">Sense Lactosa</option>
              <option value="altres_allergies">Altres Al·lèrgies</option>
            </select>
          </div>
        </div>

        <!-- Estat d'Ànim i Comportament -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Comportament i Estat d'Ànim</h3>
          
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Estat d'Ànim (1-5)
            </label>
            <div class="flex gap-2">
              <button
                v-for="mood in 5"
                :key="mood"
                @click="formData.mood_rating = mood"
                :class="[
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all',
                  formData.mood_rating === mood
                    ? 'border-yellow-400 bg-yellow-50 text-yellow-600'
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-300'
                ]"
              >
                {{ getMoodEmoji(mood) }}
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Notes de Comportament
            </label>
            <textarea
              v-model="formData.behavior_notes"
              rows="3"
              placeholder="Observacions sobre el comportament de l'estudiant..."
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
        </div>

        <!-- Incidents i Notes Mèdiques -->
        <div class="bg-gray-50 p-4 rounded-lg">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Incidents i Salut</h3>
          
          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <label class="flex items-center">
                <input
                  v-model="formData.medical_incident"
                  type="checkbox"
                  class="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span class="ml-2 text-sm text-gray-700">Incident mèdic</span>
              </label>
            </div>

            <div v-if="formData.medical_incident">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Detalls de l'Incident Mèdic
              </label>
              <textarea
                v-model="formData.medical_notes"
                rows="3"
                placeholder="Descripció de l'incident mèdic..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Informe d'Incidents
              </label>
              <textarea
                v-model="formData.incident_report"
                rows="3"
                placeholder="Qualsevol incident o situació rellevant..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Notes Especials
              </label>
              <textarea
                v-model="formData.special_notes"
                rows="2"
                placeholder="Altres observacions..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel·lar
          </button>
          <button
            @click="saveChanges"
            :disabled="isSaving"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <span v-if="isSaving">Desant...</span>
            <span v-else>Desar Canvis</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  XMarkIcon,
  CheckIcon,
  XMarkIcon as XIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  FaceSmileIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  attendance: {
    type: Object,
    required: true
  },
  session: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close', 'update'])

const authStore = useAuthStore()

// Refs reactives
const isSaving = ref(false)
const authorizedPersons = ref([])
const selectedAuthorizedPerson = ref('')

// Form data
const formData = reactive({
  attendance_status: props.attendance.attendance_status || 'absent',
  check_in_time: props.attendance.check_in_time || '',
  check_out_time: props.attendance.check_out_time || '',
  pickup_person_id: props.attendance.pickup_person_id || null,
  pickup_person_name: props.attendance.pickup_person_name || '',
  pickup_person_dni: props.attendance.pickup_person_dni || '',
  meal_taken: props.attendance.meal_taken || false,
  meal_type: props.attendance.meal_type || '',
  behavior_notes: props.attendance.behavior_notes || '',
  incident_report: props.attendance.incident_report || '',
  medical_incident: props.attendance.medical_incident || false,
  medical_notes: props.attendance.medical_notes || '',
  mood_rating: props.attendance.mood_rating || null,
  special_notes: props.attendance.special_notes || ''
})

// Estats d'assistència disponibles
const attendanceStatuses = [
  { value: 'present', label: 'Present', icon: CheckIcon },
  { value: 'absent', label: 'Absent', icon: XIcon },
  { value: 'late', label: 'Tard', icon: ClockIcon },
  { value: 'excused', label: 'Justificat', icon: FaceSmileIcon },
  { value: 'sick', label: 'Malalt', icon: ExclamationTriangleIcon },
  { value: 'early_departure', label: 'Sortida Anticipada', icon: ClockIcon }
]

// Mètodes
const loadAuthorizedPersons = async () => {
  try {
    // Carregar persones autoritzades de l'estudiant
    const response = await fetch(`/api/students/${props.attendance.student_id}/authorized-persons`, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    if (response.ok) {
      const data = await response.json()
      authorizedPersons.value = data.data || []
    }
  } catch (error) {
    console.error('Error carregant persones autoritzades:', error)
  }
}

const updateAttendanceStatus = (status) => {
  formData.attendance_status = status
  
  // Auto-emplenar hora d'entrada si es marca com a present
  if (status === 'present' && !formData.check_in_time) {
    formData.check_in_time = new Date().toTimeString().slice(0, 8)
  }
}

const selectAuthorizedPerson = () => {
  if (selectedAuthorizedPerson.value) {
    const person = selectedAuthorizedPerson.value
    formData.pickup_person_id = person.id
    formData.pickup_person_name = `${person.nom} ${person.cognoms}`
    formData.pickup_person_dni = person.dni_nie
  }
}

const getMoodEmoji = (mood) => {
  const emojis = ['😢', '😞', '😐', '😊', '😄']
  return emojis[mood - 1] || '😐'
}

const saveChanges = async () => {
  isSaving.value = true
  
  try {
    const response = await fetch(
      `/api/attendance/sessions/${props.session.id}/students/${props.attendance.student_id}/attendance`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify(formData)
      }
    )

    if (response.ok) {
      const data = await response.json()
      emit('update', data.data)
      emit('close')
    } else {
      console.error('Error desant canvis')
    }
  } catch (error) {
    console.error('Error desant canvis:', error)
  } finally {
    isSaving.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadAuthorizedPersons()
})
</script>

<style scoped>
/* Millores per tablets */
@media (max-width: 768px) {
  .max-w-4xl {
    max-width: 100%;
    margin: 0;
    height: 100vh;
    border-radius: 0;
  }
}
</style>
