<script lang="ts">
  import { useGetRect } from "./getRect"
  import type { Edge } from "./utils"
  export let edge: Edge<any, any, any>
  export let idx: number
  //   const sourceRect = useGetRect(`${edge.source.id}`)
  //   const edgeRect = useGetRect(`${edge.source.id}:${i}`)
  //   const targetRect = useGetRect(`${edge.target.id}`)
  // x1={sourceRect.left} y1={sourceRect.top} x2={targetRect.left} y2={targetRect.top}

  //   if (!sourceRect || !targetRect) {
  //     return null;
  const data = { edge, idx }
</script>

<line use:useGetRect={{ edge, idx }} stroke="yellow" stroke-width={2} />
