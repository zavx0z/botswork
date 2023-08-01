import { createMachine } from 'xstate'

type ContextTypes = {
	name: string
	path?: string | undefined
	component?: any
	props: { [key: string]: any }
}
const ActivityPanelButton = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QCMCuAXdB7AdgOgEscBDAY3QIDcwBiAQQGEAVASQDU6mBRAbQAYAuolAAHLLAIVcwkAA9EARgDsANgA0IAJ6IATAFYAzHj4AWBSouWrATgC+tjWky5CJclVoAJAPJsuAJX4hJBAxCSkcGXkEZXUtRAAOBTw9e0cMbHwyCmoaABEuRlYObiCZMMkCaRDo2I1tBB0+HRSzK3aVOwcQJ0y8bI8aHz9AwXLxSurQaJMLPBUdE2tOkwTFnQVret09FqVU7t6XAdyAIQAZAFVR4NEJiKjdAz4U7Zjd4zbrJQUEk0XVmkehkXAALLDUABOkCGvgCZRCFQeNUQCyUeCSixWa3+mzeBgULQM+yBR3w4KhMIu1wRd3CVUiKIQej4yQUegWm1W602BnxSiMSms5g6FiUpJB5IhYGhEHozHYnF4Y0R9wZjwQsxU80Wy2s3NxW3ijWaeH0EucWXcuS41Bw6AABCZaaE1VM5IgDLMdUtsTyjQ1fno8CLRZYut0cFgIHAZGTxvT3dEALRxBqpi19IgnMAJyaM6aIf5vJpGUyh0VddKW-rW3OqxMFj0IL0tBZ6EsmYMVsNV4E1ikyyB55GFhALIw6TFcnEbAOelTohIkw6SvCwdDEdD1un5jUGL0+vUGudvBQKIw9yv2exAA */
	id: 'button',
	initial: 'inactive',
	states: {
		inactive: {
			on: {
				ACTIVATE: { target: 'active', actions: () => console.log('activate') },
				HOVER: 'hovered'
			}
		},
		active: {
			on: {
				DEACTIVATE: 'inactive',
				HOVER: 'hovered',
				BLUR: 'inactive'
			}
		},
		hovered: {
			on: {
				HOVER: 'hovered',
				BLUR: 'inactive',
				ACTIVATE: 'active'
			}
		}
	},
	predictableActionArguments: true,
	preserveActionOrder: true,
	tsTypes: {} as import('./activityLayoutButtonMachine.typegen.d.ts').Typegen0,
	schema: {
		events: {} as { type: 'ACTIVATE' } | { type: 'DEACTIVATE' } | { type: 'HOVER' } | { type: 'BLUR' },
		context: {} as ContextTypes
	}
})
export default ActivityPanelButton
