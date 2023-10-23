<script lang="ts">
  import { Editor } from "@lib/editor"
  import { formatHtmlTags } from "../../utils.js"
  import Code from "$lib/ui/Code.svelte"
  export let data
</script>

<div class="grid h-screen auto-cols-auto grid-cols-3">
  <Editor content={data.dst} language={"html"} />
  <Editor content={formatHtmlTags(data.dst)} language={"html"} />
  <div class="max-w-fit">
    <Code code={data.dst} />
  </div>
</div>
