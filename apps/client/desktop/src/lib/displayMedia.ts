export default (node: HTMLVideoElement, config = { video: { displaySurface: "monitor", cursor: 'never' }, audio: true }) => {
	let stream: MediaStream | null = null
	window.navigator.mediaDevices
		.getDisplayMedia(config)
		.then((mediaStream) => {
			node.dispatchEvent(new CustomEvent('streamReceived', { detail: { status: 'SUCCESS', mediaStream } }))
			stream = mediaStream
			node.srcObject = new MediaStream([mediaStream.getVideoTracks()[0]])
		})
		.catch((e) => {
			switch (e.name) {
				case 'NotAllowedError':
					node.dispatchEvent(new CustomEvent('streamReceived', { detail: { status: 'ABORT' } }))
					break
				default:
					console.dir(e)
					break
			}
		})
	return {
		destroy() {
			if (stream) {
				stream.getTracks().forEach((track) => track.stop())
				stream = null
			}
		}
	}
}
