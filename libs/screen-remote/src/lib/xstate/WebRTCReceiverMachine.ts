import { createMachine, send } from 'xstate'

const WebRTCReceiverMachine = createMachine(
	{
		id: 'webRTC-receiver',
		invoke: [
			{ id: 'peer-connection', src: 'peerConnection' },
			{ id: 'data-channel', src: 'dataChannel' },
			{ id: 'signal-server', src: 'signalServer' },
			{ id: 'media-device', src: 'mediaDevice' }
		],
		initial: 'new',
		states: {
			new: {
				description: 'Экземпляр пирингового соединения с каналом данных и видео-просмотром',
				on: {
					SET_TRACKS: {
						description: 'Установка медиа-треков в RTCPeerConnection',
						target: 'media',
						actions: 'addTrackToPeerConnection'
					}
				}
			},
			media: {
				description: 'Медиа-треки получены и установлены',
				on: {
					SET_OFFER: {
						description: 'Получение запроса на соединение',
						target: 'connecting',
						actions: 'sendOfferToPeerConnection'
					}
				}
			},
			connecting: {
				description: 'Установка соединения',
				on: {
					SEND_ANSWER: {
						description: 'Отправка ответа готовности подключения',
						target: 'connected',
						actions: 'sendAnswerToSignalServer'
					}
				}
			},
			connected: {
				description: 'Соединение установлено'
			}
		},
		schema: {
			events: {} as
				| { type: 'SET_OFFER'; payload: any }
				| { type: 'SEND_ANSWER' }
				| { type: 'SET_TRACKS'; payload: [MediaStreamTrack] }
		},
		tsTypes: {} as import("./WebRTCReceiverMachine.typegen").Typegen0,
		predictableActionArguments: true
	},
	{
		actions: {
			addTrackToPeerConnection: send((_, { payload }) => ({ type: 'ADD_TRACKS', payload }), { to: 'peer-connection' }),
			sendOfferToPeerConnection: send((_, { payload }) => ({ type: 'SET_OFFER', payload }), { to: 'peer-connection' }),
			sendAnswerToSignalServer: (context, event) => {}
		}
	}
)
export default WebRTCReceiverMachine
