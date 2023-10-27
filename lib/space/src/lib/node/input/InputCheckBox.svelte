<script lang="ts">
  export let checked: boolean
  export let title: string
  const id = crypto.randomUUID()
</script>

<div class="relative flex h-7 items-center">
  <div class="absolute -left-5 top-2 h-3 w-3 rounded-full bg-pink-500 outline outline-1 outline-slate-950" />
  <input
    {id}
    type="checkbox"
    bind:checked
    class="h-5 w-5 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
  />
  <label for={id} class="ml-2 drop-shadow-lg">{title}</label>
</div>
