<template>
  <div>
    <h4 class="font-semibold mb-2">Llistat de Centres</h4>
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th class="px-4 py-2">Nom</th>
          <th class="px-4 py-2">Estat</th>
          <th class="px-4 py-2">Usuaris</th>
          <th class="px-4 py-2">Ingressos</th>
          <th class="px-4 py-2">Accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in schools" :key="school.id">
          <td class="px-4 py-2">{{ school.name }}</td>
          <td class="px-4 py-2">{{ school.status }}</td>
          <td class="px-4 py-2">{{ school.users }}</td>
          <td class="px-4 py-2">{{ school.ingressos }}</td>
          <td class="px-4 py-2">
            <button class="text-blue-600 hover:underline">Veure</button>
            <button class="text-green-600 hover:underline ml-2">Editar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SchoolList',
  props: {
    schools: {
      type: Array,
      default: () => [
        { id: 1, name: 'Escola Demo', status: 'Actiu', users: 12, ingressos: '€5.000' },
        { id: 2, name: 'Escola Nova', status: 'Actiu', users: 8, ingressos: '€3.200' }
      ]
    }
  }
}
</script>
