import userModel from "../features/secure/model"
import {addMiddleware, types} from "mobx-state-tree"
import chatModel from "../features/chat/model"
import {ACCESS_TOKEN} from "../features/secure/const"
import connectSIO from "../connect/sio"

const model = types.compose(userModel, chatModel).named("user")
const userStore = model.create({})


addMiddleware(userStore, (call, next) => {
        const {name, parentId, args, context} = call
        switch (name) {
            case "@APPLY_SNAPSHOT":
                if (!parentId && typeof args[0]['id'] !== 'undefined') {
                    let {id, accessToken} = args[0]
                    accessToken = typeof accessToken !== "undefined" ? accessToken : localStorage.getItem(ACCESS_TOKEN)
                    context['sio'] = connectSIO(id, accessToken)
                    context['sio'].on('support', context['addMessage'])
                }
                break
            case "logout":
                context['sio'].disconnect()
                context['sio'] = undefined
                break
            default:
                break
        }
        return next(call)
    }
)

export default userStore