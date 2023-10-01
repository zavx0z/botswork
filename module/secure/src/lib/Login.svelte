<script lang="ts">
  import { enhance } from "$app/forms"
  import { goto } from "$app/navigation"
  import { UserName, Password } from "@lib/ui/input"
  import type { InterpreterFrom } from "xstate"
  import { ripple } from "svelte-ripple-action"
  // @ts-ignore
  import { AuthMachine } from "$lib/index"

  export let auth: InterpreterFrom<typeof AuthMachine>

  $: {
    if ($auth.hasTag("authorized")) goto(redirectTo)
  }
  export let username = ""
  export let password = ""
  export let redirectTo: string = "/"
</script>
<div class="flex h-full flex-col justify-between">
  <form
    action="?/login"
    method="POST"
    use:enhance={({ cancel }) => {
			auth.send({ type: 'LOGIN', username, password })
			cancel()
		}}
  >
    <UserName bind:username />
    <Password bind:password />
    <button
      use:ripple
      title="войти"
      type="submit"
      class="bg-primary-500 text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 w-full rounded px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
    >
      Войти
    </button>
  </form>
  <form action="?/login" method="POST" class="flex justify-center gap-4">
    <button
      use:ripple
      type="submit"
      title="GitHub"
      formaction="?/login&provider=github"
      class="border-tertiary-500 text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 rounded border px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
    >
      github
    </button>
    <button
      use:ripple
      type="submit"
      title="Google"
      formaction="?/login&provider=google"
      class="border-tertiary-500 text-tertiary-500 hover:border-tertiary-400 hover:text-tertiary-400 focus-visible:border-tertiary-400 focus-visible:text-tertiary-400 rounded border px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
    >
      google
    </button>
  </form>
</div>
