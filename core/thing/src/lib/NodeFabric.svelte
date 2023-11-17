<script lang="ts">
  import { useSelector } from "@xstate/svelte"
  import { HTML } from "@threlte/extras"
  import { T } from "@threlte/core"
  import { Node } from "./index"
  import type { AnyActor } from "xstate"

  export let node: AnyActor
  const uri = useSelector(node, (state) => state.context.uri)
  const position = useSelector(node, (state) => state.context.position)

  type InOut = { [key: string]: { title: string; type: "Boolean" | "Text"; default: unknown } }
  interface metaInterface {
    tag: string
    title: string
    input: InOut
    output: InOut
  }
  let meta: metaInterface
  // import(/* @vite-ignore */ $uri).then((module) => (meta = module.meta))
</script>

<T.Mesh position={$position}>
  <HTML transform>
    {#if meta}
      <Node {node} />
    {/if}
  </HTML>
</T.Mesh>
