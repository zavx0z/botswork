<script lang="ts">
  import { useSelector } from "@xstate/svelte"
  import { assign, createActor, fromPromise, log } from "xstate"
  import { machine } from "./machine"
  import type { codeRenderType } from "./svelteCodeRender"

  let codeElement: HTMLElement
  let Prism: typeof import("prismjs")

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
        initial: async () => {
          if (!window.Prism) {
            console.log("initialize Prismjs")
            Prism = await import("prismjs")
            Prism.manual = true
            const langJS = (await import("prismjs/components/prism-javascript.js?raw")).default
            await eval(langJS)
            const pluginKeepMarkup = (await import("prismjs/plugins/keep-markup/prism-keep-markup?raw")).default
            await eval(pluginKeepMarkup)

            const { insertFolds } = await import("./plugins/prismFold")
            Prism.hooks.add("before-all-elements-highlight", ({ elements }) => elements.forEach(insertFolds))
          }
        },
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
