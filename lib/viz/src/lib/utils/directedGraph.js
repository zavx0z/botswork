/**
 * @typedef { {[key: string]: import("$lib/types").DirectedGraphEdge} } Edges
 * @typedef { {[key: string]: import("$lib/types").DirectedGraphNode} } Nodes
 * @typedef { {edges: Edges; nodes: Nodes; digraph: Nodes} } Graph
 */

/**
 * Выравнивание массива.
 *
 * @template T
 * @param {Array<T | T[]>} array - Массив с элементами или под массивами.
 * @returns {T[]} - Выровненный массив.
 */
export function flatten(array) {
  return Array.prototype.concat.apply([], array)
}

/**
 * Retrieves the children of a given state node.
 *
 * @param {import("@lib/machine").StateNode} stateNode - The state node whose children are to be retrieved.
 * @return {import("@lib/machine").StateNode[]} An array containing the children of the state node.
 */
function getChildren(stateNode) {
  if (!stateNode.states) return []
  const children = Object.keys(stateNode.states).map((key) => stateNode.states[key])
  children.sort((a, b) => b.order - a.order)
  return children
}


/** Converts a state machine or state node to a graph representation.
 * @param {import("@lib/machine").AnyStateMachine} machine - The state machine to convert.
 * @returns {Graph} - An object with the edges and nodes of the graph.
 */
export function convertToGraph(machine) {
  /**@type {Edges} */
  const edges = {}
  /**@type {Nodes} */
  const nodes = {}
  /** Generates a directed graph representation of a state machine or state node.
   * @param {import("@lib/machine").AnyStateNode} stateNode - The state machine or state node to convert to a directed graph.
   * @returns { {} }
  */
  function toDirectedGraph(stateNode) {
    console.log(stateNode)
    const egs = flatten(
      stateNode.transitions.map((t, transitionIndex) => {
        const targets = t.target ? t.target : [stateNode]
        // console.log(stateNode,[stateNode], targets)
        return targets.map((target, targetIndex) => {
          // console.log(target)
          const edge = {
            id: `${stateNode.id}:${transitionIndex}:${targetIndex}`,
            source: stateNode.id,
            target: typeof target === "string" ? target.replace(/^#/, "") : target.id,
            transition: t,
            sections: [],
            label: { text: t.eventType, x: 0, y: 0, width: 0, height: 0 },
          }
          edges[edge.id] = edge
          // console.log(edge)
          return edge
        })
      }),
    )
    const graph = {
      id: stateNode.id,
      stateNode: stateNode,
      children: getChildren(stateNode).map(toDirectedGraph),
      edges: egs,
    }
    // @ts-ignore
    nodes[graph.id] = graph.stateNode
    return graph
  }
  // @ts-ignore
  const digraph = toDirectedGraph(machine)
  return { edges, nodes, digraph }
}
