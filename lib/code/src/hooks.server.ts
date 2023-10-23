import { CodeRenderer } from "$lib"

const renderer = await CodeRenderer()

export async function handle({ event, resolve }) {
  event.locals.CodeRenderer = renderer
  return await resolve(event)
}
