import type { Actions } from './$types'
import { redirect } from '@sveltejs/kit'

export const actions: Actions = {
	async logout({ locals: { supabase } }) {
		console.log('logout')
		await supabase.auth.signOut()
		throw redirect(303, '/')
	}
}
