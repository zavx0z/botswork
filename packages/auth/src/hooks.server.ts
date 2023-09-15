import type {Handle} from '@sveltejs/kit'


export const handle: Handle = async ({event, resolve}) => {
    const response = await resolve(event)
    // console.log('server hook')
    return response
}