<script context="module">
	let counter = 0
</script>

<script>
	export let email = ''
	export let autofocus = true
	let eltId = 'email_' + counter++
</script>

<fieldset class="mb-4">
	<label for={eltId}> email </label>
	<!-- svelte-ignore a11y-autofocus -->
	<input
		id={eltId}
		{autofocus}
		type="email"
		placeholder="email"
		name="email"
		bind:value={email}
		required
		class="text-primary-50"
	/>
</fieldset>
