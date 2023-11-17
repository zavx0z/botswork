export let prerender = false
export let ssr = false

import type { LayoutLoad } from "./$types"

type InOut = { [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown } }
interface persistent {
  uuid: string
  uri: string
  tag: string
  title: string
  input: InOut
  output: InOut
}

const getPersistentState = (storeName: string): persistent[] => JSON.parse(localStorage.getItem(storeName) || "[]")
const setPersistentState = (storeName: string, persistentState: persistent[]) => localStorage.setItem(storeName, JSON.stringify(persistentState))

export const load = (async () => {
  let everything: persistent[] = getPersistentState("everything")

  if (!everything.length)
    [{ uuid: crypto.randomUUID(), uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.7/dist/CodeViewer.js" }].forEach((thing) =>
      import(/* @vite-ignore */ thing.uri).then((module) => everything.push({ ...thing, ...module.meta })).then(() => setPersistentState("everything", everything)),
    )

  return { everything }
}) satisfies LayoutLoad
