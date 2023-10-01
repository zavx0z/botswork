export let ssr = false
export let prerender = false

import { PUBLIC_XSTATE_DEBUG, PUBLIC_XSTATE_IFRAME, PUBLIC_XSTATE_PANEL } from '$env/static/public'
import type { LayoutLoad } from './$types'
import { inspect } from '@xstate/inspect'
import { interpret } from 'xstate'
import { AuthMachine } from '$lib'

export const load = (() => {
	if (PUBLIC_XSTATE_DEBUG === 'true')
		inspect({
			...(PUBLIC_XSTATE_IFRAME === 'true' ? {} : { iframe: undefined }),
			...(PUBLIC_XSTATE_PANEL === 'true' ? {} : { url: 'https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect' })
		})
	const auth = interpret(AuthMachine, { devTools: PUBLIC_XSTATE_DEBUG === 'true' }).start()
	return { auth }
}) satisfies LayoutLoad
