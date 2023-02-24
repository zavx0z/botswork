import root from "../models/root"
import {addMiddleware} from "mobx-state-tree"


const rootStore = root
    .create({value: 4})

addMiddleware(rootStore, (call, next) => {
    const {name, args, context} = call
    switch (name) {
        case 'incrementValue':
            console.log('incrementValue')
            break
        case 'decrementValue':
            console.log('decrementValue')
            break
        default:
            break
    }
    // console.log(call)
    return next(call)
})
export default rootStore