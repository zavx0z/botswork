import io from "socket.io-client"

const connectSIO = (userId, accessToken) => io(
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
    .on("connect", socket => {
        console.log("Connected")
    })
    .on("disconnect", socket => {
        console.log("Disconnected")
    })

export default connectSIO