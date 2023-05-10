import {addMiddleware, types} from "mobx-state-tree"
import {sioAfterConnect} from "./sio/sioMiddleware"

const alignString = (str, minLength, alignment = 'left') => {
    const spacesToAdd = minLength - str.length
    let spacesToAddLeft, spacesToAddRight
    if (spacesToAdd < 0)
        return str
    switch (alignment) {
        case "left":
            spacesToAddLeft = 0
            spacesToAddRight = spacesToAdd
            break
        case "right":
            spacesToAddLeft = spacesToAdd
            spacesToAddRight = 0
            break
        case "center":
            spacesToAddLeft = Math.floor(spacesToAdd / 2)
            spacesToAddRight = spacesToAdd - spacesToAddLeft
            break
        default:
            throw new Error("Invalid alignment type: " + alignment)
    }

    return " ".repeat(spacesToAddLeft) + str + " ".repeat(spacesToAddRight)
}
const LogMode = {
    OFF: 'off',
    CONSOLE: 'console',
    REMOTE: 'remote'
}
export const neutronLogging = types
    .model('neutronLogging',{
        nameLength: types.integer,
        itemLength: types.integer,
        include: types.array(types.string),
        exclude: types.array(types.string),
    })
    .volatile(self => ({
        originalLog: console.log,
        originalOnError: window.onerror,
    }))
    .actions(self => ({
        afterCreate() {
            const logMode = localStorage.getItem('log')
            switch (logMode) {
                case LogMode.OFF:
                    this.offRemoteLog()
                    this.offConsoleLog()
                    break
                case LogMode.CONSOLE:
                    this.onConsoleLog()
                    break
                case LogMode.REMOTE:
                    this.onRemoteLog()
                    break
                default:
                    this.onConsoleLog()
                    break
            }
        },
        serializeError(error) { // добавляем метод для сериализации ошибок
            const serializedError = {
                name: error.name,
                message: error.message,
                stack: error.stack,
                timestamp: Date.now(),
            }
            return JSON.stringify(serializedError)
        },
        onError(message, source, lineno, colno, error) { // добавляем обработчик ошибок
            const serializedError = this.serializeError(error)
            const string = `${message} - ${source}:${lineno}:${colno}\n${serializedError}`
            this.addLog(string)
        },
        onRemoteLog() {
            const {addLog, itemLength, nameLength} = self
            window.onerror = this.onError
            console.log = function (...args) {
                let string
                switch (args.length) {
                    case 1:
                        string = JSON.stringify(args[0])
                        break
                    case 3:
                        const [name, item, msg] = args
                        const nameString = alignString(`[${name}]`, nameLength)
                        const itemString = item ? alignString(item, itemLength, 'center') : " ".repeat(itemLength)
                        const message = JSON.stringify(msg)
                        string = `${nameString}${itemString}${message}`
                        break
                    default:
                        string = JSON.stringify(args.join(' '))
                        break
                }
                addLog(string)
            }

            localStorage.setItem('log', LogMode.REMOTE)
            console.log('log', 'logsModel', 'Логи удаленно в админку')
        },
        offRemoteLog() {
            console.log('log', 'logsModel', 'Отключение')
            window.onerror = self['originalOnError']
            localStorage.setItem('log', LogMode.OFF)
        },
        onConsoleLog() {
            console.log('log', 'logsModel', 'Локально в devtools')
            console.log = self['originalLog']
            window.onerror = self['originalOnError']
            localStorage.setItem('log', LogMode.CONSOLE)
            console.log('log', 'logsModel', 'Локально в devtools')
        },
        offConsoleLog() {
            console.log = function () {
            }
            window.onerror = self['originalOnError']
            localStorage.setItem('log', LogMode.OFF)
        },
        addLog(payload) {
        },
    }))

export const entanglement_Logging_SIO = everything => sioAfterConnect(everything, (sio, everything) => {
    sio.on('remoteLog', payload => {
        const {logging} = everything.neutron
        console.log()
        switch (payload.type) {
            case 'console':
                logging.onConsoleLog()
                break
            case 'remote':
                logging.onRemoteLog()
                break
            case 'off':
                logging.offRemoteLog()
                logging.offConsoleLog()
                break
            default:
                logging.onConsoleLog()
                break
        }
    })
    addMiddleware(everything.neutron.logging, (call, next) => {
        const {name, args} = call
        if (name === 'addLog')
            sio.emit('remoteLog', args[0])
        return next(call)
    })
})

