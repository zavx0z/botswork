import { assign, createMachine } from 'xstate'
export enum zIndex {
	z0 = '0',
	z10 = '10',
	z20 = '20',
	z30 = '30',
	z40 = '40',
	z50 = '50',
	auto = 'auto'
}

type ContextTypes = {
	zIndex: zIndex
}
type data = {
	zIndex: number | string | undefined
}
type EventTypes = { type: 'SET_INDEX'; data: data }
export default (id: string = 'layout') =>
	createMachine(
		{
			/** @xstate-layout N4IgpgJg5mDOIC5QBsCGBPA9gVwC4DoAvASQDsIwAPfABgGIBlAUQBUB9YgOQBEmANANo0AuolAAHTLACWuaZlJiQlRAEYAzAHYAnPgAc2gCwBWY9o0A2Y+sMWANCHRrVFgEy0LO9TW1a9r4wBfQIc0LDwiMgpqVXpmdi5eQRElSRk5BSUVBFiaPXxXC21jE009Yx9DVQcnHONNdxobdXVXVU1DVy69YNCMHAIScioCuNYOHn4hUSQQNNl5RVnsjR19I1NzdSsbe0c1Q3N8bQ6833KfGgtekDCByOHqb0ZxxKmU2fmMpdAVrV0DCYzJZrLYamoLC1jq5NKptOZCt5VEEQrd+hEhtF8IYxglJskZhIpAtMss1DQ8gUiiV6hcjNV9jlYepjnoOlVzCUWpobncMVERhUXniktNUsTvllyZTCsVSnSquCcoZNBZaHpVK4tEVVHoKdpeejBgLqABjAAWqFIMDoYs+EsWUpy2xo+FMeVUsUM6j0elaSs1xnyNDaIZKrhDth6qL5xse+AtVptAlUhLmDtJv2lugp6i2yOMRW0e1qLk8rI6hSsFgshlshvCcaxietYFtrjTX0dZOdFld7o1Xp9ftcAaDmmhsL9ek8xk1hgb90xIxbyfUnYzP2Uahdboqg5o3t9-sZ7VcAL155dbK1C5jRoezctrdthg36W7WZyFPysppZQqekAz1XQjBoaxIROcpC0Xfl41XNsBGMd8SS3FYf3wGsaHaGgAJ8PMA29V0PS6VxvSRXVYKbFdn2TCwUMlHtLH7fdPUPYcT1LOtjGOU4Ok1SFsJRPpG0fGik0QzQGM-bdexYj0h2PUdTzzUDThObC63KKixOoVA8EwYUJlFD4iQ-TNZNWAENmBbZQRLHdD1oUMw1aK5WmCVFSEwCh4FmWNxXMtDEDKX9qW8YxEXAhlam0NkPB0eomgMTRIp05dsjM1CnT9NU-wiqK5wDXDDDdTxzE0PwYR5e9RIy2hAuypjrBZPMgRsVQtLZAM4VazQyhcMwZ1adR0pNfBYkaxiv19Ur8vAwqYohJp8BsTp2j9CokTG+MIymmSVha1abI6rrNDHLUCj9E4KhMAxoxEpdxu8faLMOqE2tMU7DF9c7TxrHitU0cDfFMLwaseuCsRxV7goQWaqWKArBKK08OkBk5WlS1UyNUHasQqWGcr0ObwoWlGluVKFzBMCwSf8ClXAetE6vGhCiaYiM1XdRK8KA086zmsizh9QCrnxkZ9NwTAOa-ZEPpOqozoDFpdC0AJrHHE5Os8wIgA */
			id: id,
			type: 'parallel',
			context: {
				zIndex: zIndex.auto
			},
			schema: {
				events: {} as EventTypes,
				context: {} as ContextTypes,
				actions: {} as { type: 'cacheData'; context: ContextTypes }
			},
			tsTypes: {} as import('./Layout.typegen.d.ts').Typegen0,
			states: {
                
				zIndex: {
					initial: 'change',
					states: {
						change: {
							always: [
								{ target: zIndex.z0, cond: 'z0' },
								{ target: zIndex.z10, cond: 'z10' },
								{ target: zIndex.z20, cond: 'z20' },
								{ target: zIndex.z30, cond: 'z30' },
								{ target: zIndex.z40, cond: 'z40' },
								{ target: zIndex.z50, cond: 'z50' },
								{ target: zIndex.auto, cond: 'auto' },
								{ target: 'auto' }
							]
						},
						[zIndex.z0]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.z20]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.z10]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.z30]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.z40]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.z50]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } },
						[zIndex.auto]: { on: { SET_INDEX: { target: 'change', actions: ['cacheData'] } } }
					}
				}
			}
		},
		{
			actions: {
				cacheData: assign({
					zIndex: (context, event) => {
						console.log(event, context)
						const z = event.data?.zIndex
						return z ? (z as zIndex) : zIndex.auto
					}
				})
			},
			guards: {
				z0: (context) => context.zIndex === zIndex.z0,
				z10: (context) => context.zIndex === zIndex.z10,
				z20: (context) => context.zIndex === zIndex.z20,
				z30: (context) => context.zIndex === zIndex.z30,
				z40: (context) => context.zIndex === zIndex.z40,
				z50: (context) => context.zIndex === zIndex.z50,
				auto: (context) => context.zIndex === zIndex.auto
			}
		}
	)
