import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export function useRoleTheme() {
  const authStore = useAuthStore()
  
  const roleThemes = {
    SUPER_ADMIN: {
      primary: 'super-admin',
      colors: {
        50: '#faf5ff',
        100: '#f3e8ff',
        200: '#e9d5ff',
        300: '#d8b4fe',
        400: '#c084fc',
        500: '#a855f7',
        600: '#9333ea',
        700: '#7c3aed',
        800: '#6b21a8',
        900: '#581c87'
      },
      gradient: 'from-purple-500 to-purple-700',
      ring: 'ring-purple-500',
      text: 'text-purple-600',
      bg: 'bg-purple-600',
      hover: 'hover:bg-purple-700',
      focus: 'focus:ring-purple-500'
    },
    ADMIN_CENTRE: {
      primary: 'admin-centre',
      colors: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a'
      },
      gradient: 'from-blue-500 to-blue-700',
      ring: 'ring-blue-500',
      text: 'text-blue-600',
      bg: 'bg-blue-600',
      hover: 'hover:bg-blue-700',
      focus: 'focus:ring-blue-500'
    },
    COORDINADOR: {
      primary: 'coordinador',
      colors: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#f97316',
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12'
      },
      gradient: 'from-orange-500 to-orange-700',
      ring: 'ring-orange-500',
      text: 'text-orange-600',
      bg: 'bg-orange-600',
      hover: 'hover:bg-orange-700',
      focus: 'focus:ring-orange-500'
    },
    MONITOR: {
      primary: 'monitor',
      colors: {
        50: '#fefce8',
        100: '#fef9c3',
        200: '#fef08a',
        300: '#fde047',
        400: '#facc15',
        500: '#eab308',
        600: '#ca8a04',
        700: '#a16207',
        800: '#854d0e',
        900: '#713f12'
      },
      gradient: 'from-yellow-500 to-yellow-700',
      ring: 'ring-yellow-500',
      text: 'text-yellow-600',
      bg: 'bg-yellow-600',
      hover: 'hover:bg-yellow-700',
      focus: 'focus:ring-yellow-500'
    },
    FAMILIA: {
      primary: 'familia',
      colors: {
        50: '#fdf2f8',
        100: '#fce7f3',
        200: '#fbcfe8',
        300: '#f9a8d4',
        400: '#f472b6',
        500: '#ec4899',
        600: '#db2777',
        700: '#be185d',
        800: '#9d174d',
        900: '#831843'
      },
      gradient: 'from-pink-500 to-pink-700',
      ring: 'ring-pink-500',
      text: 'text-pink-600',
      bg: 'bg-pink-600',
      hover: 'hover:bg-pink-700',
      focus: 'focus:ring-pink-500'
    }
  }
  
  const currentRole = computed(() => authStore.user?.role || 'FAMILIA')
  const theme = computed(() => roleThemes[currentRole.value] || roleThemes.FAMILIA)
  
  const getThemeClasses = (variant = 'default') => {
    const t = theme.value
    
    const variants = {
      default: {
        text: t.text,
        bg: t.bg,
        hover: t.hover,
        focus: t.focus,
        ring: t.ring
      },
      outline: {
        text: t.text,
        bg: 'bg-transparent',
        border: `border-${t.primary}-600`,
        hover: `hover:bg-${t.primary}-50`,
        focus: t.focus,
        ring: t.ring
      },
      ghost: {
        text: t.text,
        bg: 'bg-transparent',
        hover: `hover:bg-${t.primary}-50`,
        focus: t.focus,
        ring: t.ring
      },
      gradient: {
        bg: `bg-gradient-to-r ${t.gradient}`,
        text: 'text-white',
        hover: 'hover:opacity-90',
        focus: t.focus,
        ring: t.ring
      }
    }
    
    return variants[variant] || variants.default
  }
  
  const getColorValue = (shade = 600) => {
    return theme.value.colors[shade] || theme.value.colors[600]
  }
  
  const getRoleTitle = () => {
    const titles = {
      SUPER_ADMIN: 'Super Admin',
      ADMIN_CENTRE: 'Admin Centre',
      COORDINADOR: 'Coordinador',
      MONITOR: 'Monitor',
      FAMILIA: 'Família'
    }
    return titles[currentRole.value] || titles.FAMILIA
  }
  
  return {
    currentRole,
    theme,
    getThemeClasses,
    getColorValue,
    getRoleTitle
  }
}
