<script lang="ts">
	import { AuthLayout } from '@lib/secure'
	const tabs = [{ title: 'Вход', id: 'login' }]
</script>

<div class="h-1/2" />
<AuthLayout {tabs}>
		<slot />
</AuthLayout>
