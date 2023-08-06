import { assign, createMachine } from 'xstate'
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public'
import { createClient } from '@supabase/supabase-js'
const machine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5QEMCuAXAFgOlQOzSwHsAnASwC9IBiAGQHkBxASQDkBtABgF1FQAHIrDLoyRPHxAAPRABYAjAE5sigMwB2AKwAaEAE9EqgGzqAvqd2EcV0pRoNG9AKoAVLryQhBw0eMkyEBWU1LV0DQKMAJnNLDGs42yoIagApejZ3SW8RMQlPANlC7HkADlD9RBL5GJArbAArIjI8OiZnNx4soRy-fMR5WU5sSMUjMp0KhA1NGrrG5uoAJQBRAGVljo8Bbt880ACBoZGx8vDIyNlzCxA8Igg4SSsun1z-RABaIzCPo1m43AICXISWePT20kQkSMRmK42+U0UJT+WGwNmBkFBuzeCE0uOwJUiVUiEzOmki2FUyJw83B2SxfUCkXh8nk5OJV1MQA */
		id: 'auth',
		initial: 'verification',
		states: {
			verification: {
				invoke: {
					id: 'session',
					src: 'session',
					onError: {ta},
					onDone:{},
				}
			},
			unauthorized: {
				on: {
					VERIFY: { target: 'verification', actions: [] }
				}
			},
			authorized: {
				on: {
					VERIFY: { target: 'verification', actions: [] }
				}
			}
		},
		predictableActionArguments: true,
		schema: {
			context: {} as {
				service: any
			},
			events: {} as { type: 'VERIFY' }
		},
		tsTypes: {} as import('./authMachine.typegen.d.ts').Typegen0
	},
	{
		services: {
			session: (context, event) => context.service.getSession()
		}
	}
)

const authMachine = machine.withContext({
	service: createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
})
