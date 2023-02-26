import {applySnapshot, flow, types} from "mobx-state-tree"
import join from "../request/api/join"
import loginPassword from "../request/api/loginPassword"
import loginToken from "../request/api/loginToken"

const preprocessor = (snapshot) => {
    return {id: snapshot.id, login: snapshot.login}
}
export default types
    .model({
        id: types.maybe(types.number),
        login: types.maybe(types.string),
    })
    .preProcessSnapshot(preprocessor)
    .volatile(self => ({
        loading: false,
        password: types.maybe(types.string),
    }))
    .actions(self => ({
        afterCreate() {
            self.tokenStore && self.reLogin()
        },
        setLogin(login) {
            self.login = login
        },
        setPassword(password) {
            self.password = password
        },
        setLoading(bool) {
            self.loading = bool
        },
        toggleLoading() {
            self.loading = !self.loading
        },
        signin: flow(function* (login, password) {
            self.toggleLoading()
            try {
                const data = yield loginPassword(login, password)
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.setLoading(false)
            } catch (e) {
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        reLogin: flow(function* () {
            self.toggleLoading()
            try {
                const data = yield loginToken()
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.toggleLoading()
            } catch (e) {
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        join: flow(function* (login, password) {
            self.toggleLoading()
            try {
                const data = yield join({login: login, password: password})
                console.log(data)
                const {user, token, expiration} = data
                applySnapshot(self, user)
                self.setToken(token)
                self.setExpiration(expiration)
                self.toggleLoading()
            } catch (e) {
                console.log(e)
                self.toggleLoading()
                return Promise.reject(e)
            }
        }),
        logOut() {
            self.setLogin('')
            self.setPassword('')
            self.removeToken()
            self.removeExpiration()
        },
        setToken(token) {
            localStorage.setItem('token', token)
        },
        removeToken() {
            localStorage.removeItem('token')
        },
        setExpiration(expiration) {
            localStorage.setItem('expiration', expiration)
        },
        removeExpiration() {
            localStorage.removeItem('expiration')
        },
    }))
    .views(self => ({
        get tokenStore() {
            return localStorage.getItem('token')
        },
        get expirationStore() {
            return localStorage.getItem('expiration')
        },
        get isAuthenticated() {
            return !!(self.login && self.tokenStore)
        },
    }))