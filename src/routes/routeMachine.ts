import { assign, createMachine } from 'xstate'
import { browser } from '$app/environment'

const routeMachineFabric = () => {
	return createMachine(
		{
			id: 'router',
			initial: 'observe',
			context: {
				pathname: ''
			},
			states: {
				observe: {
					entry: assign((context, event) => {
						if (browser) return { ...context, pathname: window.location.pathname }
						return { ...context }
					}),
					invoke: {
						id: 'pathnameDetect',
						src: (context, event) => (callback) => {
							if (browser) {
								let observer: MutationObserver
								const observeUrlChange = () => {
									let oldHref = document.location.href
									const body = document.querySelector('body')
									observer = new MutationObserver((mutations) => {
										if (oldHref !== document.location.href) {
											oldHref = document.location.href
											callback({ type: 'CHANGE', pathname: document.location.pathname })
										}
									})
									if (body) observer.observe(body, { childList: true, subtree: true })
								}
								observeUrlChange()
								return () => observer.disconnect()
							}
							callback({ type: 'WARNING' })
							return () => {}
						}
					},
					on: {
						CHANGE: {
							actions: ['changePathName']
						},
						WARNING: 'warning'
					}
				},
				warning: {
					on: {
						RELOAD: 'observe'
					}
				}
			},
			schema: {
				context: {} as { pathname: string }
			}
		},
		{
			actions: {
				changePathName: assign((context, event) => ({ ...context, pathname: event.pathname }))
			}
		}
	)
}
export default routeMachineFabric
