import { createMachine, interpret, raise } from 'xstate'
import { browser } from '$app/environment'

const mediaQuery = (maxWidth: number): boolean => false
const machine = createMachine(
	{
		id: 'Layout',
		context: ({ input }) => ({
			mediaQuery: input.mediaQuery ? input.mediaQuery : (maxWidth: number) => console.log('implement mediaQuery')
		}),
		initial: 'init',
		states: {
			init: {
				entry: raise({ type: 'detectDisplay' }),
				on: {
					detectDisplay: [
						{
							target: 'sm',
							guard: { type: 'sm', params: { maxWidth: 640 } }
						},
						{
							target: 'md',
							guard: { type: 'md', params: { maxWidth: 768 } },
							reenter: false
						},
						{
							target: 'lg',
							guard: { type: 'lg', params: { maxWidth: 1024 } },
							reenter: false
						},
						{
							target: 'xl',
							guard: { type: 'xl', params: { maxWidth: 1280 } },
							reenter: false
						},
						{
							target: '2xl',
							guard: { type: '2xl', params: { maxWidth: 1536 } },
							reenter: false
						}
					]
				}
			},
			sm: {},
			md: {},
			lg: {},
			xl: {},
			'2xl': {}
		},
		types: {
			context: {} as { mediaQuery: (maxWidth: number) => boolean },
			events: {} as
				| {
						type: 'detectDisplay'
				  }
				| {
						type: 'Event 1'
				  }
		}
	},
	{
		actions: {},
		actors: {},
		guards: {
			sm: ({ context, guard }) => context.mediaQuery(guard.params.maxWidth),
			md: ({ context, guard }) => context.mediaQuery(guard.params.maxWidth),
			lg: ({ context, guard }) => context.mediaQuery(guard.params.maxWidth),
			xl: ({ context, guard }) => context.mediaQuery(guard.params.maxWidth),
			'2xl': ({ context, guard }) => context.mediaQuery(guard.params.maxWidth)
		},
		delays: {}
	}
)
export const displayService = interpret(machine, { input: { mediaQuery: mediaQuery }, devTools: true }).start()
