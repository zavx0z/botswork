import { assign, createMachine } from 'xstate'
import axios from 'axios'
import { raise } from 'xstate/lib/actions.js'

axios.defaults.baseURL = 'http://127.0.0.1:8000' + '/api.v1'

const ACCESS_TOKEN = 'at'
const REFRESH_TOKEN = 'rt'

const AuthMachine = createMachine(
	{
		id: 'auth',
		initial: 'checking',
		context: {
			id: null,
			accessToken: null,
			refreshToken: null,
			error: null
		},
		entry: ['getAccessToken', 'getRefreshToken'],
		states: {
			checking: {
				initial: 'checkingAccessTokenExist',
				states: {
					checkingAccessTokenExist: {
						always: [
							{ target: '#auth.unauthorized', cond: 'accessTokenIsNotExist' },
							{ target: 'checkingRefreshTokenExist', cond: 'accessTokenIsExist' }
						]
					},
					checkingRefreshTokenExist: {
						always: [
							{ target: '#auth.unauthorized', cond: 'refreshTokenIsNotExist' },
							{ target: 'checkingUserLoaded', cond: 'refreshTokenIsExist' }
						]
					},
					checkingUserLoaded: {
						always: [
							{ target: 'fetchUser', cond: 'userIsNotExist' },
							{ target: '#auth.authorized', cond: 'userIsExist' }
						]
					},
					fetchUser: {
						invoke: {
							src: 'fetchUser',
							onDone: { target: '#auth.authorized', actions: 'setUser' },
							onError: { target: '#auth.unauthorized', actions: 'setError' }
						}
					}
				}
			},
			unauthorized: {
				initial: 'idle',
				tags: 'unauthorized',
				states: {
					idle: {
						tags: 'unauthorized',
						after: {
							10: { actions: 'clearError' }
						},
						on: {
							JOIN: 'join',
							LOGIN: 'login',
							RESET: 'reset'
						}
					},
					login: {
						tags: 'unauthorized',
						invoke: {
							src: 'login',
							onDone: { target: '#auth.authorized', actions: 'authorize' },
							onError: { target: 'idle', actions: 'setError' }
						}
					},
					join: {
						tags: 'unauthorized',
						invoke: {
							src: 'join',
							onDone: { target: '#auth.authorized' },
							onError: { target: 'idle' }
						}
					},
					reset: {
						tags: 'unauthorized',
						invoke: {
							src: 'reset',
							onDone: { target: '#auth.authorized' },
							onError: { target: '#auth.authorized' }
						}
					}
				}
			},
			authorized: {
				tags: ['authorized'],
				on: {
					LOGOUT: { target: 'unauthorized', actions: 'unauthorize' },
					UPDATE_TOKEN: { target: '.updating' }
				},
				initial: 'idle',
				states: {
					updating: {
						tags: ['authorized'],
						invoke: {
							src: 'update',
							onDone: {},
							onError: {}
						}
					},
					idle: {
						tags: ['authorized']
					}
				}
			}
		},
		predictableActionArguments: true,
		schema: {
			services: {
				fetchUser: { data: {} as { id: number } },
				login: { data: {} as { id: number; accessToken: string; refreshToken: string } },
				join: { data: {} as { id: number; accessToken: string; refreshToken: string } },
				update: { data: {} as { id: number; accessToken: string; refreshToken: string } },
				reset: { data: {} as { id: number; accessToken: string; refreshToken: string } }
			},
			context: {} as {
				id: number | null
				accessToken: string | null
				refreshToken: string | null
				error: string | null
			},
			events: {} as
				| { type: 'LOGOUT' }
				| { type: 'UPDATE_TOKEN' }
				| { type: 'JOIN'; username: string; password: string }
				| { type: 'LOGIN'; username: string; password: string }
				| { type: 'RESET'; username: string }
		},
		tsTypes: {} as import('./AuthMachine.typegen.d.ts').Typegen0
	},
	{
		guards: {
			accessTokenIsExist: (context) => Boolean(context.accessToken),
			accessTokenIsNotExist: (context) => !Boolean(context.accessToken),

			refreshTokenIsExist: (context) => Boolean(context.refreshToken),
			refreshTokenIsNotExist: (context) => !Boolean(context.refreshToken),

			userIsExist: (context) => Boolean(context.id),
			userIsNotExist: (context) => !Boolean(context.id)
		},
		actions: {
			clearError: assign((context) => ({ ...context, error: null })),
			// @ts-ignore
			setError: assign((context, { data: { error } }) => {
				switch (error) {
					case 'Not enough segments':
						return { ...context, error } // не переданы данные при авторизации status: 422, statusText: 'Unprocessable Entity'
					case 'Incorrect username or password':
						return { ...context, error: "Алеша! Введи правильно ник или пароль!" }
					default:
						return { ...context, error }
				}
			}),
			getAccessToken: assign((context) => ({ ...context, accessToken: localStorage.getItem(ACCESS_TOKEN) })),
			getRefreshToken: assign((context) => ({ ...context, refreshToken: localStorage.getItem(REFRESH_TOKEN) })),
			setUser: assign((context, { data: { id } }) => ({ ...context, id })),
			authorize: assign((context, { data: { id, accessToken, refreshToken } }) => {
				localStorage.setItem(ACCESS_TOKEN, accessToken)
				localStorage.setItem(REFRESH_TOKEN, refreshToken)
				return { ...context, id, accessToken, refreshToken }
			}),
			unauthorize: assign((context) => {
				console.log('un')
				localStorage.removeItem(ACCESS_TOKEN)
				localStorage.removeItem(REFRESH_TOKEN)
				return { ...context, id: null, accessToken: null, refreshToken: null }
			})
		},
		services: {
			login: (_, { username, password }) =>
				axios
					.post('/login', { username, password })
					.then(({ data }) => data)
					.catch(({ response }) => Promise.reject({ error: response.data.detail })),
			join: (_, { username, password }) =>
				axios.post('/join', { username, password }).then((response) => response.data),
			update: ({ refreshToken }) =>
				axios
					.get('/refresh', { headers: { Authorization: `Bearer ${refreshToken}` } })
					.then((response) => response.data),
			fetchUser: ({ accessToken }) =>
				axios
					.get('/user', { headers: { Authorization: `Bearer ${accessToken}` } })
					.then((response) => response.data)
					.catch(({ response }) => Promise.reject({ error: response.data.detail })),
			reset: (_, { username }) => axios.post('/reset', { username }).then((response) => response.data)
		}
	}
)
export default AuthMachine
