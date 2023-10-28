import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import mkcert from "vite-plugin-mkcert"
//@ts-ignore
import crossOriginIsolation from "vite-plugin-cross-origin-isolation"

export default defineConfig({
  //@ts-ignore
  plugins: [sveltekit(), mkcert(), crossOriginIsolation()],
  ssr: {
    noExternal: ["three"],
  },
  server: {
    fs: {
      allow: ["../db/src/lib/sqlite/jswasm/"],
    },
  },
})
