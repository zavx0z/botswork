<script lang="ts">
	export let button: any
</script>
{#if $button.context.path}
	<a
		href={$button.context.path}
		data-active={$button.state === 'active'}
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
	>
		<svelte:component this={$button.context.component} {...$button.context.props} class="h-6 w-6" />
	</a>
{:else}
	<button
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[active=true]:bg-surface-800 data-[active=true]:text-primary-500"
	>
		<svelte:component this={$button.context.component} {...$button.context.props} class="h-6 w-6" />
	</button>
{/if}
