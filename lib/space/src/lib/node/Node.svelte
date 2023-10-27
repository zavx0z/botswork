<script lang="ts">
  import { T } from "@threlte/core"
  import { HTML } from "@threlte/extras"
  import Input from "./Input.svelte"
  import Output from "./Output.svelte"
  import Preview from "./Preview.svelte"
  import Title from "./Title.svelte"
  import Body from "./Body.svelte"
  export let position
</script>

<T.Mesh position={$position}>
  <HTML transform>
    <div aria-label="нода" class="grid w-96 grid-cols-1 grid-rows-[2rem_max-content] rounded-md bg-surface-800 shadow-lg shadow-slate-900">
      <slot name="title" {Title} />
      <Body>
        <slot {Input} {Preview} {Output} />
      </Body>
    </div>
  </HTML>
</T.Mesh>
