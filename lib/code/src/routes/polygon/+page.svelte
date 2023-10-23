<script lang="ts">
  import { Editor } from "@lib/editor"
  import { Code } from "@lib/ui/card"
  import "$lib/styles/fold.css"
  import "$lib/styles/lineNum.css"
  import "prism-themes/themes/prism-coldark-dark.css"
  import { formatHtmlTags } from "../../utils.js"
  export let data
</script>

<div class="grid h-screen auto-cols-auto grid-cols-3">
  <Editor content={data.dst} language={"html"} />
  <Editor content={formatHtmlTags(data.dst)} language={"html"} />
  <div class="max-w-fit">
    <Code code={data.dst} />
  </div>
</div>
