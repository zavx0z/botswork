export let ssr = false
export let prerender = false

import { interpret } from 'xstate'
import type { LayoutLoad } from './$types'
import AuthMachine from '../AuthMachine'
import { inspect } from '@xstate/inspect'

export const load: LayoutLoad = async () => {
	inspect({
		iframe: undefined,
		url: 'https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect'
	})
	const auth = interpret(AuthMachine, { devTools: true }).start()
	return { auth }
}
