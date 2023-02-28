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
    }))
    .actions((self) => ({
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
            const {toggleLoading, setAccessToken, setRefreshToken} = self
            toggleLoading()
            try {
                const response = await axios.post('/login', {
                    username: username,
                    password: password,
                })
                const {userID, accessToken, refreshToken} = response.data
                console.log(userID, username)
                applySnapshot(self, {id: userID, username: username})
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                toggleLoading()
            } catch (e) {
                toggleLoading()
                return Promise.reject(e)
            }
        },
        async getUser() {
            const {accessToken, toggleLoading} = self
            console.log('token')
            toggleLoading()
            try {
                const response = await axios.get('/user', {
                    headers: {Authorization: `Bearer ${self.accessToken}`},
                })
                console.log(response.data)
                const {userID, username} = response.data
                applySnapshot(self, {id: userID, username: username})
                toggleLoading()
            } catch (error) {
                toggleLoading()
                return Promise.reject(error)
            }
        },
        async refresh() {
            const {toggleLoading, setAccessToken, setRefreshToken} = self
            toggleLoading()
            try {
                const response = await axios.get('/refresh')
                const {accessToken, refreshToken} = response.data
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                toggleLoading()
            } catch (error) {
                toggleLoading()
                return Promise.reject(error)
            }
        },
        async join(username, password) {
            const {toggleLoading, setAccessToken, setRefreshToken, id} = self
            toggleLoading()
            try {
                const response = await axios.post('/join', {
                    username: username,
                    password: password,
                })
                const {user, accessToken, refreshToken} = response.data
                applySnapshot(id, user)
                setAccessToken(accessToken)
                setRefreshToken(refreshToken)
                toggleLoading()
            } catch (e) {
                toggleLoading()
                return Promise.reject(e)
            }
        },
        logOut() {
            const {setUsername, setPassword, removeAccessToken, removeRefreshToken} = self
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
        get isAuthenticated() {
            console.log(self.username, localStorage.getItem('accessToken'))
            return !!self.username && !!self.accessToken
        },
    }))