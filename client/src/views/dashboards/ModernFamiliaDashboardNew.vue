<template>
  <ModernLayoutNew>
    <template #title>
      <div class="flex items-center gap-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500 text-white">FA</span>
        <div>
          <h1 class="text-xl font-bold">Família</h1>
          <p class="text-sm text-slate-500">Els meus fills</p>
        </div>
      </div>
    </template>

    <!-- Els meus fills -->
    <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div class="card-body">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span class="text-xl font-bold">MF</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Marc Fernández</h3>
              <p class="text-blue-100">6è Primària</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-sm">Present avui</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card bg-gradient-to-r from-pink-500 to-pink-600 text-white">
        <div class="card-body">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span class="text-xl font-bold">AF</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold">Anna Fernández</h3>
              <p class="text-pink-100">4t Primària</p>
              <div class="flex items-center gap-2 mt-2">
                <span class="w-2 h-2 bg-green-400 rounded-full"></span>
                <span class="text-sm">Present avui</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resum mensual -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Dies Aquest Mes</p>
        <p class="text-3xl font-bold text-green-600">{{ summary.days }}</p>
        <p class="text-sm text-green-600 mt-1">Excel·lent</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Activitats</p>
        <p class="text-3xl font-bold text-blue-600">{{ summary.activities }}</p>
        <p class="text-sm text-blue-600 mt-1">Ambdós fills</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Pagament Pendent</p>
        <p class="text-3xl font-bold text-amber-600">€{{ summary.pending }}</p>
        <p class="text-sm text-amber-600 mt-1">Setembre 2025</p>
      </div></div>
      <div class="card"><div class="card-body">
        <p class="text-sm text-slate-500">Missatges</p>
        <p class="text-3xl font-bold text-purple-600">{{ summary.messages }}</p>
        <p class="text-sm text-purple-600 mt-1">Nous del centre</p>
      </div></div>
    </section>

    <!-- Activitats i comunicacions -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Activitats Aquesta Setmana</h3>
        <div class="space-y-3">
          <div class="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-sm">Marc - Futbol</h4>
                <p class="text-xs text-slate-600">Dilluns 16:00</p>
                <p class="text-xs text-blue-600">Monitor: Joan</p>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Present</span>
            </div>
          </div>
          
          <div class="p-3 bg-pink-50 rounded-lg border-l-4 border-pink-400">
            <div class="flex justify-between items-start">
              <div>
                <h4 class="font-semibold text-sm">Anna - Art</h4>
                <p class="text-xs text-slate-600">Dimarts 15:30</p>
                <p class="text-xs text-pink-600">Monitor: Maria</p>
              </div>
              <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Present</span>
            </div>
          </div>
        </div>
      </div></div>

      <div class="card"><div class="card-body">
        <h3 class="text-lg font-semibold mb-4">Comunicacions</h3>
        <div class="space-y-3">
          <div class="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-400">
            <h4 class="font-semibold text-sm">Reunió pares</h4>
            <p class="text-xs text-slate-600 mt-1">Dijous 19:00 - Informativa curs</p>
            <button class="text-purple-600 text-xs font-medium mt-2">Confirmar</button>
          </div>
          
          <div class="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-400">
            <h4 class="font-semibold text-sm">Pagament pendent</h4>
            <p class="text-xs text-slate-600 mt-1">€48 - Setembre 2025</p>
            <button class="text-amber-600 text-xs font-medium mt-2">Pagar ara</button>
          </div>
        </div>
        <button class="w-full mt-4 btn-primary text-sm">Enviar Missatge</button>
      </div></div>
    </section>

    <!-- Historial pagaments -->
    <section class="card mt-6"><div class="card-body">
      <h3 class="text-lg font-semibold mb-4">Historial Pagaments</h3>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-2 px-3 text-sm">Mes</th>
              <th class="text-left py-2 px-3 text-sm">Import</th>
              <th class="text-left py-2 px-3 text-sm">Estat</th>
              <th class="text-left py-2 px-3 text-sm">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-slate-100">
              <td class="py-2 px-3 text-sm">Setembre 2025</td>
              <td class="py-2 px-3 text-sm font-medium">€48,00</td>
              <td class="py-2 px-3"><span class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full">Pendent</span></td>
              <td class="py-2 px-3 text-sm text-slate-500">-</td>
            </tr>
            <tr class="border-b border-slate-100">
              <td class="py-2 px-3 text-sm">Agost 2025</td>
              <td class="py-2 px-3 text-sm font-medium">€48,00</td>
              <td class="py-2 px-3"><span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Pagat</span></td>
              <td class="py-2 px-3 text-sm text-slate-500">14/08/2025</td>
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

const summary = ref({ days: 18, activities: 6, pending: 48, messages: 2 })
</script>