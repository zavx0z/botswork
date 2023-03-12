import {applySnapshot, types} from "mobx-state-tree"
import axios from "axios"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "./const"

axios.defaults.baseURL = process.env.REACT_APP_HOST + "/api.v1"

const setTokens = ({accessToken, refreshToken}) => {
    if (typeof accessToken !== "undefined")
        localStorage.setItem(ACCESS_TOKEN, accessToken)
    if (typeof refreshToken !== "undefined")
        localStorage.setItem(REFRESH_TOKEN, refreshToken)
}

export default types
    .model({
        id: types.maybe(types.number),
        username: types.maybe(types.string),
        email: types.maybe(types.string),
        phone: types.maybe(types.string),
    })
    .preProcessSnapshot((snapshot) => {
        setTokens(snapshot)
        return snapshot
    })
    .actions((self) => ({
        afterCreate() {
            localStorage.getItem(ACCESS_TOKEN) && this.user()
        },
        async join(username, password) {
            await axios
                .post('/join', {username: username.trim(), password: password.trim()})
                .then((response) => applySnapshot(self, response.data))
        },
        async login(username, password) {
            await axios
                .post('/login', {username: username.trim(), password: password.trim()})
                .then(response => applySnapshot(self, response.data))
        },
        async user() {
            await axios
                .get('/user', {headers: {Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`}})
                .then(response => applySnapshot(self, response.data))
        },
        async refresh() {
            await axios
                .get('/refresh')
                .then((response) => setTokens(response.data))
        },
        logout() {
            applySnapshot(self, {
                id: undefined,
                username: undefined,
                accessToken: '',
                refreshToken: ''
            })
        },
    })).views(self => ({
        get isAuthenticated() {
            return !!self['id'] && !!localStorage.getItem(ACCESS_TOKEN)
        }
    }))
