import { createMachine, interpret, sendTo } from 'xstate'
import displayMachine from './displayMachine'
import sideBar from '$lib/sideBar/sideBarMachine'
import layoutMachineFabric from './layoutMachine'
import routeMachine from '../routes/routeMachine'

const machine = interpret(
	createMachine(
		{
			/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
			id: 'stateMachine',
			key: 'stateMachine',
			type: 'parallel',
			states: {
				router: {
					invoke: { id: 'router', src: 'routerMachine' },
					on: {
						NAVIGATE: {
							actions: [sendTo('sideBar-left', (_, event) => ({ type: 'NAVIGATE', pathname: event.pathname }))]
						}
					}
				},
				display: {
					invoke: { id: 'display', src: 'display' }
				},
				sideBarLeft: {
					invoke: { id: 'sideBar-left', src: 'sideBarLeft' }
				},
				canvas: {
					invoke: { id: 'canvas', src: 'layoutCanvas' },
					on: {}
				},
				sideBarRight: {
					invoke: { id: 'sideBar-right', src: 'sideBarRight' }
				}
			},
			predictableActionArguments: true,
			preserveActionOrder: true,
			schema: { events: {} as { type: 'NAVIGATE'; pathname: string } },
			tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen0
		},
		{
			actions: {},
			services: {
				routerMachine: routeMachine,
				display: displayMachine,
				sideBarLeft: sideBar('left').withContext({ zIndex: 20 }),
				sideBarRight: sideBar('right').withContext({ zIndex: 20 }),
				layoutCanvas: layoutMachineFabric('layoutCanvas', '0')
			}
		}
	),
	{ devTools: true }
)
	.onTransition((state) => {
		// if (browser) localStorage.setItem('sideBar-left', JSON.stringify(state.children['sideBar-left'].getSnapshot()))
		// console.log(leftBar))
	})
	.start()
export default machine
