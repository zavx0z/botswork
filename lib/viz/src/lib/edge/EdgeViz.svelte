<script lang="ts">
  import type { SvgPath } from "./pathUtils"
  import { getRect, onRect, readRect } from "../getRect"
  import { getPath, pathToD } from "./pathUtils"
  import { getContext } from "svelte"
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import ArrowMarker from "../ArrowMarker.svelte"
  import type { DirectedGraphEdge } from "$lib/graph/directedGraph"

  let { edge, order } = $props<{ edge: DirectedGraphEdge; order: number }>()
  let path: SvgPath | undefined = $state(undefined)

  const service: AnyActor = getContext("service")
  let isActive = useSelector(service, (state) => state.context.state._nodes.includes(edge.source) || undefined)

  $effect(() => {
    const updatePath = () => {
      let sourceRect = getRect(`${edge.source.id}`)
      let edgeRect = getRect(edge.id)
      let targetRect = getRect(`${edge.target.id}`)
      if (edgeRect && targetRect && sourceRect) {
        const edgeCenterY = edgeRect.top + edgeRect.height / 2
        path = getPath(sourceRect, edgeRect, targetRect)
      }
    }
    updatePath()
    const edgeRectSub = onRect(`${edge.id}`, updatePath)
    return () => {
      edgeRectSub.unsubscribe()
    }
  })

  const markerId = `${edge.source.order}-${order}`
</script>

{#if path}
  <g data-active={$isActive} stroke={"#fff"} class="fill-tertiary-900 stroke-tertiary-900 data-[active=true]:fill-primary-500 data-[active=true]:stroke-primary-500">
    <defs>
      <ArrowMarker id={markerId} />
    </defs>
    <path stroke-width={2} fill="none" d={pathToD(path)} marker-end={`url(#${markerId})`}></path>
  </g>
{/if}
