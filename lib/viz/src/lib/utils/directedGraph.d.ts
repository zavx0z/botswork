type GraphLayout = {
  width: number
  height: number
  x: number
  y: number
}

type NodesState = Map<string, NodeState>
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
    layout: GraphLayout
  }
  order: number
  parent: string | undefined
  tags: string[]
  children: string[]
}
type EdgesTransition = Map<string, EdgeTransition>
type EdgeTransition = {
  id: string
  source: string
  target: string
  label: GraphLayout & { text: string }
  transition: import("@lib/machine").TransitionDefinition<any, any>
  sections: import("elkjs").ElkEdgeSection[]
}
