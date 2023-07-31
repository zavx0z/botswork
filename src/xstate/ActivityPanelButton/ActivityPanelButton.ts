import { createMachine } from 'xstate'

export enum ActivityButtonState {
	Inactive = 'inactive',
	Active = 'active',
	Hovered = 'hovered'
}
type EventTypes = { type: 'ACTIVATE' } | { type: 'DEACTIVATE' } | { type: 'HOVER' } | { type: 'BLUR' }
type ContextTypes = {
	name: string
	path?: string | undefined
}
const ActivityPanelButton = createMachine({
	/** @xstate-layout N4IgpgJg5mDOIC5QCMCuAXdB7AdgOgEscBDAY3QIDcwBiAQQGEAVASQDU6mBRAbQAYAuolAAHLLAIVcwkAA9EARgDsANgA0IAJ6IATAFYAzHj4AWBSouWrATgC+tjWky5CJclVoAJAPJsuAJX4hJBAxCSkcGXkEZXUtRAAOBTw9e0cMbHwyCmoaABEuRlYObiCZMMkCaRDo2I1tBB0+HRSzK3aVOwcQJ0y8bI8aHz9AwXLxSurQaJMLPBUdE2tOkwTFnQVret09FqVU7t6XAdyAIQAZAFVR4NEJiKjdAz4U7Zjd4zbrJQUEk0XVmkehkXAALLDUABOkCGvgCZRCFQeNUQCyUeCSixWa3+mzeBgULQM+yBR3w4KhMIu1wRd3CVUiKIQej4yQUegWm1W602BnxSiMSms5g6FiUpJB5IhYGhEHozHYnF4Y0R9wZjwQsxU80Wy2s3NxW3ijWaeH0EucWXcuS41Bw6AABCZaaE1VM5IgDLMdUtsTyjQ1fno8CLRZYut0cFgIHAZGTxvT3dEALRxBqpi19IgnMAJyaM6aIf5vJpGUyh0VddKW-rW3OqxMFj0IL0tBZ6EsmYMVsNV4E1ikyyB55GFhALIw6TFcnEbAOelTohIkw6SvCwdDEdD1un5jUGL0+vUGudvBQKIw9yv2exAA */
	id: 'button',
	initial: ActivityButtonState.Inactive,
	states: {
		[ActivityButtonState.Inactive]: {
			on: {
				ACTIVATE: ActivityButtonState.Active,
				HOVER: ActivityButtonState.Hovered
			}
		},
		[ActivityButtonState.Active]: {
			on: {
				DEACTIVATE: ActivityButtonState.Inactive,
				HOVER: ActivityButtonState.Hovered,
				BLUR: ActivityButtonState.Inactive
			}
		},
		[ActivityButtonState.Hovered]: {
			on: {
				HOVER: ActivityButtonState.Hovered,
				BLUR: ActivityButtonState.Inactive,
				ACTIVATE: ActivityButtonState.Active
			}
		}
	},
	tsTypes: {} as import("./ActivityPanelButton.typegen.d.ts").Typegen0,
	schema: {
		events: {} as EventTypes,
		context: {} as ContextTypes
	}
})
export default ActivityPanelButton
