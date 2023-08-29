<script context="module">
	let counter = 0
</script>

<script>
	export let username = ''
	export let autofocus = true
	let eltId = 'username_' + counter++
</script>

<fieldset class="mb-4">
	<label for={eltId}> Пользователь </label>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		id={eltId}
		{autofocus}
		placeholder="никнейм"
		name="username"
		bind:value={username}
		required
		class="text-primary-50"
	/>
</fieldset>
