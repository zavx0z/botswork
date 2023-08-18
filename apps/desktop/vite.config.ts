import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite'
import { promises as fs } from 'node:fs'

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true,
			customCollections: {
				botswork: {
					botik: () => fs.readFile('assets/botik.svg', 'utf-8'),
				}
			}
		})

	]
});
