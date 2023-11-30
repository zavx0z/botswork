import { PUBLIC_HOST } from "$env/static/public"
import { fromPromise } from "xstate"
import AuthMachine from "./AuthMachine"

const validate = async (response: Response) => {
  const data = await response.json()
  console.log(response)
  return response.ok ? data : Promise.reject({ code: response.status, error: JSON.stringify(data.detail) })
}
type Cred = {
  username: string
  password: string
}

export default AuthMachine.provide({
  actors: {
    login: fromPromise(({ input }: { input: Cred }) =>
      fetch(PUBLIC_HOST + "/login", {
        method: "POST",
        body: JSON.stringify({ username: input.username, password: input.password }),
        headers: { "Content-Type": "application/json" },
      }).then(validate),
    ),
    join: fromPromise(({ input }: { input: Cred }) =>
      fetch(PUBLIC_HOST + "/join", {
        method: "POST",
        body: JSON.stringify({ username: input.username, password: input.password }),
        headers: { "Content-Type": "application/json" },
      }).then(validate),
    ),
    verify: fromPromise(({ input }: { input: { accessToken: string } }) =>
      fetch(PUBLIC_HOST + "/verify", {
        method: "GET",
        headers: { Authorization: `Bearer ${input.accessToken}` },
      }).then(validate),
    ),
    refresh: fromPromise(({ input }: { input: { refreshToken: string } }) =>
      fetch(PUBLIC_HOST + "/refresh", {
        method: "GET",
        headers: { Authorization: `Bearer ${input.refreshToken}` },
      }).then(validate),
    ),
    reset: fromPromise(({ input }) =>
      fetch(PUBLIC_HOST + "/reset", {
        method: "POST",
        body: JSON.stringify({ username: input.username }),
        headers: { "Content-Type": "application/json" },
      }).then(validate),
    ),
  },
})
