import {addMiddleware} from "mobx-state-tree"
import {ACCESS_TOKEN} from "../features/secure/const"
import io from "socket.io-client"
import {enqueueSnackbar} from "notistack"
import i18next from "i18next"
import {deviceDetect} from "react-device-detect"

const {t} = i18next

export const isAuthenticatedSnapshot = (call) => !call.parentId && typeof call.args[0]['id'] !== 'undefined'

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export const sioConnect = store => {
    addMiddleware(store, (call, next) => {
            if (call.name === "@APPLY_SNAPSHOT" && isAuthenticatedSnapshot(call)) {
                let {accessToken} = call.args[0]
                accessToken = typeof accessToken !== "undefined" ? accessToken : localStorage.getItem(ACCESS_TOKEN)

                call.tree.sio = io(process.env.REACT_APP_HOST, {
                    auth: {
                        token: accessToken,
                        device: {
                            ...deviceDetect(window.navigator.userAgent),
                            tz: timezone,
                            width: window.screen.width,
                            height: window.screen.height,
                            resolution: window.devicePixelRatio
                        }
                    },
                    transportOptions: {polling: {extraHeaders: {'Authorization': 'Bearer ' + accessToken}}},
                    transports: ['websocket']
                })
                    .on("connect", socket => {
                        console.log("Connected")
                    })
                    .on("disconnect", socket => {
                        console.log("Disconnected")
                    })
                    .on("error", (error) => {
                        const {message, type} = error
                        setTimeout(() => enqueueSnackbar(t(message, {'ns': 'network'}), {variant: type}), [200])
                    })
                    .on("reconnect", (attempt) => {
                        console.log("Reconnecting", attempt)
                    })
                    .on("reconnect_attempt", (attempt) => {
                        console.log("Reconnecting attempt", attempt)
                    })
                    .on("reconnect_error", (error) => {
                        console.log("Reconnecting error", error)
                    })
                    .on("reconnect_failed", () => {
                        console.log("Reconnecting failed")
                    })
                    .on("ping", () => {
                        console.log("ping")
                    })
                    .on("middleware", () => {
                        console.log("middleware sio")
                    })

            } else if (call.name === 'logout') {
                call.tree.sio.off().disconnect().close()
                call.tree.sio = undefined
            }
            return next(call)
        }
    )
}


export const sioAfterCreate = (store, callback) => {
    addMiddleware(store, (call, next) => {
            const {name, tree} = call
            if (name === "@APPLY_SNAPSHOT" && isAuthenticatedSnapshot(call)) {
                return next(call, () => callback(tree.sio, tree))
            }
            return next(call)
        }
    )
}
export const sioAfterConnect = (store, callback) => {
    addMiddleware(store, (call, next) => {
        const {name, tree} = call
        if (name === "@APPLY_SNAPSHOT" && isAuthenticatedSnapshot(call)) {
            return next(call, () => {
                const {sio} = tree
                sio.on('connect', () => {
                    callback(sio, tree)
                })
            })
        }
            return next(call)
        }
    )
}

export const sioMiddleware = (store, actionsCallbacks) => {
    addMiddleware(store, (call, next) => {
            const {name, tree, args, context} = call
            const act = actionsCallbacks.filter(a => a.action === name)
            if (act.length) {
                const action = act[0]
                // console.log( call.context.$treenode.type.name)
                if (action.model === context.$treenode.type.name) {
                    if (typeof action.before === 'function') {
                        // console.log("item.before")
                        action.before({sio: tree.sio, store: tree, args: args, instance: context})
                    }
                    if (typeof action.after === 'function') {
                        // console.log("item.after")
                        return next(call, result => {
                            action.after({sio: tree.sio, store: tree, result: result, instance: context})
                            return result
                        })
                    }
                    if (!action)
                        return next(call)
                }
                return next(call)
            }
            return next(call)

        }
    )
}


export const sioIsSubscribed = (sio, channel) => !!sio.listeners(channel).length