<svelte:options
  customElement={{
    tag: "code-viewer",
    props: {
      hi: {
        reflect: true,
        type: "String",
        attribute: "name-attr",
      },
    },
  }}
/>

<script lang="ts">
  let title: HTMLElement
  setTimeout(() => {
    name = "bad"
    title.dispatchEvent(new CustomEvent("m4-update", { composed: true, detail: "success" }))
  }, 1000)
  export let name = "Cool"
  $: console.log(name)

  function click(e: Event) {
    e.target?.dispatchEvent(new CustomEvent("m4-update", { composed: true, detail: "success" }))
  }
</script>

<h1 bind:this={title} class="color-primary-500">Hello {name}!</h1>
<button on:click={click}>click</button>
<slot />
