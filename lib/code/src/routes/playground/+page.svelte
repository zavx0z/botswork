<script lang="ts">
  import { Editor } from "@lib/editor"
  export let data
  let content = data.stream.text
  let keydown = false
  let edited = false
  $: if (content && keydown) edited = true

  const saveData = async () => {
    const response = await fetch("/playground", {
      method: "POST",
      body: JSON.stringify({ content }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(response)
    edited = false
    keydown = false
  }
</script>

<svelte:document
  on:keydown={async (e) => {
    keydown = true
    if (e.ctrlKey && e.which == 83) {
      e.preventDefault()
      saveData()
      return false
    }
  }}
/>
<div data-edited={edited} class="h-screen">
  <div class="fixed left-10 top-12 z-50">
    {#if edited}
      <div class="text-error-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48">
          <mask id="ipSUpdateRotation0">
            <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
              <path fill="#fff" stroke="#fff" d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z" />
              <path stroke="#000" d="M33.542 27c-1.274 4.057-5.064 7-9.542 7c-4.477 0-8.268-2.943-9.542-7v6m19.084-18v6c-1.274-4.057-5.064-7-9.542-7c-4.477 0-8.268 2.943-9.542 7" />
            </g>
          </mask>
          <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSUpdateRotation0)" />
        </svg>
      </div>
    {:else}
      <span class="text-success-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 36 36">
          <path fill="currentColor"
            d="M18 2a16 16 0 1 0 16 16A16 16 0 0 0 18 2Zm10.45 10.63L15.31 25.76L7.55 18a1.4 1.4 0 0 1 2-2l5.78 5.78l11.14-11.13a1.4 1.4 0 1 1 2 2Z"
            class="clr-i-solid clr-i-solid-path-1"
          />
          <path fill="none" d="M0 0h36v36H0z" />
        </svg>
      </span>
    {/if}
  </div>
  <Editor bind:content language={"html"} minimapEnabled />
</div>
