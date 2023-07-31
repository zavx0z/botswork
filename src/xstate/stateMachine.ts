import { createMachine, interpret, spawn } from 'xstate'
import displayMachine from './displayMachine'
import sideBar from './sideBar'
import Layout, { zIndex } from './Layout/Layout'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
		id: 'stateMachine',
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
			sideBarLeft: {
				invoke: { id: 'sideBarLeft', src: 'sideBarLeft' }
			},
			sideBarRight: {
				invoke: { id: 'sideBarRight', src: 'sideBarRight' }
			}
		}
	},
	{
		services: {
			display: displayMachine,
			sideBarLeft: createMachine({ ...sideBar.config, id: 'sideBarLeft' }),
			sideBarRight: createMachine({ ...sideBar.config, id: 'sideBarRight' }),
			layoutCanvas: () => Layout('layoutCanvas').withContext({ zIndex: zIndex.z0 }),
			layoutHtml: () => Layout('layoutHtml').withContext({ zIndex: zIndex.z10 })
		}
	}
)
export default interpret(machine, { devTools: true }).start()
