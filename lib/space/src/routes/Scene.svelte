<script lang="ts">
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { interactivity } from "@threlte/extras"
  import Node from "$lib/nodes/code/Node.svelte"
  import { assign, createActor, createMachine } from "xstate"
  import { machine } from "$lib/node/machine"
  import type { AnyActorRef, AnyActor, AnyActorLogic, Spawner } from "xstate"
  import { useSelector } from "@xstate/svelte"

  type spawnOptions = {
    id?: string | undefined
    systemId: string
    input?: unknown
    syncSnapshot?: boolean | undefined
  }

  const everythingMachine = createMachine({
    types: {} as {
      context: {
        atoms: { [key: string]: AnyActorRef }
      }
      events: { type: "atom.put"; params: { atom: AnyActorLogic; options: spawnOptions } } | { type: "atom.delete" }
    },
    id: "everything",
    context: {
      atoms: {},
    },
    on: {
      "atom.put": {
        actions: assign(({ context, event, spawn }) => {
          const { atoms } = context
          atoms[event.params.options.systemId] = spawn(event.params.atom, event.params.options) as AnyActorRef
          return { ...context, atoms }
        }),
      },
      "atom.delete": {
        actions: assign(({ context, event }) => {
          return { ...context }
        }),
      },
    },
    initial: "BigBoom",
    states: {
      BigBoom: {},
    },
  })
  const everything = createActor(everythingMachine)
  everything.subscribe((state) => Object.keys(state.context.atoms).length && console.log(everything.system.get("code-render")))
  everything.start()
  everything.send({ type: "atom.put", params: { atom: machine, options: { systemId: "code-render", input: { position: [-1, 0, 0] } } } })
  const atoms = useSelector(everything, (state) => state.context.atoms)
</script>

<T.PerspectiveCamera makeDefault position={[0, 0, 25]} on:create={({ ref }) => ref.lookAt(0, 0, 0)}>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

{#each Object.entries($atoms) as [ref, atom] (ref)}
  <Node {atom} />
{/each}
