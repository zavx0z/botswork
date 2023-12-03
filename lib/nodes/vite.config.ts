import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import mkcert from "vite-plugin-mkcert"
export default defineConfig({
  server: {
    proxy: {},
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    fs: {
      allow: ["/mnt/c/zavx0z/skeleton-tracing/index.js"],
    },
  },
  plugins: [sveltekit(), mkcert()],
})
