<script>
	import ActivityButtons from '../components/ActivityButtons.svelte'

	export let activity

	const { top, bottom } = $activity.context
</script>

<nav class="flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900">
	<div>
		{#each top as button (button.id)}
			<ActivityButtons {button} />
		{/each}
	</div>
	<div>
		{#each bottom as button (button.id)}
			<ActivityButtons {button} />
		{/each}
	</div>
</nav>
