import type {Handle, HandleClientError} from '@sveltejs/kit'


export const handle: Handle = async ({event, resolve}) => {
    const response = await resolve(event)
    console.log('client hook')
    return response
}

export const handleError: HandleClientError = async ({}) => {
    console.log('client hook error')
    return {message: 'error!'}
}