<script context="module">
	let counter = 0
</script>

<script>
	export let email = ''
	let eltId = 'email_' + counter++
</script>

<fieldset class="mb-4">
	<label for={eltId}> email </label>
	<input id={eltId} type="email" placeholder="email" name="email" bind:value={email} required class="text-primary-50"/>
</fieldset>
