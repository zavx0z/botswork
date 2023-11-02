import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"
import mkcert from "vite-plugin-mkcert"
//@ts-ignore
import crossOriginIsolation from "vite-plugin-cross-origin-isolation"

export default defineConfig({
  //@ts-ignore
  plugins: [sveltekit(), mkcert(), crossOriginIsolation(), dynamicImport()],
  ssr: {
    noExternal: ["three"],
  },
  // publicDir: "static",
  server: {
    fs: {
      allow: [
        "../db/src/lib/sqlite/jswasm/",
        "./static",
        "/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js"
      ],
    },
  },
})
