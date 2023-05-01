import {addMiddleware} from "mobx-state-tree"

const confusion = (store, actionsCallbacks) => addMiddleware(store, (call, next) => {
    const act = actionsCallbacks.filter(a => a.action === call.name)
    if (act.length) {
        const action = act[0]
        if (action.particle === call.context['$treenode'].type.name) {
            if (typeof action.before === 'function')
                action.before({args: call.args, particle: call.context})
            if (typeof action.after === 'function')
                return next(call, result => {
                    action.after({result: result, particle: call.context})
                    return result
                })
            return next(call)
        }
        return next(call)
    } else
        return next(call)
})

export default confusion