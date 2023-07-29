import { browser } from '$app/environment'
import { createWindowReceiver, inspect } from '@xstate/inspect'
if (browser){
	// const url = "http://127.0.0.1:5174/"
	inspect({
		// url: url,
		iframe: false,
		// targetWindow: window
	})
	createWindowReceiver({}).subscribe(console.log)
}