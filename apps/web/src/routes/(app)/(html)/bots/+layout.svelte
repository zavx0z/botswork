<script lang="ts">
	import stateMachine from "../../../../xstate/stateMachine"

    const routeRoot = stateMachine.children.get('route-root')
    const sideBarRight = $routeRoot.children['sideBar-right']
    const sideBarLeft = $routeRoot.children['sideBar-left']
</script>

<div class="fixed inset-y-0 left-12 z-40 w-80 flex-row bg-surface-800/90 backdrop-blur-sm" />
<slot />
{#if $sideBarRight.matches('opened')}
	<nav
		class="fixed inset-y-0 right-0 flex-row z-{$sideBarLeft.context
			.zIndex} flex h-full w-12 flex-col items-center justify-between justify-items-center bg-surface-900"
	/>
	<div
		class="fixed inset-y-0 right-12 w-80 flex-row z-{$sideBarRight.context.zIndex} bg-surface-800/90 backdrop-blur-sm"
	/>
{/if}
