import { createMachine } from 'xstate'
import layoutMachineFabric from '../xstate/layoutMachine'
import sideBar from '../xstate/sideBarMachine'
const rootMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QCcD2BXALmAtG1mAxAHICCAagJIDipAKgKIDaADALqKgAOqsAlpj6oAdpxAAPRAEYAbCwB0AJhkAORQGYA7DMUBOAKyaN+gDQgAnogAsU+evv2rLKYv3qWK9QF8fZ4agg4MTQsXHxMMR5+QRExSQQcRQUHFJkrJP1dKzNLBE0reRU1FW0XVUVFKSlfEBDsPFQCeQAbAENzDAikECiBIVFu+MVNeRkx8Zl1QyyWGRzEfRVbBydtK21Jqxq6sMbMFvbO+X5AgCFW5AAZMAAzLu5ePtjBxE95dakptUVPXRYrbIWRBjFR2By6WT6KzqFz6badXZNNodLDHPhnC4AJT4UAAFvceo8YgNQPFNPpRhMxlNNDM5kC8pp1GD7Co3FUpHCvGYdg0mgA3PhgADukSJ-Ti1gpVOp0yc9Nyf1BKU0Kl0MlpJS23NqCL5+x28G6vWJkoQVQp+n+VrSnzkzlMDNktiKPxU0I8VqminhoX18kN8lx6AAtq1hEaHtEJS9zWklCxtDCpJ4tJzHbl3DJCsVhrp1DJdMVffVwgGEbB5AAjAiRwnR56k6TaeQQxOLdYsRb2TTzBAFgquorpRZZJIyEuIg0V+RQEJcOsmmNNuMjVQ2Mcad2zFR9xRWUFD1Qw-Sc5Rcnl6suBrhoG58ZpgMUNkkSaSFwqaWTqqT51QqHQ+3SRQcz0JxFhYP4XEnf1A1gMBMEEYQoEXcVGzfONmStKwbRsAsWAdICVAUV0-hYJJhhhbUfCAA */
		id: 'route-root',
		type: 'parallel',
		states: {
			layout: {
				type: 'parallel',
				states: {
					sideBarLeft: {
						invoke: { id: 'sideBar-left', src: 'sideBarLeft' }
					},
					sideBarRight: {
						invoke: { id: 'sideBar-right', src: 'sideBarRight' }
					}
				}
			},
			view: {
				invoke: [{ id: 'canvas', src: 'layoutCanvas' }]
			},
			page: {
				initial: 'root',
				on: {
					NAVIGATE: [
						{ target: 'page.root', cond: 'root' },
						{ target: 'page.humans', cond: 'humans' },
						{ target: 'page.bots', cond: 'bots' },
						{ target: 'page.groups', cond: 'groups' },
						{ target: 'page.profile', cond: 'profile' },
						{ target: 'page.settings', cond: 'settings' }
					]
				},
				states: {
					root: { invoke: [] },
					humans: { invoke: [] },
					bots: { invoke: [] },
					groups: { invoke: [] },
					profile: { invoke: [] },
					settings: { invoke: [] }
				}
			}
		},
		predictableActionArguments: true,
		preserveActionOrder: true,
		schema: {
			events: {} as { type: 'NAVIGATE'; pathname: string }
		},
		tsTypes: {} as import('./rootMachine.typegen.d.ts').Typegen0
	},
	{
		guards: {
			root: (_, event) => event.pathname === '/',
			humans: (_, event) => {
				console.log('navigate', event.pathname, event.pathname.includes('humans'))
				return event.pathname.includes('humans')
			},
			bots: (_, event) => event.pathname.includes('bots'),
			groups: (_, event) => event.pathname.includes('groups'),
			profile: (_, event) => event.pathname.includes('profile'),
			settings: (_, event) => event.pathname.includes('settings')
		},
		services: {
			layoutCanvas: layoutMachineFabric('layoutCanvas', '0'),
			sideBarLeft: sideBar('left').withContext({ zIndex: 20 }),
			sideBarRight: sideBar('right').withContext({ zIndex: 20 })
		}
	}
)
export default rootMachine
