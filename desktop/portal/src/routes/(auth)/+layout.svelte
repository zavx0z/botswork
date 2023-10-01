<script lang="ts">
	import { AuthLayout } from '@module/secure'
	const tabs = [{ title: 'Вход', id: 'login' }]
</script>

<div class="h-1/2" />
<AuthLayout {tabs}>
		<slot />
</AuthLayout>
