// https://webrtc.github.io/samples/
export let ssr = false
import {interpret} from 'xstate'
import {PeerConnectionMachine, DataChannelMachine, SignalServerMachine, WebRTCReceiverMachine, MediaDeviceMachine} from 'screen-remote'
// import { inspect } from '@xstate/inspect'

export const load = () => {
    const signalServer = SignalServerMachine.withContext({service: null})
    const connection = new RTCPeerConnection({
        iceServers: [
            {urls: 'stun:stun.l.google.com:19302'},
            {urls: 'stun:stun1.l.google.com:19302'},
            {urls: 'stun:stun2.l.google.com:19302'},
            {urls: 'stun:stun3.l.google.com:19302'},
            {urls: 'stun:stun4.l.google.com:19302'}
        ]
    })
    const peerConnection = PeerConnectionMachine.withContext({...PeerConnectionMachine.context, connection})
    const dataChannel = DataChannelMachine.withContext({
        dataChannel: connection.createDataChannel('data', {negotiated: true, id: 0})
    })
    const machine = WebRTCReceiverMachine.withConfig({
        services: {signalServer, mediaDevice: MediaDeviceMachine, peerConnection, dataChannel}
    })
    // inspect({ iframe: false })
    const webRTCReceiver = interpret(machine, {devTools: true}).start()
    return {webRTCReceiver}
}
