import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// Stage 1: frontend only. The `server.proxy` block below is a prepared seam —
// a later stage can point it at the backend (API + database) without touching
// application code.
//
// Base path: GitHub Pages serves project sites from
// `https://<user>.github.io/ArtSphereA-ZMarket/`, so builds for Pages carry
// that prefix (set GITHUB_PAGES=1 in CI). Local dev and normal builds stay
// at the root — `npm run dev` is unaffected.
const GH_PAGES_BASE = "/ArtSphereA-ZMarket/";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "1" ? GH_PAGES_BASE : "/",
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
