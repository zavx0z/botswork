import { createMachine, assign, spawn } from 'xstate'
import buttonMachine from '../components/buttonMachine.js'

export default (id: string = 'activity') =>
	createMachine(
		{
			id: id,
			context: { buttons: {} },
			initial: 'opened',
			states: {
				opened: {
					on: {
						CLOSE: 'closed',
						UPDATE: {
							target: 'opened',
							actions: ['update']
						}
					}
				},
				closed: {
					on: {
						OPEN: 'opened',
						UPDATE: {
							target: 'closed',
							actions: ['update']
						}
					}
				}
			},
			predictableActionArguments: true,
			preserveActionOrder: true,
			schema: {
				events: {} as
					| { type: 'OPEN' }
					| { type: 'CLOSE' }
					| { type: 'UPDATE'; buttons: [[string, { path?: string; onClick?: any }]] },
				context: {} as { buttons: { [key: string]: any } },
				actions: { type: 'update' }
			},
			tsTypes: {} as import("./activityMachine.typegen.d.ts").Typegen0
		},
		{
			actions: {
				update: assign({
					buttons: (context, event) => {
						const obj: { [key: string]: any } = {}
						for (const [key, value] of event.buttons) {
							const { onClick, path } = value
							let machine: any = buttonMachine(key)
							if (onClick) machine.withConfig({ actions: { onClick: value['onClick']() } })
							if (path) machine.withContext({ path: value['path'] })
							obj[key] = spawn(machine, key)
						}
						return { ...context.buttons, ...obj }
					}
				})
			}
		}
	)
