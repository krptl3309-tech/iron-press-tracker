/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khata: {
          dark: '#0f172a',
          surface: '#1e293b',
          card: '#162032',
          cardHover: '#1c2840',
          border: '#334155',
          borderLight: '#475569',
          amber: '#f59e0b',
          amberGlow: '#d97706',
          emerald: '#10b981',
          rose: '#ef4444',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          primary: '#3b82f6',
          whatsapp: '#25D366'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
