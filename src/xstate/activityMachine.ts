import { createMachine } from 'xstate'

export default (id: string = 'activity') =>
	createMachine({
		id: id,
		context: { buttons: {} },
		initial: 'opened',
		states: {
			opened: {
				on: {
					CLOSE: 'closed'
				}
			},
			closed: {
				on: {
					OPEN: 'opened'
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			events: {} as { type: 'OPEN' } | { type: 'CLOSE' },
			context: {} as {},
			actions: { type: 'update' }
		},
		tsTypes: {} as import('./activityMachine.typegen.d.ts').Typegen0
	})
