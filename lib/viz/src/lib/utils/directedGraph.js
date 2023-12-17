/**
 * @typedef { {[key: string]: import("$lib/types").DirectedGraphEdge} } Edges
 * @typedef { {[key: string]: NodeState} } Nodes
 */

/** Выравнивание массива.
 * @template T
 * @param {Array<T | T[]>} array - Массив с элементами или с вложенными массивами.
 * @returns {T[]} - Одноуровневый массив.
 */
const flatten = (array) => Array.prototype.concat.apply([], array)

/** Converts a state machine or state node to a graph representation.
 * @param {import("@lib/machine").AnyStateMachine} machine - The state machine to convert.
 * @returns {{edges: Edges; nodes: Nodes}} - Ноды и грани
 */
export function convertToGraph(machine) {
  /**@type {Edges} */ const edges = {}
  /**@type {Nodes} */ const nodes = {}

  /** Generates a directed graph representation of a state machine or state node.
   * @param {import("$lib/types").NodeState} stateNode - The state machine or state node to convert to a directed graph.
   * @param {string}  parentID - parent state node id
  */
  function toDirectedGraph(stateNode, parentID) {
    flatten(stateNode.transitions.map((t, transitionIndex) => {
      const targets = t.target ? t.target : [stateNode]
      targets.map((target, targetIndex) => {
        const edgeID = `${stateNode.id}:${transitionIndex}:${targetIndex}`
        edges[edgeID] = {
          id: edgeID,
          source: stateNode.id,
          target: typeof target === "string" ? target.replace(/^#/, "") : target.id,
          transition: t,
          sections: [],
          label: { text: t.eventType, x: 0, y: 0, width: 0, height: 0 },
        }
      })
    }),
    )
    const { states, on, transitions, predictableActionArguments, activities, ...other } = stateNode
    console.log(activities)
    nodes[stateNode.id] = {
      ...other,
      children: Object.values(states).toSorted((a, b) => b.order - a.order).map(state => state.id),
      entry: stateNode.entry.map(entry => entry.type),
      exit: stateNode.exit.map(exit => exit.type),
      invoke: stateNode.invoke.map(invoke => invoke.src.type),
      parent: parentID,
      meta: {
        layout: {
          width: 0,
          height: 0,
          x: 0,
          y: 0
        }
      }
    }
    Object.values(stateNode.states).map((state) => toDirectedGraph(state, stateNode.id))
  }
  toDirectedGraph(machine)
  return { edges, nodes }
}
