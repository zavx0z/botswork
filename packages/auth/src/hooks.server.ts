// https://supabase.com/docs/guides/auth/auth-helpers/sveltekit#additional-links
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'
import type { Database } from 'db'

export const handle: Handle = async ({ event, resolve }) => {
	console.log('[auth]', 'hooks.server.ts')
	event.locals.supabase = createSupabaseServerClient<Database>({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	})
	event.locals.getSession = async () => {
		const { data, error } = await event.locals.supabase.auth.getSession()
		console.log('[auth]', 'getSession() session', data.session ? 'EXIST' : 'NOT EXIST', error ? `error: ${error}` : '')
		return data.session
	}
	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		}
	})
}
