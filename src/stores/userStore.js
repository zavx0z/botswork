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
                        .on("connect", socket => {
                            context['sio'].emit('chat', {"action": 'init'})
                        })
                        .on('support', (data) => {
                            context['addMessage'](data)
                        })
                        .on('chat', (json) => {
                            const {action, data} = json
                            switch (action) {
                                case 'init':
                                    const {totalMessages, unreadMessages, dialogId} = data[0]
                                    context['setTotalMessages'](totalMessages)
                                    context['setUnreadMessages'](unreadMessages)
                                    context['setDialogId'](dialogId)
                                    // context['sio'].emit('chat', {action: 'messages', data: dialogId})
                                    break
                                case 'messages':
                                    console.log(json)
                                    break
                                case 'read':
                                    data['messageIds'].forEach(id => {
                                        const msg = context['messages'].find(msg => msg.id === id)
                                        msg.setRead()
                                        console.log('read', msg.id)
                                    })
                                    break
                                default:
                                    break
                            }
                        })
                }
                break
            case "logout":
                context['sio'].off().disconnect().close()
                context['sio'] = undefined
                break
            default:
                break
        }
        return next(call)
    }
)

export default userStore