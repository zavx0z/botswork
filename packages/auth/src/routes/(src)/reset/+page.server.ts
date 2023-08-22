import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError } from '@supabase/supabase-js'

export const actions: Actions = {
	reset: async ({ request, url, locals: { supabase } }) => {
		console.log('SSR login')
		const formData = await request.formData()
		const email = formData.get('email') as string
		const { data, error: err } = await supabase.auth.resetPasswordForEmail(email)
		if (err) {
			if (err instanceof AuthApiError && err.status === 400) return fail(400, { error: 'Invalid credentials' })
			return fail(500, { message: 'Server error. Try again later.', success: false, email })
		}
		throw redirect(303, '/')
	}
}
