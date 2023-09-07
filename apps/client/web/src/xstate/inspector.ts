import { browser } from '$app/environment'
import { createWindowReceiver, inspect } from '@xstate/inspect'
import { PUBLIC_XSTATE_DEBUG } from '$env/static/public'
if (browser && PUBLIC_XSTATE_DEBUG === 'true'){
	// const url = "http://127.0.0.1:5174/"
	inspect({
		// url: url,
		iframe: false,
		// targetWindow: window
	})
	// createWindowReceiver({}).subscribe(console.log)
}