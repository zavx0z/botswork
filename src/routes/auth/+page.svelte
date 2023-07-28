<script lang="ts">
	import X from '~icons/lucide/x'
	import Login from './login/+page.svelte'
	import Reset from './reset/+page.svelte'
	import Join from './join/+page.svelte'
	import { createTabs } from '@melt-ui/svelte'
	import type { PageData } from './$types'

	const {
		root: root,
		list: tabsList,
		content: tabsContent,
		trigger: tabsTrigger
	} = createTabs({ value: 'login', orientation: 'horizontal' })
	export let data: PageData

	const tabs = [
		{ title: 'Вход', id: 'login' },
		{ title: 'Регистрация', id: 'join' },
		{ title: 'Сброс', id: 'reset' }
	]
</script>

<div class="fixed z-50 inset-0 flex flex-col items-center justify-center bg-surface-900/40 backdrop-blur-3xl">
	<div melt={$root} class="relative flex h-96 w-96 flex-col content-center rounded-md bg-surface-800 p-4 shadow-md">
		<div aria-label="Authentication" melt={$tabsList} class="flex w-full justify-around">
			{#each tabs as tab (tab.id)}
				<button
					melt={$tabsTrigger(tab.id)}
					class="flex h-11 flex-1 cursor-default items-center justify-center rounded-none rounded-t px-4 leading-none text-primary-900 outline-none focus-visible:ring-1 focus-visible:ring-surface-500 data-[state=active]:text-primary-600 data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current"
				>
					{tab.title}
				</button>
			{/each}
		</div>
		<div
			melt={$tabsContent('login')}
			class="h-full rounded-md p-4 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-surface-500"
		>
			<Login bind:data />
		</div>
		<div
			melt={$tabsContent('join')}
			class="h-full rounded-md p-4 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-surface-500"
		>
			<Join bind:data />
		</div>
		<div
			melt={$tabsContent('reset')}
			class="h-full rounded-md p-4 outline-none transition-colors focus-visible:ring-1 focus-visible:ring-surface-500"
		>
			<Reset bind:data />
		</div>
	</div>
	<a
		href="/"
		class="fixed right-2 top-2 flex h-10 w-10 items-center justify-center rounded-3xl bg-surface-900 text-primary-500 hover:bg-surface-800 hover:text-primary-400"
	>
		<X class="stroke-current " />
	</a>
</div>