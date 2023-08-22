import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'

export const actions: Actions = {
	join: async ({ request, url, locals: { supabase } }) => {
		console.log('SSR join')
		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`
			}
		})
		if (error)
			return fail(500, { message: 'Server error. Try again later.', success: false, email })
		return {
			message: 'Please check your email for a magic link to log into the website.',
			success: true
		}
	}
}
