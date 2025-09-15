<template>
  <div>
    <h4 class="font-semibold mb-2">Usuaris Globals</h4>
    <table class="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          <th class="px-4 py-2">Nom</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Rol</th>
          <th class="px-4 py-2">Centre</th>
          <th class="px-4 py-2">Accions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td class="px-4 py-2">{{ user.name }}</td>
          <td class="px-4 py-2">{{ user.email }}</td>
          <td class="px-4 py-2">{{ user.role }}</td>
          <td class="px-4 py-2">{{ user.centre }}</td>
          <td class="px-4 py-2">
            <button class="text-blue-600 hover:underline">Veure</button>
            <button class="text-red-600 hover:underline ml-2">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'UserList',
  props: {
    users: {
      type: Array,
      default: () => [
        { id: 1, name: 'Admin 1', email: 'admin1@demo.com', role: 'SUPER_ADMIN', centre: 'Escola Demo' },
        { id: 2, name: 'Admin 2', email: 'admin2@demo.com', role: 'ADMIN_CENTRE', centre: 'Escola Demo' }
      ]
    }
  }
}
</script>
