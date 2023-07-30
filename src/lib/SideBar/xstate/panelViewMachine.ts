import { createMachine } from 'xstate'

export default createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QAcCGA7MAbAagSzAHcA6AYywHtZIBiAeQAUBRAOQG0AGAXURSrwAueCul4gAHogCsARgDsxAMwAOZQBZFAJimaOMgJxS1AGhABPRMoBsxNYakrN+mR2UPNAXw+m0mXARIKZDBMCBoAYQAZOgBlJk4eJBBkfiERMUkEKQ59Yl0cxUUONTVlGSs1KVMLBBlFGzspHRUjDk1Pb2SMbHwiYjx0QXpmdm4xFNhBYVEkzM1lTWIrdrKZDTkNg0VqxGdifXtFfUU5VTll-S8fbv8+gaGo2PixpImp9NnEecXl+Zk1k6bY47BDaGwHJrlKyKIz6DiFLyddAUCBwcY3XqEcapaYZRAybJLFYcc7yGTKORVcyIAC0HGI2RKagMmisZSk+jkayuXT8mLIlGoEGxkzSM1AmWWMn2xQ4Vik1nOHA5ILquUaskKck0-zkajkPN8PQCxCCIUgIve4okiCOUiU2n0JVZyqsaxB+kWGvmyn0Vk58kunSNtxI9wElrFeNq+mURPmJLdXIpVJqseIC1U0MU5JyVhJiI8QA */
	id: 'panelView',
	initial: 'init',
	states: {
		closed: {
			on: {
				OPEN: 'opened'
			}
		},
		opened: {
			on: {
				CLOSE: 'closed'
			}
		},
		init: {
			on: {
				OPEN: 'opened',
				CLOSE: 'closed'
			}
		}
	}
})
