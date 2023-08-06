import { assign, createMachine } from 'xstate'
export default createMachine(
	{
		id: 'auth-join',
		initial: 'idle',
		states: {
			idle: {
				on: {
					SUBMIT: { target: 'submit', actions: ['setCredentials'] }
				}
			},
			submit: {
				invoke: {
					id: 'join',
					src: (context, event) =>
						context.service.signUp({
							email: context.email,
							password: context.password
						}),
					onError: {
						target: 'error',
						actions: 'writeErrorToContext'
					},
					onDone: {
						target: 'success'
					}
				}
			},
			success: {
				type: 'final'
			},
			error: {
				type: 'final',
				data: (context, event) => context.error
			}
		},
		predictableActionArguments: true,
		schema: {
			events: {} as { type: 'SUBMIT'; email: string; password: string },
			context: {} as {
				service: {
					signUp: ({ email, password }: { email: string; password: string }) => Promise<any>
				}
				email: string
				password: string
				error: string | unknown
			}
		},
		tsTypes: {} as import('./authJoinMachine.typegen.d.ts').Typegen0
	},
	{
		actions: {
			writeErrorToContext: assign((context, event) => ({ ...context, error: event.data })),
			setCredentials: assign((context, event) => ({ ...context, email: event.email, password: event.password }))
		}
	}
)
