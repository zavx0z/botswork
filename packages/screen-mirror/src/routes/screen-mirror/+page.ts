export let ssr = false
import type { PageLoad } from './$types'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'db'

export const load: PageLoad = async ({ parent }) => {
	const data = await parent()
	const { webRTCReceiver, session } = data

	const supabase: SupabaseClient<Database> = data.supabase

	const mediaDeviceMachine = webRTCReceiver.children.get('media-device')
	const useMediaDeviceMachine = (node: HTMLVideoElement) => {
		mediaDeviceMachine?.send({ type: 'MOUNT', videoElement: node })
		return {
			destroy() {
				mediaDeviceMachine?.send({ type: 'UNMOUNT' })
			}
		}
	}
	const screenChannel = supabase.channel('screen')
	return { useMediaDeviceMachine, mediaDeviceMachine, screenChannel }
}
