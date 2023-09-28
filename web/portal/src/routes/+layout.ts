import { AuthMachine } from '@lib/secure'

export let ssr = false
export let prerender = false
import { interpret } from 'xstate'

export const load = (() => {
	const auth = interpret(AuthMachine).start()
	return { auth }
})
