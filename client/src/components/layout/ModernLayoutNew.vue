<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <div class="flex">
      <ModernSidebar :collapsed="collapsed" :items="navItems" @toggle="collapsed=!collapsed" />
      <div class="flex-1 min-w-0">
        <ModernTopbar @toggle-dark="toggleDark">
          <template #title><slot name="title" /></template>
        </ModernTopbar>
        <main class="app-container py-6">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, h } from 'vue'
import ModernSidebar from './ModernSidebar.vue'
import ModernTopbar from './ModernTopbar.vue'

const collapsed = ref(false)
const navItems = [
  { to: '/superadmin', label: 'Super Admin', icon: { render(){return h('span',{class:'h-3 w-3 rounded-full bg-primary-600 block'})}} },
  { to: '/admin', label: 'Admin', icon: { render(){return h('span',{class:'h-3 w-3 rounded-full bg-emerald-600 block'})}} },
  { to: '/coordinador', label: 'Coordinador', icon: { render(){return h('span',{class:'h-3 w-3 rounded-full bg-indigo-600 block'})}} },
  { to: '/monitor', label: 'Monitor', icon: { render(){return h('span',{class:'h-3 w-3 rounded-full bg-amber-500 block'})}} },
  { to: '/familia', label: 'Família', icon: { render(){return h('span',{class:'h-3 w-3 rounded-full bg-rose-500 block'})}} },
]
function toggleDark() {
  const cls = document.documentElement.classList
  cls.toggle('dark')
}
</script>