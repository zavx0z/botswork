export let ssr = false
export let prerender = false

import type { LayoutLoad } from "./$types"
import { createActor } from "xstate"
import { AuthMachine } from "$lib"

export const load = (() => {
  const auth = createActor(
    AuthMachine  ).start()
  return { auth }
}) satisfies LayoutLoad
