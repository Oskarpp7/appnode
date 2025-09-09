import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE = 'http://localhost:3000/api'

// Configuració base axios
const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token && !!state.user,
    isFamily: (state) => state.user?.role === 'FAMILIA',
    userName: (state) => state.user?.name || '',
    tenantSlug: () => 'escola-europa-demo' // Per ara hardcoded, després serà dinàmic
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null
      
      try {
        const response = await api.post('/auth/login', {
          ...credentials,
          tenant_slug: 'escola-europa-demo'  // Inclou tenant_slug al body
        }, {
          headers: {
            'X-Tenant-Slug': 'escola-europa-demo'  // També al header
          }
        })

        if (response.data.success) {
          this.token = response.data.data.token || response.data.data.access_token
          this.user = response.data.data.user
        
          // Guardar token
          localStorage.setItem('token', this.token)
          localStorage.setItem('user', JSON.stringify(this.user))
        
          // Configurar axios per futures requests
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          api.defaults.headers.common['X-Tenant-Slug'] = 'escola-europa-demo'
          
          return { success: true }
        } else {
          throw new Error(response.data.message || 'Error de login')
        }
      } catch (error) {
        this.error = error.response?.data?.message || error.message || 'Error de connexió'
        console.error('Login error:', error)
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.error = null
      
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      delete api.defaults.headers.common['Authorization']
    },

    async initializeAuth() {
      if (this.token && !this.user) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
          const response = await api.get('/auth/me', {
            headers: {
              'X-Tenant-Slug': 'escola-europa-demo'
            }
          })
          
          if (response.data.success) {
            this.user = response.data.data.user
          } else {
            this.logout()
          }
        } catch (error) {
          console.error('Auth initialization error:', error)
          this.logout()
        }
      }
    },

    clearError() {
      this.error = null
    }
  }
})
