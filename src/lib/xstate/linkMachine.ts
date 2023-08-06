import { createMachine } from 'xstate'

export default (id: string) =>
	createMachine({
		id: id,
		initial: 'inactive',
		states: {
			inactive: {
				on: {
					ACTIVATE: { target: 'active', actions: () => console.log('activate') },
					HOVER: 'hovered'
				}
			},
			active: {
				on: {
					DEACTIVATE: 'inactive',
					HOVER: 'hovered',
					BLUR: 'inactive'
				}
			},
			hovered: {
				on: {
					HOVER: 'hovered',
					BLUR: 'inactive',
					ACTIVATE: 'active'
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			events: {} as { type: 'ACTIVATE' } | { type: 'DEACTIVATE' } | { type: 'HOVER' } | { type: 'BLUR' },
			context: {} as { component: any; path: string; props?: { [key: string]: any } }
		},
		tsTypes: {} as import('./linkMachine.typegen.d.ts').Typegen0
	})
