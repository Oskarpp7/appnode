<template>
  <div>
    <!-- Selector de formulari -->
    <div class="bg-white shadow-sm border-b p-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">
        <h1 class="text-xl font-semibold text-gray-900">
          Sistema Avançat de Gestió d'Estudiants
        </h1>
        <div class="flex space-x-2">
          <button
            @click="currentForm = 'simple'"
            :class="currentForm === 'simple' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-4 py-2 rounded-md text-sm font-medium"
          >
            Formulari Simple
          </button>
          <button
            @click="currentForm = 'complete'"
            :class="currentForm === 'complete' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'"
            class="px-4 py-2 rounded-md text-sm font-medium"
          >
            Formulari Complet
          </button>
        </div>
      </div>
    </div>

    <!-- Contingut del formulari -->
    <StudentFormSimple v-if="currentForm === 'simple'" />
    <StudentFormComplete v-if="currentForm === 'complete'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StudentFormSimple from '@/components/StudentFormSimple.vue'
import StudentFormComplete from '@/components/StudentFormComplete.vue'

const currentForm = ref('complete') // Començar amb el formulari complet

console.log('✅ TestView amb Sistema Avançat carregat')
</script>
