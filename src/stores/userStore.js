import userModel from "../features/secure/model"
import {addMiddleware, types} from "mobx-state-tree"
import chatModel from "../features/chat/model"
import io from "socket.io-client"


const socket = io(process.env.REACT_APP_HOST, {transports: ['polling']})
    .on("connect", socket => {
        console.log("Connected")
    })

const model = types.compose(userModel, chatModel).named("user")
const userStore = model.create({}, {socket: socket})
addMiddleware(userStore, (call, next) => {
        const {name} = call
        switch (name) {
            case 'sendMessage':
                break
            default:
                break
        }
        return next(call)
    }
)

export default userStore