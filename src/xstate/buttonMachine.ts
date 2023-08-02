import { createMachine, send } from 'xstate'

export default (id: string) =>
	createMachine(
		{
			id: id,
			initial: 'inactive',
			states: {
				inactive: {
					on: {
						ACTIVATE: { target: 'active', actions: ['onClick'] },
						HOVER: 'hovered'
					}
				},
				active: {
					after: {
						144: 'inactive'
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
				context: {} as { component: any; props?: { [key: string]: any } },
				actions: {} as { type: 'onClick' }
			},
			tsTypes: {} as import('./buttonMachine.typegen.d.ts').Typegen0
		},
		{
			actions: {
				onClick: (e): void => {}
			}
		}
	)
