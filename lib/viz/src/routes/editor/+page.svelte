<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { writable } from "svelte/store"
  let content = writable(`
  interface BotsWork {
    Ботя: object
    Ботик: object
  }
  `)
</script>
<a href="/" class="text-primary-500">home</a>
<div class="h-96 w-96">
  <Editor bind:content hFull={false} language='typescript'/>
</div>
