import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import type { Database } from 'db'

export const load: LayoutLoad = async ({ depends }) => {
	console.log('[auth]', 'ssr load')
	depends('supabase:auth')
	const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
	const {
		data: { session }
	} = await supabase.auth.getSession()
	return {
		supabase,
		session
	}
}
