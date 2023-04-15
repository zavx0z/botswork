import userModel from "../features/secure/model"
import {types} from "mobx-state-tree"
import {sioMiddleware} from "../middleware/sioMiddleware"
import chatModel from "../features/chat/models/chatModel"
import usersModel from "../features/users/models/modelUsers"
import sioModel from "../features/sio/sioModel"

const userStore = types
    .compose(
        userModel,
        sioModel,
        usersModel,
        chatModel,
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
