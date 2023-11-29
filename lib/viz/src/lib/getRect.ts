import { browser } from "$app/environment"

export const rectMap: Map<string, DOMRect> = new Map()
type RectListener = (rect: DOMRect | undefined) => void
const rectListenersMap = new Map<string, Set<RectListener>>()
if (browser) {
  ;(window as any).rectMap = rectMap

  const run = () => {
    document.querySelectorAll("[data-rect]").forEach((el) => {
      const rectId = (el as HTMLElement).dataset.rect!
      // console.log(rectId)
      // readRect(rectId)
    })
    requestAnimationFrame(run)
  }
  requestAnimationFrame(run)
}
export const getRect = (id: string): DOMRect | undefined => rectMap.get(id)

export const readRect = (id: string): DOMRect | undefined => {
  const el = document.querySelector(`[data-rect="${id}"]`)
  if (el) setRect(el as HTMLElement, id)
  return getRect(id)
}

export function rectsEqual(a: DOMRect, b: DOMRect): boolean {
  return a.left === b.left && a.right === b.right && a.top === b.top && a.bottom === b.bottom
}

export const setRect = (el: HTMLElement, id: string) => {
  const prevRect = getRect(id)
  el.dataset.rect = id
  const boundingClientRect = el.getBoundingClientRect()
  rectMap.set(id, boundingClientRect)
  if (!prevRect || !rectsEqual(prevRect, boundingClientRect)) {
    rectListenersMap.get(id)?.forEach((listener) => listener(boundingClientRect))
  }
}

export const deleteRect = (id: string) => {
  rectMap.delete(id)
  rectListenersMap.get(id)?.forEach((listener) => listener(undefined))
}

export const onRect = (id: string, listener: RectListener) => {
  let set = rectListenersMap.get(id)
  if (!set) {
    set = new Set()
    rectListenersMap.set(id, set)
  }
  set.add(listener)
  const currentRect = rectMap.get(id)
  if (currentRect) listener(currentRect)
  return {
    unsubscribe: () => {
      rectListenersMap.get(id)?.delete(listener)
    },
  }
}
