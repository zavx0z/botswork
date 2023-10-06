<script lang="ts">
  import { WebSocketMachine } from '$lib'
  import { onMount } from 'svelte'
  import { interpret } from 'xstate'

  export let data
  setTimeout(()=>{
    // const ws = interpret(WebSocketMachine, { devTools: true }).start()
  }, 1000)
  
  onMount(()=>{
    console.log(window["__xstate__"])
  })
  
</script>

<div class="flex h-screen flex-col justify-between gap-4">
  <h1 class="m-4 text-center text-4xl text-primary-400">@lib/ws</h1>
  <!-- <h2 class="m-4 text-center text-4xl text-primary-400">{$ws.value}</h2> -->

  <div class="flex w-full flex-1 flex-col items-center gap-2 text-2xl">
    <div class="flex h-full w-full flex-col items-center justify-center">
      <a class="text-primary-500 underline" href=" ">Ссылка</a>
    </div>
  </div>
</div>
