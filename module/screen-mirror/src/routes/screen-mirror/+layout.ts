// https://webrtc.github.io/samples/
// import {inspect} from '@xstate/inspect'
export let ssr = false
import { interpret } from "xstate"
import {
  PeerConnectionMachine,
  DataChannelMachine,
  SignalServerMachine,
  WebRTCReceiverMachine,
  MediaDeviceMachine,
} from "@lib/peer"
import type { LayoutLoad } from "./$types"
import { PUBLIC_IO_HOST } from "$env/static/public"

export const load: LayoutLoad = async ({ parent }) => {
  const { auth } = await parent()
  const { accessToken, id } = auth.getSnapshot().context
  document.cookie = `accessToken=${accessToken}`

  const socket = new WebSocket(PUBLIC_IO_HOST)
  socket.addEventListener("message", (event) => {
    console.log("message", event.data)
  })
  socket.addEventListener("open", (event) => {
    console.log("open", event)
  })
  socket.addEventListener("close", (event) => {
    console.log("close", event.code, event.reason)
  })
  socket.addEventListener("error", (event) => {
    console.log("error", event.type)
  })
  setTimeout(() => {
    socket.send("message")
  }, 1000)

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
  // inspect({iframe: false})
  const webRTCReceiver = interpret(machine, { devTools: true }).start()
  return { webRTCReceiver }
}
