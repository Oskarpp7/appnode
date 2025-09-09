import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: (to) => {
        const authStore = useAuthStore()
        const userRole = authStore.userRole
        
        // Redirect based on user role
        switch (userRole) {
          case 'SUPER_ADMIN':
            return '/superadmin'
          case 'ADMIN_CENTRE':
            return '/admin'
          case 'COORDINADOR':
            return '/coordinador'
          case 'MONITOR':
            return '/monitor'
          case 'FAMILIA':
            return '/familia'
          default:
            return '/unauthorized'
        }
      },
      meta: { requiresAuth: true }
    },
    {
      path: '/superadmin',
      name: 'superadmin',
      component: () => import('../views/SuperAdminDashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['SUPER_ADMIN']
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['SUPER_ADMIN', 'ADMIN_CENTRE']
      }
    },
    {
      path: '/coordinador',
      name: 'coordinador',
      component: () => import('../views/CoordinadorDashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['SUPER_ADMIN', 'ADMIN_CENTRE', 'COORDINADOR']
      }
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('../views/MonitorDashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['SUPER_ADMIN', 'ADMIN_CENTRE', 'COORDINADOR', 'MONITOR']
      }
    },
    {
      path: '/familia',
      name: 'familia',
      component: () => import('../views/FamiliaDashboard.vue'),
      meta: { 
        requiresAuth: true,
        roles: ['FAMILIA']
      }
    },
    {
      path: '/unauthorized',
      name: 'unauthorized',
      component: () => import('../views/UnauthorizedView.vue'),
      meta: { requiresAuth: true }
    },
    // Catch-all route - must be last
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard'
    }
  ],
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth if not already done
  if (!authStore.user && authStore.token) {
    await authStore.initializeAuth()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next('/login')
    return
  }
  
  // Check if route requires guest (not authenticated)
  if (to.meta.requiresGuest && authStore.isLoggedIn) {
    next('/dashboard')
    return
  }
  
  // Check role-based access
  if (to.meta.roles && authStore.isLoggedIn) {
    const userRole = authStore.userRole
    const hasAccess = to.meta.roles.includes(userRole)
    
    if (!hasAccess) {
      next('/unauthorized')
      return
    }
  }
  
  next()
})

export default router
