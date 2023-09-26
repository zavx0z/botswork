import {assign, createMachine} from 'xstate'
import type {Events, Context, Services} from "./types"
import {service} from "./services"

export default createMachine(
    {
        id: 'machine',
        initial: 'idle',
        context: {
            param: 'string',
            error: null
        },
        entry: ['errRM'],
        states: {
            idle: {
                description: 'Начальное состояние',
                tags: ['anyTag'],
                always: [
                    {actions: ['action'], cond: 'guard'},
                ],
                on: {
                    IDLE: {target: '#machine.anotherState'},
                }
            },
            anotherState: {
                description: 'Состояние с актором',
                invoke: {
                    description: 'Вызываемый актор',
                    id: 'service',
                    src: 'invokeService',
                    onDone: {
                        description: 'Выполнено успешно',
                        target: "idle",
                        actions: ['effect']
                    },
                    onError: {
                        description: 'Выполнено с ошибкой',
                        actions: ['errFetchCtx']
                    }
                }
            }
        },
        predictableActionArguments: true,
        schema: {context: {} as Context, events: {} as Events, services: {} as Services},
        tsTypes: {} as import("./Machine.typegen").Typegen0
    },
    {
        guards: {
            guard: (context, event) => Boolean(context && event),
        },
        actions: {
            // ERROR
            errRM: assign((context) => ({...context, error: null})),
            errFetchCtx: assign((context, {data: {error}}) => ({...context, error: error})),
            //
            action: assign((context, _) => ({...context})),
            effect: (_, {data: {fetchResponseData}}) => console.log(fetchResponseData),
        },
        services: {
            invokeService: (context, {payload}) => service({payload})
        }
    }
)