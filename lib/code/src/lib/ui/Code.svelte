<script lang="ts">
  export let code: string
  export let title: string | undefined = undefined
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click class=" h-auto w-full flex-col rounded-lg border border-gray-700 bg-gray-800 p-0 px-1 shadow">
  {#if title}
    <h5 class="pb-1 pl-6 pt-4 text-2xl font-bold tracking-tight text-primary-500">{title}</h5>
  {/if}
  <div class="flex flex-grow overflow-x-auto py-2">
    <pre class="line-num"><code>{@html `${code}`}</code></pre>
  </div>
</div>
