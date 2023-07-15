import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/rest":{
        target: "http://localhost:5000/",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rest\//, ''),
      } ,
      "/graphql":{
        target: "http://localhost:5001/",
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/graphql\//, ''),
      }
    }
  }
})
