<script lang="ts">
  import "config/tailwindCSS"
  import "../../component.css"
  import { Activity, Button } from "ui/activity"
  import { BotikIcon } from "icons"
</script>

<Activity position="left">
  <div>
    <Button active={true} href="/">
      <BotikIcon />
    </Button>
  </div>
  <div>
    <Button active={false} href="/">
      <BotikIcon />
    </Button>
  </div>
</Activity>
<slot />
