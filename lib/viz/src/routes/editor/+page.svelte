<script lang="ts">
  import Editor from "$lib/editor/Editor.svelte"
  import { writable } from "svelte/store"
  let content = writable("hi")
  $:console.log($content)
</script>

<div class="h-96 w-96">
  <Editor bind:content />
</div>
