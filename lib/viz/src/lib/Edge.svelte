<script lang="ts">
  import type { LPathParam, SvgPath } from "./utils/edgeSVG"
  import { getPath, getRect, pathToD } from "./utils/edgeSVG"
  import type { AnyStateNode } from "@lib/machine"
  import type { DirectedGraphEdge, Point } from "$lib/types"

  let { edges, nodes, activeIds } = $props<{
    edges: { [key: string]: DirectedGraphEdge }
    nodes: { [key: string]: AnyStateNode }
    activeIds: string[]
  }>()

  const svgPath = (element: SVGPathElement, edge: DirectedGraphEdge) => {
    return {
      update(edge: DirectedGraphEdge) {
        const sourceRect = nodes[edge.source.id].meta?.layout
        const edgeRect = edge.label as unknown as DOMRect
        const targetRect = nodes[edge.target.id].meta?.layout
        if (sourceRect && edgeRect && targetRect) {
          let path: SvgPath | undefined
          if (edge.sections?.length) {
            const section = edge.sections[0]
            path = [["M", section.startPoint], ...(section.bendPoints?.map((point: Point) => ["L", point] as LPathParam) || [])]
            const preLastPoint = path[path.length - 1][1]!
            const xSign = Math.sign(section.endPoint.x - preLastPoint.x)
            const ySign = Math.sign(section.endPoint.y - preLastPoint.y)
            const endPoint = { x: section.endPoint.x - 5 * xSign, y: section.endPoint.y - 5 * ySign }
            path.push(["L", endPoint])
          } else path = getPath(getRect(sourceRect), getRect(edgeRect), getRect(targetRect))
          if (path) {
            element.setAttribute("d", pathToD(path))
            element.setAttribute("opacity", "1")
          }
        }
      },
    }
  }
</script>

<svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
  {#each Object.entries(edges) as [id, edge], order (id)}
    {@render path_({ edge, order })}
  {/each}
</svg>

{#snippet path_({ edge, order })}
  <g data-active={activeIds.includes(edge.source.id)} stroke={"#fff"} class="fill-tertiary-900 stroke-tertiary-900 data-[active=true]:fill-primary-500 data-[active=true]:stroke-primary-500">
    <defs>
      <marker id="{edge.source.order}-{order}" viewBox="0 0 10 10" markerWidth="5" markerHeight="5" refX="0" refY="5" markerUnits="strokeWidth" orient="auto">
        <path d="M0,0 L0,10 L10,5 z" />
      </marker>
    </defs>
    <path use:svgPath={edge} stroke-width={2} fill="none" marker-end="url(#{edge.source.order}-{order})" opacity="0" class="transition-colors"></path>
  </g>
{/snippet}
