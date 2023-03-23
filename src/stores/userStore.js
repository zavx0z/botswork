import userModel from "../features/secure/model"
import {types} from "mobx-state-tree"
import {sioMiddleware} from "../middleware/sioMiddleware"
import chatModel from "../features/chat/models/chatModel"

const userStore = types
    .compose(
        userModel,
        chatModel
    )
    .named("user")
    .create({})
export default userStore

sioMiddleware(userStore, [
    {
        action: 'sendMessage',
        cb: ({args}) => console.log(args[0])
    }
])
