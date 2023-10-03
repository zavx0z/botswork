<script lang="ts">
  import { AuthLayout } from "@module/secure"
  const tabs = [{ title: "Вход", id: "login" }]
</script>

<div class="h-1/2" />
<AuthLayout {tabs}>
  <div
    class="bg-surface-800 relative flex h-96 w-96 flex-col content-center justify-between rounded-md p-8 shadow-md gap-4"
  >
    <slot />
  </div>
</AuthLayout>
