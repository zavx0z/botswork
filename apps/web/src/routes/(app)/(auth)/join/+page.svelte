<script lang="ts">
	import { Join } from 'auth/join'
	import type { PageData } from './$types'
	export let data: PageData
</script>

<Join {data} />
