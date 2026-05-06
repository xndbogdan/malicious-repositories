export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": {
          '50': '#edf9ff',
          '100': '#d6f0ff',
          '200': '#b5e7ff',
          '300': '#83d9ff',
          '400': '#48c2ff',
          '500': '#1ea1ff',
          '600': '#0682ff',
          '700': '#006eff',
          '800': '#0854c5',
          '900': '#0d4a9b',
          '950': '#0e2d5d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}