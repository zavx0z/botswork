import ssoModel from "../shared/secure/ssoModel"
import {types} from "mobx-state-tree"
import chatModel from "../shared/chat/models/chatModel"
import usersModel from "../shared/users/models/modelUsers"
import sioModel from "../shared/sio/sioModel"
import {sioMiddleware} from "../shared/sio/sioMiddleware"

const rootStore = types
    .compose(
        ssoModel,
        sioModel,
        usersModel,
        chatModel,
    )
    .named("root")
    .create({})
export default rootStore

sioMiddleware(rootStore, [
    {
        action: 'sendMessage',
        cb: ({args}) => console.log(args[0])
    }
])
