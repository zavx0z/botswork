import { createMachine } from "xstate"
import type { PageServerLoad } from "./$types"
import { Window } from "happy-dom"
import { toDirectedGraph, type DirectedGraphNode } from "@xstate/graph"
import { stringify } from "javascript-stringify"
import { img } from "./img"

const window = new Window()
const document = window.document

document.write(`<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/plugins/autoloader/prism-autoloader.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-typescript.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/components/prism-javascript.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/plugins/line-numbers/prism-line-numbers.min.js"></script>
    <script src="https://unpkg.com/prismjs@1.29.0/plugins/keep-markup/prism-keep-markup.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/prism-js-fold@1.0.1/prism-js-fold.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.23.0/themes/prism.css" integrity="sha256-h/qtq9bUnXbOOwP4EcbLtYM9Mk3iQQcHZAZ+Jz5y0WQ=" crossorigin="anonymous" />
    <link href="https://cdn.jsdelivr.net/npm/prism-js-fold@1.0.1/prism-js-fold.css" rel="stylesheet" />
  </head>
  <body>
  </body>
  </html>
`)

await window.happyDOM.whenAsyncComplete()
//@ts-ignore
window.Prism.manual = true

function renderCode(code: string, lang: "javascript" | "typescript" = "typescript"): Promise<string> {
  code = code.trimStart()
  const tempPre = document.createElement("pre")
  tempPre.className = `line-numbers language-${lang}`
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
        setTimeout(() => {
          const result = tempCode.getInnerHTML()
          document.body.removeChild(tempPre)
          resolve(result)
        }, 2000)
      })
    } catch (err) {
      console.log(err)
      reject("😒")
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
      img: new Promise<string>((resolve) => setTimeout(() => resolve(img), 0)),
    },
  }
}) satisfies PageServerLoad
