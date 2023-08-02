<script lang="ts">
	import { matchers } from './../../../.svelte-kit/generated/client/matchers.js';
	export let button: any
</script>

{#if $button.context.path}
	<a
		href={$button.context.path}
		data-state={$button.value}
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[state=active]:bg-surface-800 data-[state=active]:text-primary-500"
	>
		<svelte:component this={$button.context.component} {...$button.context.props} class="h-6 w-6" />
	</a>
{:else}
	<button
		data-state={$button.value}
		class="grid h-12 w-12 cursor-pointer place-items-center bg-transparent text-primary-700 hover:text-primary-500 data-[state=active]:bg-surface-800 data-[state=active]:text-primary-500"
		on:click={() => button.send('ACTIVATE')}
	>
		<svelte:component this={$button.context.component} {...$button.context.props} class="h-6 w-6" />
	</button>
{/if}
