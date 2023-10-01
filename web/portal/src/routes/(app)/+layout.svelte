<script lang='ts'>
	import '@lib/theme/app.css'

	import { Canvas } from '@threlte/core'
	import Scene from '$lib/3d/Scene.svelte'
</script>

<div class='fixed inset-0 z-0 h-[calc(100dvh)] w-screen overscroll-none'>
	<Canvas>
		<Scene />
	</Canvas>
</div>
<slot />
