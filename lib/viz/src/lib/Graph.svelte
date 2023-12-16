<script lang="ts">
  import type { ElkEdgeSection, ElkNode } from "elkjs"
  import type { StateNode, AnyStateMachine, AnyStateNode, AnyInterpreter } from "@lib/machine"
  import type { StateElkNode, StateElkEdge, DirectedGraphNode, DirectedGraphEdge } from "./types"

  import ELK from "elkjs"
  import { onMount, tick } from "svelte"

  import State from "./State.svelte"
  import Edge from "./Edge.svelte"
  import Transition from "./Transition.svelte"

  export let actor: AnyInterpreter

  export let edges: { [key: string]: DirectedGraphEdge } = {}
  export let nodes: { [key: string]: AnyStateNode } = {}
  export let digraph: DirectedGraphNode

  const elk = new ELK({ defaultLayoutOptions: {} })
  /** Elk-объект узла https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html
   * @param {DirectedGraphNode} node
   * @param {RelativeNodeEdgeMap} rMap
   * @returns {StateElkNode}
   */
  function getElkChild(node: DirectedGraphNode, rMap: RelativeNodeEdgeMap): StateElkNode {
    const layout = nodes[node.id].meta.layout // Достаем информацию о разметке текущего узла
    const edges = rMap[0].get(node.stateNode) || [] // Получаем исходящие грани текущего узла из карты относительных граней
    return {
      id: node.id,
      // Устанавливаем ширину и высоту узла, если у него нет детей
      ...(node.children.length ? undefined : { width: layout.width, height: layout.height }),
      children: node.children.map((childNode) => getElkChild(childNode, rMap)),
      edges: edges.map((edge) => getElkEdge(edge.id)),
      layoutOptions: {
        "elk.padding": `[top=${(layout.height || 0) + 30}, left=30, right=30, bottom=30]`, // Добавляем отступы вокруг узла
        hierarchyHandling: "INCLUDE_CHILDREN", // Включаем дочерние узлы в иерархию
      },
      node, // Сохраняем ссылку на исходный узел
      // absolutePosition: { x: 0, y: 0 }, Задаем начальную абсолютную позицию узла (относительно родителя)
    }
  }
  /** Elk-объект грани
   * @param {string} edgeID
   */
  const getElkEdge = (edgeID: string) => {
    const edge = edges[edgeID]
    return {
      id: edgeID,
      // Устанавливаем источник и цель дуги
      sources: [edge.source],
      targets: [edge.target],
      // Добавляем метку на дугу с параметрами разметки
      labels: [
        {
          id: edgeID + "--label", // Уникальный ID метки
          width: edge.label.width, // Ширина метки
          height: edge.label.height, // Высота метки
          text: edge.label.text || "always", // Текст метки
          layoutOptions: {
            "edgeLabels.inline": "true", // встроенная метка
            "edgeLabels.placement": "CENTER", // расположение по центру
          },
        },
      ],
      edge, // Сохраняем ссылку на исходную дугу
      sections: [], // Пока не задаем секции дуги (могут быть добавлены позже)
    }
  }

  type RelativeNodeEdgeMap = [Map<StateNode | undefined, DirectedGraphEdge[]>, Map<string, StateNode | undefined>]

  function getRelativeNodeEdgeMap(): RelativeNodeEdgeMap {
    // Создаем две пустые карты: карту узлов и карту дуг
    const map: RelativeNodeEdgeMap[0] = new Map()
    const edgeMap: RelativeNodeEdgeMap[1] = new Map()
    // Функция для поиска наименьшего общего предка (НСП) двух узлов
    const getLCA = (source: StateNode, target: StateNode): StateNode | undefined => {
      // 1. Само-переход. Если узлы совпадают, возвращаем их родителя
      if (source === target) return source.parent
      // 2. Общий предок
      const set = new Set() // Сбор всех предков узла источника
      let node
      node = source.parent
      while (node) {
        set.add(node.id)
        node = node.parent
      }
      node = target // Поиск ближайшего общего предка
      while (node) {
        if (set.has(node.id)) return node // Если предок второго узла найден в множестве, возвращаем его
        node = node.parent // Переходим к следующему предку узла назначения
      }
      // 3. Корневая нода
      return source
    }
    // Проходимся по всем дугам и записываем их в карты
    Object.values(edges).forEach((edge) => {
      const lca = getLCA(nodes[edge.source], nodes[edge.target]) // Находим ближайшего общего предка узлов источника перехода
      if (!map.has(lca)) map.set(lca, []) // Если общего предка нет в карте, добавляем в виде ключа ноду и в виде значения пустой массив
      map.get(lca)!.push(edge) // Добавляем переход в список ноды предка
      edgeMap.set(edge.id, lca) // Записываем связь между идентификатором перехода и предка
    })
    return [map, edgeMap]
  }

  async function getElkGraph(digraph: DirectedGraphNode): Promise<ElkNode> {
    const rMap = getRelativeNodeEdgeMap()
    const rootEdges = rMap[0].get(undefined) || []
    const elkNode: ElkNode = {
      id: "root",
      edges: rootEdges.map((edge) => getElkEdge(edge.id)), // Само-переходы машины
      children: [getElkChild(digraph, rMap)],
      layoutOptions: {
        "elk.hierarchyHandling": "INCLUDE_CHILDREN",
        "elk.algorithm": "layered",
        "elk.layered.crossingMinimization.semiInteractive": "true",
      },
    }
    const layoutElkNode = await elk.layout(elkNode)
    const stateNodeToElkNodeMap = new Map<StateNode, StateElkNode>()

    const setEdgeLayout = (edge: StateElkEdge) => {
      const lca = rMap[1].get(edge.id)

      const elkLca = lca && stateNodeToElkNodeMap.get(lca)!
      edges[edge.id].label.x = elkLca?.x || 0
      edges[edge.id].label.y = elkLca?.y || 0

      if (edge.sections) {
        const translatedSections: ElkEdgeSection[] | undefined = elkLca
          ? edge.sections.map((section) => ({
              ...section,
              startPoint: {
                x: section.startPoint.x + elkLca.absolutePosition.x,
                y: section.startPoint.y + elkLca.absolutePosition.y,
              },
              endPoint: {
                x: section.endPoint.x + elkLca.absolutePosition.x,
                y: section.endPoint.y + elkLca.absolutePosition.y,
              },
              bendPoints: section.bendPoints?.map((bendPoint) => {
                return {
                  x: bendPoint.x + elkLca.absolutePosition.x,
                  y: bendPoint.y + elkLca.absolutePosition.y,
                }
              }),
            }))
          : edge.sections
        if (translatedSections) edge.edge.sections = translatedSections
      }

      edge.edge.label.x = (edge.labels?.[0].x || 0) + (elkLca?.absolutePosition.x || 0)
      edge.edge.label.y = (edge.labels?.[0].y || 0) + (elkLca?.absolutePosition.y || 0)
    }
    const setLayout = (elkNode: StateElkNode, parent: StateElkNode | undefined) => {
      stateNodeToElkNodeMap.set(elkNode.node.stateNode, elkNode)
      elkNode.absolutePosition = {
        x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
        y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
      }
      elkNode.node.stateNode.meta = {
        layout: {
          width: elkNode.width!,
          height: elkNode.height!,
          x: elkNode.x!,
          y: elkNode.y!,
        },
      }
      nodes[elkNode.id].meta = {
        layout: {
          width: elkNode.width!,
          height: elkNode.height!,
          x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
          y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
        },
      }
      elkNode.edges?.forEach((edge) => {
        setEdgeLayout(edge)
      })
      elkNode.children?.forEach((cn) => {
        setLayout(cn as StateElkNode, elkNode)
      })
    }
    ;(layoutElkNode.edges as StateElkEdge[])?.forEach(setEdgeLayout)
    setLayout(layoutElkNode.children![0] as StateElkNode, undefined)
    return layoutElkNode.children![0]
  }

  export function flatten<T>(array: Array<T | T[]>): T[] {
    return ([] as T[]).concat(...array)
  }

  function getChildren(stateNode: StateNode): StateNode[] {
    if (!stateNode.states) return []
    const children = Object.keys(stateNode.states).map((key) => stateNode.states[key])
    children.sort((a, b) => b.order - a.order)
    return children
  }

  function toDirectedGraph(stateNode: AnyStateNode | AnyStateMachine): DirectedGraphNode {
    const egs: DirectedGraphEdge[] = flatten(
      stateNode.transitions.map((t, transitionIndex) => {
        const targets = t.target ? t.target : [stateNode]
        // console.log(t, targets)
        return targets.map((target, targetIndex) => {
          const edge: DirectedGraphEdge = {
            id: `${stateNode.id}:${transitionIndex}:${targetIndex}`,
            source: stateNode.id,
            target: target.id,
            transition: t,
            sections: [],
            label: { text: t.eventType, x: 0, y: 0, width: 0, height: 0 },
          }
          // edges[edge.id] = edge
          // console.log(edge)
          return edge
        })
      }),
    )
    const graph: DirectedGraphNode = {
      id: stateNode.id,
      stateNode: stateNode as AnyStateNode,
      children: getChildren(stateNode as AnyStateNode).map(toDirectedGraph),
      edges: egs,
    }
    nodes[graph.id] = graph.stateNode
    // console.log(graph.stateNode)
    return graph
  }

  onMount(async () => {
    const machine = actor.getSnapshot().context.machine
    let d = toDirectedGraph(machine)
    await tick()
    // console.log(digraph)
    // console.log(nodes)
    const elkg = await getElkGraph(d)
    // const elkg = await getElkGraph(digraph)
    // console.log(elkg)
  })

  let activeIds = actor.getSnapshot().context.state.configuration.map((i: AnyStateNode) => i.id)
  let previewIds: string[] = []
  onMount(() => {
    const { unsubscribe } = actor.subscribe((state) => {
      if (state.changed) {
        previewIds = state.context.previewEvent ? state.context.machine.transition(state.context.state, { type: state.context.previewEvent }).configuration.map((i: AnyStateNode) => i.id) : []
        activeIds = state.context.state.configuration.map((i: AnyStateNode) => i.id)
      }
    })
    return () => {
      unsubscribe()
    }
  })
</script>

{#each Object.entries(nodes) as [id, node] (id)}
  <State {node} {previewIds} {activeIds} />
{/each}
<svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
  {#each Object.entries(edges) as [id, edge], order (id)}
    <Edge {edge} {nodes} {activeIds} {order} />
  {/each}
</svg>
{#each Object.entries(edges) as [id, edge] (id)}
  <Transition {edge} {activeIds} {actor} />
{/each}
