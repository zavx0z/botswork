<script lang="ts">
  export let src = ""
  export let alt = "avatar"
</script>

<div class="flex h-8 w-8 items-center justify-center rounded-3xl bg-surface-800">
  {#if src}
    <img {alt} class="h-full w-full rounded-[inherit]" src={src} />
  {:else}
    <span class="text-sm font-medium uppercase text-primary-500">
      {alt.slice(0, 2)}
    </span>
  {/if}
</div>
