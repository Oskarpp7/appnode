
<template>
  <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 via-white to-blue-300 animate-fade-in">
    <div class="w-full max-w-md p-8 rounded-2xl shadow-2xl backdrop-blur-md bg-white/80 border border-blue-100 transition-all duration-500">
      <div class="flex flex-col items-center mb-6">
        <img src="/favicon.ico" alt="Logo" class="w-14 h-14 mb-2 drop-shadow-lg" />
        <h2 class="text-3xl font-extrabold text-blue-900 tracking-tight text-center">Gestió Escolar</h2>
        <p class="mt-2 text-center text-base text-blue-700">Accedeix al teu compte</p>
      </div>
      <div class="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800 rounded">
        <strong>ATENCIÓ:</strong> Hi ha una errada de connexió amb el login de tots els rols excepte Admin Centre. Si persisteix, caldrà revisar la coherència entre emails, contrasenyes i tenant_slug al backend i frontend, o restaurar l'estat anterior.
      </div>
      <form class="space-y-6" @submit.prevent="handleLogin" aria-label="Formulari d'inici de sessió">
        <div class="space-y-4">
          <div class="relative">
            <label for="email" class="block text-sm font-medium text-blue-800">Email</label>
            <span class="absolute left-3 top-9 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </span>
            <input
              id="email"
              v-model="credentials.email"
              name="email"
              type="email"
              required
              autocomplete="username"
              class="mt-1 block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/90 text-blue-900 placeholder-blue-300"
              placeholder="El teu email"
              aria-required="true"
            />
          </div>
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-blue-800">Contrasenya</label>
            <span class="absolute left-3 top-9 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </span>
            <input
              id="password"
              v-model="credentials.password"
              name="password"
              type="password"
              required
              autocomplete="current-password"
              class="mt-1 block w-full pl-10 pr-3 py-2 border border-blue-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white/90 text-blue-900 placeholder-blue-300"
              placeholder="La teva contrasenya"
              aria-required="true"
            />
          </div>
        </div>
        <transition name="fade">
          <div v-if="authStore.error" class="bg-red-50 border border-red-200 rounded-md p-3 animate-shake">
            <p class="text-sm text-red-700">{{ authStore.error }}</p>
          </div>
        </transition>
        <div>
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-300"
            aria-busy="authStore.loading"
          >
            <svg v-if="authStore.loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span v-if="authStore.loading">Entrant...</span>
            <span v-else>Entrar</span>
          </button>
        </div>
        <div class="text-xs text-blue-700 bg-blue-50 p-3 rounded mt-2">
          <p class="font-medium">Credencials de prova (seed actual):</p>
          <p><strong>Super Admin:</strong> admin@gestio-escolar.com / password123</p>
          <p><strong>Admin Centre:</strong> admin@escola-demo.com / password123</p>
          <p><strong>Monitor:</strong> monitor@escola-demo.com / password123</p>
          <p><strong>Família:</strong> anna.garcia@email.com / password123</p>
        </div>
        <!-- Botons d'autologin -->
        <div class="mt-2 grid grid-cols-2 gap-2">
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('admin@gestio-escolar.com','password123')">Super Admin</button>
          <button type="button" class="bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('admin@escola-demo.com','password123')">Admin Centre</button>
          <button type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('monitor@escola-demo.com','password123')">Monitor</button>
          <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('anna.garcia@email.com','password123')">Família</button>
        </div>
        <!-- Botons d'accés directe per debug -->
        <div class="mt-4 space-y-2">
          <h3 class="text-sm font-medium text-blue-700 text-center">🔧 Accés directe (desenvolupament)</h3>
          <div class="grid grid-cols-2 gap-2">
            <router-link to="/admin" class="bg-blue-500 hover:bg-blue-700 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              🏢 Admin Centre
            </router-link>
            <router-link to="/admin-simple" class="bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              🏢 Admin Simple
            </router-link>
            <router-link to="/coordinador" class="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              📋 Coordinador
            </router-link>
            <router-link to="/monitor" class="bg-yellow-500 hover:bg-yellow-700 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              👨‍🏫 Monitor
            </router-link>
            <router-link to="/familia" class="bg-purple-500 hover:bg-purple-700 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              👨‍👩‍👧‍👦 Família
            </router-link>
            <router-link to="/test" class="bg-gray-500 hover:bg-gray-700 text-white text-xs font-bold py-1 px-2 rounded text-center shadow-sm">
              🧪 Test Form
            </router-link>
          </div>
        </div>
      </form>
      <footer class="mt-8 text-center text-xs text-blue-400">
        &copy; 2025 Gestió Escolar. <a href="/DOCUMENTACIO_DASHBOARD_SUPERADMIN.md" class="underline hover:text-blue-600">Documentació</a>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  console.log('🚀 INICIANT LOGIN...')
  const result = await authStore.login(credentials.value)
  if (!result.success) {
    console.error('❌ LOGIN FALLIT:', result.error)
  }
  // NO cal redireccionar manualment - ho fa automàticament l'store
}

function autofill(email, password) {
  credentials.value.email = email
  credentials.value.password = password
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1.2s ease;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-shake {
  animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
}
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
