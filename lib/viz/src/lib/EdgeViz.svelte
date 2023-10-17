<script lang="ts">
  import type { SvgPath } from "./pathUtils.ts"
  import { getRect, onRect, readRect } from "./getRect"
  import { getPath, pathToD } from "./pathUtils"
  import type { Edge } from "./utils"
  import { onMount } from "svelte"

  export let edge: Edge<any, any, any>
  let path: SvgPath | undefined

  onMount(() => {
    let sourceRect = getRect(`${edge.source.id}`)
    let edgeRect = getRect(`${edge.source.id}:${edge.order}`)
    let targetRect = getRect(`${edge.target.id}`)
    const updatePath = () => {
      edgeRect = readRect(`${edge.source.id}:${edge.order}`)
      targetRect = readRect(`${edge.target.id}`)
      if (edgeRect && targetRect) {
        const edgeCenterY = edgeRect.top + edgeRect.height / 2
        path = getPath(edgeRect, targetRect)
      }
    }
    updatePath()
    const edgeRectSub = onRect(`${edge.source.id}`, updatePath)
    return () => {
      edgeRectSub.unsubscribe()
    }
  })
</script>

{#if path}
  <path stroke="#fff4" stroke-width={2} fill="none" d={pathToD(path)}></path>
{/if}
