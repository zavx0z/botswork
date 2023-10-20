<script lang="ts">
  import { Editor } from "$lib"
  let content = `interface BotsWork {
    Ботя: object
    Ботик: object
  }`
</script>

<div class="h-96 w-96">
  <Editor bind:content hFull={false} language="typescript" />
</div>
