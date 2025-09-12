import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Importar components
import Login from '@/views/LoginView.vue'
import SuperAdminDashboard from '@/views/dashboards/SuperAdminDashboard.vue'
import AdminDashboard from '@/views/dashboards/AdminDashboard.vue'
import CoordinadorDashboard from '@/views/dashboards/CoordinadorDashboard.vue'
import MonitorDashboard from '@/views/dashboards/MonitorDashboard.vue'
import FamiliaDashboard from '@/views/dashboards/FamiliaDashboard.vue'

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
    {
      path: '/admin-simple',
      name: 'admin-simple',
      component: () => import('@/views/AdminDashboardSimple.vue')
    },
    
    // DASHBOARDS ESPECÍFICS PER ROL
    {
      path: '/superadmin',
      name: 'superadmin-dashboard',
      component: SuperAdminDashboard,
      meta: { 
        requiresAuth: true,
        roles: ['SUPER_ADMIN']
      }
    },
    {
      path: '/admin',
      name: 'admin-dashboard', 
      component: AdminDashboard,
      meta: { 
        requiresAuth: true,
        roles: ['ADMIN_CENTRE', 'SUPER_ADMIN']
      }
    },
    {
      path: '/coordinador',
      name: 'coordinador-dashboard',
      component: CoordinadorDashboard,
      meta: { 
        requiresAuth: true,
        roles: ['COORDINADOR', 'ADMIN_CENTRE', 'SUPER_ADMIN']
      }
    },
    {
      path: '/monitor',
      name: 'monitor-dashboard',
      component: MonitorDashboard,
      meta: { 
        requiresAuth: true,
        roles: ['MONITOR', 'COORDINADOR', 'ADMIN_CENTRE', 'SUPER_ADMIN']
      }
    },
    {
      path: '/familia',
      name: 'familia-dashboard',
      component: FamiliaDashboard,
      meta: { 
        requiresAuth: true,
        roles: ['FAMILIA']
      }
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
