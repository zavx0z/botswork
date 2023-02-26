import API from "../../../../request/API"

const api = {
    get root() {
        return `${API.root}/auth`
    },
    get token() {
        return `${this.root}/token`
    },
    get join() {
        return `${this.root}/join`
    },
    get login() {
        return `${this.root}/login`
    },
}

export default api