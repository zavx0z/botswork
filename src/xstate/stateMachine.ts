import {
	createMachine,
	interpret,
	spawn,
	type AnyEventObject,
	type BaseActionObject,
	type ResolveTypegenMeta,
	type StateMachine
} from 'xstate'
import displayMachine from './displayMachine'
import sideBar from '../lib/sideBar/sideBarMachine'
import layoutMachineFabric from './layoutMachine'
import routeMachineFabric from '../routes/routeMachine'

const testFabric = (): StateMachine<
	unknown,
	any,
	AnyEventObject,
	{ value: any; context: unknown },
	BaseActionObject,
	any,
	ResolveTypegenMeta<any, AnyEventObject, BaseActionObject, any>
> => {
	const machineTest = createMachine({
		id: 'testMachine',
		initial: 'idle',
		states: {
			idle: {
				invoke: {
					id: 'generator',
					src: () => {
						return import('$lib/ui/components/Avatar.svelte')
					},
					onDone: {
						target: 'ready',
						actions: (context, event) => {
							console.log(context, event)
							const sideBarLeft = machine.children.get('sideBarLeft')
							console.log(sideBarLeft)

							const display = machine.children.get('display')
							console.log(display)

							display?.subscribe((event) => {
								console.log(event.context)
							})
						}
					}
				}
			},
			ready: {
				on: {
					target: 'idle'
				}
			}
		},
		tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen0
	})
	return machineTest
}

const machine = interpret(
	createMachine(
		{
			/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
			id: 'stateMachine',
			key: 'stateMachine',
			type: 'parallel',
			states: {
				router: {
					invoke: {
						id: 'router',
						src: 'routerMachine'
					}
				},
				display: {
					invoke: { id: 'display', src: 'display' }
				},
				sideBarLeft: {
					invoke: {
						id: 'sideBar-left',
						src: 'sideBarLeft'
					}
				},
				canvas: {
					invoke: { id: 'canvas', src: 'layoutCanvas' }
				},
				sideBarRight: {
					invoke: { id: 'sideBar-right', src: 'sideBarRight' }
				}
			},
			predictableActionArguments: true,
			preserveActionOrder: true,
			tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen1
		},
		{
			services: {
				routerMachine: (context, event) => {
					// console.log(context, event)
					return routeMachineFabric()
				},
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
