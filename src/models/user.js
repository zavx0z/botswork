import {flow, types} from "mobx-state-tree"

const userModel = types
    .model("User", {
        id: types.optional(types.number, 0),
        username: types.optional(types.string, ""),
        isLoggedIn: types.optional(types.boolean, false)
    })
    .actions(self => ({
        login: flow(function* (username, password) {
            // Здесь мы бы отправили запрос на сервер для аутентификации пользователя
            // и получили бы ответ с его данными и токеном для аутентификации
            const response = yield fetch("/api/login", {
                method: "POST",
                body: JSON.stringify({username, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = yield response.json()
            self.id = data.id
            self.username = data.username
            self.isLoggedIn = true
            localStorage.setItem("token", data.token)
        }),
        logout: () => {
            self.id = 0
            self.username = ""
            self.isLoggedIn = false
            localStorage.removeItem("token")
        }
    }))
    .views(self => ({
        get isAuthenticated() {
            return self.isLoggedIn
        }
    }))
export default userModel