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
      "@constants": path.resolve(__dirname, "src/constants"),
      "@factories": path.resolve(__dirname, "src/factories"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "§": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
  },
})
