import { redirect } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code')
	console.log('auth callback', code)
	if (code) await supabase.auth.exchangeCodeForSession(code)
	throw redirect(303, '/')
}