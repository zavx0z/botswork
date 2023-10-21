<script lang="ts">
  export let code: string
  export let title: string | undefined = undefined
</script>

<div class="scrollbar scrollbar-thumb-rounded-2xl scrollbar-thumb-gray-900 scrollbar-track-surface-900 w-full flex-col overflow-auto rounded-lg border border-gray-700 bg-gray-800 px-6 py-0 shadow">
  {#if title}
    <h5 class="pt-6 text-2xl font-bold tracking-tight text-primary-500">{title}</h5>
  {/if}
  <pre>
      {@html `${code}`}
    </pre>
</div>
