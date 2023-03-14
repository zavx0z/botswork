import io from "socket.io-client"
import {enqueueSnackbar} from "notistack"
import i18next from "i18next"

const {t} = i18next
const connectSIO = (userId, accessToken) => {
    const sio = io(
        process.env.REACT_APP_HOST, {
            auth: {token: accessToken},
            transportOptions: {polling: {extraHeaders: {'Authorization': 'Bearer ' + accessToken}}},
            transports: ['websocket']
        })
    sio.on("connect", socket => {
        console.log("Connected")
    })
    sio.on("disconnect", socket => {
        console.log("Disconnected")
    })
    sio.on("error", (error) => {
        const {message, type} = error
        setTimeout(() => enqueueSnackbar(t(message, {'ns': 'network'}), {variant: type}), [200])
    })
    sio.on("reconnect", (attempt) => {
        console.log("Reconnecting", attempt)
    })
    sio.on("reconnect_attempt", (attempt) => {
        console.log("Reconnecting attempt", attempt)
    })
    sio.on("reconnect_error", (error) => {
        console.log("Reconnecting error", error)
    })
    sio.on("reconnect_failed", () => {
        console.log("Reconnecting failed")
    })
    sio.on("ping", () => {
        console.log("ping")
    })
    return sio
}
export default connectSIO