import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { LayoutLoad } from './$types'

// export const ssr = false

export const load: LayoutLoad = async ({ fetch, data, depends }) => {
	console.log('+layout.ts client', data)
	depends('supabase:auth')
	const supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	})
	const { data: { session }, error } = await supabase.auth.getSession()
	console.log(session, error)
	return { supabase, session }
}