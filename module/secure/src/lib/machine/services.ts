import { PUBLIC_HOST } from '$env/static/public'

const validate = async (response: Response) => {
	const data = await response.json()
	console.log(response)
	return response.ok ? data : Promise.reject({ code: response.status, error: JSON.stringify(data.detail) })
}
type Cred = {
	username: string
	password: string
}

export const join = ({ username, password }: Cred) =>
	fetch(PUBLIC_HOST + '/join', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: { 'Content-Type': 'application/json' }
	}).then(validate)

export const login = ({ username, password }: Cred) =>
	fetch(PUBLIC_HOST + '/login', {
		method: 'POST',
		body: JSON.stringify({ username, password }),
		headers: { 'Content-Type': 'application/json' }
	}).then(validate)

export const verify = (accessToken: string) =>
	fetch(PUBLIC_HOST + '/verify', {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${accessToken}` }
	}).then(validate)

export const refresh = (refreshToken: string) =>
	fetch(PUBLIC_HOST + '/refresh', {
		method: 'GET',
		headers: { 'Authorization': `Bearer ${refreshToken}` }
	}).then(validate)

export const reset = (username: string) =>
	fetch(PUBLIC_HOST + '/reset', {
		method: 'POST',
		body: JSON.stringify({ username }),
		headers: { 'Content-Type': 'application/json' }
	}).then(validate)