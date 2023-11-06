<script lang="ts">
  import "@lib/theme/app.css"
  import db from "./actor"

  db.start()
</script>

<div class="flex min-h-screen flex-col">
  <span class="text-2xl font-semibold text-white">sqlite wasm</span>
  <main class="flex-grow">
    <slot />
  </main>
</div>
