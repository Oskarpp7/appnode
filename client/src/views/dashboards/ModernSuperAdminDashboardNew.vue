<template>
  <ModernLayoutNew>
    <template #title>
      <div class="flex items-center gap-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">SA</span>
        <div>
          <h1 class="text-xl font-bold">Super Admin</h1>
          <p class="text-sm text-slate-500">Visió global del sistema</p>
        </div>
      </div>
    </template>

    <!-- KPIs -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Centres Actius</p>
        <p class="text-3xl font-bold text-primary-600">{{ kpis.centres }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Usuaris</p>
        <p class="text-3xl font-bold text-emerald-600">{{ kpis.users }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Estudiants</p>
        <p class="text-3xl font-bold text-indigo-600">{{ kpis.students }}</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Ingressos (mes)</p>
        <p class="text-3xl font-bold text-rose-600">€{{ kpis.revenue.toLocaleString() }}</p>
      </div></div>
    </section>

    <!-- Gràfics i distribucions -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Ingressos (12 mesos)</h3>
        <div class="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
          <p class="text-slate-400">Gràfic de tendència aquí</p>
        </div>
      </div></div>
      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Serveis</h3>
        <div class="h-80 bg-slate-50 rounded-lg flex items-center justify-center">
          <p class="text-slate-400">Gràfic circular aquí</p>
        </div>
      </div></div>
    </section>

    <!-- Taula -->
    <section class="card mt-6"><div class="card-body">
      <h3 class="text-lg font-semibold mb-4">Centres</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-4">Centre</th>
              <th class="text-left py-3 px-4">Estudiants</th>
              <th class="text-left py-3 px-4">Serveis</th>
              <th class="text-left py-3 px-4">Ingressos</th>
              <th class="text-left py-3 px-4">Estat</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="centre in centresData" :key="centre.nom" class="border-b border-slate-100">
              <td class="py-3 px-4 font-medium">{{ centre.nom }}</td>
              <td class="py-3 px-4">{{ centre.estudiants }}</td>
              <td class="py-3 px-4">{{ centre.serveis }}</td>
              <td class="py-3 px-4">{{ centre.ingressos }}</td>
              <td class="py-3 px-4">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{{ centre.estat }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div></section>
  </ModernLayoutNew>
</template>

<script setup>
import { ref } from 'vue'
import ModernLayoutNew from '@/components/layout/ModernLayoutNew.vue'

const kpis = ref({ centres: 8, users: 1560, students: 4312, revenue: 74250 })
const centresData = ref([
  { nom:'Escola Europa', estudiants:612, serveis:5, ingressos:'€12.500', estat:'Actiu' },
  { nom:'Col·legi Maspujols', estudiants:410, serveis:4, ingressos:'€9.500', estat:'Actiu' },
  { nom:'Institut Vilanova', estudiants:789, serveis:6, ingressos:'€18.680', estat:'Actiu' }
])
</script>