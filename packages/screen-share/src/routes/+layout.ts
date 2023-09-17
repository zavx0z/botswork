export let ssr = false
import {interpret} from 'xstate'
import type {LayoutLoad} from './$types'
import {AuthMachine} from 'auth'

export const load: LayoutLoad = async () => {
    const auth = interpret(AuthMachine).start()
    return {auth}
}
