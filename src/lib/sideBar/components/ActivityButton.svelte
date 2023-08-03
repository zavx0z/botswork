<script lang="ts">
	export let item: any
	const {
		machine,
		item: { path, component, props }
	} = item

</script>

{#if path}
	<a
		href={path}
		data-state={$machine.value}
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[state=active]:bg-surface-800 data-[state=active]:text-primary-500"
	>
		<svelte:component this={component} {...props} />
	</a>
{:else}
	<button
		data-state={$machine.value}
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[state=active]:bg-surface-800 data-[state=active]:text-primary-500"
		on:click={() => machine.send('ACTIVATE')}
	>
		<svelte:component this={component} {...props} />
	</button>
{/if}
