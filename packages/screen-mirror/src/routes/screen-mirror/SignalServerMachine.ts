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
		tsTypes: {} as import('./SignalServerMachine.typegen.js').Typegen0
	},
	{
		services: {},
		actions: {
			check: async (context, event) => {
				const { data, error } = await context.service.from('peer_connection').select(`*`)
				console.log(data)
			}
		}
	}
)
export default SignalServerMachine
