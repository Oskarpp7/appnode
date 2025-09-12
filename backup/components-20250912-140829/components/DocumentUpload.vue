<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <DocumentIcon class="w-5 h-5 mr-2 text-blue-600" />
      Documents de l'Estudiant
      <span class="ml-2 text-sm font-normal text-gray-500">({{ documents.length }} documents)</span>
    </h3>

    <!-- Documents existents -->
    <div v-if="documents.length > 0" class="space-y-3 mb-4">
      <div 
        v-for="(doc, index) in documents" 
        :key="index"
        class="bg-gray-50 border border-gray-200 rounded-lg p-3 flex items-center justify-between"
      >
        <div class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <DocumentIcon class="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h4 class="font-medium text-gray-900">{{ doc.nom_document }}</h4>
            <p class="text-sm text-gray-600">{{ getDocumentTypeLabel(doc.tipus_document) }}</p>
            <p v-if="doc.data_expiracio" class="text-xs text-gray-500">
              Expira: {{ formatDate(doc.data_expiracio) }}
            </p>
            <p v-if="doc.fileName" class="text-xs text-gray-500">
              {{ doc.fileName }} ({{ formatFileSize(doc.fileSize) }})
            </p>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <span :class="getDocumentStatusClass(doc.estat_verificacio)">
            {{ doc.estat_verificacio }}
          </span>
          <button
            @click="removeDocument(index)"
            class="p-1 text-red-600 hover:bg-red-50 rounded"
            title="Eliminar document"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Formulari per afegir document -->
    <div v-if="showForm" class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <h4 class="text-md font-semibold text-gray-900 mb-4">Afegir Nou Document</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nom del Document *
          </label>
          <input
            v-model="currentDocument.nom_document"
            type="text"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': documentErrors.nom_document }"
          />
          <p v-if="documentErrors.nom_document" class="text-sm text-red-600 mt-1">{{ documentErrors.nom_document }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tipus de Document *
          </label>
          <select
            v-model="currentDocument.tipus_document"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': documentErrors.tipus_document }"
          >
            <option value="">Selecciona tipus...</option>
            <option value="dni">DNI/NIE</option>
            <option value="llibre_familia">Llibre de Família</option>
            <option value="targeta_sanitaria">Targeta Sanitària</option>
            <option value="informe_medic">Informe Mèdic</option>
            <option value="certificat_escolar">Certificat Escolar</option>
            <option value="autorizacio">Autorització</option>
            <option value="altres">Altres</option>
          </select>
          <p v-if="documentErrors.tipus_document" class="text-sm text-red-600 mt-1">{{ documentErrors.tipus_document }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Data d'Expiració
          </label>
          <input
            v-model="currentDocument.data_expiracio"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Seleccionar Fitxer *
          </label>
          <input
            @change="handleFileSelect"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': documentErrors.file }"
          />
          <p v-if="documentErrors.file" class="text-sm text-red-600 mt-1">{{ documentErrors.file }}</p>
          <p class="text-xs text-gray-500 mt-1">
            Formats permesos: PDF, JPG, PNG, DOC, DOCX (màx. 10MB)
          </p>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Observacions
          </label>
          <textarea
            v-model="currentDocument.observacions"
            rows="2"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Informació addicional sobre el document..."
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end space-x-3 mt-4">
        <button
          @click="cancelForm"
          type="button"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel·lar
        </button>
        <button
          @click="addDocument"
          type="button"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Afegir Document
        </button>
      </div>
    </div>

    <!-- Botó per afegir document -->
    <button
      v-if="!showForm"
      @click="showAddForm"
      type="button"
      class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
    >
      <PlusIcon class="w-5 h-5 inline mr-2" />
      Afegir Document
    </button>

    <!-- Error general -->
    <p v-if="errors" class="text-sm text-red-600 mt-2">{{ errors }}</p>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { 
  DocumentIcon,
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

const documents = ref([...props.modelValue])
const showForm = ref(false)
const documentErrors = reactive({})

const currentDocument = reactive({
  nom_document: '',
  tipus_document: '',
  data_expiracio: '',
  file: null,
  observacions: ''
})

// Sincronitzar amb el v-model
watch(documents, (newDocuments) => {
  emit('update:modelValue', newDocuments)
}, { deep: true })

watch(() => props.modelValue, (newValue) => {
  documents.value = [...newValue]
}, { deep: true })

const getDocumentTypeLabel = (type) => {
  const labels = {
    dni: 'DNI/NIE',
    llibre_familia: 'Llibre de Família',
    targeta_sanitaria: 'Targeta Sanitària',
    informe_medic: 'Informe Mèdic',
    certificat_escolar: 'Certificat Escolar',
    autorizacio: 'Autorització',
    altres: 'Altres'
  }
  return labels[type] || type
}

const getDocumentStatusClass = (status) => {
  const classes = {
    'pendent': 'text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800',
    'verificat': 'text-xs px-2 py-1 rounded-full bg-green-100 text-green-800',
    'rebutjat': 'text-xs px-2 py-1 rounded-full bg-red-100 text-red-800'
  }
  return classes[status] || classes['pendent']
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('ca-ES')
}

const formatFileSize = (bytes) => {
  if (!bytes) return ''
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

const resetCurrentDocument = () => {
  Object.assign(currentDocument, {
    nom_document: '',
    tipus_document: '',
    data_expiracio: '',
    file: null,
    observacions: ''
  })
  Object.keys(documentErrors).forEach(key => delete documentErrors[key])
}

const showAddForm = () => {
  resetCurrentDocument()
  showForm.value = true
}

const cancelForm = () => {
  resetCurrentDocument()
  showForm.value = false
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validar mida del fitxer (10MB màxim)
    if (file.size > 10 * 1024 * 1024) {
      documentErrors.file = 'El fitxer és massa gran. Mida màxima: 10MB'
      event.target.value = ''
      return
    }
    
    // Validar tipus de fitxer
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      documentErrors.file = 'Tipus de fitxer no permès'
      event.target.value = ''
      return
    }
    
    delete documentErrors.file
    currentDocument.file = file
    
    // Si no hi ha nom de document, usar el nom del fitxer
    if (!currentDocument.nom_document) {
      currentDocument.nom_document = file.name.split('.')[0]
    }
  }
}

const validateDocument = () => {
  const errors = {}
  
  if (!currentDocument.nom_document?.trim()) {
    errors.nom_document = 'El nom del document és obligatori'
  }
  
  if (!currentDocument.tipus_document) {
    errors.tipus_document = 'El tipus de document és obligatori'
  }
  
  if (!currentDocument.file) {
    errors.file = 'Cal seleccionar un fitxer'
  }
  
  Object.assign(documentErrors, errors)
  return Object.keys(errors).length === 0
}

const addDocument = () => {
  if (!validateDocument()) {
    return
  }
  
  // Crear objecte document
  const documentData = {
    nom_document: currentDocument.nom_document,
    tipus_document: currentDocument.tipus_document,
    data_expiracio: currentDocument.data_expiracio || null,
    observacions: currentDocument.observacions,
    estat_verificacio: 'pendent',
    file: currentDocument.file,
    fileName: currentDocument.file.name,
    fileSize: currentDocument.file.size,
    mimeType: currentDocument.file.type
  }
  
  documents.value.push(documentData)
  cancelForm()
}

const removeDocument = (index) => {
  if (confirm('Estàs segur que vols eliminar aquest document?')) {
    documents.value.splice(index, 1)
  }
}
</script>
