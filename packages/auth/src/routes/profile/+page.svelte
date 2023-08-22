<script lang="ts">
	import type { PageData } from './$types'
	export let data: PageData
</script>

<div class="grid grid-cols-2 gap-2">
	<div class="grid grid-rows-2 place-items-center">
		<img
			class="h-20 rounded-full"
			src={data.session?.user.user_metadata.avatar_url}
			alt={data.session?.user.user_metadata.full_name}
		/>
		<h1 class="text-surface-400 text-lg font-bold">{data.session?.user.user_metadata.name}</h1>
	</div>
	<div>
		<h1 class="text-surface-400 text-lg font-bold">{data.session?.user.email}</h1>
		<h1 class="text-surface-400 text-lg font-bold">phone: {data.session?.user.phone}</h1>
		<h1 class="text-surface-400 text-lg font-bold">provider: {data.session?.user.app_metadata.provider}</h1>
		<h1 class="text-surface-400 text-lg font-bold">
			email_verified: {data.session?.user.user_metadata.email_verified}
		</h1>
	</div>
</div>
