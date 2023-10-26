<script lang="ts">
  export let value: string | undefined
  export let title: string
  export let placeholder: string | undefined = ""
</script>

<div class="relative flex justify-between gap-2">
  <div class="absolute -left-[17px] top-2 h-3 w-3 rounded-full bg-sky-500" />
  <label class="flex shrink drop-shadow-lg" for="text">{title}</label>
  <textarea rows="1" bind:value {placeholder} class="flex min-h-[26px] grow resize appearance-none whitespace-pre-wrap rounded-md bg-surface-900 px-2 hover:opacity-75 focus:outline-none" id="text" />
</div>
