<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:translate-x-0 lg:static lg:inset-0'
      ]"
    >
      <!-- Logo -->
      <div class="flex items-center px-6 py-4 border-b border-gray-200">
        <img src="/favicon.ico" alt="Logo" class="h-8 w-8 mr-3">
        <div>
          <h1 class="text-lg font-semibold text-gray-900">EduManager</h1>
          <p :class="roleThemeClass" class="text-xs font-medium uppercase tracking-wider">
            {{ roleTitle }}
          </p>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-4 py-6 space-y-2">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          :class="[
            item.current 
              ? `${roleThemeClass} bg-opacity-10 border-r-2 border-current font-medium`
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
            'group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors'
          ]"
        >
          <component 
            :is="item.icon" 
            :class="[
              item.current ? 'text-current' : 'text-gray-400 group-hover:text-gray-500',
              'mr-3 h-5 w-5 flex-shrink-0'
            ]"
          />
          {{ item.name }}
        </router-link>
      </nav>

      <!-- User menu -->
      <div class="border-t border-gray-200 p-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div :class="roleThemeClass" class="h-10 w-10 rounded-full bg-opacity-10 flex items-center justify-center">
              <UserIcon class="h-5 w-5" />
            </div>
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
            <p class="text-xs text-gray-500">{{ user.email }}</p>
          </div>
          <button
            @click="logout"
            class="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Logout"
          >
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile sidebar overlay -->
    <div 
      v-if="sidebarOpen"
      class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main content -->
    <div class="flex-1 flex flex-col lg:pl-64">
      <!-- Top header -->
      <div class="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
        <div class="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
          <!-- Mobile menu button -->
          <button
            @click="sidebarOpen = !sidebarOpen"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Bars3Icon class="h-6 w-6" />
          </button>

          <!-- Breadcrumbs -->
          <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-4">
              <li v-for="(page, index) in breadcrumbs" :key="page.name">
                <div class="flex items-center">
                  <ChevronRightIcon 
                    v-if="index > 0" 
                    class="h-4 w-4 text-gray-400 mr-4" 
                  />
                  <router-link
                    v-if="page.href && index < breadcrumbs.length - 1"
                    :to="page.href"
                    class="text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    {{ page.name }}
                  </router-link>
                  <span
                    v-else
                    class="text-sm font-medium text-gray-900"
                  >
                    {{ page.name }}
                  </span>
                </div>
              </li>
            </ol>
          </nav>

          <!-- Actions -->
          <div class="flex items-center space-x-4">
            <!-- Notifications -->
            <button
              class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Notifications"
            >
              <BellIcon class="h-6 w-6" />
              <span 
                v-if="notificationCount > 0"
                :class="roleThemeClass"
                class="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs font-medium text-white flex items-center justify-center"
              >
                {{ notificationCount > 9 ? '9+' : notificationCount }}
              </span>
            </button>

            <!-- Profile dropdown placeholder -->
            <div class="relative">
              <button
                class="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2"
                :class="`focus:ring-${roleColorName}-500`"
              >
                <div :class="roleThemeClass" class="h-8 w-8 rounded-full bg-opacity-10 flex items-center justify-center">
                  <UserIcon class="h-4 w-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Page content -->
      <main class="flex-1 py-6">
        <div class="px-4 sm:px-6 lg:px-8">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  Bars3Icon,
  BellIcon,
  ChevronRightIcon,
  UserIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  CogIcon,
  CalendarIcon,
  AcademicCapIcon
} from '@heroicons/vue/24/solid'

export default {
  name: 'DashboardLayout',
  components: {
    Bars3Icon,
    BellIcon,
    ChevronRightIcon,
    UserIcon,
    ArrowRightOnRectangleIcon,
    HomeIcon,
    ChartBarIcon,
    UsersIcon,
    DocumentTextIcon,
    CogIcon,
    CalendarIcon,
    AcademicCapIcon
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()
    
    const sidebarOpen = ref(false)
    const notificationCount = ref(3) // Mock data
    
    // Role-based theming
    const roleThemes = {
      SUPER_ADMIN: { color: 'super-admin', class: 'text-super-admin-600', name: 'Super Admin' },
      ADMIN_CENTRE: { color: 'admin-centre', class: 'text-admin-centre-600', name: 'Admin Centre' },
      COORDINADOR: { color: 'coordinador', class: 'text-coordinador-600', name: 'Coordinador' },
      MONITOR: { color: 'monitor', class: 'text-monitor-600', name: 'Monitor' },
      FAMILIA: { color: 'familia', class: 'text-familia-600', name: 'Familia' }
    }
    
    const currentTheme = computed(() => {
      return roleThemes[authStore.user?.role] || roleThemes.FAMILIA
    })
    
    const roleThemeClass = computed(() => currentTheme.value.class)
    const roleColorName = computed(() => currentTheme.value.color)
    const roleTitle = computed(() => currentTheme.value.name)
    
    // Navigation based on role
    const navigationByRole = {
      SUPER_ADMIN: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Centres', href: '/centres', icon: UsersIcon },
        { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
        { name: 'Sistema', href: '/system', icon: CogIcon }
      ],
      ADMIN_CENTRE: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Estudiants', href: '/students', icon: AcademicCapIcon },
        { name: 'Personal', href: '/staff', icon: UsersIcon },
        { name: 'Assistència', href: '/attendance', icon: CalendarIcon },
        { name: 'Informes', href: '/reports', icon: DocumentTextIcon }
      ],
      COORDINADOR: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Estudiants', href: '/students', icon: AcademicCapIcon },
        { name: 'Assistència', href: '/attendance', icon: CalendarIcon },
        { name: 'Informes', href: '/reports', icon: DocumentTextIcon }
      ],
      MONITOR: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Els meus grups', href: '/my-groups', icon: UsersIcon },
        { name: 'Assistència', href: '/attendance', icon: CalendarIcon }
      ],
      FAMILIA: [
        { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
        { name: 'Els meus fills', href: '/my-children', icon: AcademicCapIcon },
        { name: 'Assistència', href: '/attendance', icon: CalendarIcon },
        { name: 'Documents', href: '/documents', icon: DocumentTextIcon }
      ]
    }
    
    const navigation = computed(() => {
      const navItems = navigationByRole[authStore.user?.role] || navigationByRole.FAMILIA
      return navItems.map(item => ({
        ...item,
        current: route.path === item.href
      }))
    })
    
    // Breadcrumbs
    const breadcrumbs = computed(() => {
      const segments = route.path.split('/').filter(Boolean)
      const crumbs = [{ name: 'Dashboard', href: '/dashboard' }]
      
      segments.forEach((segment, index) => {
        if (segment !== 'dashboard') {
          const href = '/' + segments.slice(0, index + 1).join('/')
          crumbs.push({
            name: segment.charAt(0).toUpperCase() + segment.slice(1),
            href: index === segments.length - 1 ? null : href
          })
        }
      })
      
      return crumbs
    })
    
    const logout = () => {
      authStore.logout()
      router.push('/login')
    }
    
    return {
      sidebarOpen,
      notificationCount,
      navigation,
      breadcrumbs,
      roleThemeClass,
      roleColorName,
      roleTitle,
      user: computed(() => authStore.user),
      logout
    }
  }
}
</script>
