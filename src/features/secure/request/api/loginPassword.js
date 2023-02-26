import loginFetch from "./loginFetch"

const base64 = require('base-64')


const login = (login, password) => {
    const headers = new Headers()
    headers.append("Authorization", "Basic " + base64.encode(`${login}:${password}`))
    return loginFetch(headers)
}
export default login