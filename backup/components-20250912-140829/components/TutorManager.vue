<template>
  <div class="bg-gray-50 p-6 rounded-lg">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <UsersIcon class="w-5 h-5 mr-2 text-purple-600" />
      Tutors i Persones Autoritzades
      <span class="ml-2 text-sm font-normal text-gray-500">({{ tutors.length }} tutors)</span>
    </h3>

    <!-- Llista de tutors existents -->
    <div v-if="tutors.length > 0" class="space-y-4 mb-6">
      <div 
        v-for="(tutor, index) in tutors" 
        :key="index"
        class="bg-white border border-gray-200 rounded-lg p-4"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 class="font-medium text-gray-900">
                {{ tutor.nom }} {{ tutor.cognoms }}
              </h4>
              <p class="text-sm text-gray-600">
                {{ getRelationshipLabel(tutor.relacio_familiar) }}
              </p>
              <p class="text-sm text-gray-500">
                DNI/NIE: {{ tutor.dni_nie }}
              </p>
            </div>
            
            <div>
              <p class="text-sm text-gray-700">
                <PhoneIcon class="w-4 h-4 inline mr-1" />
                {{ tutor.telefon_principal }}
              </p>
              <p v-if="tutor.telefon_secundari" class="text-sm text-gray-600">
                <PhoneIcon class="w-4 h-4 inline mr-1" />
                {{ tutor.telefon_secundari }}
              </p>
              <p v-if="tutor.email" class="text-sm text-gray-600">
                <EnvelopeIcon class="w-4 h-4 inline mr-1" />
                {{ tutor.email }}
              </p>
            </div>

            <div class="space-y-1">
              <div class="flex items-center text-sm">
                <span :class="tutor.autoritzat_recollir ? 'text-green-600' : 'text-red-600'">
                  <CheckIcon v-if="tutor.autoritzat_recollir" class="w-4 h-4 inline mr-1" />
                  <XMarkIcon v-else class="w-4 h-4 inline mr-1" />
                  Recollir
                </span>
              </div>
              <div class="flex items-center text-sm">
                <span :class="tutor.autoritzat_decisio_medica ? 'text-green-600' : 'text-red-600'">
                  <CheckIcon v-if="tutor.autoritzat_decisio_medica" class="w-4 h-4 inline mr-1" />
                  <XMarkIcon v-else class="w-4 h-4 inline mr-1" />
                  Decisió mèdica
                </span>
              </div>
              <div class="text-sm text-gray-600">
                Prioritat: {{ tutor.prioritat_contacte || 1 }}
              </div>
            </div>
          </div>

          <div class="flex space-x-2 ml-4">
            <button
              @click="editTutor(index)"
              class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
              title="Editar tutor"
            >
              <PencilIcon class="w-4 h-4" />
            </button>
            <button
              @click="removeTutor(index)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              title="Eliminar tutor"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div v-if="tutor.observacions" class="mt-3 pt-3 border-t">
          <p class="text-sm text-gray-600">
            <strong>Observacions:</strong> {{ tutor.observacions }}
          </p>
        </div>
      </div>
    </div>

    <!-- Formulari per afegir/editar tutor -->
    <div v-if="showForm" class="bg-white border border-gray-200 rounded-lg p-4 mb-4">
      <h4 class="text-md font-semibold text-gray-900 mb-4">
        {{ editingIndex !== -1 ? 'Editar Tutor' : 'Afegir Nou Tutor' }}
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nom *
          </label>
          <input
            v-model="currentTutor.nom"
            type="text"
            required
            maxlength="100"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': tutorErrors.nom }"
          />
          <p v-if="tutorErrors.nom" class="text-sm text-red-600 mt-1">{{ tutorErrors.nom }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Cognoms *
          </label>
          <input
            v-model="currentTutor.cognoms"
            type="text"
            required
            maxlength="150"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': tutorErrors.cognoms }"
          />
          <p v-if="tutorErrors.cognoms" class="text-sm text-red-600 mt-1">{{ tutorErrors.cognoms }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            DNI/NIE *
          </label>
          <input
            v-model="currentTutor.dni_nie"
            type="text"
            required
            pattern="^([0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]|[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE])$"
            placeholder="12345678A o X1234567A"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': tutorErrors.dni_nie }"
          />
          <p v-if="tutorErrors.dni_nie" class="text-sm text-red-600 mt-1">{{ tutorErrors.dni_nie }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Relació Familiar *
          </label>
          <select
            v-model="currentTutor.relacio_familiar"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': tutorErrors.relacio_familiar }"
          >
            <option value="">Selecciona relació...</option>
            <option value="pare">Pare</option>
            <option value="mare">Mare</option>
            <option value="tutor_legal">Tutor Legal</option>
            <option value="avi_avia">Avi/Àvia</option>
            <option value="oncle_tia">Oncle/Tia</option>
            <option value="germa_germana">Germà/Germana</option>
            <option value="altres">Altres</option>
          </select>
          <p v-if="tutorErrors.relacio_familiar" class="text-sm text-red-600 mt-1">{{ tutorErrors.relacio_familiar }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Telèfon Principal *
          </label>
          <input
            v-model="currentTutor.telefon_principal"
            type="tel"
            required
            pattern="^[0-9]{9,20}$"
            placeholder="666123456"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': tutorErrors.telefon_principal }"
          />
          <p v-if="tutorErrors.telefon_principal" class="text-sm text-red-600 mt-1">{{ tutorErrors.telefon_principal }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Telèfon Secundari
          </label>
          <input
            v-model="currentTutor.telefon_secundari"
            type="tel"
            pattern="^[0-9]{9,20}$"
            placeholder="666789012"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            v-model="currentTutor.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Prioritat de Contacte
          </label>
          <select
            v-model.number="currentTutor.prioritat_contacte"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option :value="1">1 (Prioritat més alta)</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
            <option :value="5">5 (Prioritat més baixa)</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <div class="flex items-center space-x-6">
            <label class="flex items-center">
              <input
                v-model="currentTutor.autoritzat_recollir"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Autoritzat per recollir</span>
            </label>

            <label class="flex items-center">
              <input
                v-model="currentTutor.autoritzat_decisio_medica"
                type="checkbox"
                class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-700">Autoritzat per decisions mèdiques</span>
            </label>
          </div>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Observacions
          </label>
          <textarea
            v-model="currentTutor.observacions"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Informació addicional sobre el tutor..."
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-4">
        <button
          @click="cancelTutorForm"
          type="button"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel·lar
        </button>
        <button
          @click="saveTutor"
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {{ editingIndex !== -1 ? 'Actualitzar' : 'Afegir' }} Tutor
        </button>
      </div>
    </div>

    <!-- Botó per afegir tutor -->
    <button
      v-if="!showForm"
      @click="showAddForm"
      type="button"
      class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
    >
      <PlusIcon class="w-5 h-5 inline mr-2" />
      Afegir Tutor
    </button>

    <!-- Errors generals de tutors -->
    <p v-if="errors" class="text-sm text-red-600 mt-2">{{ errors }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { 
  UsersIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  CheckIcon, 
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  errors: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const tutors = ref([...props.modelValue])
const showForm = ref(false)
const editingIndex = ref(-1)
const tutorErrors = reactive({})

const currentTutor = reactive({
  nom: '',
  cognoms: '',
  dni_nie: '',
  telefon_principal: '',
  telefon_secundari: '',
  email: '',
  relacio_familiar: '',
  prioritat_contacte: 1,
  autoritzat_recollir: true,
  autoritzat_decisio_medica: false,
  observacions: ''
})

// Sincronitzar amb el v-model
watch(tutors, (newTutors) => {
  emit('update:modelValue', newTutors)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  tutors.value = [...newValue]
}, { deep: true })

const getRelationshipLabel = (relationship) => {
  const labels = {
    pare: 'Pare',
    mare: 'Mare',
    tutor_legal: 'Tutor Legal',
    avi_avia: 'Avi/Àvia',
    oncle_tia: 'Oncle/Tia',
    germa_germana: 'Germà/Germana',
    altres: 'Altres'
  }
  return labels[relationship] || relationship
}

const resetCurrentTutor = () => {
  Object.assign(currentTutor, {
    nom: '',
    cognoms: '',
    dni_nie: '',
    telefon_principal: '',
    telefon_secundari: '',
    email: '',
    relacio_familiar: '',
    prioritat_contacte: 1,
    autoritzat_recollir: true,
    autoritzat_decisio_medica: false,
    observacions: ''
  })
  Object.keys(tutorErrors).forEach(key => delete tutorErrors[key])
}

const showAddForm = () => {
  resetCurrentTutor()
  editingIndex.value = -1
  showForm.value = true
}

const editTutor = (index) => {
  const tutor = tutors.value[index]
  Object.assign(currentTutor, { ...tutor })
  editingIndex.value = index
  showForm.value = true
}

const removeTutor = (index) => {
  if (confirm('Estàs segur que vols eliminar aquest tutor?')) {
    tutors.value.splice(index, 1)
  }
}

const cancelTutorForm = () => {
  resetCurrentTutor()
  editingIndex.value = -1
  showForm.value = false
}

const validateTutor = () => {
  const errors = {}

  if (!currentTutor.nom?.trim()) {
    errors.nom = 'El nom és obligatori'
  } else if (currentTutor.nom.length > 100) {
    errors.nom = 'El nom no pot superar els 100 caràcters'
  }

  if (!currentTutor.cognoms?.trim()) {
    errors.cognoms = 'Els cognoms són obligatoris'
  } else if (currentTutor.cognoms.length > 150) {
    errors.cognoms = 'Els cognoms no poden superar els 150 caràcters'
  }

  if (!currentTutor.dni_nie?.trim()) {
    errors.dni_nie = 'El DNI/NIE és obligatori'
  } else if (!/^([0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]|[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE])$/i.test(currentTutor.dni_nie)) {
    errors.dni_nie = 'Format de DNI/NIE incorrecte'
  } else {
    // Verificar DNI únic
    const isDniExists = tutors.value.some((tutor, index) => 
      tutor.dni_nie === currentTutor.dni_nie && index !== editingIndex.value
    )
    if (isDniExists) {
      errors.dni_nie = 'Aquest DNI/NIE ja està registrat'
    }
  }

  if (!currentTutor.telefon_principal?.trim()) {
    errors.telefon_principal = 'El telèfon principal és obligatori'
  } else if (!/^[0-9]{9,20}$/.test(currentTutor.telefon_principal)) {
    errors.telefon_principal = 'Format de telèfon incorrecte (9-20 dígits)'
  }

  if (!currentTutor.relacio_familiar) {
    errors.relacio_familiar = 'La relació familiar és obligatòria'
  }

  if (currentTutor.telefon_secundari && !/^[0-9]{9,20}$/.test(currentTutor.telefon_secundari)) {
    errors.telefon_secundari = 'Format de telèfon secundari incorrecte'
  }

  Object.assign(tutorErrors, errors)
  return Object.keys(errors).length === 0
}

const saveTutor = () => {
  // Netejar errors previs
  Object.keys(tutorErrors).forEach(key => delete tutorErrors[key])

  if (!validateTutor()) {
    return
  }

  const tutorData = { ...currentTutor }

  if (editingIndex.value !== -1) {
    // Actualitzar tutor existent
    tutors.value[editingIndex.value] = tutorData
  } else {
    // Afegir nou tutor
    tutors.value.push(tutorData)
  }

  cancelTutorForm()
}
</script>
