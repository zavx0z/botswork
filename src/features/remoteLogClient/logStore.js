import {addMiddleware, types} from "mobx-state-tree"
import {sioAfterConnect} from "../../middleware/sioMiddleware"
import {alignString} from "./string"

const logsModel = types
    .model({
        nameLength: types.integer,
        itemLength: types.integer,
    })
    .volatile(self => ({
        originalLog: console.log,
    }))
    .actions(self => ({
        afterCreate() {
            localStorage.getItem('logon') === 'true' ?
                this.onRemoteLog() :
                this.offRemoteLog()
        },
        onRemoteLog() {
            const {addLog, originalLog, itemLength, nameLength} = self
            console.log = function (...args) {
                let string
                switch (args.length) {
                    case 1:
                        string = args[0]
                        break
                    case 3:
                        const [name, item, msg] = args
                        const nameString = alignString(`[${name}]`, nameLength)
                        const itemString = item ? alignString(item, itemLength, 'center') : " ".repeat(itemLength)
                        string = `${nameString}${itemString}${msg}`
                        break
                    default:
                        string = args.join(' ')
                        break
                }
                originalLog.apply(console, [string])
                addLog(string)
            }
            localStorage.setItem('logon', 'true')
        },
        offRemoteLog() {
            console.log = self['originalLog']
            localStorage.setItem('logon', 'false')
        },
        addLog(payload) {
        }
    }))

const logStore = logsModel.create({
    nameLength: 10,
    itemLength: 15
})

export const logSioMiddleware = store => sioAfterConnect(store, (sio, store) => {
    sio.on('remoteLog', payload => payload ? logStore.onRemoteLog() : logStore.offRemoteLog())
    addMiddleware(logStore, (call, next) => {
        const {name, args} = call
        if (name === 'addLog')
            sio.emit('remoteLog', args[0])
        return next(call)
    })
})

export default logStore