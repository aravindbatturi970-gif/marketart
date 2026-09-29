import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Stage 1: frontend only. The `server.proxy` block below is a prepared seam —
// a later stage can point it at the backend (API + database) without touching
// application code.
//
// Base path: relative ("./") so the built app works from ANY directory —
// the repo root on GitHub Pages (`/repo-name/`), a user site root (`/`),
// or any subfolder — with zero per-repo configuration. Asset URLs are
// emitted relative to index.html, which is what prevents the classic
// GitHub Pages "white screen" from absolute-path 404s. The router uses
// HashRouter for the same reason (see src/main.tsx).
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    port: 5180,
    proxy: {
      // Pre-wired for the future backend. Anything under /api will be forwarded.
      "/api": {
        target: process.env.API_PROXY_TARGET ?? "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
