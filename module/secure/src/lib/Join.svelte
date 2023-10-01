<script lang="ts">
  import { enhance } from "$app/forms"
  import { goto } from "$app/navigation"
  import { UserName, Password } from "@lib/ui/input"
  import type { InterpreterFrom } from "xstate"
  import { ripple } from "svelte-ripple-action"
  // @ts-ignore
  import { AuthMachine } from "$lib/index"

  export let auth: InterpreterFrom<typeof AuthMachine>
  export let username = ""
  export let password = ""
  export let redirectTo = "/profile"
  $: {
    if ($auth.hasTag("authorized")) goto(redirectTo)
  }
  let doublePassword = ""
  let visible = false
</script>

<form
  action="?/join"
  method="POST"
  class="flex h-full flex-col justify-between"
  use:enhance={({ cancel }) => {
		auth.send({ type: 'JOIN', username, password })
		cancel()
	}}
>
  <div class="flex h-full w-full flex-col">
    <UserName bind:username />
    <Password bind:password bind:visible />
    <input
      placeholder="повтор пароля"
      {...{ type: visible ? 'text' : 'password' }}
      name="password-double"
      bind:value={doublePassword}
      required
      class="mb-4"
    />
  </div>
  <button
    use:ripple
    title="зарегистрироваться"
    type="submit"
    class="bg-primary-500 text-surface-700 hover:bg-primary-400 focus-visible:bg-primary-400 rounded px-4 py-2 text-sm uppercase focus-visible:outline-offset-4"
  >
    Зарегистрироваться
  </button>
</form>
