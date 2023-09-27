import { createMachine } from 'xstate'
import layoutMachineFabric from '../xstate/layoutMachine'
import sideBar from '../xstate/sideBarMachine'

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
			page: {
				initial: 'root',
				on: {
					NAVIGATE: [
						{ target: 'page.root', cond: 'root' },
						{ target: 'page.humans', cond: 'humans' },
						{ target: 'page.bots', cond: 'bots' },
						{ target: 'page.groups', cond: 'groups' },
						{ target: 'page.profile', cond: 'profile' },
						{ target: 'page.settings', cond: 'settings' }
					]
				},
				states: {
					root: { invoke: [] },
					humans: { invoke: [] },
					bots: { invoke: [] },
					groups: { invoke: [] },
					profile: { invoke: [] },
					settings: { invoke: [] }
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			events: {} as { type: 'NAVIGATE'; pathname: string }
		},
		tsTypes: {} as import("./rootMachine.typegen").Typegen0
	},
	{
		guards: {
			root: (_, event) => event.pathname === '/',
			humans: (_, event) => {
				return event.pathname.includes('humans')
			},
			bots: (_, event) => event.pathname.includes('bots'),
			groups: (_, event) => event.pathname.includes('groups'),
			profile: (_, event) => event.pathname.includes('profile'),
			settings: (_, event) => event.pathname.includes('settings')
		},
		services: {
			layoutCanvas: layoutMachineFabric('layoutCanvas', '0'),
			sideBarLeft: sideBar('left').withContext({ zIndex: 20 }),
			sideBarRight: sideBar('right').withContext({ zIndex: 20 })
		}
	}
)
export default rootMachine
