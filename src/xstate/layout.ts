import { createMachine, interpret, raise } from 'xstate'

const machine = createMachine({
	id: 'layout'
})

export const displayService = interpret(machine, { devTools: true }).start()
