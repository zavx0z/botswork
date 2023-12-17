type NodeState = {
  id: string
  activates: []
  entry: string[]
  exit: string[]
  invoke: string[]
  history: boolean
  initial: string
  key: string
  type: string
  meta: {
    layout: {
      width: number
      height: number
      x: number
      y: number
    }
  }
  order: number
  parent: string
  tags: string[]
  children: string[]
}