<script lang="ts">
  import Node from "$lib/Node.svelte"
  import type { ThingType } from "$lib/types"

  const getPersistentState = (storeName: string): ThingType[] => JSON.parse(localStorage.getItem(storeName) || "[]")
  const setPersistentState = (storeName: string, persistentState: ThingType[]) => localStorage.setItem(storeName, JSON.stringify(persistentState))

  let everything: ThingType[] = $state([])

  $effect(() => {
    // everything = getPersistentState("everything")
    if (!everything.length)
      [
        {
          uuid: crypto.randomUUID(),
          // uri: "https://zavx0z.github.io/skeleton-tracing/index.js",
          uri: "/mnt/c/zavx0z/skeleton-tracing/index.js",
        },
      ].forEach((thing) =>
        import(/* @vite-ignore */ thing.uri)
          .then((module) => {
            console.log("module", module)
            everything.push({ ...thing, ...module.meta })
          })
          .then(() => setPersistentState("everything", everything)),
      )
  })
</script>

{#each everything as thing (thing.uuid)}
  <Node {thing} />
{/each}
