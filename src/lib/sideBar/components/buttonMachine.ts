import { createMachine } from 'xstate'

export default (id: string) =>
	createMachine(
		{
			id: id,
			initial: 'inactive',
			context: {
				path: null
			},
			states: {
				inactive: {
					on: {
						ACTIVATE: { target: 'active', actions: ['onClick'] },
						HOVER: 'hovered'
					}
				},
				active: {
					after: {
						144: { target: 'inactive', cond: 'isButton' }
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
				context: {} as { path: string | null | undefined },
				actions: {} as { type: 'onClick' }
			},
			tsTypes: {} as import('./buttonMachine.typegen.d.ts').Typegen0
		},
		{
			actions: {
				onClick: () => {}
			},
			guards: {
				isButton: (context, _) => !Boolean(context.path)
			}
		}
	)
