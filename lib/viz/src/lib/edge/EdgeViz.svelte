<script lang="ts">
  import type { SvgPath } from "./pathUtils"
  import { getPath, pathToD } from "./pathUtils"
  import { getContext } from "svelte"
  import type { AnyActor, AnyStateNode } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import ArrowMarker from "./ArrowMarker.svelte"
  import type { DirectedGraphEdge } from "$lib/types"

  let { edge, order, nodes } = $props<{ edge: DirectedGraphEdge; order: number; nodes: { [key: string]: AnyStateNode } }>()

  let path: SvgPath | undefined = $state(undefined)

  const service: AnyActor = getContext("service")
  let isActive = useSelector(service, (state) => state.context.state._nodes.includes(edge.source) || undefined)

  const getRect = (rect: DOMRect): DOMRect => ({
    x: rect.x,
    y: rect.y,
    width: rect.width,
    height: rect.height,
    top: rect.y,
    bottom: rect.y + rect.height,
    left: rect.x,
    right: rect.x + rect.width,
    toJSON() {
      return ""
    },
  })

  $effect(() => {
    const sourceRect = nodes[edge.source.id].meta?.layout
    const edgeRect = edge.label as unknown as DOMRect
    const targetRect = nodes[edge.target.id].meta?.layout
    if (sourceRect && edgeRect && targetRect) path = getPath(getRect(sourceRect), getRect(edgeRect), getRect(targetRect))
  })
  const markerId = `${edge.source.order}-${order}`
</script>

<g data-active={$isActive} stroke={"#fff"} class="fill-tertiary-900 stroke-tertiary-900 data-[active=true]:fill-primary-500 data-[active=true]:stroke-primary-500">
  {#if path}
    <defs>
      <ArrowMarker id={markerId} />
    </defs>
    <path stroke-width={2} fill="none" d={pathToD(path)} marker-end={`url(#${markerId})`}></path>
  {/if}
</g>
