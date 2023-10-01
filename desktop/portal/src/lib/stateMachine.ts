import { inspect } from '@xstate/inspect'
import { assign, createMachine, interpret } from 'xstate'
const machine = createMachine({
    id: "рабочий стол",
    initial: "пустой",
    context: {
        videoElement: null,
        config: { video: { displaySurface: "monitor", cursor: 'never' }, audio: true }
    },
    states: {
        "пустой": {
            on: {
                "MOUNT": { target: "видео-элемент", actions: ['setVideoElement'] }
            }
        },
        "видео-элемент": {
            on: {
                "SELECT_SOURCE": { target: "ожидание" }
            }

        },
        "ожидание": {
            invoke: {
                id: 'mediaSource',
                src: 'mediaSource',
                onDone: { target: "воспроизведение", actions: 'setStream' },
                onError: { target: "видео-элемент" }
            }
        },
        "воспроизведение": {
            on: {
                "ОСТАНОВИТЬ": "видео-элемент"
            }
        }
    },
    schema: {
        events: {} as { type: "MOUNT"; videoElement: HTMLVideoElement } | { type: "SELECT_SOURCE" } | { type: "UNMOUNT" } | { type: "ОСТАНОВИТЬ" },
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
    tsTypes: {} as import("./stateMachine.typegen").Typegen0,
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
        mediaSource: (context) => {
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