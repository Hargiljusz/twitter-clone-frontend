import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/rest":{
        target: "https://localhost:7069/",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest\//, ''),
      } ,
      "/graphql":{
        target: "https://localhost:7051/",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql\//, ''),
      }
    }
  }
})
