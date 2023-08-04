import { createMachine } from 'xstate'
import layoutMachineFabric from '../xstate/layoutMachine'
import sideBar from '$lib/sideBar/sideBarMachine'

const rootMachine = createMachine(
	{
		id: 'route-root',
		type: 'parallel',
		states: {
			layout: {
				type: 'parallel',
				states: {
					sideBarLeft: {
						invoke: { id: 'sideBar-left', src: 'sideBarLeft' }
					},
					sideBarRight: {
						invoke: { id: 'sideBar-right', src: 'sideBarRight' }
					}
				}
			},
			view: {
				invoke: [{ id: 'canvas', src: 'layoutCanvas' }]
			},
			routes: {
				states: {
					humans: { invoke: [] },
					bots: { invoke: [] },
					groups: { invoke: [] },
					profile: { invoke: [] },
					settings: { invoke: [] }
				}
			}
		},
		on: {
			NAVIGATE: {
				actions: [
					(_, event) => console.log('navigate', event.pathname)
					// sendTo('sideBar-left', (_, event) => ({ type: 'NAVIGATE', pathname: event.pathname }))
				]
			}
		},
		schema: {
			events: {} as { type: 'NAVIGATE'; pathname: string }
		},
		tsTypes: {} as import('./rootMachine.typegen.d.ts').Typegen0
	},
	{
		services: {
			layoutCanvas: layoutMachineFabric('layoutCanvas', '0'),
			sideBarLeft: sideBar('left').withContext({ zIndex: 20 }),
			sideBarRight: sideBar('right').withContext({ zIndex: 20 })
		}
	}
)
export default rootMachine
