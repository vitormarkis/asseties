import react from "@vitejs/plugin-react"
import path from "path"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@myTypes": path.resolve(__dirname, "src/myTypes"),
      "@features": path.resolve(__dirname, "src/features"),
      "§": path.resolve(__dirname, "src"),
    },
  },
})
