import { assign, createMachine, interpret, send } from "xstate"

export const createSimulationMachine = (machine: any, state: any) =>
  createMachine({
    id: "simService",
    initial: "active",
    context: {
      machine: machine,
      state: state,
    },
    on: {
      "STATE.UPDATE": {
        actions: assign({ state: (_, e) => e.state }),
      },

      EVENT: {
        actions: send((ctx, e) => e.event, { to: "machine" }),
      },
    },
    schema: {
      events: {} as { type: "STATE.UPDATE"; state: any } | { type: "EVENT"; event: any } | { type: "MACHINE.UPDATE" },
    },
    states: {
      active: {
        invoke: {
          id: "machine",
          src: (ctx) => (sendBack, onReceive) => {
            console.log("starting again")
            const service = interpret(ctx.machine)
              .onTransition((state) => {
                sendBack({
                  type: "STATE.UPDATE",
                  state,
                })
              })
              .start()

            onReceive((event) => {
              service.send(event)
            })

            return () => {
              service.stop()
            }
          },
        },
        on: {
          "MACHINE.UPDATE": {
            target: "active",
            internal: false,
            actions: [
              assign({
                machine: createMachine({
                  initial: "foo",
                  states: {
                    foo: {
                      on: {
                        NEXT: "bar",
                      },
                    },
                    bar: {
                      on: {
                        NEXT: "foo",
                      },
                    },
                  },
                }),
              }),
            ],
          },
        },
      },
    },
  })
