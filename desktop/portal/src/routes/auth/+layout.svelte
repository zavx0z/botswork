<script lang="ts">
	import { Modal } from 'ui/modal'
	const tabs = [{ title: 'Вход', id: 'login' }]
</script>

<div class="h-1/2" />
<Modal>
	<div class="bg-surface-800 relative flex h-96 w-96 flex-col content-center justify-between rounded-md p-8 shadow-md gap-4">
		<slot />
	</div>
</Modal>
