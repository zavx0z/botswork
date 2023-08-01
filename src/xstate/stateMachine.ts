import { createMachine, interpret } from 'xstate'
import displayMachine from './displayMachine'
import sideBar from './sideBarMachine'
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
			layout: {
				invoke: [
					{ id: 'canvas', src: 'layoutCanvas' },
					{ id: 'html', src: 'layoutHtml' }
				]
			},
			sideBar: {
				invoke: [
					{ id: 'sideBarLeft', src: 'sideBarLeft' },
					{ id: 'sideBarRight', src: 'sideBarRight' }
				]
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		tsTypes: {} as import('./stateMachine.typegen.d.ts').Typegen0
	},
	{
		services: {
			display: displayMachine,
			sideBarLeft: sideBar('sideBarLeft'),
			sideBarRight: sideBar('sideBarRight'),
			layoutCanvas: layoutMachineFabric('layoutCanvas', '0'),
			layoutHtml: layoutMachineFabric('layoutHtml', '10')
		}
	}
)
export default interpret(machine, { devTools: true }).start()
