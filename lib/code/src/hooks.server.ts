import { Window } from "happy-dom"
import prismTemplate from "./routes/playground/index.html?raw"

const window = new Window()
window.document.write(prismTemplate)

export async function handle({ event, resolve }) {
  event.locals.happyDOM = window
  return await resolve(event)
}
