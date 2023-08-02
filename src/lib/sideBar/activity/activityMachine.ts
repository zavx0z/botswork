import { createMachine, assign, spawn } from 'xstate'

export default (id: string = 'activity') =>
	createMachine(
		{
			id: id,
			context: { top: [], bottom: [] },
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
				events: {} as { type: 'OPEN' } | { type: 'CLOSE' } | { type: 'UPDATE'; node: HTMLElement},
				context: { 
                    top: {} as any[] | never[], 
                    bottom: {} as any[] | never[] 
                },
				actions: { type: 'update' }
			},
			tsTypes: {} as import('./activityMachine.typegen.d.ts').Typegen0
		},
		{
			actions: {
                update: (context, event)=>{
                    console.log(context, event)
                }
				// update: assign({
				// 	top: (_, event) => event.top.map((item: any) => spawn(item, item.id)),
				// 	bottom: (_, event) => event.bottom.map((item: any) => spawn(item, item.id))
				// })
			}
		}
	)
