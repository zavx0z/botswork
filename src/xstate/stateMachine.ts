import { createMachine, interpret, sendTo } from 'xstate'
import displayMachine from './displayMachine'
import routeMachine from './routeMachine'
import rootMachine from '../routes/rootMachine'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
		id: 'stateMachine',
		key: 'stateMachine',
		type: 'parallel',
		states: {
			browser: {
				invoke: [
					{ id: 'display', src: 'display' },
					{ id: 'router', src: routeMachine }
				]
			},
			routes: {
				invoke: { id: 'route-root', src: rootMachine },
				on: {
					NAVIGATE: {
						actions: ['navigate']
					}
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			events: {} as { type: 'NAVIGATE'; pathname: string }
		},
		tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen0
	},
	{
		actions: {
			navigate: sendTo('route-root', (_, event) => ({ type: 'NAVIGATE', pathname: event.pathname }))
		},
		services: {
			display: displayMachine
		}
	}
)
export default interpret(machine, { devTools: true })
	.onTransition((state) => {
		// if (browser) localStorage.setItem('sideBar-left', JSON.stringify(state.children['sideBar-left'].getSnapshot()))
		// console.log(leftBar))
	})
	.start()
