const BaseUrl = 'http://127.0.0.1:8000'
const validate = async (response: Response) => {
    const data = await response.json()
    return response.ok ? data : Promise.reject({code: response.status, error: JSON.stringify(data.detail)})
}
type Cred = {
    username: string
    password: string
}

export const join = ({username, password}: Cred) =>
    fetch(BaseUrl + '/join', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(validate)

export const login = ({username, password}: Cred) =>
    fetch(BaseUrl + '/login', {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {'Content-Type': 'application/json'}
    }).then(validate)

export const verify = (accessToken: string) =>
    fetch(BaseUrl + '/verify', {
        method: "GET",
        headers: {'Authorization': `Bearer ${accessToken}`}
    }).then(validate)

export const refresh = (refreshToken: string) =>
    fetch(BaseUrl + '/refresh', {
        method: "GET",
        headers: {'Authorization': `Bearer ${refreshToken}`}
    }).then(validate)

export const reset = (username: string) =>
    fetch(BaseUrl + '/reset', {
        method: "POST",
        body: JSON.stringify({username}),
        headers: {'Content-Type': 'application/json'}
    }).then(validate)