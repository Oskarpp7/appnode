import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Importar components
import Login from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/TestView.vue')
    },
    
    // Rutes del sistema d'assistència
    {
      path: '/attendance',
      name: 'attendance',
      component: () => import('@/views/AttendanceView.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'coordinador', 'monitor'] }
    },
    {
      path: '/attendance/session/:sessionId',
      name: 'attendance-session',
      component: () => import('@/components/AttendanceTracker.vue'),
      meta: { requiresAuth: true, roles: ['admin', 'coordinador', 'monitor'] }
    },
    
    // DASHBOARDS ESPECÍFICS PER ROL - MODERNITZATS AMB LAYOUT
    {
      path: '/dashboard',
      redirect: (to) => {
        const authStore = useAuthStore()
        const role = authStore.user?.role
        const roleRoutes = {
          'SUPER_ADMIN': '/superadmin',
          'ADMIN_CENTRE': '/admin',
          'COORDINADOR': '/coordinador',
          'MONITOR': '/monitor',
          'FAMILIA': '/familia'
        }
        return roleRoutes[role] || '/login'
      }
    },
    {
      path: '/superadmin',
      component: () => import('@/components/layout/DashboardLayoutSimple.vue'),
      meta: { requiresAuth: true, roles: ['SUPER_ADMIN'] },
      children: [
        {
          path: '',
          name: 'superadmin.dashboard',
          component: () => import('@/views/dashboards/SuperAdminDashboardSimple.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/components/layout/DashboardLayoutSimple.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN_CENTRE', 'SUPER_ADMIN'] },
      children: [
        {
          path: '',
          name: 'admin.dashboard',
          component: () => import('@/views/dashboards/AdminCentreDashboardSimple.vue')
        }
      ]
    },
    {
      path: '/coordinador',
      component: () => import('@/components/layout/DashboardLayoutSimple.vue'),
      meta: { requiresAuth: true, roles: ['COORDINADOR', 'ADMIN_CENTRE', 'SUPER_ADMIN'] },
      children: [
        {
          path: '',
          name: 'coordinador.dashboard',
          component: () => import('@/views/dashboards/CoordinadorDashboardSimple.vue')
        }
      ]
    },
    {
      path: '/monitor',
      component: () => import('@/components/layout/DashboardLayoutSimple.vue'),
      meta: { requiresAuth: true, roles: ['MONITOR', 'COORDINADOR', 'ADMIN_CENTRE', 'SUPER_ADMIN'] },
      children: [
        {
          path: '',
          name: 'monitor.dashboard',
          component: () => import('@/views/dashboards/MonitorDashboardSimple.vue')
        }
      ]
    },
    {
      path: '/familia',
      component: () => import('@/components/layout/DashboardLayoutSimple.vue'),
      meta: { requiresAuth: true, roles: ['FAMILIA'] },
      children: [
        {
          path: '',
          name: 'familia.dashboard',
          component: () => import('@/views/dashboards/FamiliaDashboardSimple.vue')
        }
      ]
    },
    
    // Pàgina d'error per usuaris sense permisos
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('@/views/Unauthorized.vue')
    }
  ]
})

// GUARD GLOBAL PER CONTROL D'ACCÉS BASAT EN ROLS
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  console.log('🧭 NAVEGACIÓ:', {
    to: to.path,
    user: authStore.user?.email,
    role: authStore.user?.role,
    isAuthenticated: authStore.isAuthenticated
  })
  
  // Inicialitzar auth si tenim token però no user
  if (authStore.token && !authStore.user) {
    console.log('🔄 INICIALITZANT AUTH...')
    await authStore.initializeAuth()
  }
  
  // Si la ruta requereix ser guest i l'usuari està autenticat
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    console.log('✅ USUARI JA AUTENTICAT - REDIRIGINT SEGONS ROL')
    return next(getRoleBasedRedirect(authStore.user.role))
  }
  
  // Si la ruta requereix autenticació i l'usuari no està autenticat
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('❌ NO AUTENTICAT - REDIRIGINT A LOGIN')
    return next('/login')
  }
  
  // Si la ruta té rols específics, verificar permisos
  if (to.meta.roles && authStore.user) {
    const userRole = authStore.user.role
    const allowedRoles = to.meta.roles
    
    if (!allowedRoles.includes(userRole)) {
      console.log('❌ ROL NO AUTORITZAT:', userRole, 'per ruta:', to.path)
      return next('/unauthorized')
    }
  }
  
  console.log('✅ NAVEGACIÓ AUTORITZADA')
  next()
})

// FUNCIÓ AUXILIAR PER REDIRIGIR SEGONS ROL
function getRoleBasedRedirect(role) {
  const roleRedirects = {
    'SUPER_ADMIN': '/superadmin',
    'ADMIN_CENTRE': '/admin', 
    'COORDINADOR': '/coordinador',
    'MONITOR': '/monitor',
    'FAMILIA': '/familia'
  }
  
  return roleRedirects[role] || '/unauthorized'
}

export default router
