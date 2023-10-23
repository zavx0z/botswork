import { CodeRenderer } from "@lib/code"

const renderer = await CodeRenderer()

export async function handle({ event, resolve }) {
  event.locals.CodeRenderer = renderer
  return await resolve(event)
}
