import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import {TanStackRouterVite} from "@tanstack/router-vite-plugin"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), TanStackRouterVite()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@server": path.resolve(__dirname, "../backend/server")
    },
  },
  server: {
    proxy: {
      "/api": {
        // target: "https://expensetrackerv1be.parmjeetmishra.com",
        target: "http://localhost:8787",
        changeOrigin: true,
      }
    }
  }
})
