// https://webrtc.github.io/samples/
export let ssr = false
import type { LayoutLoad } from './$types'
import { interpret } from 'xstate'
import SignalServerMachine from './SignalServerMachine'
import mediaDevice from './MediaDeviceMachine'
import WebRTCReceiverMachine from './WebRTCReceiverMachine'
// import { inspect } from '@xstate/inspect'
import PeerConnectionMachine from './PeerConnectionMachine'
import DataChannelMachine from './DataChannelMachine'

export const load: LayoutLoad = async ({ parent }) => {
	const signalServer = SignalServerMachine.withContext({ service: null })
	const connection = new RTCPeerConnection({
		iceServers: [
			{ urls: 'stun:stun.l.google.com:19302' },
			{ urls: 'stun:stun1.l.google.com:19302' },
			{ urls: 'stun:stun2.l.google.com:19302' },
			{ urls: 'stun:stun3.l.google.com:19302' },
			{ urls: 'stun:stun4.l.google.com:19302' }
		]
	})
	const peerConnection = PeerConnectionMachine.withContext({ ...PeerConnectionMachine.context, connection })
	const dataChannel = DataChannelMachine.withContext({
		dataChannel: connection.createDataChannel('data', { negotiated: true, id: 0 })
	})
	const machine = WebRTCReceiverMachine.withConfig({
		services: { signalServer, mediaDevice, peerConnection, dataChannel }
	})
	// inspect({ iframe: false })
	const webRTCReceiver = interpret(machine, { devTools: true }).start()


	const mediaDeviceMachine = webRTCReceiver.children.get('media-device')
	const useMediaDeviceMachine = (node: HTMLVideoElement) => {
		mediaDeviceMachine?.send({ type: 'MOUNT', videoElement: node })
		return {
			destroy() {
				mediaDeviceMachine?.send({ type: 'UNMOUNT' })
			}
		}
	}

	return { webRTCReceiver, mediaDeviceMachine, useMediaDeviceMachine }
}
