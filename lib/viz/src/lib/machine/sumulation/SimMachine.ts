import { assign, createMachine, interpret, send } from "xstate"
import type { Events } from "./types/Events"

export const createSimulationMachine = (machine: any, state: any, previewEvent: string | undefined) =>
  createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SwJYFsDKYBOA3FAxmAMQYAqAgmQKIB0AqgAoAiV1A2gAwC6ioADgHtUAFxSCAdnxAAPRAFYAHLUUA2AOwBGRevkAaEAE9EmzutoBOeQGZN1gEyr7F6xYAsNgL6eDqTDnwiYmoANWoAOTIuXiQQIVFxKVi5BEULWk11C1UdfSMTe29fdCw8QjBaAEMCMVwSAFkKAGEACQBJcLomVhpo6XiUMUlpFLd1A2MEMc5aW3sxrU1tTVU3IpA-UsCK6tqSUIiyWkYAJVC26gB1PtiBoaTQFJtZi04nPMnrdTdZ+RdFRzOVweazrTYBcpVGooOrEU7nK60JoAGWoFBONwEwkGiRGCh+9kc8neE0Q9nUyjcb3s8nUThc7i86wkgggcGk4LKRH62PueIQAFpNKSEJpXpZqbT6cCmcV-FydtC6jyEsNkohVJoMlY5h8FFpaETVJx7EtlqtvN4gA */
    id: "simService",
    schema: {
      events: {} as Events,
    },
    initial: "active",
    context: {
      machine: machine,
      state: state,
      previewEvent: previewEvent,
    },
    on: {
      "STATE.UPDATE": {
        actions: assign({ state: (_, e) => e.state }),
      },
      EVENT: {
        actions: send(
          (ctx, e) => {
            const eventSchema = ctx.machine.schema?.events?.[e.event.type]
            const eventToSend = { ...e.event }
            console.log("Event", ctx.machine)
            if (eventSchema) {
              Object.keys(eventSchema.properties).forEach((prop) => {
                const value = prompt(`Enter value for "${prop}" (${eventSchema.properties[prop].type}):`)
                console.log("prompt value", value)
                eventToSend[prop] = value
              })
            }
            return eventToSend
          },
          { to: "machine" },
        ),
      },
    },
    states: {
      active: {
        invoke: {
          id: "machine",
          src: (ctx) => (sendBack, onReceive) => {
            console.log("starting again")
            const service = interpret(ctx.machine)
              .onTransition((state) => sendBack({ type: "STATE.UPDATE", state }))
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
                  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgDMB7CgYgDkBRADQBUBtABgF1FQAHC2LgAuuCvh4gAHogCM7AEwAaEAE9EAVnYAOEuz16A7ADZ5ATgDMpgCzrzAXzvK0WPIVIAjdACc6TNlwl+QRExCWkEOSVVRBsDEnUHRxB8Cgg4CWccAmJAgWFRcSQpRABaA3ZlNQRzcocnDCy3cipc4IKw0vkoqqsjc3itcyGDGSstdnN2IzqQTNdiEk8vVvzQovD5dnUSMasa9UqYoyNdQeHR8cnpxKA */ initial:
                    "foo",
                  states: { foo: { on: { NEXT: "bar" } }, bar: { on: { NEXT: "foo" } } },
                  predictableActionArguments: true,
                }),
              }),
            ],
          },
          "EVENT.PREVIEW": {
            actions: assign({ previewEvent: (_, event) => event.eventType }),
          },
          "PREVIEW.CLEAR": {
            actions: assign({ previewEvent: undefined }),
          },
        },
      },
    },
    predictableActionArguments: true,
  })
