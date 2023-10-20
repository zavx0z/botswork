<script lang="ts">
  import { page } from "$app/stores"
  import { Panel, PanelItem } from "@lib/ui/activity"

  const menuItems = [
    { title: "из машины в направленный граф", link: "/polygon/machine-definition-directed-graph" },
    { title: "структура направленного графа", link: "/polygon/directed-graph" },
    { title: "edge", link: "/polygon/edge" },
  ]
</script>

<Panel>
  {#each menuItems as item}
    <PanelItem href={item.link} active={$page.url.pathname === item.link} label={item.title}>{item.title}</PanelItem>
  {/each}
</Panel>
<div class="ml-80">
  <slot />
</div>
