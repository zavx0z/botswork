import { createMachine } from 'xstate'

const DataChannelMachine = createMachine(
	{
		id: 'data-channel',
		initial: 'ready',
		context: {
			dataChannel: null
		},
		invoke: [
			{ id: 'bufferedamountlow', src: 'bufferedamountlow' },
			{ id: 'close', src: 'close' },
			{ id: 'closing', src: 'closing' },
			{ id: 'error', src: 'error' },
			{ id: 'message', src: 'message' },
			{ id: 'open', src: 'open' }
		],
		states: {
			ready: {}
		},
		schema: {
			context: {} as {
				dataChannel: RTCDataChannel | null
			}
		},
		predictableActionArguments: true,
		tsTypes: {} as import("./DataChannelMachine.typegen.js").Typegen0
	},
	{
		services: {
			bufferedamountlow: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется, когда количество байтов данных в буфере
				 * исходящих данных падает ниже значения, указанного в bufferedAmountLowThreshold.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('bufferedamountlow', fn)
				return () => context.dataChannel?.removeEventListener('bufferedamountlow', fn)
			},
			close: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется, когда закрывается базовый транспорт данных.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('close', fn)
				return () => context.dataChannel?.removeEventListener('close', fn)
			},
			closing: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется, когда базовый транспорт данных вот-вот начнет закрываться.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('closing', fn)
				return () => context.dataChannel?.removeEventListener('closing', fn)
			},
			error: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется при возникновении ошибки в канале данных.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('error', fn)
				return () => context.dataChannel?.removeEventListener('error', fn)
			},
			message: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется, когда сообщение получено от удаленного узла.
				 * Содержимое сообщения можно найти в свойстве события data.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('message', fn)
				return () => context.dataChannel?.removeEventListener('message', fn)
			},
			open: (context, event) => (callback, onReceive) => {
				/**
				 * Отправляется при первом открытии канала данных или
				 * при повторном открытии основного соединения существующего канала данных.
				 */
				const fn = console.log
				context.dataChannel?.addEventListener('open', fn)
				return () => context.dataChannel?.removeEventListener('open', fn)
			}
		}
	}
)
export default DataChannelMachine
