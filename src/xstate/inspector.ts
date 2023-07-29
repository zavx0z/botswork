import { browser } from '$app/environment'
import { inspect } from '@xstate/inspect'
if (browser)
	inspect({
		// url: "http://127.0.0.1:5173/",
		iframe: false
		// targetWindow: window
	})
