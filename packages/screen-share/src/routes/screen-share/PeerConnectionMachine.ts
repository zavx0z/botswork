import { assign, createMachine } from 'xstate'

const PeerConnectionMachine = createMachine(
	/**
	 * Интерфейс RTCPeerConnection представляет соединение WebRTC
	 * между локальным пиром (участником соединения) на локальном компьютере
	 * и удалённым пиром на удалённом компьютере.
	 * Он предоставляет методы для соединения с удалённым участником соединения,
	 * обслуживания, мониторинга и закрытия соединения.
	 */
	{
		id: 'peer-connection',
		context: {
			connection: null,
			offer: undefined,
			answer: undefined
		},
		invoke: [
			{ id: 'connectionstatechange', src: 'connectionstatechange' },
			{ id: 'datachannel', src: 'datachannel' },
			{ id: 'icecandidate', src: 'icecandidate' },
			{ id: 'icecandidateerror', src: 'icecandidateerror' },
			{ id: 'isolationchange', src: 'isolationchange' },
			{ id: 'negotiationneeded', src: 'negotiationneeded' },
			{ id: 'signalingstatechange', src: 'signalingstatechange' },
			{ id: 'track', src: 'track' }
		],
		initial: 'empty',
		states: {
			empty: {
				always: { target: 'new', cond: 'peerConnectionIsExist' }
			},
			new: {
				description: 'Создан RTCPeerConnection',
				on: {
					ADD_TRACKS: {
						description: 'Добавить треки видео и аудио',
						target: 'tracks_added',
						actions: 'addTrack'
					}
				}
			},
			tracks_added: {
				description: 'Видео и аудио готово к передачи',
				on: {
					SET_OFFER: { target: 'offer_accepted', actions: 'setOffer' }
				}
			},
			offer_accepted: {
				description: 'Запрос на соединение принят',
				invoke: {
					id: 'setRemoteDescription',
					src: 'setRemoteDescription',
					onDone: { target: 'answer_created' },
					onError: { actions: (context, event) => console.log(context, event) }
				}
			},
			answer_created: {
				description: 'Ответ на соединение создан',
				invoke: {
					id: 'answer',
					src: 'createAnswer',
					onDone: { actions: (context, event) => console.log(context, event) },
					onError: { actions: (context, event) => console.log(context, event) }
				}
			}
		},
		schema: {
			events: {} as { type: 'SET_OFFER'; payload: any } | { type: 'ADD_TRACKS'; payload: [MediaStreamTrack] },
			context: {} as {
				connection: RTCPeerConnection | null
				offer: undefined | any | null
				answer: undefined | any | null
			}
		},
		tsTypes: {} as import('./PeerConnectionMachine.typegen.d.ts').Typegen0,
		predictableActionArguments: true
	},
	{
		guards: {
			peerConnectionIsExist: (context) => Boolean(context.connection)
			// peerConnectionIsNotExist: (context) => !Boolean(context.connection)
		},
		actions: {
			addTrack: (context, { payload }) => {
				const stream = new MediaStream(payload)
				const result = stream.getTracks().map((track) => context.connection?.addTrack(track))
				console.log(result)
			},
			setOffer: assign((context, { payload }) => ({
				...context,
				offer: payload
			}))
		},
		services: {
			setRemoteDescription: (context) => {
				if (!context.connection) return Promise.reject('RTCPeerConnection or not exist')
				else if (!context.offer) return Promise.reject('offer not exist')
				return context.connection.setRemoteDescription(new RTCSessionDescription(context.offer))
			},
			createAnswer: (context) =>
				new Promise(async (resolve, reject) => {
					if (!context.connection) return reject('RTCPeerConnection or not exist')
					const answer = await context.connection.createAnswer()
					await context.connection.setLocalDescription(answer)
					return resolve(answer)
				}),
			connectionstatechange: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection возникает,
				 * когда общий статус объекта соединения RTCPeerConnection изменился.
				 * Так же, доступно через свойство установки обработчика события onconnectionstatechange.
				 */
				// console.log(context.connection)
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			datachannel: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection возникает,
				 * когда удалённый пир (участник соединения) добавляет объект данных
				 *  RTCDataChannel в текущее соединение.
				 * Так же, доступно через свойство установки обработчика события ondatachannel.
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			icecandidate: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection возникает
				 * при изменении статуса ICE соединения.
				 * К примеру, ICE соединение разорвано.
				 * Так же, доступно через свойство установки обработчика события oniceconnectionstatechange.
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			icecandidateerror: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection, возникает,
				 * когда статус сборки, представленный классом iceGatheringState, изменяется.
				 * Это указывает на то, что :
				 *  - согласование соединения ICE ещё не началось (статус равен значению "new");
				 *  - согласование соединения ICE началось (статус равен значению "gathering");
				 *  - согласование ICE соединения завершено (статус равен значению "complete").
				 * Так же, доступно через свойство установки обработчика onicegatheringstatechange .
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			isolationchange: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection возникает,
				 * когда свойство isolated на одном из объектов MediaStreamTrack,
				 * связанного с соединением изменяет своё значение.
				 * Объект трека является изолированным isolated,
				 * если его содержимое не может быть доступно содержащему его документу,
				 * по причине невозможности аутентификации, или объект трека прибыл не из источника происхождения страницы.
				 * Так же, доступно через свойство установки обработчика onisolationchange.
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			negotiationneeded: (context, event) => (callback, onReceive) => {
				/**
				 * Событие объекта RTCPeerConnection возникает,
				 * когда необходимо запустить согласование (пере-согласование) ICE соединения;
				 * может произойти при первом открытии соединения, или при необходимости принятия изменений условий сети.
				 * Получатель должен ответить, создав предложение и отправив его другому партнёру.
				 * Так же, доступно через свойство установки обработчика onnegotiationneeded.
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			signalingstatechange: (context, event) => (callback, onReceive) => {
				/**
				 * Событие signalingstatechange возникает,
				 * когда статус сигнализации ICE соединения изменился.
				 * Так же, доступно через свойство установки обработчика onsignalingstatechange.
				 */
				const fn = console.log
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			},
			track: (context, event) => (callback, onReceive) => {
				/**
				 * Событие track возникает после того,
				 * как новый объект трека был добавлен в один из объектов интерфейса RTCRtpReceiver,
				 * которые входят в состав соединения.
				 * Так же, доступно через свойство установки обработчика ontrack.
				 */
				const fn = (event: any) => console.log('iii', event)
				context.connection?.addEventListener('connectionstatechange', fn)
				return () => context.connection?.removeEventListener('connectionstatechange', fn)
			}
		}
	}
)
export default PeerConnectionMachine
