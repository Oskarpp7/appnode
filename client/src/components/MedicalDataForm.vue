<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4">
    <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
      <HeartIcon class="w-5 h-5 mr-2 text-red-600" />
      Informació Mèdica
    </h3>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Número de Targeta Sanitària
        </label>
        <input
          v-model="modelValue.numero_targeta_sanitaria"
          type="text"
          maxlength="50"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Centre de Salut / Metge de Capçalera
        </label>
        <input
          v-model="modelValue.centre_salut"
          type="text"
          maxlength="200"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Al·lèrgies (separades per comes)
      </label>
      <input
        v-model="allergiesInput"
        type="text"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Fruits secs, làcteos, polen..."
        @blur="updateAllergies"
        @keypress.enter="updateAllergies"
      />
      <div v-if="modelValue.allergies?.length" class="mt-2 flex flex-wrap gap-2">
        <span 
          v-for="allergy in modelValue.allergies" 
          :key="allergy"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
        >
          {{ allergy }}
          <button 
            @click="removeAllergy(allergy)"
            class="ml-1 text-red-600 hover:text-red-800"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Medicaments Habituals
      </label>
      <textarea
        v-model="modelValue.medicaments"
        rows="2"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Descriu els medicaments que pren habitualment..."
      ></textarea>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Condicions Cròniques
      </label>
      <textarea
        v-model="modelValue.condicions_croniques"
        rows="2"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Asma, diabetis, epilèpsia..."
      ></textarea>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Contacte d'Emergència Mèdica
      </label>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="modelValue.contacte_emergencia_nom"
          type="text"
          placeholder="Nom del contacte d'emergència"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <input
          v-model="modelValue.contacte_emergencia_telefon"
          type="tel"
          placeholder="Telèfon d'emergència"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
    </div>

    <div class="mt-4">
      <label class="flex items-center space-x-2">
        <input
          v-model="modelValue.necessita_atencio_especial"
          type="checkbox"
          class="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
        />
        <span class="text-sm text-gray-700">Necessita atenció mèdica especial</span>
      </label>
    </div>

    <div v-if="modelValue.necessita_atencio_especial" class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Descripció Atenció Especial
      </label>
      <textarea
        v-model="modelValue.detalls_atencio_especial"
        rows="3"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Descriu l'atenció mèdica especial que necessita..."
      ></textarea>
    </div>

    <div class="mt-4">
      <label class="block text-sm font-medium text-gray-700 mb-1">
        Observacions Mèdiques Addicionals
      </label>
      <textarea
        v-model="modelValue.observacions_mediques"
        rows="2"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        placeholder="Qualsevol altra informació mèdica rellevant..."
      ></textarea>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { HeartIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      numero_targeta_sanitaria: '',
      centre_salut: '',
      allergies: [],
      medicaments: '',
      condicions_croniques: '',
      contacte_emergencia_nom: '',
      contacte_emergencia_telefon: '',
      necessita_atencio_especial: false,
      detalls_atencio_especial: '',
      observacions_mediques: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const allergiesInput = ref('')

// Sincronitzar canvis amb el v-model
watch(() => props.modelValue, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

const updateAllergies = () => {
  if (allergiesInput.value.trim()) {
    const newAllergies = allergiesInput.value
      .split(',')
      .map(allergy => allergy.trim())
      .filter(allergy => allergy.length > 0)
    
    // Afegir noves al·lèrgies sense duplicats
    newAllergies.forEach(allergy => {
      if (!props.modelValue.allergies.includes(allergy)) {
        props.modelValue.allergies.push(allergy)
      }
    })
    
    allergiesInput.value = ''
    emit('update:modelValue', props.modelValue)
  }
}

const removeAllergy = (allergy) => {
  const index = props.modelValue.allergies.indexOf(allergy)
  if (index > -1) {
    props.modelValue.allergies.splice(index, 1)
    emit('update:modelValue', props.modelValue)
  }
}
</script>
