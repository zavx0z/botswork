<script lang="ts">
  import OpfsExplorer from "$lib/components/OpfsExplorer.svelte"
  import { getContext } from "svelte"
  import { useSelector } from "@xstate/svelte"
  import type { actor } from "../lib/client/actor"

  const db = getContext<typeof actor>("db")
  const activateActor = db.getSnapshot().children["activate"]
  const state = useSelector(activateActor, (state) => state)
</script>

<span class="text-2xl font-semibold text-white">sqlite wasm</span>
<table class="w-96 border border-gray-700 text-left text-sm text-gray-500 dark:text-gray-400">
  <tbody>
    {#each Object.entries($state.context.output) as [key, value] (key)}
      <tr class="border-b hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-surface-700">
        <th scope="row" class="whitespace-nowrap px-6 py-2 font-medium text-gray-900 dark:text-white">{key}</th>
        <td class:opacity-0={typeof value === "undefined"} class="px-6 py-2 transition-opacity delay-200">{value}</td>
      </tr>
    {/each}
  </tbody>
</table>
<div class="bg-slate-500">
  <OpfsExplorer />
</div>
