<script lang="ts">
  import type { editor } from "monaco-types"
  import AllLines from "./icons/AllLines.svelte"
  import FoldDown from "./icons/FoldDown.svelte"
  import FoldUp from "./icons/FoldUp.svelte"

  export let editor: editor.IStandaloneCodeEditor
  const foldPanel = [
    {
      icon: AllLines,
      actions: {
        fold: {
          cmd: "editor.foldRecursively",
          title: "Свернуть рекурсивно",
        },
        unfold: {
          cmd: "editor.unfoldRecursively",
          title: "Развернуть рекурсивно",
        },
      },
    },
    {
      icon: "1",
      actions: {
        fold: {
          cmd: "editor.foldLevel1",
          title: "Развернуть уровень ",
        },
      },
    },
    {
      icon: "2",
      actions: {
        fold: {
          cmd: "editor.foldLevel2",
          title: "Развернуть уровень 2",
        },
      },
    },
    {
      icon: "3",
      actions: {
        fold: {
          cmd: "editor.foldLevel3",
          title: "Развернуть уровень 3",
        },
      },
    },
    {
      icon: "4",
      actions: {
        fold: {
          cmd: "editor.foldLevel4",
          title: "Развернуть уровень 4",
        },
      },
    },
    {
      icon: "5",
      actions: {
        fold: {
          cmd: "editor.foldLevel5",
          title: "Развернуть уровень 5",
        },
      },
    },
    {
      icon: "6",
      actions: {
        fold: {
          cmd: "editor.foldLevel6",
          title: "Развернуть уровень 6",
        },
      },
    },
    {
      icon: "7",
      actions: {
        fold: {
          cmd: "editor.foldLevel7",
          title: "Развернуть уровень 7",
        },
      },
    },
  ]
</script>

<div class="flex w-full justify-center">
  {#each foldPanel as group, idx (idx)}
    <div class="border-1 flex rounded-md border border-solid border-surface-600">
      {#if typeof group.icon === "string"}
        <p class="px-1">{group.icon}</p>
      {:else}
        <svelte:component this={group.icon} />
      {/if}
      {#each Object.entries(group.actions) as [key, action], idx (idx)}
        <button title={action.title} class="block border-0 px-1 py-0 text-xs" on:click={() => editor.getAction(action.cmd)?.run()}>
          {#if key === "fold"}
            <FoldUp size={12} />
          {:else if key === "unfold"}
            <FoldDown size={12} />
          {/if}
        </button>
      {/each}
    </div>
  {/each}
</div>
