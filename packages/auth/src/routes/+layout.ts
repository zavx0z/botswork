export let ssr = false
export let prerender = false

import { interpret } from 'xstate'
import type { LayoutLoad } from './$types'
import AuthMachine from './AuthMachine'
import { inspect } from '@xstate/inspect'
import toast from 'svelte-french-toast'

export const load: LayoutLoad = async () => {
	inspect({
		iframe: false,
		url: 'https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect'
	})
	const auth = interpret(AuthMachine, { devTools: true }).start()
	auth.subscribe((state) => {
		if (state.changed) {
			console.log(state.value)
			if (state.context.error) toast.error(state.context.error)
		}
	})
	return { auth }
}
