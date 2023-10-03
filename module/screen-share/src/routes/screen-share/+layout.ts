// https://webrtc.github.io/samples/
// import { inspect } from '@xstate/inspect'
export let ssr = false
import { PUBLIC_HOST } from "$env/static/public"

import { interpret } from "xstate"
import {
  PeerConnectionMachine,
  DataChannelMachine,
  SignalServerMachine,
  WebRTCReceiverMachine,
  MediaDeviceMachine,
} from "@lib/peer"
// import {io} from "socket.io-client"
// import {Io} from 'channels'
import type { LayoutLoad } from "./$types"

export const load: LayoutLoad = async ({ parent }) => {
  const { auth } = await parent()
  // const {accessToken} = auth.getSnapshot().context
  // const sio = io(PUBLIC_HOST, {
  //     transportOptions: {polling: {extraHeaders: {Authorization: 'Bearer ' + accessToken}}}
  // }).on('connect_error', (err) => {
  //     sio.disconnect()
  //     console.dir(err)
  // })

  // sio.on('connect', () => console.log('Connect'))
  // sio.on('disconnect', () => console.log('Disconnect'))
  // sio.on(Io.CONNECT, (message) => console.log(message))

  // sio.on('error', (err) => {
  //     console.log("+layout.ts:29-")
  //     console.dir(err)
  // })
  const connection = new RTCPeerConnection({
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun3.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:19302" },
    ],
  })
  const machine = WebRTCReceiverMachine.withConfig({
    services: {
      signalServer: SignalServerMachine.withContext({ service: null }),
      mediaDevice: MediaDeviceMachine,
      peerConnection: PeerConnectionMachine.withContext({ ...PeerConnectionMachine.context, connection }),
      dataChannel: DataChannelMachine.withContext({
        dataChannel: connection.createDataChannel("data", { negotiated: true, id: 0 }),
      }),
    },
  })
  // inspect({ iframe: false })
  const webRTCReceiver = interpret(machine, { devTools: true }).start()

  const mediaDeviceMachine = webRTCReceiver.children.get("media-device")
  const useMediaDeviceMachine = (node: HTMLVideoElement) => {
    mediaDeviceMachine?.send({ type: "MOUNT", videoElement: node })
    return {
      destroy() {
        mediaDeviceMachine?.send({ type: "UNMOUNT" })
      },
    }
  }
  return { webRTCReceiver, useMediaDeviceMachine }
}
