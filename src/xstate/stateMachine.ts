import { createMachine, interpret } from 'xstate'
import displayMachine from './displayMachine'
import sideBar from './sideBar'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQgGwAWAHQBWZGhBFSFavUayIdWCwA2xCUlbtO3XiYEJJABnGJh84UvSqylWgzCyOuAELEAE4AMmAAZoTMbBxcPPyIdg4I0gDMqQquKiQeGt6+dAHBAEp0UDRRJjHm8VaJ9iDGkoKKSshAA */
		id: 'stateMachine',
		type: 'parallel',
		states: {
			display: {
				invoke: { id: 'display', src: 'display' }
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
			sideBarLeft: () => createMachine({ ...sideBar.config, id: 'sideBarLeft' }),
			sideBarRight: () => createMachine({ ...sideBar.config, id: 'sideBarRight' }),
		}
	}
)
export default interpret(machine, { devTools: true }).start()
