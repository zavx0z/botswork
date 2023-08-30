import { createMachine } from 'xstate'

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
				service: any
			}
		},
		predictableActionArguments: true,
		tsTypes: {} as import("./SignalServerMachine.typegen.d.ts").Typegen0
	},
	{
		services: {},
		actions: {
			check: async (context, event) => {}
		}
	}
)
export default SignalServerMachine
