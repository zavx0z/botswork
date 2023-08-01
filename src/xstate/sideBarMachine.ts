import { createMachine, spawn } from 'xstate'
import ActivityPanelButton from './activityLayoutButtonMachine'

type ContextTypes = {
	
}

const sideBar = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QEMDGAXAlgN0+gngHSYQA2YAxAPIAKAogHIDaADALqKgAOA9rHph4A7TiAAeiAIwBOAGyFJADgAskgOzSZa9QFY1igDQh8iAMw6WC6Sx2qWk2WtPS1sgL5ujaLLgLEylADCADJUAMp0rBxIILz8WMKiEggyAEyELNbKpkoOii6yhsaIyoryLKnZOaamGvamyh5eGDh4RDxcYEKQFCHhkeyicQKJMcn50oSK6rIssjqKOjqpckYmCFUZlTWSNXW7jZ4g3q1+HV2QhFzI3aT+5NT0DAD6NACCDHTBUUN8IyJjErOQg6WqyUqyJSpMq2NZSHTyVKSCHKJFzRQsUxNY4tXztTrdCBXG5gO4kB59CKvD5fH4xYYJAGgZLZSag1wQqEw5RwhCmJFTaYI1GmQqmRRqbEnPGEc6E4m3QioUh8Hq0RjUz7fQb0v6MpKIWTgwjSHTSZTSaT8mzgyS81LmEHSMrSFZaPQ6KW4tqygmXa6KuU9Sl0TW0nXcPWCJniRAWRFqVIsTINUX6HnFBAOnROl1ulwerFHaU+5WqiCPRh0yPxaMGlJyBQqdSaFy6fS81SSQhJ1SpNRLFYI00eI5CHgQOCiEsEX610bMxBJwjaFgW5MO2TmRQqXkAWkkcx7i12enyORcXp8PvJYDn-3rhRXh-XFVF26K61Uk17DlFrtSJNJWLb0zj9CB731QEs1NEEwTNZEk37Bp9yUFcT3MfQrRkWQ5CvU58QuIkA1JSC62g1M4NcBDUQqJwM3WJ9tBRNFCkxfCZSDYiSTJAIyIXWM+U0Kj5k0WjkIYpdHTNPNWwHNRlGA5przAoiFVJJUVVgSB+JjZJZjUHtE3sZ1HG-O1M35bsd0kYVN0UcVwQ4n0uPUu4uN0x8WEM-skxkMoFJkCz1ls+RmLKVFDzY1JPRAlSiDLbSIN1ec9LjZQEyQuZJCUaZPxKRwtiqXZamsXZRzcIA */
	id: 'activity',
	initial: 'idle',
	states: {
		idle: { on: { OPEN: 'opened', CLOSE: 'closed' } },
		opened: {
			on: { CLOSE: 'closed' },
			type: 'parallel',
			states: {
				buttons: {},
				panel: {
					initial: 'idle',
					states: {
						idle: {
							on: {
								OPEN_PANEL: 'opened',
								CLOSE_PANEL: 'closed'
							}
						},
						closed: {
							on: {
								OPEN_PANEL: 'opened'
							}
						},
						opened: {
							on: {
								CLOSE_PANEL: 'closed'
							}
						}
					}
				}
			}
		},
		closed: {
			on: { OPEN: 'opened' }
		}
	},
	predictableActionArguments: true,
	preserveActionOrder: true,
	tsTypes: {} as import('./sideBarMachine.typegen.d.ts').Typegen0
})
export default sideBar
