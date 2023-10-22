import { createMachine } from "xstate"
import type { PageServerLoad } from "./$types"
import { Window, type IElement } from "happy-dom"
import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"
import { stringify } from "javascript-stringify"
import { img } from "./img"
const window = new Window()
const document = window.document
document.write(`
<!doctype html>
<html>
  <body>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-typescript.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
  </body>
</html>
`)
await window.happyDOM.whenAsyncComplete()
function renderCode(code: string, lang: "javascript" | "typescript" = "typescript"): Promise<string> {
  code = code.trimStart()
  const tempPre = document.createElement("pre")
  tempPre.className = "line-numbers"
  const tempCode = document.createElement("code")
  tempCode.className = `language-${lang}`
  tempCode.textContent = code
  tempPre.appendChild(tempCode)
  document.body.appendChild(tempPre)
  return new Promise<string>((resolve, reject) => {
    try {
      //@ts-ignore
      window.Prism.highlightElement(tempCode, true, () => {
        console.log("wait result")
        const result = tempCode.getInnerHTML()
        document.body.removeChild(tempPre)
        resolve(result)
      })
    } catch {
      reject("Не получилось)")
    }
  })
}
const machine = createMachine(
  {
    context: {
      count: 0,
    },
    id: "machine",
    entry: {
      type: "inc",
    },
    initial: "started",
    states: {
      started: {
        on: {
          finish: {
            target: "final",
          },
          increment: {
            actions: "inc",
          },
        },
      },
      final: {
        type: "final",
      },
    },
  },
  {
    actions: { inc: ({ context, event }) => {} },
    actors: {},
    guards: {},
    delays: {},
  },
)
const directedGraph: DirectedGraphNode = toDirectedGraph(machine.definition as any)
export const load = (async () => {
  const DirectedGraphEdge = renderCode(`
  type DirectedGraphEdge = {
    id: string
    source: AnyStateNode
    target: AnyStateNode
    label: DirectedGraphLabel
    transition: TransitionDefinition<any, any>
}`)
  const TransitionDefinition = renderCode(`
  export interface TransitionDefinition<TContext, TEvent extends EventObject> extends Omit<TransitionConfig<TContext, TEvent, any>, 'actions'> {
    target: Array<StateNode<TContext, any, TEvent>> | undefined;
    source: StateNode<TContext, any, TEvent>;
    actions: Array<ActionObject<TContext, TEvent>>;
    cond?: Guard<TContext, TEvent>;
    eventType: TEvent['type'] | NullEvent['type'] | '*';
    toJSON: () => {};
}`)
  return {
    streamed: {
      Edge: renderCode(`const childrenFirstEdgeFirst = ${stringify(directedGraph.children[0].edges[0], null, 2)}`, "javascript"),
      DirectedGraphEdge,
      TransitionDefinition,
      img: new Promise<string>((resolve) => {
        setTimeout(() => resolve(img), 7000)
      }),
    },
  }
}) satisfies PageServerLoad
