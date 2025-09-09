<template>
  <div class="p-8 bg-green-100 min-h-screen">
    <h1 class="text-4xl font-bold text-green-800 mb-4">
      ✅ APP FUNCIONANT CORRECTAMENT!
    </h1>
    <p class="text-green-700 mb-4">
      Si veus aquesta pàgina, el problema està solucionat.
    </p>
    <router-link to="/login" class="bg-blue-600 text-white px-4 py-2 rounded">
      Anar a Login
    </router-link>
  </div>
</template>

<script setup>
console.log('✅ TestView carregat')
</script>
