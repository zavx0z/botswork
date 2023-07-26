// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import Icons from 'unplugin-icons/vite'
import { promises as fs } from 'node:fs'

export default defineConfig({
	ssr: {
		noExternal: ['three']
	},
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte',
			autoInstall: true,
			customCollections: {
				botswork: {
					botik: () => fs.readFile('assets/botik.svg', 'utf-8'),
					bots: () => fs.readFile('assets/bots.svg', 'utf-8'),
					groups: () => fs.readFile('assets/groups.svg', 'utf-8'),
					humans: () => fs.readFile('assets/humans.svg', 'utf-8')
				}
			}
		})
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
