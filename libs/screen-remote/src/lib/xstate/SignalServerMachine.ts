import {createMachine} from 'xstate'
import {type Socket} from "socket.io-client"

const SignalServerMachine = createMachine(
    {
        id: 'signal-server',
        context: {
            service: null
        },
        initial: 'idle',
        entry: 'check',
        states: {
            idle: {}
        },
        schema: {
            context: {} as {
                service: Socket
            }
        },
        predictableActionArguments: true,
        tsTypes: {} as import("./SignalServerMachine.typegen").Typegen0
    },
    {
        services: {},
        actions: {
            check: async (context, event) => {
                return Promise.resolve('check')
            }
        }
    }
)
export default SignalServerMachine
