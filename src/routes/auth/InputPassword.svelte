<script context="module">
	let counter = 0
</script>

<script>
	import VisibleIcon from '~icons/ant-design/eye-invisible-outlined'
	import InVisibleIcon from '~icons/ant-design/eye-outlined'

	export let visible = false
	export let password = ''
	let eltId = 'password_' + counter++
</script>

<fieldset>
	<label for={eltId}>Пароль</label>
	<div class="relative">
		<span class="absolute inset-y-0 right-0 flex items-center pr-2">
			<button
				title={visible ? 'скрыть пароль' : 'показать пароль'}
				on:click|preventDefault={() => (visible = !visible)}
				class="focus:shadow-outline p-1 text-primary-700 transition-colors hover:text-primary-500 focus:outline-none"
			>
				{#if visible}
					<InVisibleIcon class="h-6 w-6 stroke-current" />
				{:else}
					<VisibleIcon class="h-6 w-6 stroke-current" />
				{/if}
			</button>
		</span>
		<input
			id={eltId}
			placeholder="пароль"
			{...{ type: visible ? 'text' : 'password' }}
			name="password"
			bind:value={password}
			required
			class="mb-4"
		/>
	</div>
</fieldset>
