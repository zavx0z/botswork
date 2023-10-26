<script lang="ts">
  import Prism from "prismjs"
  import "prismjs/components/prism-javascript.js"
  import "prismjs/plugins/keep-markup/prism-keep-markup"
  import { insertFolds } from "$lib/plugins/prismFold"
  import { assign, createActor, fromPromise } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import type { codeRenderType } from "./svelteCodeRender"
  import { machine } from "./machine"

  Prism.manual = true
  Prism.hooks.add("before-all-elements-highlight", ({ elements }) => elements.forEach(insertFolds))
  let codeElement: HTMLElement

  export let actorCodeRender: codeRenderType = createActor(
    machine.provide({
      actors: {
        highlightAll: fromPromise(
          () =>
            new Promise((resolve, reject) => {
              try {
                Prism.highlightAll(false, resolve)
              } catch (err) {
                reject({ err })
              }
            }),
        ),
      },
      actions: {
        initial: () => {},
        srcToElement: ({ event }) => (codeElement.innerHTML = event.code),
        done: assign({ code: () => codeElement.innerHTML }),
      },
    }),
  ).start()

  const value = useSelector(actorCodeRender, (state) => state.value)
</script>

<pre class="language-js hidden">
		<code class="language-js" bind:this={codeElement} />
</pre>
