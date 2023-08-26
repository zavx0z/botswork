import { assign, createMachine } from 'xstate'
import { sendParent } from 'xstate/lib/actions.js'
const MediaDeviceMachine = createMachine(
	{
		/** @xstate-layout N4IgpgJg5mDOIC5SAEQQDCCEYQQfCCHEQQHCCE4QAAkEEQQIRBNBuEADpB+EEGEQMzfAYkBwQQPBBBcEECIQQBBBA0EADaABgC6iUAAcA9rACWAFznSAdhJAAPRAHYALMKoBGAEwBWADQgAnokPaAnFWHGAzLtP6Xwl290BfP0s0LDwiRmpAJhBcQBYQQFYQTABaQFkQCljAHhBYwF4QUmZAJBBAahBARBB2QAIQQkAMEEBCEG52QHIQTnLALBBeEXEkEBl5JVV1LQQ9AxMLa0QADkMqU2FpwwA2Uy8fXRd7AKCMHAIScmpMQDYQGNRM3FjmCFUwKjkVADdpAGtLgFtIOQBDAGVpAFcAJwBjMCtdSdRTKNTtPouWbGSYuIaWGwIXQoqjaKbCOYLby+NYgYKbMI7Kj7Q7HU5gX6-aS-KiSAA2bwUADMaU8qC8IO8vn9AcD2qDuhDQFCYXCESMEG5ZmjjPNZi5tNpDB4Fi48QTQttKFQIphiDRkJhcIB2EAisTi5OY7GqvE47Fy5W4gBoQflSWRgnqQnT6IxmRGIXTzKj2bTzBzeHEogKBEAqaQQODqTVbcIgj1C3qIBKzAMIBKmEP2Ysl0vFhwajZa8K0BjkfDprrgrMIGETCVI4zOKhmGbzRa42Mpok6qJxRIpdJZUiNz3CzSIeyzUYhhYdxBuFxURXy4TK0OjdGVkKp4mk6JHE6zzPe5HGPO6Lvb0wqiMD6NDqun0f6w3Gs0WlkV4Chmza3qYpiwqYMLDEiQYyroYamG+Ub+DGQA */
		id: 'media-device',
		initial: 'empty',
		context: {
			videoElement: null,
			config: { video: { displaySurface: 'monitor', cursor: 'never' }, audio: true }
		},
		states: {
			empty: {
				description: 'Видео-элемент предпросмотра не примонтирован',
				on: {
					MOUNT: {
						target: 'videoElement',
						actions: 'setVideoElement'
					}
				}
			},
			videoElement: {
				description: 'Получен видео-элемент',
				on: {
					SELECT_SOURCE: {
						target: 'idle'
					}
				}
			},
			idle: {
				description: 'Ожидание выбора источника пользователем',
				invoke: {
					id: 'mediaSource',
					src: 'mediaSource',
					onDone: {
						target: 'play',
						actions: ['setSrcObject', 'sendParentMediaTracks']
					},
					onError: { target: 'videoElement' }
				}
			},
			play: {
				description: 'Источник выбран и воспроизводится предпросмотр',
				on: {
					UNMOUNT: {
						description: 'Страница закрылась',
						target: 'videoElement'
					}
				}
			}
		},
		schema: {
			events: {} as { type: 'MOUNT'; videoElement: HTMLVideoElement } | { type: 'SELECT_SOURCE' } | { type: 'UNMOUNT' },
			context: {} as {
				videoElement: HTMLVideoElement | null
				config: {}
			},
			services: {} as {
				mediaSource: {
					data: MediaStream
				}
			}
		},
		tsTypes: {} as import('./MediaDeviceMachine.typegen.js').Typegen0,
		predictableActionArguments: true
	},
	{
		guards: {},
		actions: {
			sendParentMediaTracks: sendParent((_, { data }) => ({ type: 'SET_TRACKS', payload: data.getTracks() })),
			setVideoElement: assign({ videoElement: (_, event) => event.videoElement }),
			setSrcObject: (context, event) => {
				const videoTrack = event.data.getVideoTracks()[0]
				if (context.videoElement) context.videoElement.srcObject = new MediaStream([videoTrack])
			}
		},
		services: {
			mediaSource: (context, _) => window.navigator.mediaDevices.getDisplayMedia(context.config)
		}
	}
)

export default MediaDeviceMachine
