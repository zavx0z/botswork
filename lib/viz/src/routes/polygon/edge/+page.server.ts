import type { PageServerLoad } from "./$types"
import Prism from "prismjs"
import "prism-svelte"
import "prismjs/components/prism-typescript"

export const load = (async () => {
  const code = `
    <script>
        let count = 0;
    </script>

    <button on:click={() => count += 1}>{count}</button>`
  const highlighted = Prism.highlight(code, Prism.languages.svelte, "svelte")
  const TransitionDefinition = `
export interface TransitionDefinition<TContext, TEvent extends EventObject> extends Omit<TransitionConfig<TContext, TEvent, any>, 'actions'> {
  target: Array<StateNode<TContext, any, TEvent>> | undefined;
  source: StateNode<TContext, any, TEvent>;
  actions: Array<ActionObject<TContext, TEvent>>;
  cond?: Guard<TContext, TEvent>;
  eventType: TEvent['type'] | NullEvent['type'] | '*';
  toJSON: () => {};
}`
  const DirectedGraphEdge = `
type DirectedGraphEdge = {
  id: string
  source: AnyStateNode
  target: AnyStateNode
  label: DirectedGraphLabel
  transition: TransitionDefinition<any, any>
}`

  return {
    highlighted,
    DirectedGraphEdge: Prism.highlight(DirectedGraphEdge, Prism.languages.typescript, "typescript"),
    TransitionDefinition: Prism.highlight(TransitionDefinition, Prism.languages.typescript, "typescript"),
  }
}) satisfies PageServerLoad
