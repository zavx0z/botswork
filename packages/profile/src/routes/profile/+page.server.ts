import { fail, redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types.js'

export const load: PageServerLoad = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession()
	if (!session) throw redirect(303, '/')

	const { data: profile, error } = await supabase
		.from('profile')
		.select(`username, full_name, avatar_url`)
		.eq('id', session.user.id)
		.single()
	if (error) console.log(error)

	return { session, profile }
}

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData()
		const fullName = formData.get('fullName') as string
		console.log("file: +page.server.ts:22 ~ update: ~ fullName:", fullName)
		const username = formData.get('username') as string
		const avatarUrl = formData.get('avatarUrl') as string
		const session = await getSession()
		console.log(avatarUrl)
		const { error } = await supabase.from('profile').upsert({
			id: session?.user.id,
			full_name: fullName,
			username,
			avatar_url: avatarUrl,
			updated_at: new Date()
		})
		if (error) {
			console.log(error)
			return fail(500, { fullName, username, avatarUrl })
		}
		return { fullName, username, avatarUrl }
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession()
		if (session) {
			await supabase.auth.signOut()
			throw redirect(303, '/')
		}
	}
}
