import {assign, createMachine} from 'xstate'
import {browser} from '$app/environment'
import type {Events, Context, Services} from "./types"
import {join, login, refresh, reset, verify} from "./services"
import {goto} from "$app/navigation"

const ACCESS_TOKEN = 'at', REFRESH_TOKEN = 'rt'
export default createMachine(
    {
        id: 'auth',
        initial: 'checking',
        context: {
            id: null,
            username: null,
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
                            {target: '#auth.unauthorized', cond: 'accessTokenIsNotExist'},
                            {target: 'checkingRefreshTokenExist', cond: 'accessTokenIsExist'}
                        ]
                    },
                    checkingRefreshTokenExist: {
                        always: [
                            {target: '#auth.unauthorized', cond: 'refreshTokenIsNotExist'},
                            {target: 'checkingUserLoaded', cond: 'refreshTokenIsExist'}
                        ]
                    },
                    checkingUserLoaded: {
                        always: [
                            {target: 'verify', cond: 'userIsNotExist'},
                            {target: '#auth.authorized', cond: 'userIsExist'}
                        ]
                    },
                    verify: {
                        invoke: {
                            id: 'verify',
                            src: 'verify',
                            onDone: {target: '#auth.authorized', actions: ['setUser']},
                            onError: [
                                {target: '#auth.authorized.refreshed', cond: 'tokenHasExpired'},
                                {target: '#auth.unauthorized', actions: ['setError', 'removeAccessToken', 'removeRefreshToken']},
                            ]
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
                        after: {10: {actions: 'clearError'}},
                        on: {JOIN: 'join', LOGIN: 'login', RESET: 'reset'}
                    },
                    login: {
                        tags: 'unauthorized',
                        invoke: {
                            id: 'login',
                            src: 'login',
                            onDone: {target: '#auth.authorized', actions: ['setUser', 'setAccessToken', 'setRefreshToken']},
                            onError: {target: 'idle', actions: 'setError'}
                        }
                    },
                    join: {
                        tags: 'unauthorized',
                        invoke: {
                            id: 'join',
                            src: 'join',
                            onDone: {target: '#auth.checking', actions: ['setUser', 'setAccessToken', 'setRefreshToken']},
                            onError: {target: 'idle', actions: 'setError'}
                        }
                    },
                    reset: {
                        tags: 'unauthorized',
                        invoke: {
                            id: 'reset',
                            src: 'reset',
                            onDone: {target: '#auth.authorized'},
                            onError: {target: '#auth.authorized'}
                        }
                    }
                }
            },
            authorized: {
                tags: 'authorized',
                on: {
                    LOGOUT: {target: 'unauthorized', actions: ['removeUser', 'removeAccessToken', 'removeRefreshToken']},
                    REFRESH: {target: '.refreshed'}
                },
                initial: 'idle',
                states: {
                    refreshed: {
                        tags: 'authorized',
                        invoke: {
                            id: 'refresh',
                            src: 'refresh',
                            onDone: {target: '#auth.authorized', actions: ['setAccessToken', 'setRefreshToken']},
                            onError: {target: '#auth.unauthorized.idle', actions: ['setError', 'removeRefreshToken', 'redirectToLogin']}
                        }
                    },
                    idle: {tags: 'authorized'}
                }
            }
        },
        predictableActionArguments: true,
        schema: {services: {} as Services, context: {} as Context, events: {} as Events},
        tsTypes: {} as import("./AuthMachine.typegen").Typegen0
    },
    {
        guards: {
            // USER
            userIsExist: (context) => Boolean(context.id && context.username),
            userIsNotExist: (context) => !Boolean(context.id || context.username),
            // ACCESS_TOKEN
            accessTokenIsExist: (context) => Boolean(context.accessToken),
            accessTokenIsNotExist: (context) => !Boolean(context.accessToken),
            // REFRESH_TOKEN
            refreshTokenIsExist: (context) => Boolean(context.refreshToken),
            refreshTokenIsNotExist: (context) => !Boolean(context.refreshToken),
            // CHECK ERRORS
            tokenHasExpired: (_, {data: {code}}) => code === 422,
        },
        actions: {
            redirectToLogin: () => browser && goto('/auth/login'),
            // ERROR
            clearError: assign((context) => ({...context, error: null})),
            setError: assign((context, {data: {error}}) => ({...context, error})),
            // USER
            setUser: assign((context, {data: {id, username}}) => ({...context, id, username})),
            removeUser: assign((context) => ({...context, id: null, username: null})),
            // ACCESS_TOKEN
            getAccessToken: assign((context) => ({...context, accessToken: browser ? localStorage.getItem(ACCESS_TOKEN) : null})),
            setAccessToken: assign((context, {data: {accessToken}}) => {
                browser && localStorage.setItem(ACCESS_TOKEN, accessToken)
                return {...context, accessToken}
            }),
            removeAccessToken: assign((context) => {
                browser && localStorage.removeItem(ACCESS_TOKEN)
                return {...context, accessToken: null}
            }),
            // REFRESH_TOKEN
            getRefreshToken: assign((context) => ({...context, refreshToken: browser ? localStorage.getItem(REFRESH_TOKEN) : null})),
            setRefreshToken: assign((context, {data: {refreshToken}}) => {
                browser && localStorage.setItem(REFRESH_TOKEN, refreshToken)
                return {...context, refreshToken}
            }),
            removeRefreshToken: assign((context) => {
                browser && localStorage.removeItem(REFRESH_TOKEN)
                return {...context, refreshToken: null}
            })
        },
        services: {
            join: (_, {username, password}) => join({username, password}),
            login: (_, {username, password}) => login({username, password}),
            reset: (_, {username}) => reset(username),
            refresh: ({refreshToken}) => refreshToken ? refresh(refreshToken) : Promise.reject({code: 0, error: 'Отсутствует токен'}),
            verify: ({accessToken}) => accessToken ? verify(accessToken) : Promise.reject({code: 0, error: 'Отсутствует токен'}),
        }
    }
)