import { inspect } from '@xstate/inspect'
import { assign, createMachine, interpret } from 'xstate'
const machine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5SAEQQDCCEYQQfCCHEQQHCCE4QAAkEEQQIRBNBuEADpB+EEGEQMzfAYkBwQQPBBBcEECIQQBBBA0EADaABgC6iUAAcA9rACWAFznSAdhJAAPRAHYALMKoBGAEwBWADQgAnokPaAnFWHGAzLtP6Xwl290BfP0s0LDwiRmpAJhBcQBYQQFYQTABaQFkQCljAHhBYwF4QUmZAJBBAahBARBB2QAIQQkAMEEBCEG52QHIQTnLALBBeEXEkEBl5JVV1LQQ9AxMLa0QADkMqU2FpwwA2Uy8fXRd7AKCMHAIScmpMQDYQGNRM3FjmCFUwKjkVADdpAGtLgFtIOQBDAGVpAFcAJwBjMCtdSdRTKNTtPouWbGSYuIaWGwIXQoqjaKbCOYLby+NYgYKbMI7Kj7Q7HU5gX6-aS-KiSAA2bwUADMaU8qC8IO8vn9AcD2qDuhDQFCYXCESMEG5ZmjjPNZi5tNpDB4Fi48QTQttKFQIphiDRkJhcIB2EAisTi5OY7GqvE47Fy5W4gBoQflSWRgnqQnT6IxmRGIXTzKj2bTzBzeHEogKBEAqaQQODqTVbcIgj1C3qIBKzAMIBKmEP2Ysl0vFhwajZa8K0BjkfDprrgrMIGETCVI4zOKhmGbzRa42Mpok6qJxRIpdJZUiNz3CzSIeyzUYhhYdxBuFxURXy4TK0OjdGVkKp4mk6JHE6zzPe5HGPO6Lvb0wqiMD6NDqun0f6w3Gs0WlkV4Chmza3qYpiwqYMLDEiQYyroYamG+Ub+DGQA */
    id: "рабочий стол",
    initial: "пустой",
    context: {
        videoElement: null,
        config: { video: { displaySurface: "monitor", cursor: 'never' }, audio: true }
    },
    states: {
        "пустой": {
            on: {
                "МОНТАЖ": { target: "видео-элемент", actions: ['setVideoElement'] }
            }
        },
        "видео-элемент": {
            on: {
                "ВЫБОР ИСТОЧНИКА": { target: "ожидание" }
            }

        },
        "ожидание": {
            invoke: {
                id: 'mediaSource',
                src: 'mediaSource',
                onDone: { target: "воспроизведение", actions: 'setStream' },
                onError: { target: 'видео-элемент' }
            }
        },
        "воспроизведение": {
            on: {
                "ОСТАНОВИТЬ": "видео-элемент"
            }
        }
    },
    schema: {
        events: {} as { type: "МОНТАЖ"; videoElement: HTMLVideoElement } | { type: "ВЫБОР ИСТОЧНИКА" } | { type: "ОТКЛЮЧИТЬ" } | { type: "ОСТАНОВИТЬ" },
        context: {} as {
            videoElement: HTMLVideoElement | null,
            config: {}
        },
        services: {} as {
            mediaSource: {
                data: MediaStream
            }
        }
    },
    tsTypes: {} as import("./stateMachine.typegen.d.ts").Typegen0,
    predictableActionArguments: true,
}, {
    actions: {
        setVideoElement: assign({ videoElement: (_, event) => event.videoElement }),
        setStream: (context, event) => {
            const videoTrack = event.data.getVideoTracks()[0]
            if (context.videoElement)
                context.videoElement.srcObject = new MediaStream([videoTrack])
        }
    },
    services: {
        mediaSource: (context, event) => {
            return new Promise((resolve, reject) => {
                window.navigator.mediaDevices
                    .getDisplayMedia(context.config)
                    .then(stream => resolve(stream))
                    .catch(error => reject(error))

            })
        }
    }
})

inspect({
    url: 'https://stately.ai/viz/embed?zoom=1&panel=full&showOriginalLink=0&mode=viz&pan=1&controls=1&inspect' 
})

const stateMachine = interpret(machine, { devTools: true })
stateMachine.start()
export default stateMachine