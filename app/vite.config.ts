import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/app",
  build: {
    outDir: "./dist",
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/oauth": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "/metrics": {
        target: "http://localhost:8081",
        changeOrigin: true,
        secure: false,
      },
      "^/(?!app).*": {
        target: "http://localhost:4321",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
