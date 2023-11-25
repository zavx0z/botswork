import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import mkcert from "vite-plugin-mkcert"
export default defineConfig({
  server: {
    https: true,
    proxy: {},
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    fs: {
      allow: ["/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js"],
    },
  },
  plugins: [sveltekit(), mkcert()],
})
