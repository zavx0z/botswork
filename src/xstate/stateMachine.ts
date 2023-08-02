import { createMachine, interpret } from 'xstate'
import displayMachine from './displayMachine'
import sideBar from '../lib/sideBar/sideBarMachine'
import layoutMachineFabric from './layoutMachine'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
		id: 'stateMachine',
		key: 'stateMachine',
		type: 'parallel',
		states: {
			display: {
				invoke: { id: 'display', src: 'display' }
			},
			sideBarLeft: {
				invoke: { id: 'sideBar-left', src: 'sideBarLeft' }
			},
			canvas: {
				invoke: { id: 'canvas', src: 'layoutCanvas' },
			},
			sideBarRight: {
				invoke: { id: 'sideBar-right', src: 'sideBarRight' }
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen0
	},
	{
		services: {
			display: displayMachine,
			sideBarLeft: sideBar('left').withContext({zIndex: 20}),
			sideBarRight: sideBar('right').withContext({zIndex: 20}),
			layoutCanvas: layoutMachineFabric('layoutCanvas', '0'),
		}
	}
)
export default interpret(machine, { devTools: true }).start()
