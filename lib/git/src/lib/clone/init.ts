import { assign, createMachine, sendParent, setup } from "xstate"

const countingMachine = setup({
  actions: {
    progress_update: assign(({ event }) => ({ progress: { total: event.params.total, completed: event.params.completed } })),
  },
  guards: {
    isComplete: ({ context }) => {
      if (context.progress.completed && context.progress.total) {
        return context.progress.completed === context.progress.total
      }
      return false
    },
  },
}).createMachine({
  context: { progress: { completed: 0, total: 0 } },
  initial: "processing",
  types: {} as {
    events: { type: "progress.update"; params: { completed: number; total: number } }
  },
  states: {
    processing: {
      always: { target: "complete", guard: "isComplete" },
      on: {
        "progress.update": {
          actions: [
            "progress_update",
            ({ event, self, system }) => {
              console.log(self.id, event)
            },
          ],
        },
      },
    },
    complete: { type: "final" },
  },
})

export default setup({
  actors: {
    "git-clone-init-counting": countingMachine,
    "git-clone-init-compressing": countingMachine,
  },
}).createMachine({
  id: "git-clone-init",
  initial: "processing",
  states: {
    processing: {
      type: "parallel",
      states: {
        counting: {
          initial: "processing",
          states: {
            processing: {
              invoke: {
                src: "git-clone-init-counting",
                systemId: "git-clone-init-counting",
                onDone: { target: "complete" },
              },
            },
            complete: { type: "final" },
          },
        },
        compressing: {
          initial: "processing",
          states: {
            processing: {
              invoke: {
                src: "git-clone-init-compressing",
                systemId: "git-clone-init-compressing",
                onDone: { target: "complete" },
              },
            },
            complete: { type: "final" },
          },
        },
      },
      onDone: { target: "complete" },
    },
    complete: {
      entry: () => console.log("entry"),
      type: "final",
    },
  },
})
