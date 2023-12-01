<script lang="ts">
  export let title: string
</script>

<div  on:scroll|preventDefault aria-label="панель заголовка" class="flex items-center rounded-t-md bg-secondary-900 px-2">
  <h1 class="select-none drop-shadow-lg">{title}</h1>
</div>
