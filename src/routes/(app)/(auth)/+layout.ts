import type { LayoutLoad } from '../$types'
// export const ssr = false

export const load: LayoutLoad = async ({ fetch, data, parent }) => {
	const parentData = await parent()
	// console.log('auth/+layout.ts', parentData, data)
	return data
}
