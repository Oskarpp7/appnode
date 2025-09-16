import { defineStore } from 'pinia'
import axios from 'axios'
import router from '@/router'

// Configurar axios base
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    tenant: JSON.parse(localStorage.getItem('tenant') || 'null'),
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    userRole: (state) => state.user?.role,
    canAccess: (state) => (allowedRoles) => {
      if (!state.user) return false
      if (state.user.role === 'SUPER_ADMIN') return true
      return allowedRoles.includes(state.user.role)
    }
  },
  
  actions: {
    async login(credentials) {
      this.loading = true
      this.error = null
      
      console.log('🔐 INTENTANT LOGIN:', credentials)
      
      try {
        const response = await api.post('/auth/login', {
          email: credentials.email,
          password: credentials.password,
          tenant_slug: 'escola-demo'
        }, {
          headers: {
            'X-Tenant-Slug': 'escola-demo'
          }
        })
        
        console.log('📡 RESPOSTA LOGIN:', response.data)
        
        if (response.data.success) {
          this.token = response.data.data.token
          this.user = response.data.data.user
          this.tenant = response.data.data.tenant
          
          // Guardar al localStorage
          localStorage.setItem('token', this.token)
          localStorage.setItem('tenant', JSON.stringify(this.tenant))
          
          // Configurar axios
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          api.defaults.headers.common['X-Tenant-Slug'] = this.tenant.slug
          
          console.log('✅ LOGIN EXITÓS - ROL:', this.user.role)
          
          // REDIRECCIONAR AUTOMÀTICAMENT SEGONS ROL
          this.redirectUserByRole()
          
          return { success: true }
        } else {
          throw new Error(response.data.message)
        }
      } catch (error) {
        console.error('❌ ERROR LOGIN:', error.response?.data || error)
        this.error = error.response?.data?.message || 'Error de connexió'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },
    
    // NOVA FUNCIÓ PER REDIRIGIR SEGONS ROL
    redirectUserByRole() {
      if (!this.user) {
        console.log('❌ NO HI HA USUARI PER REDIRECCIONAR')
        return
      }
      
      const roleRedirects = {
        'SUPER_ADMIN': '/superadmin',
        'ADMIN': '/admin',
        'COORDINADOR': '/coordinador', 
        'MONITOR': '/monitor',
        'FAMILIA': '/familia'
      }
      
      const redirectTo = roleRedirects[this.user.role]
      
      if (redirectTo) {
        console.log(`🎯 REDIRIGINT ${this.user.role} A:`, redirectTo)
        
        // Utilitzar setTimeout per assegurar que el DOM està actualitzat
        setTimeout(() => {
          router.push(redirectTo).then(() => {
            console.log('✅ REDIRECCIÓ COMPLETADA A:', redirectTo)
          }).catch((error) => {
            console.error('❌ ERROR EN REDIRECCIÓ:', error)
            // Si falla, forçar reload de la pàgina
            window.location.href = redirectTo
          })
        }, 100)
      } else {
        console.log('⚠️ ROL DESCONEGUT:', this.user.role)
        router.push('/unauthorized')
      }
    },
    
    async initializeAuth() {
      if (this.token && !this.user) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          if (this.tenant?.slug) {
            api.defaults.headers.common['X-Tenant-Slug'] = this.tenant.slug
          }
          
          const response = await api.get('/auth/me')
          
          if (response.data.success) {
            this.user = response.data.data.user
            return true
          }
        } catch (error) {
          console.error('❌ Error inicialitzant auth:', error)
          this.logout()
        }
      }
      return false
    },
    
    logout() {
      this.user = null
      this.token = null
      this.tenant = null
      this.error = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('tenant')
      
      delete api.defaults.headers.common['Authorization']
      delete api.defaults.headers.common['X-Tenant-Slug']
      
      router.push('/login')
    }
  }
})
