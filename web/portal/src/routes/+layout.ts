export let ssr = false
export let prerender = false

import { createActor } from "xstate"
import { AuthMachine } from "@module/secure"

export const load = () => {
  const auth = createActor(AuthMachine).start()
  return { auth }
}
