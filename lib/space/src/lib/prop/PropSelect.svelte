<script lang="ts">
  export let options: { value: string; title: string }[]
  export let selected: string
  export let title: string
  const id = crypto.randomUUID()
</script>

<div class="relative">
  <label for={id} class="absolute -top-2.5 right-5 z-40 text-xs">{title}</label>
  <select {id} bind:value={selected} class="block w-full rounded-md bg-surface-700 px-1 pb-1 hover:opacity-75 focus:outline-none">
    {#each options as typeSrc}
      <option value={typeSrc.value}>{typeSrc.title}</option>
    {/each}
  </select>
</div>
