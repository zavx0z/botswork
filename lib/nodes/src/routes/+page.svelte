<script lang="ts">
  import Node from "$lib/Node.svelte"
  import type { ThingType } from "$lib/types"
  import type { LayoutData } from "./$types"

  let { data } = $props<{ data: LayoutData }>()
  // let everything = $state(data.everything)

  const getPersistentState = (storeName: string): ThingType[] => JSON.parse(localStorage.getItem(storeName) || "[]")
  const setPersistentState = (storeName: string, persistentState: ThingType[]) => localStorage.setItem(storeName, JSON.stringify(persistentState))

  let everything: ThingType[] = getPersistentState("everything")

  if (!everything.length)
    [
      {
        uuid: crypto.randomUUID(),
        // uri: "https://esm.veryfront.com/@metafor/code-viewer@0.0.8/dist/CodeViewer.js",
        uri: "/home/zavx0z/botswork/nodes/code-viewer/dist/CodeViewer.js",
      },
    ].forEach((thing) => import(/* @vite-ignore */ thing.uri).then((module) => everything.push({ ...thing, ...module.meta })).then(() => setPersistentState("everything", everything)))
</script>

{#each everything as thing (thing.uuid)}
  <Node {thing} />
{/each}
