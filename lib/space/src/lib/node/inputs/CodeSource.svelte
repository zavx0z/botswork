<script lang="ts">
  export let selected: string = " "
  const types = [
    { value: " ", title: "Выбрать источник", props: { disabled: true, selected: true, hidden: true } },
    { value: "text", title: "Подключить" },
    { value: "clipboard", title: "Вставить" },
    { value: "file", title: "Загрузить с устройства" },
    { value: "link", title: "Загрузить по ссылке" },
  ]
  const selectId = crypto.randomUUID()
  export let code: string = ""
</script>

<div class="flex flex-col gap-2">
  <div class="relative">
    <label for={selectId} class="absolute -top-2.5 right-5 z-40 text-xs">источник</label>
    <select id={selectId} bind:value={selected} class="block w-full rounded-md bg-surface-700 px-1 pb-1 hover:opacity-75 focus:outline-none">
      {#each types as typeSrc}
        <option {...typeSrc.props} value={typeSrc.value}>{typeSrc.title}</option>
      {/each}
    </select>
  </div>

  {#if selected === "text"}
    <div class="relative flex justify-between gap-2">
      <div class="absolute -left-[17px] top-2 h-3 w-3 rounded-full bg-sky-500" />
      <label class="flex shrink drop-shadow-lg" for="text">Код</label>
      <input class="flex appearance-none rounded-md bg-surface-900 px-2 hover:opacity-75 focus:outline-none" type="text" id="text" placeholder=" " />
    </div>
  {:else if selected === "clipboard"}
    <textarea bind:value={code} placeholder="ctrl+v" class="flex appearance-none whitespace-pre-wrap rounded-md bg-surface-900 px-2 hover:opacity-75 focus:outline-none"  id="text" />
  {:else if selected === "link"}
    <div class="relative flex justify-between gap-2">
      <div class="absolute -left-[17px] top-2 h-3 w-3 rounded-full bg-sky-500" />
      <label class="flex shrink drop-shadow-lg" for="text">Ссылка</label>
      <input data-exist={false} class="flex appearance-none rounded-md bg-surface-900 px-2 hover:opacity-75 focus:outline-none data-[exist=true]:grow" type="text" id="text" placeholder=" " />
    </div>
  {:else}
    <!-- else content here -->
  {/if}
</div>
