import type { Actions } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { AuthApiError, type Provider } from '@supabase/supabase-js'

const OAUTH_PROVIDER = ['google', 'github']

export const actions: Actions = {
	login: async ({ request, url, locals: { supabase } }) => {
		const provider = url.searchParams.get('provider') as Provider

		if (provider) {
			if (!OAUTH_PROVIDER.includes(provider)) return fail(400, { error: 'Provider not supported.' })
			const { data, error: err } = await supabase.auth.signInWithOAuth({ provider })
			if (err) return fail(400, { message: 'Something went wrong' })
			throw redirect(303, data.url)
		}

		console.log('SSR login')

		const formData = await request.formData()
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const { data, error: err } = await supabase.auth.signInWithPassword({ email, password })
		if (err) {
			if (err instanceof AuthApiError && err.status === 400) return fail(400, { error: 'Invalid credentials' })
			return fail(500, { message: 'Server error. Try again later.', success: false, email })
		}
		throw redirect(303, '/profile')
	}
}
