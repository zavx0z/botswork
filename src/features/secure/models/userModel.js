import {applySnapshot, types} from "mobx-state-tree"
import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_HOST + "/api.v1"


const preprocessor = (snapshot) => {
    return {id: snapshot.id, username: snapshot.username}
}

export default types
    .model({
        id: types.maybe(types.number),
        username: types.maybe(types.string),
    })
    .preProcessSnapshot(preprocessor)
    .volatile((self) => ({
        loading: false,
        password: types.maybe(types.string),
        isAuthenticated: false
    }))
    .actions((self) => ({
        setAuthenticate(bool) {
            self.isAuthenticated = bool
        },
        afterCreate() {
            const {accessToken, getUser} = self
            accessToken && getUser()
        },
        setUsername(username) {
            self.username = username
        },
        setPassword(password) {
            self.password = password
        },
        toggleLoading() {
            self.loading = !self.loading
        },
        async login(username, password) {
            const {toggleLoading, setAccessToken, setRefreshToken, setAuthenticate} = self
            toggleLoading()
            await axios.post('/login', {
                username: username,
                password: password,
            }).then(response => {
                setAuthenticate(true)
                const {userID, accessToken, refreshToken} = response.data
                applySnapshot(self, {id: userID, username: username})
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
            }).finally(toggleLoading)
        },
        async getUser() {
            const {setAuthenticate, accessToken, toggleLoading} = self
            toggleLoading()
            await axios.get('/user', {
                headers: {Authorization: `Bearer ${accessToken}`},
            }).then(response => {
                setAuthenticate(true)
                const {userID, username} = response.data
                applySnapshot(self, {id: userID, username: username})
            }).finally(toggleLoading)
        },
        async refresh() {
            const {toggleLoading, setAccessToken, setRefreshToken} = self
            toggleLoading()
            await axios.get('/refresh').then((response) => {
                const {accessToken, refreshToken} = response.data
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)

            }).finally(toggleLoading)
        },
        async join(username, password) {
            const {toggleLoading, setAccessToken, setRefreshToken, id} = self
            toggleLoading()
            await axios.post('/join', {
                username: username,
                password: password,
            }).then((response) => {
                const {userID, accessToken, refreshToken} = response.data
                applySnapshot(userID, username)
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
            }).finally(toggleLoading)
        },
        logOut() {
            const {setUsername, setPassword, removeAccessToken, removeRefreshToken, setAuthenticate} = self
            setAuthenticate(false)
            setUsername('')
            setPassword('')
            removeAccessToken()
            removeRefreshToken()
        },
        setAccessToken(accessToken) {
            localStorage.setItem('accessToken', accessToken)
        },
        removeAccessToken() {
            localStorage.removeItem('accessToken')
        },
        setRefreshToken(refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
        },
        removeRefreshToken() {
            localStorage.removeItem('refreshToken')
        },
    }))
    .views((self) => ({
        get accessToken() {
            return localStorage.getItem('accessToken')
        },
    }))