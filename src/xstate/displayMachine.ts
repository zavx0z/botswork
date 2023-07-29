import { browser } from '$app/environment'
import { createMachine } from 'xstate'

const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QQJawA4BsCGBPAdChJmAMQDaADALqKjoD2sKALigwHZ0gAeiAzAA5B+AJzjRggCwB2KQEYATPMqipAGhC5Ei0YrESAbGsGKpy0QF9Lm1BhwFmALzCEOrCjW6NmbTtz4EGUV+fFV+GX5ZBWVVTW0EQ3kAVjEZYLN5GUNkwUpFa1s0LDx8Z1cUdxYKeVokEB9Wdi56wODQ8MjopRVReMRzfVF0xWSpYwVcqUKQOxLHFBc3D3JFOvomJv9WxHaw0QiouR64rURk+VF8WQyFbNz8mbmHMsWKqop+dYbNvxbQNohfaHbqxPpnIJKa4jTL3PIFGyzYovcrLarkKTfRp-AK7IGdI4xXr9BD8RSGaHBMYTFLSJ7I0qo2AAW1IACc4G8qFjfs1cUFImJKIYQqDiRDkjlKYpYTl4fT7Iy3vhmRB2ZyXNzvLztgDdoLRMLRccwSSIvobqNxmpadNEc8lUtMFB1eUtfVsXydgLQoaRYSTuCEuMRMMqdbJnT7QyFkseJhXVyvB6df9ePrfUaA6aIYYkmlblk5Y9o4rY64ePHE5rkxtfF69T6hf6xacEooZKkw1aaVNrIiOAwIHBuA6EnWtmnAopKBoIQBafiUBXzQjEMDa+u69MIDuUEm6eQGcQTUzmS4rlFvTeT-myI8E1tqEnyYTS6k23JCS+O96sG84t6FxXI+Jriu2ohHhIkhPnaRRlq8SwsgBDY7sIlD4IYUjCqoYFtucchhIYlDJMknaqJB-CGD+5YqhAKHboE6GYdhxHDES+GkoID7Ebk8JyJBMg0YhrjOgxU6IMxWE4exgYkjc+CSiRpg2jKghCaWq6ovG4n8lJrG4RxQaIIYMgYUppHkeI8hUcJ2k6SmW4SQg+kyXhxm7tIim8ehHZSIJwkMGyKBgBwLDYIBE6RTuoyKCSZGKYFwWheFfz4AAbmAbJsAAxtgmC6d6S6+rohjqckL5SMkSUhWFEXNPgAAWQWLJw4UFY5t5FZQ+4QjOoTVf2QA */
		id: 'display',
		type: 'parallel',
		states: {
			size: {
				initial: 'init',
				states: {
					init: {
						always: [
							{ target: 'sm', cond: 'sm' },
							{ target: 'md', cond: 'md' },
							{ target: 'lg', cond: 'lg' },
							{ target: 'xl', cond: 'xl' },
							{ target: 'xxl', cond: 'xxl' }
						]
					},
					sm: {
                        tags: [],
						on: { resize: 'init' }
					},
					md: {
                        tags: [],
						on: { resize: 'init' }
					},
					lg: {
                        tags: [],
						on: { resize: 'init' }
					},
					xl: {
                        tags: [],
						on: { resize: 'init' }
					},
					xxl: {
                        tags: [],
						on: { resize: 'init' }
					}
				}
			},
			orientation: {
				initial: 'init',
				states: {
					init: {
						always: [
							{ target: 'portraitPrimary', cond: 'portraitPrimary' },
							{ target: 'portraitSecondary', cond: 'portraitSecondary' },
							{ target: 'landscapePrimary', cond: 'landscapePrimary' },
							{ target: 'landscapeSecondary', cond: 'landscapeSecondary' }
						]
					},
					portraitPrimary: {
						tags: ['portrait'],
						on: { rotate: 'init' }
					},
					portraitSecondary: {
						tags: ['portrait'],
						on: { rotate: 'init' }
					},
					landscapePrimary: {
						tags: ['landscape'],
						on: { rotate: 'init' }
					},
					landscapeSecondary: {
						tags: ['landscape'],
						on: { rotate: 'init' }
					}
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true
	},
	{
		actions: {},
		guards: {
			sm: () => (browser ? window.innerWidth < 640 : false),
			md: () => (browser ? 640 < window.innerWidth && window.innerWidth < 780 : false),
			lg: () => (browser ? 780 < window.innerWidth && window.innerWidth < 1024 : false),
			xl: () => (browser ? 1024 < window.innerWidth && window.innerWidth < 1280 : false),
			xxl: () => (browser ? 1280 < window.innerWidth && window.innerWidth < 1536 : false),
			portraitPrimary: () => (browser ? window.screen.orientation.type === 'portrait-primary' : false),
			portraitSecondary: () => (browser ? window.screen.orientation.type === 'portrait-secondary' : false),
			landscapePrimary: () => (browser ? window.screen.orientation.type === 'landscape-primary' : false),
			landscapeSecondary: () => (browser ? window.screen.orientation.type === 'landscape-secondary' : false)
		}
	}
)
export default machine
