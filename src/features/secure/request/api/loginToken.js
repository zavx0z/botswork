import header from "../utils/headerWithToken"
import loginFetch from "./loginFetch"

const login = () => {
    const headers = header()
    return loginFetch(headers)
}
export default login