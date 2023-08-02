import { assign, createMachine } from 'xstate'

const layoutMachineFabric = (id: string = 'layout', zIndex: string = 'auto') =>
	createMachine(
		{
			/** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgC8BJfCMADxIAYBiAZQFEAVAfQoDkARNgA0A2gwC6iUAAcA9rFwAXXLPxSQtRAGYtAFhIAmXQE5jugOwBWXQA4burcYA0IAJ6JL5gyVPGb5rXMANi1LMwBGAF9IlzQsPEJSSmo6EnDmdm4+QVEJdTkFZVV1TQQdfSNTC2s7B2c3RANjBh9fCyD7S0sg6NiMHAJicioaegMMzh4BYTFJJBACpRU1edLywxMzK1t7Rxd3BAdw1tMgoIcgg3HzXpA4gcThlPotCazp3LmZeSXi1e09BsqttansGgh0rpjr4qgwtEFjAiDLd7gkhslRiRdG8pjlZvkfkUVqA1oDKlsart6gdwiYTn5dOdLHCbjE7v00UkRqlmaxJtkZnl5osiSUARVNtUdnV9ohmi0YVYDDZLK8HCiOYMuc8SDh0PgYEx8cLCcsxWVaT4GJddLY7ZYVbKEGdzCdauNmkYNfEtU9MXqDWAjeEvgtTX8SdpLc0bXbOo7wVoVfSHeEmn4wt6HujufQA4aRAZQyKzf8LfoY0Y47oHZYnZYDEF6cE7OEgszWX0fY8Mal80GRFpi+HiRooxXrVX7PG6+DwuFAowGMuGLabAZHMZkWzUb7e3nsPqC7ph4VS5Hy1bY9OawmDlX6Y5AjYtAY01nOX6+4fA0bLKfflHNZo0nNd7TvOVjEsekVQCBgAihD891zXUfwLIIANFMstBA69wNnA4VQrXwzmMcwYygpCexQ-sjXMTDzzHS9KzAmcnRsBgbBTGwgi8F8LConMdXQABXRRZD5d48SFb4zwjJj1gMZll1fIIGD8REnXMBc3S3SxwgbTNbnwWQaHgeZd0SAk5KAxAAFojCdBzdEE7VRmswDzUc8FLnpLdXyU8J7DMVyv3oBgPKwi8LFdcxNjU+clM9J01K0N1zB4q4bHCTt2W7ITMXSSLGNKGKSDi04GESsIGAMJ1X2hEigqaBdzlC-dDAik0bPNMqKsRKq0xqurwUZbwYUuKrlxVEKd01aidVeYr5NK8xYviwaktqp10gCJcV2y7LrDI9qUOxZbbMONbyo26rkrnDjm3UnRrBrXLLIKnkutkzyyz626hvug5jBwmCzCaWpjFOnV+wu80vB2mxjBIHCjDU8ZArIno5vytzUlE8S4b+67+oSwHtvBDjkZhWxQkbNbseiIA */
			id: id,
			type: 'parallel',
			context: {
				zIndex: zIndex
			},
			states: {
				zIndex: {
					initial: 'change',
					states: {
						change: {
							always: [
								{ target: '0', cond: 'z0' },
								{ target: '10', cond: 'z10' },
								{ target: '20', cond: 'z20' },
								{ target: '30', cond: 'z30' },
								{ target: '40', cond: 'z40' },
								{ target: '50', cond: 'z50' },
								{ target: 'auto', cond: 'auto' },
								{ target: 'auto' }
							]
						},
						0: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						10: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						20: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						30: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						40: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						50: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						auto: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } }
					}
				}
			},
			predictableActionArguments: true,
			preserveActionOrder: true,
			schema: {
				events: {} as { type: 'SET_INDEX'; data: { zIndex: string } },
				context: {} as { zIndex: string },
				actions: {} as { type: 'cacheData' }
			},
			tsTypes: {} as import("./layoutMachine.typegen.d.ts").Typegen0
		},
		{
			actions: {
				cacheData: assign({ zIndex: (context, event) => event.data.zIndex })
			},
			guards: {
				z0: (context) => context.zIndex === '0',
				z10: (context) => context.zIndex === '10',
				z20: (context) => context.zIndex === '20',
				z30: (context) => context.zIndex === '30',
				z40: (context) => context.zIndex === '40',
				z50: (context) => context.zIndex === '50',
				auto: (context) => context.zIndex === 'auto'
			}
		}
	)
export default layoutMachineFabric
