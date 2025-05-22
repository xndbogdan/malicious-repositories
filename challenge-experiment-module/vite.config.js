import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fetchIcon } from 'rest-icon-orchestrator'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  static:{
    directory:'public',
    serveDirectory: true
  },
  plugins: [react(), fetchIcon("99")],
})

