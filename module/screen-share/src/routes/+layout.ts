export let ssr = false
import {interpret} from 'xstate'
import type {LayoutLoad} from './$types'
import {AuthMachine} from '@module/secure'

export const load: LayoutLoad = async () => {
    const auth = interpret(AuthMachine).start()
    return {auth}
}
