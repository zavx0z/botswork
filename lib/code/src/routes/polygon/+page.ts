import type { PageLoad } from './$types';

export const load = (async ({data}) => {
    console.log("universal")
    return data
}) satisfies PageLoad;