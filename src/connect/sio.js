import io from "socket.io-client"

const connectSIO = (userId, accessToken) => {
    const sio = io(
        process.env.REACT_APP_HOST, {
            auth: {
                token: accessToken
            },
            query: {
                userId: userId
            },
            transportOptions: {
                polling: {
                    extraHeaders: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }
            },
            transports: ['polling']

        })
    sio.on("connect", socket => {
        console.log("Connected")
    })
    sio.on("disconnect", socket => {
        console.log("Disconnected")
    })
    sio.on("error", (error) => {
        console.log("Error", error)
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