<script lang="ts">
  import { T } from "@threlte/core"
  import { HTML } from "@threlte/extras"
  import type { AnyActor } from "xstate"
  import { useSelector } from "@xstate/svelte"
  import { Code } from "@lib/code/ui"
  import { code } from "../../routes/code"
  export let actor: AnyActor
  actor.start()
  const position = useSelector(actor, (state) => state.context.position)

  const content = (element: HTMLElement) => {
    const resizeObserver = new ResizeObserver((el) => {
      const width = el[0].contentRect.width
      const parentWidth = element.parentElement?.offsetWidth
      if (parentWidth) {
        const scale = (parentWidth - 8) / width
        element.style.transform = `scale(${scale})`
      }
      element.classList.remove("invisible")
    })
    resizeObserver.observe(element)
    const scale = 220 / element.offsetWidth
    const child = element.firstElementChild
    return {
      update() {},
      destroy() {
        resizeObserver.disconnect()
      },
    }
    // console.log(child.style.transform, child?.getBoundingClientRect())
    // if (child) child.style.transform = `scale(${scale})`
  }
</script>

<T.Mesh
  position={$position}
  on:click={(e) => console.log("click")}
  on:contextmenu={(e) => console.log("context menu")}
  on:dblclick={(e) => console.log("double click")}
  on:wheel={(e) => console.log("wheel")}
  on:pointerup={(e) => console.log("up")}
  on:pointerdown={(e) => console.log("down")}
  on:pointerover={(e) => console.log("over")}
  on:pointerout={(e) => console.log("out")}
  on:pointerenter={(e) => console.log("enter")}
  on:pointerleave={(e) => console.log("leave")}
  on:pointermove={(e) => console.log("move")}
  on:pointermissed={() => console.log("missed")}
>
  <T.PlaneGeometry args={[1, 1]} />
  <HTML transform>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      aria-label="нода"
      class="grid w-[222px] grid-cols-1 grid-rows-[24px_max-content] rounded-md border border-surface-800 shadow-lg shadow-slate-900"
      on:dragstart={(e) => console.log(e)}
      on:drag={(e) => console.log(e)}
      on:dragend={(e) => console.log(e)}
      on:click={(e) => console.log("click html", e)}
    >
      <div aria-label="панель заголовка" class="flex items-center rounded-t-md bg-secondary-800 p-2">
        <h1 class="font-botswork text-xs text-secondary-400">Кодирование</h1>
      </div>

      <div aria-label="тело" class="grid grid-rows-[100px_max-content] grid-cols-1 bg-surface-900 p-2">
        <div aria-label="предпросмотр" use:content>
          <div class="invisible min-h-fit min-w-fit origin-top-left">
            <pre><code>{@html code}</code></pre>
          </div>
        </div>
        <div aria-label="управление" class=""></div>
      </div>
    </div>
  </HTML>
</T.Mesh>
