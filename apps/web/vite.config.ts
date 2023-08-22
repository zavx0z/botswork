// @ts-ignore
import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { promises as fs } from 'node:fs'

export default defineConfig({
	ssr: {
		noExternal: ['three']
	},
	plugins: [
		sveltekit(),
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
