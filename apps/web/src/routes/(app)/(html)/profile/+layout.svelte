<script lang="ts">
    import LogOut from '../../auth/logout/+page.svelte'
	export let data
	let { session, supabase } = data
	$: ({ session, supabase } = data)
</script>

<div class="fixed inset-y-0 left-12 z-40 w-80 flex-col bg-surface-800/90 backdrop-blur-sm justify-center items-center">
	<h4 class="text-primary-50">{session?.user.email}</h4>
	<LogOut {data}/>
</div>
<slot />
