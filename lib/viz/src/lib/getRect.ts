import { browser } from "$app/environment"
import type { Edge } from "./utils"

type RectListener = (rect: DOMRect) => void
const rectMap: Map<string, { rect?: DOMRect; listeners: Set<RectListener> }> = new Map()
if (browser) {
  ;(window as any).rectMap = rectMap
}
export const getRect = (id: string): DOMRect | undefined => rectMap.get(id)?.rect

export const readRect = (id: string): DOMRect | undefined => {
  const el = document.querySelector(`[data-rect="${id}"]`)
  if (el) setRect(el as HTMLElement, id)
  return getRect(id)
}

export const setRect = (el: HTMLElement, id: string) => {
  el.dataset.rect = id
  const currentConfig = rectMap.get(id)
  const rect = el.getBoundingClientRect()
  const nextConfig = { rect, listeners: currentConfig?.listeners ?? new Set() }
  rectMap.set(id, nextConfig)
  nextConfig.listeners.forEach((listener) => listener(rect))
}

export const onRect = (id: string, listener: RectListener) => {
  let config = rectMap.get(id)
  if (!config) {
    config = { listeners: new Set() }
    rectMap.set(id, config)
  }
  config.listeners.add(listener)
  config.rect && listener(config.rect)
}

export const useGetRect = (node: SVGLineElement, options: { edge: Edge<any, any, any>; idx: number }) => {
  const { edge, idx } = options

  let sourceRect = getRect(`${edge.source.id}`)
  const edgeRect = getRect(`${edge.source.id}:${idx}`)
  const targetRect = getRect(`${edge.target.id}`)

  node.setAttribute("x1", `${sourceRect?.left}`)
  node.setAttribute("y1", `${sourceRect?.top}`)
  node.setAttribute("x2", `${targetRect?.left}`)
  node.setAttribute("y2", `${targetRect?.top}`)

  let af: number
  const getNextRect = () => {
    const nextRect = readRect(`${edge.source.id}`)
    const targetRect = readRect(`${edge.target.id}`)
      node.setAttribute("x1", `${nextRect?.left}`)
      node.setAttribute("y1", `${nextRect?.top}`)
      node.setAttribute("x2", `${targetRect?.left}`)
      node.setAttribute("y2", `${targetRect?.top}`)
    af = requestAnimationFrame(getNextRect)
  }
  af = requestAnimationFrame(getNextRect)

  return {
    destroy() {
      cancelAnimationFrame(af)
    },
  }
}

// export function useGetRect(id: string) {
//   const [rect, setRect] = useState(getRect(id))

//   useEffect(() => {
//     let af: number
//     const getNextRect = () => {
//       const nextRect = readRect(id)
//       if (rect?.left !== nextRect?.left || rect?.top !== nextRect?.top) {
//         setRect(nextRect)
//       }
//       af = requestAnimationFrame(getNextRect)
//     }
//     af = requestAnimationFrame(getNextRect)

//     return () => {
//       cancelAnimationFrame(af)
//     }
//   }, [id])

//   return rect
// }
