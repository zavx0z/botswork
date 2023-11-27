<script lang="ts">
  import type { SvgPath } from "./pathUtils"
  import { getRect, onRect, readRect } from "./getRect"
  import { getPath, pathToD } from "./pathUtils"
  import type { Edge } from "./utils"
  import { onMount } from "svelte"
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import ArrowMarker from "./ArrowMarker.svelte"

  type Props = { service: AnyActor; edge: Edge<any, any, any> }
  let { service, edge } = $props<Props>()

  let path: SvgPath | undefined
  let isActive = useSelector(service, (state) => state.context.state.configuration.includes(edge.source) || undefined)
  onMount(() => {
    let sourceRect = getRect(`${edge.source.id}`)
    let edgeRect = getRect(`${edge.source.id}:${edge.order}`)
    let targetRect = getRect(`${edge.target.id}`)
    const updatePath = () => {
      edgeRect = readRect(`${edge.source.id}:${edge.order}`)
      targetRect = readRect(`${edge.target.id}`)
      if (edgeRect && targetRect) {
        const edgeCenterY = edgeRect.top + edgeRect.height / 2
        // path = getPath(edgeRect, targetRect)
      }
    }
    updatePath()
    const edgeRectSub = onRect(`${edge.source.id}`, updatePath)
    return () => {
      edgeRectSub.unsubscribe()
    }
  })

  const markerId = `${edge.source.order}-${edge.order}`
</script>

{#if path}
  <g data-active={$isActive} stroke={"#fff"} class="fill-tertiary-900 stroke-tertiary-900 data-[active=true]:fill-primary-500 data-[active=true]:stroke-primary-500">
    <defs>
      <ArrowMarker id={markerId} />
    </defs>
    <path stroke-width={2} fill="none" d={pathToD(path)} marker-end={`url(#${markerId})`}></path>
  </g>
{/if}
