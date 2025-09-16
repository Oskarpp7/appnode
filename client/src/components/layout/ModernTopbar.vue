<template>
  <header class="h-16 sticky top-0 z-20 bg-white/90 dark:bg-slate-950/60 backdrop-blur border-b border-slate-200 dark:border-slate-800">
    <div class="app-container h-full flex items-center justify-between">
      <div class="flex items-center gap-3">
        <slot name="title">
          <h1 class="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        </slot>
      </div>
      <div class="flex items-center gap-2">
        <button @click="$emit('toggle-dark')" class="btn-ghost" aria-label="Mode fosc">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13A9 9 0 1111 2.36 7 7 0 0021.64 13z"/></svg>
        </button>
        <UserMenu />
      </div>
    </div>
  </header>
</template>
<script setup>
import UserMenu from '@/components/UserMenu.vue'
defineEmits(['toggle-dark'])
</script>