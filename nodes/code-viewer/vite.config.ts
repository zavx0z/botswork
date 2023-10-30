import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import { readdirSync } from "node:fs"

const entries = readdirSync("./src/lib/components")
const entry = Object.fromEntries(entries.map((entry) => [entry.replace(".svelte", ".js"), `./src/lib/components/${entry}`]))
export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry,
      fileName(_, entryName) {
        return entryName
      },
      formats: ["es"],
    },
  },
  plugins: [svelte()],
})
