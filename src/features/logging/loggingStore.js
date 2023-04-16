import {addMiddleware} from "mobx-state-tree"
import {sioAfterConnect} from "../sio/sioMiddleware"
import loggingModel from "./loggingModel"


const loggingStore = loggingModel.create({
    nameLength: 10,
    itemLength: 15
})

export const logSioMiddleware = store => sioAfterConnect(store, (sio, store) => {
    sio.on('remoteLog', payload => {
        switch (payload.type) {
            case 'console':
                loggingStore.onConsoleLog()
                break
            case 'remote':
                loggingStore.onRemoteLog()
                break
            case 'off':
                loggingStore.offRemoteLog()
                loggingStore.offConsoleLog()
                break
            default:
                loggingStore.onConsoleLog()
                break
        }
    })
    addMiddleware(loggingStore, (call, next) => {
        const {name, args} = call
        if (name === 'addLog')
            sio.emit('remoteLog', args[0])
        return next(call)
    })
})

export default loggingStore