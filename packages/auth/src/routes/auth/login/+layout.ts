export let ssr = false
export let prerender = false

import type {LayoutLoad} from './$types'

export const load: LayoutLoad = async ({parent}) => {
    const data = await parent()
    console.log('loading login')
    return {}
}
