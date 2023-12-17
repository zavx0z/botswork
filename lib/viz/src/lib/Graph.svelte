<script lang="ts">
  import type { ElkEdgeSection, ElkExtendedEdge, ElkNode } from "elkjs"
  import type { AnyStateNode, AnyInterpreter } from "@lib/machine"
  import type { StateElkNode, StateElkEdge, NodeState, RelativeNodeEdgeMap, GraphEdge } from "./types"
  import ELK from "elkjs"
  import { onMount, tick } from "svelte"

  import State from "./State.svelte"
  import Edge from "./Edge.svelte"
  import Transition from "./Transition.svelte"

  export let actor: AnyInterpreter

  export let edges: { [key: string]: GraphEdge } = {}
  export let nodes: { [key: string]: NodeState } = {}
  export let rootID: string

  const elk = new ELK()
  /** Elk-объект узла https://eclipse.dev/elk/documentation/tooldevelopers/graphdatastructure/jsonformat.html
   * @param {string} nodeID
   * @param {RelativeNodeEdgeMap} rMap
   * @returns {StateElkNode}
   */
  function getElkChild(nodeID: string, rMap: RelativeNodeEdgeMap): StateElkNode {
    const node = nodes[nodeID]
    const layout = node.meta.layout // Достаем информацию о разметке текущего узла
    const rEdges = rMap[0].get(nodeID) || [] // Получаем исходящие грани текущего узла из карты относительных граней
    const states = Object.values(node.states).toSorted((a, b) => b.order - a.order)
    return {
      id: nodeID,
      ...(states.length ? undefined : { width: layout.width, height: layout.height }),
      children: states.map((childNode) => getElkChild(childNode.id, rMap)),
      edges: rEdges.map((edgeID) => getElkEdge(edgeID)),
      layoutOptions: {
        "elk.padding": `[top=${(layout.height || 0) + 30}, left=30, right=30, bottom=30]`, // Добавляем отступы вокруг узла
        hierarchyHandling: "INCLUDE_CHILDREN", // Включаем дочерние узлы в иерархию
      },
      absolutePosition: { x: 0, y: 0 },
      node, // Сохраняем ссылку на исходный узел
    }
  }
  /** Elk-объект грани
   * @param {string} edgeID
   */
  const getElkEdge = (edgeID: string): ElkExtendedEdge & { edge: GraphEdge } => {
    const edge = edges[edgeID]
    return {
      id: edgeID,
      sources: [edge.source],
      targets: [edge.target],
      labels: [
        {
          id: edgeID + "--label",
          width: edge.label.width,
          height: edge.label.height,
          text: edge.label.text || "always",
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

  function getRelativeNodeEdgeMap(): RelativeNodeEdgeMap {
    // Создаем две пустые карты: карту узлов и карту дуг
    const map: RelativeNodeEdgeMap[0] = new Map()
    const edgeMap: RelativeNodeEdgeMap[1] = new Map()

    /**Поиск наименьшего общего предка*/
    const getLCA = (sourceID: string, targetID: string): string | undefined => {
      // 1. Само-переход. Если узлы совпадают, возвращаем их родителя
      if (sourceID === targetID) return nodes[sourceID].parent
      // 2. Общий предок
      const set = new Set() // Сбор всех предков узла источника
      let node
      node = nodes[sourceID].parent
      while (node) {
        set.add(node)
        node = nodes[node].parent
      }
      node = targetID // Поиск ближайшего общего предка
      while (node) {
        if (set.has(node)) return node // Если предок второго узла найден в множестве, возвращаем его
        node = nodes[node].parent // Переходим к следующему предку узла назначения
      }
      // 3. Корневая нода
      return sourceID
    }
    // Проходимся по всем дугам и записываем их в карты
    Object.values(edges).forEach((edge) => {
      const lca = getLCA(edge.source, edge.target) // Находим ближайшего общего предка узлов источника перехода
      if (!map.has(lca)) map.set(lca, []) // Если общего предка нет в карте, добавляем в виде ключа ноду и в виде значения пустой массив
      map.get(lca)!.push(edge.id) // Добавляем переход в список ноды предка
      edgeMap.set(edge.id, lca) // Записываем связь между идентификатором перехода и предка
    })
    return [map, edgeMap]
  }

  async function getElkGraph(rootID: string): Promise<void> {
    const rMap = getRelativeNodeEdgeMap()
    const rootEdges = rMap[0].get(undefined) || []
    const layoutElkNode = await elk.layout({
      id: "root",
      edges: rootEdges.map((edgeID) => getElkEdge(edgeID)), // Само-переходы машины
      children: [getElkChild(rootID, rMap)],
      layoutOptions: {
        "elk.hierarchyHandling": "INCLUDE_CHILDREN",
        "elk.algorithm": "layered",
        "elk.layered.crossingMinimization.semiInteractive": "true",
      },
    })
    const stateNodeToElkNodeMap = new Map<string, StateElkNode>()
    const setEdgeLayout = (edge: StateElkEdge) => {
      const lca = rMap[1].get(edge.id)
      const elkLca = lca && stateNodeToElkNodeMap.get(lca)!
      edges[edge.id].label.x = elkLca?.x || 0
      edges[edge.id].label.y = elkLca?.y || 0
      if (edge.sections) {
        const translatedSections: ElkEdgeSection[] = elkLca
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
      stateNodeToElkNodeMap.set(elkNode.id, elkNode)
      elkNode.absolutePosition = {
        x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
        y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
      }
      nodes[elkNode.id].meta = {
        layout: {
          width: elkNode.width!,
          height: elkNode.height!,
          x: (parent?.absolutePosition.x ?? 0) + elkNode.x!,
          y: (parent?.absolutePosition.y ?? 0) + elkNode.y!,
        },
      }
      elkNode.edges?.forEach(setEdgeLayout)
      elkNode.children?.forEach((cn) => setLayout(cn as StateElkNode, elkNode))
    }
    layoutElkNode.edges.forEach(setEdgeLayout)
    setLayout(layoutElkNode.children![0] as StateElkNode, undefined)
  }
  onMount(async () => {
    await tick()
    await getElkGraph(rootID)
  })
  let previewIds: string[] = []
  let activeIds = actor.getSnapshot().context.state.configuration.map((i: AnyStateNode) => i.id)
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
{#each Object.entries(edges) as [id, edge] (id)}
  <Transition {edge} {activeIds} {actor} />
{/each}
<svg class="pointer-events-none fixed left-0 top-0 h-screen w-screen overflow-visible">
  {#each Object.entries(edges) as [id, edge] (id)}
    <Edge {edge} {nodes} {activeIds} />
  {/each}
</svg>
