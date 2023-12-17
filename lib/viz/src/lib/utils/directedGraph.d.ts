type NodeState = {
  id: string
  entry: string[]
  exit: string[]
  invoke: string[]
  history: string | boolean | undefined
  initial: string | number | symbol | undefined
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
  parent: string | undefined
  tags: string[]
  children: string[]
}
