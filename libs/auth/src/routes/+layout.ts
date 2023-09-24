export let ssr = false
export let prerender = false

import type {LayoutLoad} from './$types'
import {inspect} from '@xstate/inspect'
import {interpret} from "xstate"
import {AuthMachine} from "$lib"

export const load = ((event) => {
    inspect({iframe: undefined, url: 'https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect'})
    const auth = interpret(AuthMachine, {devTools: true}).start()
    return {auth}
}) satisfies LayoutLoad