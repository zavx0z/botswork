import type { LayoutServerLoad } from './(src)/$types'

export const load: LayoutServerLoad = async ({ locals: { getSession } }) => {
	console.log('+layout.server.ts')
	return { session: await getSession() }
}