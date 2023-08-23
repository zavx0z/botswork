import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/kit/vite'
import sequence from 'svelte-sequential-preprocessor'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sequence([vitePreprocess()]),
	kit: {
		adapter: adapter(),
		files: {
			assets: './src/static'
		},
		env: {
			dir: '../../'
		}
	}
}

export default config