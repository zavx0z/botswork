import type { LayoutServerLoad } from './$types';

export const load = (async () => {
    console.log('srv test')
    return {};
}) satisfies LayoutServerLoad;