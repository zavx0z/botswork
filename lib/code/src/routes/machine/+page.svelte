<script lang="ts">
  import CodeRenderer from "$lib/SvelteCodeRenderer.svelte"
  import { useSelector } from "@xstate/svelte"
  import type { codeRenderType } from "$lib/svelteCodeRender"
  import type { AnyState } from "xstate"
  import type { Readable } from "svelte/store"

  let actor: codeRenderType
  let state: Readable<AnyState>
  $: actor && (state = useSelector(actor, (state) => state))
</script>

<button
  on:click|preventDefault={() =>
    actor.send({
      type: "render",
      code: `
const machine = createMachine({
    context: {
      src: "",
      code: "",
      err: "",
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          render: {
            target: "renderer",
            actions: assign({ src: ({ event }) => event.code }),
          },
        },
      },
      renderer: {
        invoke: {
          id: "prism",
          src: "highlightAll",
          onDone: { actions: assign({ code: () => codeElement.innerHTML }), target: "idle" },
          //@ts-ignore
          onError: { actions: assign({ err: ({ event }) => event.data?.err || "unknown error" }), target: "idle" },
        },
      },
    },
  })`,
    })}>Render Code</button
>
<CodeRenderer bind:actorCodeRender={actor} />

<pre>
    <code>{@html $state?.context.code}</code>
</pre>
