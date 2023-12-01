<script lang="ts">
  const content = (element: HTMLElement) => {
    const resizeObserver = new ResizeObserver((el) => {
      const width = el[0].contentRect.width
      const parentWidth = element.parentElement?.offsetWidth
      if (parentWidth) {
        const scale = (parentWidth - 16) / width
        element.style.transform = `scale(${scale})`
      }
      element.classList.remove("invisible")
    })
    resizeObserver.observe(element)
    return {
      update() {},
      destroy() {
        resizeObserver.disconnect()
      },
    }
  }
</script>

<div aria-label="предпросмотр" class="overflow-y-auto overflow-x-hidden rounded-sm bg-surface-900 p-1 shadow-inner shadow-slate-900">
  <div class="invisible h-2 min-h-fit min-w-fit origin-top-left" use:content>
    <slot />
  </div>
</div>
