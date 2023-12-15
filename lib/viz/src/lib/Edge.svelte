<script lang="ts">
  import type { LPathParam, SvgPath } from "./utils/edgeSVG"
  import { getPath, getRect, pathToD } from "./utils/edgeSVG"
  import type { AnyStateNode } from "@lib/machine"
  import type { DirectedGraphEdge, Point } from "$lib/types"
  import type { ElkEdgeSection } from "elkjs"

  export let edge: DirectedGraphEdge
  const sourceID: string = edge.source.id
  const targetID: string = edge.target.id

  const label: DOMRect = edge.label as unknown as DOMRect

  let sourceOrder = edge.source.order
  $: sourceOrder = edge.source.order

  let sections: ElkEdgeSection[] = edge.sections
  $: sections = edge.sections

  export let nodes: { [key: string]: AnyStateNode }
  export let activeIds: string[] = []
  export let order: number
  
  const svgPath = (element: SVGPathElement, sections: ElkEdgeSection[]) => {
    return {
      update(sections: ElkEdgeSection[]) {
        const sourceRect = nodes[sourceID].meta?.layout
        const edgeRect = label as unknown as DOMRect
        const targetRect = nodes[targetID].meta?.layout
        if (sourceRect && edgeRect && targetRect) {
          let path: SvgPath | undefined
          if (sections?.length) {
            const section = sections[0]
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

<g data-active={activeIds.includes(sourceID)} stroke={"#fff"} class="fill-tertiary-900 stroke-tertiary-900 data-[active=true]:fill-primary-500 data-[active=true]:stroke-primary-500">
  <defs>
    <marker id="{sourceOrder}-{order}" viewBox="0 0 10 10" markerWidth="5" markerHeight="5" refX="0" refY="5" markerUnits="strokeWidth" orient="auto">
      <path d="M0,0 L0,10 L10,5 z" />
    </marker>
  </defs>
  <path use:svgPath={sections} stroke-width={2} fill="none" marker-end="url(#{sourceOrder}-{order})" opacity="0" class="transition-colors"></path>
</g>
