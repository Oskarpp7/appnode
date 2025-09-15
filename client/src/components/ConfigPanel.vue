<template>
  <div>
    <h4 class="font-semibold mb-2">Configuració Global</h4>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-gray-100 rounded p-4">
        <div class="font-bold">Branding</div>
        <div class="text-sm text-gray-600">Colors, logo, nom sistema</div>
      </div>
      <div class="bg-gray-100 rounded p-4">
        <div class="font-bold">Serveis Actius</div>
        <div class="text-sm text-gray-600">Menjador, acollida, extraescolars</div>
      </div>
      <div class="bg-gray-100 rounded p-4">
        <div class="font-bold">Paràmetres Facturació</div>
        <div class="text-sm text-gray-600">Cicles, imports, beques</div>
      </div>
      <div class="bg-gray-100 rounded p-4">
        <div class="font-bold">Seguretat</div>
        <div class="text-sm text-gray-600">Accés, rols, permisos</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ConfigPanel'
}
</script>
