export const prerender = true
export const ssr = false

import { AuthMachine } from '@module/secure'
import { interpret } from 'xstate'

export const load = (() => {
	const auth = interpret(AuthMachine).start()
	return { auth }
})