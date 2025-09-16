
<template>
  <div class="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
          <span class="text-white font-bold text-xl">GE</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900">
        Gestió Escolar
      </h2>
      <p class="mt-2 text-center text-sm text-slate-600">
        Selecciona el teu perfil per accedir
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="card">
        <div class="card-body space-y-4">
          <!-- Botons d'accés ràpid -->
          <button @click="quickLogin('admin@admin.com')" 
                  class="w-full btn-primary justify-start gap-3">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            Admin
          </button>
          
          <button @click="quickLogin('superadmin@edutech.com')" 
                  class="w-full btn-primary justify-start gap-3 bg-purple-600 hover:bg-purple-700">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            Super Admin
          </button>
          
          <button @click="quickLogin('coordinador@edutech.com')" 
                  class="w-full btn-primary justify-start gap-3 bg-indigo-600 hover:bg-indigo-700">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            Coordinador
          </button>
          
          <button @click="quickLogin('monitor@edutech.com')" 
                  class="w-full btn-primary justify-start gap-3 bg-amber-500 hover:bg-amber-600">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            Monitor
          </button>
          
          <button @click="quickLogin('familia@edutech.com')" 
                  class="w-full btn-primary justify-start gap-3 bg-rose-500 hover:bg-rose-600">
            <span class="w-2 h-2 bg-white rounded-full"></span>
            Família
          </button>
          
          <div v-if="isLoading" class="flex justify-center py-2">
            <div class="w-4 h-4 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          </div>
          
          <div v-if="error" class="text-sm text-red-600 text-center bg-red-50 p-2 rounded-lg">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
            <script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const isLoading = ref(false)
const error = ref('')

async function quickLogin(email) {
  if (isLoading.value) return
  
  isLoading.value = true
  error.value = ''
  
  try {
    await auth.login({
      email,
      password: 'password123',
      tenant_slug: 'escola-demo'
    })
    
    // Redirigir segons el rol
    const roleRoutes = {
      'SUPER_ADMIN': '/superadmin',
      'ADMIN': '/admin', 
      'COORDINADOR': '/coordinador',
      'MONITOR': '/monitor',
      'FAMILIA': '/familia'
    }
    
    const route = roleRoutes[auth.user.role] || '/admin'
    await router.push(route)
    
  } catch (err) {
    error.value = err.message || 'Error d\'autenticació'
  } finally {
    isLoading.value = false
  }
}
</script>
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
          <p class="font-medium">Credencials de prova:</p>
          <p><strong>Super Admin:</strong> admin@gestioescolar.com / password123</p>
          <p><strong>Admin:</strong> admin@admin.com / password123</p>
          <p><strong>Coordinador:</strong> admin@edutech.com / password123</p>
          <p><strong>Monitor:</strong> monitor@edutech.com / password123</p>
          <p><strong>Família:</strong> familia@edutech.com / password123</p>
        </div>
        <!-- Botons d'autologin -->
        <div class="mt-2 grid grid-cols-2 gap-2">
          <button type="button" class="bg-red-500 hover:bg-red-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('admin@gestioescolar.com','password123')">Super Admin</button>
          <button type="button" class="bg-blue-600 hover:bg-blue-800 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('admin@admin.com','password123')">Admin</button>
          <button type="button" class="bg-green-500 hover:bg-green-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('admin@edutech.com','password123')">Coordinador</button>
          <button type="button" class="bg-yellow-500 hover:bg-yellow-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('monitor@edutech.com','password123')">Monitor</button>
          <button type="button" class="bg-purple-500 hover:bg-purple-700 text-white text-xs font-bold py-1 px-2 rounded shadow-sm" @click="autofill('familia@edutech.com','password123')">Família</button>
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
