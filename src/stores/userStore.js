import userModel from "../features/secure/model"
import {addMiddleware, types} from "mobx-state-tree"
import chatModel from "../features/chat/model"

const model = types.compose(userModel, chatModel).named("user")
const userStore = model.create({})


addMiddleware(userStore, (call, next) => {
        const {name} = call
        switch (name) {
            case '':
                break
            default:
                break
        }
        return next(call)
    }
)

export default userStore