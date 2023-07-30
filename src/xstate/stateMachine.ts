import { createMachine } from 'xstate'
import displayMachine from './displayMachine'

export default createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGlgBcBDQsAWWIGMALASwzHxAActY7C6sNmAPRAEYATOgCeQ4cmnIgA */
	id: 'stateMachine',
	type: 'parallel',
	states: {
		display: {
			invoke: { id: 'display', src: displayMachine }
		}
	}
})
