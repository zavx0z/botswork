<script lang="ts">
  import { T } from "@threlte/core"
  import { HTML } from "@threlte/extras"
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import CodeSource from "./inputs/CodeSource.svelte"
  export let actor: AnyActor
  actor.start()
  const position = useSelector(actor, (state) => state.context.position)

  const content = (element: HTMLElement) => {
    const resizeObserver = new ResizeObserver((el) => {
      const width = el[0].contentRect.width
      const parentWidth = element.parentElement?.offsetWidth
      if (parentWidth) {
        const scale = (parentWidth - 12) / width
        element.style.transform = `scale(${scale})`
      }
      element.classList.remove("invisible")
    })
    resizeObserver.observe(element)
    return {
      update() {},
      destroy() {
        resizeObserver.disconnect()
      },
    }
  }
  let selected: string
  let code: string = ''
  $: console.log(code)
</script>

<T.Mesh position={$position}>
  <HTML transform>
    <div aria-label="нода" class="grid w-96 grid-cols-1 grid-rows-[2rem_max-content] rounded-md bg-surface-800 shadow-lg shadow-slate-900">
      <div on:scroll|preventDefault aria-label="панель заголовка" class="flex items-center rounded-t-md bg-secondary-900 p-2">
        <h1 class="select-none drop-shadow-lg">Просмотр кода</h1>
      </div>
      <div aria-label="тело" class="grid grid-cols-1 grid-rows-[max-content_12rem_max-content] gap-2 rounded-b-md p-3">
        <div aria-label="входы" class="flex flex-col gap-2">
          <CodeSource bind:selected bind:code />
        </div>
        <div aria-label="предпросмотр" class="overflow-y-auto overflow-x-hidden rounded-sm bg-surface-900 p-1 shadow-inner shadow-slate-900">
          <div class="invisible min-h-fit min-w-fit origin-top-left" use:content>
            <pre><code>{@html code}</code></pre>
          </div>
        </div>
        <div aria-label="выходы" class="flex flex-col gap-2">
          <div class="relative">
          </div>
        </div>
      </div>
    </div>
  </HTML>
</T.Mesh>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- on:dragstart={(e) => console.log(e)}
on:drag={(e) => console.log(e)}
on:dragend={(e) => console.log(e)}
on:click={(e) => console.log("click html", e)}
on:wheel={(e) => console.log("wheel")} -->
<!-- <div class="relative">
  <div class="absolute -left-[17px] top-2 h-3 w-3 rounded-full bg-orange-500" />
  <input
    class=" disabled:opacity-50; flex h-7 w-full rounded-md bg-surface-700 px-2 py-1 text-sm text-white placeholder-primary-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-primary-500 focus:bg-surface-900 focus:outline-none focus:placeholder:text-transparent disabled:cursor-not-allowed"
    placeholder="Источник кода"
  /> -->
<!-- <div class="absolute -left-4 top-2.5 h-3 w-3 rounded-full bg-orange-500" /> -->
<!-- <div class="absolute -right-4 top-2.5 rotate-180">
    <div class="absolute h-3 w-3 rounded-full bg-blue-950 blur-sm" />
    <div class=" relative h-3 w-3 rounded-full bg-blue-800 shadow-inner shadow-blue-950 ring-1 ring-inset ring-blue-950 ring-opacity-30" />
  </div> -->
<!-- </div>
<div class="flex justify-between">
  <label class="flex shrink" for="text">Код</label>
  <input class="flex shrink appearance-none rounded-md bg-surface-900 px-2 hover:opacity-75 focus:outline-none" type="text" id="text" placeholder=" " />
</div> -->
<!-- <div class="relative">
  <input
    type="text"
    id="floating_filled"
    class="peer block w-full appearance-none rounded-md border-0 bg-gray-50 px-2.5 pb-2.5 pt-5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-blue-500"
    placeholder=" "
  />
  <label
    for="floating_filled"
    class="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500"
    >Floating filled</label
  >
</div> -->
