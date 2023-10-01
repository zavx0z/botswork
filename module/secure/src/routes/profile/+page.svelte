<script lang='ts'>
	export let data
	const { auth } = data
</script>

<p>
	username: {$auth.context?.username}
</p>
