import { join } from 'path'
import tailwindConfig from './src/lib/tailwind.config.js'

tailwindConfig['content'] = [
	join(__dirname, '../../libs/*/src/**/*.{html,js,svelte,ts}'),
	join(__dirname, '../../desktop/*/src/**/*.{html,js,svelte,ts}'),
	join(__dirname, '../../data/*/src/**/*.{html,js,svelte,ts}'),
	join(__dirname, '../../web/*/src/**/*.{html,js,svelte,ts}')
]
export default tailwindConfig