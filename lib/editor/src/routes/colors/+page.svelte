<script>
  import { colorSettings } from "./list"
</script>

<div class="flex h-screen w-auto flex-col p-4">
  <h1 class="mb-4 text-center text-2xl font-semibold">Цвета Monaco</h1>
  <div class="relative overflow-x-auto rounded-lg shadow-md">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Событие</th>
          <th scope="col" class="px-6 py-3">Описание</th>
        </tr>
      </thead>
      <tbody>
        {#each colorSettings as item, i (i)}
          <tr class="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-surface-700">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{item.name}</th>
            <td class="px-6 py-4">{item.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
