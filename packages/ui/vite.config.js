import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import Icons from "unplugin-icons/vite"
import { promises as fs } from "node:fs"

export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: "svelte",
      autoInstall: true,
      customCollections: {
        botswork: {
          botik: () => fs.readFile("assets/botik.svg", "utf-8"),
        },
      },
    }),
  ],
})
