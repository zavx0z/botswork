<script lang="ts">
  const prismEvents = [
    {
      name: "before-sanity-check",
      description: "Вызывается перед началом проверки санитарности кода.",
    },
    {
      name: "before-highlight",
      description: "Вызывается перед началом подсветки синтаксиса.",
    },
    {
      name: "before-insert",
      description: "Событие происходит перед вставкой подсвеченного кода в DOM.",
    },
    {
      name: "after-highlight",
      description: "Вызывается после того, как код был подсвечен.",
    },
    {
      name: "complete",
      description: 'Событие "complete" вызывается после завершения процесса подсветки.',
    },
    {
      name: "before-tokenize",
      description: "Вызывается перед тем, как код будет разделен на токены.",
    },
    {
      name: "before-append",
      description: "Событие происходит перед добавлением подсвеченного кода к DOM.",
    },
    {
      name: "before-highlightall",
      description: ""
    },
    {
      name: "wrap",
      description: ""
    },
  ]
</script>

<div class="flex flex-col p-4 w-auto h-screen">
  <h1 class="mb-4 text-center text-2xl font-semibold">События Prism.js</h1>
  <div class="relative overflow-x-auto rounded-lg shadow-md lg:w-1/2">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3">Событие</th>
          <th scope="col" class="px-6 py-3">Описание</th>
        </tr>
      </thead>
      <tbody>
        {#each prismEvents as event, i (i)}
          <tr class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <th scope="row" class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">{event.name}</th>
            <td class="px-6 py-4">{event.description}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
