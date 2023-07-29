import { browser } from '$app/environment'
import { createMachine, send } from 'xstate'
import { raise } from 'xstate/lib/actions'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QQJawA4BsCGBPAdCgHYoAuAxANoAMAuoqOgPaxkpNEMgAeiArAHYAHABoQufgICc+PgF85Y1BhwFiZKgEZ6SEM1al2nXbwSDR4xAGYhANlkKlaLHkIkKlAEw7GLNhy5TczEJBAAWIStHEGUXNXcqKx89P0MAk0kLUNsBW2jY1TcNSjDk-X9jUCDhEMRPKWp850LYAFtyACc4FAAvMBoy1KNAxFtPIXwhTU8+TT4ZoWEpTVqzeqaVV1aITu6+ga5ytMqeUfHJ6b5Vqys8xRjm10woXdZ9ukOh9KqziamZuYLJYrSzhKyeBz3AqubiYV69fofXRHYYZBBjP6XQF8RZCZarMZ8SFOTYEbiw+HvQYGVE-dHnf5XUGeKwyeTRIhMCBwLjQ0K+GnfU4IcG2VaAjZxIqkT6Ck6mKwCMKrGZE+aeAQarWazVCSUtVqyiojBACKxqsK2RZM0J8RWySI3J3OqJQx4EbZG44ms0Wq0CG3WMJhB0usP6p5QL204W+2SW62rYOafDUR1hp0CCNkzDRoWmON8BMBglWENpjPO7P4cm55FfeWIQvFwMITwRVPpyuaBQKIA */
		id: 'display',
		initial: 'init',
		states: {
			init: {
				always: [
					{ target: 'sm', cond: 'sm' },
					{ target: 'md', cond: 'md' },
					{ target: 'lg', cond: 'lg' },
					{ target: 'xl', cond: 'xl' },
					{ target: 'xxl', cond: 'xxl' },
				]
			},
			sm: { on: { resize: 'init' } },
			md: { on: { resize: 'init' } },
			lg: { on: { resize: 'init' } },
			xl: { on: { resize: 'init' } },
			xxl: { on: { resize: 'init' } },
		},
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {},
		guards: {
			sm: () => {
				return browser ? window.innerWidth < 640 : false
			},
			md: () => {
				return browser ? 640 < window.innerWidth && window.innerWidth < 780 : false
			},
			lg: () => {
				return browser ? 780 < window.innerWidth && window.innerWidth < 1024 : false
			},
			xl: () => {
				return browser ? 1024 < window.innerWidth && window.innerWidth < 1280 : false
			},
			xxl: () => {
				return browser ? 1280 < window.innerWidth && window.innerWidth < 1536 : false
			}
		}
	}
)
export default machine
