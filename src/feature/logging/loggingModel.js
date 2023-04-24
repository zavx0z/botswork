import {types} from "mobx-state-tree"
import {alignString} from "./utils/string"

const LogMode = {
    OFF: 'off',
    CONSOLE: 'console',
    REMOTE: 'remote'
}
const loggingModel = types
    .model({
        nameLength: types.integer,
        itemLength: types.integer,
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
        onConsoleLog(){
            console.log('log', 'logsModel', 'Локально в devtools')
            console.log = self['originalLog']
            window.onerror = self['originalOnError']
            localStorage.setItem('log', LogMode.CONSOLE)
            console.log('log', 'logsModel', 'Локально в devtools')
        },
        offConsoleLog() {
            console.log = function (){}
            window.onerror = self['originalOnError']
            localStorage.setItem('log', LogMode.OFF)
        },
        addLog(payload) {
        },
    }))
export default loggingModel