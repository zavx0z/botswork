import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	console.log('[auth]', 'callback')
	const code = url.searchParams.get('code')
	if (code) await supabase.auth.exchangeCodeForSession(code)
	throw redirect(303, '/profile')
}