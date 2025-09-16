<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex items-center justify-center h-16 px-4 bg-blue-600">
        <h1 class="text-xl font-bold text-white">EduManager</h1>
      </div>
      
      <nav class="mt-8">
        <div class="px-4 space-y-2">
          <router-link 
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
            :class="{ 'bg-blue-50 text-blue-700 border-r-2 border-blue-700': $route.path === item.path }"
          >
            <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-html="item.iconSvg"></path>
            </svg>
            <span class="font-medium">{{ item.name }}</span>
          </router-link>
        </div>
      </nav>
    </div>

    <!-- Mobile sidebar backdrop -->
    <div 
      v-if="sidebarOpen" 
      class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top navigation -->
      <div class="flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 lg:px-6">
        <div class="flex items-center">
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="p-2 text-gray-600 hover:text-gray-900 lg:hidden"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <h2 class="ml-4 text-xl font-semibold text-gray-800 lg:ml-0">{{ pageTitle }}</h2>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Notifications -->
          <button class="p-2 text-gray-600 hover:text-gray-900 relative">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 transform translate-x-1/2 -translate-y-1/2"></span>
          </button>

          <!-- User menu -->
          <div class="relative" v-if="user">
            <button 
              @click="showUserMenu = !showUserMenu"
              class="flex items-center space-x-3 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span class="text-blue-700 font-semibold">{{ user.name?.[0]?.toUpperCase() }}</span>
              </div>
              <div class="hidden md:block">
                <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                <div class="text-xs text-gray-500">{{ user.role }}</div>
              </div>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User dropdown -->
            <div 
              v-if="showUserMenu"
              class="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200"
            >
              <div class="py-1">
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">El meu perfil</a>
                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Configuració</a>
                <hr class="my-1">
                <button 
                  @click="logout"
                  class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                >
                  Sortir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="p-4 lg:p-6">
        <div class="mx-auto max-w-7xl">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const sidebarOpen = ref(false)
const showUserMenu = ref(false)

const user = computed(() => authStore.user)

// Navigation items based on user role
const navigationItems = computed(() => {
  const homeIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />'
  const usersIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />'
  const documentIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />'
  const cogIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />'
  const clipboardIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />'
  const checkIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
  const chartIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />'
  const trendingIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />'
  const creditCardIcon = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />'

  const roleSpecificItems = {
    'SUPER_ADMIN': [
      { name: 'Dashboard', path: '/superadmin', iconSvg: homeIcon },
      { name: 'Estudiants', path: '/students', iconSvg: usersIcon },
      { name: 'Contractes', path: '/contracts', iconSvg: documentIcon },
      { name: 'Serveis', path: '/services', iconSvg: cogIcon },
      { name: 'Control Assistència', path: '/attendance', iconSvg: clipboardIcon },
      { name: 'Passar Llista', path: '/attendance-check', iconSvg: checkIcon },
      { name: 'Gestió Ampliada', path: '/management', iconSvg: chartIcon },
      { name: 'Dashboard Executiu', path: '/executive', iconSvg: trendingIcon }
    ],
    'ADMIN': [
      { name: 'Dashboard', path: '/admin', iconSvg: homeIcon },
      { name: 'Estudiants', path: '/students', iconSvg: usersIcon },
      { name: 'Contractes', path: '/contracts', iconSvg: documentIcon },
      { name: 'Serveis', path: '/services', iconSvg: cogIcon },
      { name: 'Control Assistència', path: '/attendance', iconSvg: clipboardIcon },
      { name: 'Dashboard Executiu', path: '/executive', iconSvg: trendingIcon }
    ],
    'COORDINADOR': [
      { name: 'Dashboard', path: '/coordinador', iconSvg: homeIcon },
      { name: 'Estudiants', path: '/students', iconSvg: usersIcon },
      { name: 'Contractes', path: '/contracts', iconSvg: documentIcon },
      { name: 'Control Assistència', path: '/attendance', iconSvg: clipboardIcon },
      { name: 'Passar Llista', path: '/attendance-check', iconSvg: checkIcon }
    ],
    'MONITOR': [
      { name: 'Dashboard', path: '/monitor', iconSvg: homeIcon },
      { name: 'Control Assistència', path: '/attendance', iconSvg: clipboardIcon },
      { name: 'Passar Llista', path: '/attendance-check', iconSvg: checkIcon }
    ],
    'FAMILIA': [
      { name: 'Dashboard', path: '/familia', iconSvg: homeIcon },
      { name: 'Els meus fills', path: '/my-children', iconSvg: usersIcon },
      { name: 'Contractes', path: '/my-contracts', iconSvg: documentIcon },
      { name: 'Facturació', path: '/billing', iconSvg: creditCardIcon }
    ]
  }

  return user.value ? roleSpecificItems[user.value.role] || [{ name: 'Dashboard', path: '/dashboard', iconSvg: homeIcon }] : [{ name: 'Dashboard', path: '/dashboard', iconSvg: homeIcon }]
})

const pageTitle = computed(() => {
  const currentItem = navigationItems.value.find(item => item.path === route.path)
  return currentItem?.name || 'EduManager'
})

const logout = () => {
  showUserMenu.value = false
  authStore.logout()
  router.push('/login')
}

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    showUserMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>