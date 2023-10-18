<script lang="ts">
  import { createActor, type AnyActor } from "xstate"
  import CanvasMachine from "./CanvasMachine"
  import { useSelector } from "@xstate/svelte"

  const canvasActor = createActor(CanvasMachine).start()
  let zoom = useSelector(canvasActor, (state) => state.context.zoom)
  let dx = useSelector(canvasActor, (state) => state.context.pan.dx)
  let dy = useSelector(canvasActor, (state) => state.context.pan.dy)
</script>

<div on:wheel={(e) => canvasActor.send({ type: "PAN", dx: e.deltaX, dy: e.deltaY })}>
  <div class="flex gap-2">
    <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.OUT" })}>-</button>
    <button class="min-w-[50px] rounded-sm bg-primary-500 px-2 text-surface-900" on:click={() => canvasActor.send({ type: "ZOOM.IN" })}>+</button>
  </div>
  <div style="transform: scale({$zoom}) translate({$dx}px, {$dy}px)" class="transition-transform duration-200 ease-in-out">
    <slot />
  </div>
</div>
