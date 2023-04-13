import {alignString} from "./string"

const NAME_LENGTH = 10
const ITEM_LENGTH = 15
const getLogger = (name, option) => {
    let debug
    const {item} = option
    switch (name) {
        case "auth":
            debug = process.env.REACT_APP_DEBUG_AUTH
            break
        default:
            debug = false
            break
    }
    const itemString = item ? alignString(item, ITEM_LENGTH, 'center') : " ".repeat(ITEM_LENGTH)
    const nameString = alignString(`[${name}]`, NAME_LENGTH)
    return {
        debug: debug,
        formatter: debug ? (msg) => `${nameString}${itemString}${msg}` : (msg) => {}
    }
}
export default getLogger