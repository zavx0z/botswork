import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mkcert from "vite-plugin-mkcert"
export default defineConfig({
	server: {
		https: true,
		proxy: {},
		headers: {
		  "Cross-Origin-Embedder-Policy": "require-corp",
		  "Cross-Origin-Opener-Policy": "same-origin",
		},
	},
	plugins: [sveltekit(), mkcert()]
})
