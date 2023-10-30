<script lang="ts">
  //@ts-ignore
  import("https://esm.veryfront.com/@metafor/code-viewer@latest/dist/CodeViewer.js")

  let code = `<span class="token keyword">const</span>  customElement<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token literal-property property">tag</span><span class="token operator">:</span> <span class="token string">"code-viewer"</span><span class="token punctuation">,</span>
<details open=""><summary>    <span class="token literal-property property"></span><span class="fl"><span class="token literal-property property">props</span><span class="token operator">:</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
<details open=""><summary>      <span class="token literal-property property"></span><span class="fl"><span class="token literal-property property">hi</span><span class="token operator">:</span> <span class="token punctuation">{</span></span><span class="token punctuation"></span></summary><span class="token punctuation"></span>
        <span class="token literal-property property">reflect</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token literal-property property">type</span><span class="token operator">:</span> <span class="token string">"String"</span><span class="token punctuation">,</span>
        <span class="token literal-property property">attribute</span><span class="token operator">:</span> <span class="token string">"name-attr"</span><span class="token punctuation">,</span>
</details><span class="ll">      </span><span class="token punctuation">}</span><span class="token punctuation">,</span>
</details><span class="ll">    </span><span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span>`

  const useNode = (node: HTMLElement) => {
    node.addEventListener("m4-update", (e) => {
      console.log(e)
    })
  }
</script>

<main>
  <code-viewer use:useNode {code}> </code-viewer>
</main>
