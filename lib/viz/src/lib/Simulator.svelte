<script lang="ts">
  import type { Point } from "$lib/types"
  import type { SimulatorActorType } from "./simulator"

  import { createActor, assign, createMachine } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import Graph from "./Graph.svelte"

  let { actor } = $props<{ actor: SimulatorActorType }>()

  const canvasActor = createActor(
    createMachine({
      id: "canvasMachine",
      context: {
        zoom: 1,
        pan: { dx: 0, dy: 0 },
        initialPosition: { x: 0, y: 0 },
      },
      types: {} as {
        context: {
          zoom: number
          pan: { dx: number; dy: number }
          initialPosition: Point
        }
        events: { type: "ZOOM.OUT" } | { type: "ZOOM.IN" } | { type: "POSITION.SET"; position: Point } | { type: "PAN"; dx: number; dy: number }
      },
      on: {
        "ZOOM.OUT": {
          actions: assign({ zoom: ({ context }) => context.zoom - 0.1 }),
          guard: ({ context }) => context.zoom > 0.5,
        },
        "ZOOM.IN": {
          actions: assign({ zoom: ({ context }) => context.zoom + 0.1 }),
          guard: ({ context }) => context.zoom < 1,
        },
        PAN: {
          actions: assign({ pan: ({ context, event }) => ({ dx: context.pan.dx - event.dx, dy: context.pan.dy - event.dy }) }),
        },
        "POSITION.SET": {
          actions: assign({ initialPosition: ({ event }) => event.position }),
        },
      },
    }),
  ).start()
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
    <Graph {actor} />
  </div>
</div>
