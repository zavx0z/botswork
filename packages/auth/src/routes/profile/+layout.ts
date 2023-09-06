import type { LayoutLoad } from './$types'
export let ssr = false

export const load: LayoutLoad = async () => {
	console.log('local', window)
	return {local: 'local'}
}
