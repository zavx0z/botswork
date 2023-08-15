import type { Session } from '@supabase/supabase-js'
import type { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js'
import { assign, createMachine } from 'xstate'
export default createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOgG5gCcBLAMyIGNl0iB7AOwGIJ6xsi7caBrV2OWWnQDaABgC6iUAAcaA6vUkgAHogBMAdgCc2AKwBmAIyqAHABYRANlPHNp0xYA0IAJ6IDBkdk3fbI4+pFAnVVVAF9QpzQsPEJSCipBBkICGgJsKQAbKhJUgFtsPlgBelEJJBAZOUFFFQQNbX0jM0trW3snVzrgrx8DPRFTdVNNIfDIjBxUOijMVKIAL0gGADUAUQAlAEkAMQBNUsVKonk6GsRDbT1TPWM+ix1rCwMLRxc1EVUe7xa9C00TYxhCIgGbYGZzRYQFYbHb7cSHWTHarlWoXbBXG53B7GJ4vDqICyeHyaQGE2zeQbhYF0GgQOCKGYIqoKFGIAC0hnxCDZqgs2ECgQM6j0mhEOiCejGIImMWIZEoJyZSJZoFqQq5Fk+xIsvyFItFAyloKm4OIkKVitZCGuOl0mp092emgdnLedXc2GG33U+hxotUOiNMtNC0gFuRqsQNrtAcdfxdBg12i9zudvxCtnUVNCQA */
		id: 'auth',
		initial: 'verification',
		states: {
			verification: {
				invoke: {
					id: 'session',
					src: 'session',
					onDone: [
						{
							target: 'authorized',
							actions: 'done',
							cond: 'sessionExist'
						},
						{
							target: 'unauthorized',
							cond: 'sessionNotExist'
						}
					],
					onError: { target: 'unauthorized', actions: 'error' }
				}
			},
			authorized: {
				on: {
					VERIFY: { target: 'verification', actions: [] }
				}
			},
			unauthorized: {
				on: {
					VERIFY: { target: 'verification', actions: [] }
				}
			}
		},
		predictableActionArguments: true,
		schema: {
			context: {} as {
				service: SupabaseAuthClient
			},
			events: {} as { type: 'VERIFY' },
			services: {} as {
				session: { data: { data: { session: Session | null } } }
			}
		},
		tsTypes: {} as import('./authMachine.typegen.d.ts').Typegen0
	},
	{
		guards: {
			sessionExist: (_, event) => {
				console.log(event.data.data)
				return Boolean(event.data.data.session)
			},
			sessionNotExist: (_, event) => !Boolean(event.data.data.session)
		},
		actions: {
			done: (context, { data }) => console.log(data),
			error: (context, event) => console.log(event)
		},
		services: {
			session: (context, event) => context.service.getSession()
		}
	}
)
