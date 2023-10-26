import { assign, createMachine } from "xstate"

type lang = "ts" | "js" | "html" | "css"
export const machine = createMachine(
  {
    types: {} as {
      events:
        | { type: "input.text"; params: string }
        | { type: "input.language"; params: lang }
        | { type: "input.lineno"; params: boolean }
        | { type: "input.fold"; params: boolean }
        | { type: "restart" }
      context: {
        input: {
          text: string | undefined
          language: lang
          lineno: boolean
          fold: boolean
        }
        output: {
          text: string | undefined
        }
        error?: {
          code?: number
          message: string
        }
      }
    },
    context: {
      input: {
        text: undefined,
        language: "js",
        lineno: false,
        fold: true,
      },
      output: {
        text: undefined,
      },
    },
    on: {
      "input.text": {
        target: ".process",
        guard: ({ event }) => Boolean(event.params.length),
        actions: assign(({ context, event: { params } }) => ({ ...context, input: { ...context.input, text: params } })),
      },
      "input.language": {
        target: ".process",
        guard: ({ context, event }) => Boolean(context.input.text && context.input.language !== event.params),
        actions: assign(({ context, event: { params } }) => ({ ...context, input: { ...context.input, language: params } })),
      },
      "input.lineno": {
        target: ".process",
        guard: ({ context, event }) => Boolean(context.input.lineno !== event.params),
        actions: assign(({ context, event: { params } }) => ({ ...context, input: { ...context.input, lineno: params } })),
      },
      "input.fold": {
        target: ".process",
        guard: ({ context, event }) => Boolean(context.input.fold !== event.params),
        actions: assign(({ context, event: { params } }) => ({ ...context, input: { ...context.input, fold: params } })),
      },
      restart: { target: ".process" },
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          restart: { target: "process" },
        },
      },
      process: {
        invoke: {
          src: "codeRender",
          input: ({ context }) => context.input,
          onDone: { actions: assign(({ context, event: { output } }) => ({ ...context, output: { text: output } })), target: "complete" },
          onError: { actions: assign(({ context, event: { data } }) => ({ ...context, error: { message: data as string } })), target: "error" },
        },
      },
      error: {
        after: { 44: { target: "idle" } },
      },
      complete: {
        after: { 44: { target: "idle" } },
      },
    },
  },
  {
    guards: {
      inputComplete: ({ context: { input } }) => Boolean(input.text),
    },
  },
)
