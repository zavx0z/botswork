<script lang="ts">
  import { page } from "$app/stores"
  import type { LayoutData } from "./$types"
  import { Panel, PanelItem } from "@lib/ui/activity"

  export let data: LayoutData
</script>

<Panel>
  <PanelItem href="/polygon" active={$page.url.pathname.includes("polygon")} label="Machine">1. machine</PanelItem>
  <PanelItem href="/polygon" active={$page.url.pathname.includes("polygon")} label="Machine">2. machine.definition</PanelItem>
</Panel>
<div class="ml-80">
  <slot />
</div>
