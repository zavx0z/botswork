import { createClient } from '@supabase/supabase-js'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import type { LayoutLoad } from './$types'

export const prerender = true
export const ssr = false

export const load: LayoutLoad = async () => {
	const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
	const {
		data: { session }
	} = await supabase.auth.getSession()
	return {
		supabase,
		session
	}
}
