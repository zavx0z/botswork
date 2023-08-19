<script lang="ts">
	import "config/tailwindCSS"
	import '../../component.css'
	import "svelte-ripple-action/ripple.css"
	import { Canvas } from '@threlte/core'
	import Scene from '$lib/3d/Scene.svelte'
</script>

<div class="fixed inset-0 z-0 h-[calc(100dvh)] w-screen overscroll-none">
	<Canvas>
		<Scene />
	</Canvas>
</div>
<slot />
