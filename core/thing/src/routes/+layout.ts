export let prerender = false
export let ssr = false

import type { ThingType } from "$lib/types"
import type { LayoutLoad } from "./$types"

const getPersistentState = (storeName: string): ThingType[] => JSON.parse(localStorage.getItem(storeName) || "[]")
const setPersistentState = (storeName: string, persistentState: ThingType[]) => localStorage.setItem(storeName, JSON.stringify(persistentState))

export const load = (async () => {
  let everything: ThingType[] = getPersistentState("everything")

  if (!everything.length)
    [
      {
        uuid: crypto.randomUUID(),
        // uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.8/dist/CodeViewer.js",
        uri: "/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js",
      },
    ].forEach((thing) => import(/* @vite-ignore */ thing.uri).then((module) => everything.push({ ...thing, ...module.meta })).then(() => setPersistentState("everything", everything)))
  return { everything }
}) satisfies LayoutLoad
