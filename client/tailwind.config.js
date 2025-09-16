/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '480px',
        '3xl': '1920px'
      },
      colors: {
        primary: { 50:'#eef2ff', 500:'#6366f1', 600:'#4f46e5', 700:'#4338ca' },
        slate: { 950:'#0b1220' }
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(15, 23, 42, .08)'
      }
    }
  },
  plugins: []
}