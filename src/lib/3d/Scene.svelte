<script lang='ts'>
	import { T, useFrame } from '@threlte/core'
	import { ContactShadows, Float, HTML, OrbitControls } from '@threlte/extras'
	import {
		BoxGeometry,
		Color,
		IcosahedronGeometry,
		MeshStandardMaterial,
		TorusKnotGeometry
	} from 'three'

	let pos = {
		x: 0
	}
	useFrame(() => {
		pos.x = Math.sin(Date.now() / 2000)
	})
</script>
<T.PerspectiveCamera
	makeDefault
	position={[-10, 10, 10]}
	fov={25}
>
	<OrbitControls
		enabled={true}
		autoRotate
		autoRotateSpeed={0.5}
		target.y={1}
	/>
</T.PerspectiveCamera>
<T.DirectionalLight
	intensity={0.8}
	position.x={5}
	position.y={10}
/>
<T.AmbientLight intensity={0.2} />
<T.GridHelper
	args={[10, 10]}
	position.y={-0.001}
/>
<ContactShadows
	scale={10}
	blur={2}
	far={2.5}
	opacity={0.5}
/>
<Float
	floatIntensity={1}
	floatingRange={[0, 1]}
>
	<T.Mesh
		position.y={1.2}
		position.z={-0.75}
		geometry={new BoxGeometry(1, 1, 1)}
		material={new MeshStandardMaterial({
      color: new Color('#87ceeb')
    })}
	/>
</Float>
<Float
	floatIntensity={1}
	floatingRange={[0, 1]}
>
	<T.Mesh
		position={[1.2, 1.5, 0.75]}
		rotation.x={5}
		rotation.y={71}
		geometry={new TorusKnotGeometry(0.5, 0.15, 100, 12, 2, 3)}
		material={new MeshStandardMaterial({
      color: new Color('#BFC8D1')
    })}
	/>
</Float>
<Float
	floatIntensity={1}
	floatingRange={[0, 1]}
>
	<T.Mesh
		position={[-1.4, 1.5, 0.75]}
		rotation={[-5, 128, 10]}
		geometry={new IcosahedronGeometry(1, 0)}
		material={new MeshStandardMaterial({
      color: new Color('#47bd74')
    })}
	/>
</Float>
<Float
	floatIntensity={[1, 1, 0]}
	floatingRange={[[1, -1],[4, 4.4], [0,0]]}
	speed={1}
>
	<HTML
		pointerEvents='none'
		center
	>
	<h1 class='text-3xl font-bold text-error-500 w-96 text-center'>
		Катенька, я тебя люблю!
	</h1>
	</HTML>
</Float>