import {assign, createMachine} from 'xstate'
import {browser} from '$app/environment'
import type {Events, Context, Services} from "./types"
import {join, login, refresh, reset, verify} from "./services"
import {goto} from "$app/navigation"

const ACCESS_TOKEN = 'at', REFRESH_TOKEN = 'rt'
export default createMachine(
    {
        id: 'auth',
        initial: 'identification',
        context: {
            id: null,
            username: null,
            accessToken: null,
            refreshToken: null,
            error: null
        },
        entry: [
            'atStoreCtx', // установить токен доступа в контекст из хранилища браузера
            'rtStoreCtx' // установить токен обновления в контекст из хранилища браузера
        ],
        states: {
            identification: {
                description: 'Идентификация',
                initial: 'checkAccessToken',
                states: {
                    checkAccessToken: {
                        description: 'Наличие токена доступа в контексте',
                        always: [
                            {
                                description: 'Токен доступа отсутствует',
                                target: '#auth.unauthorized', cond: 'atNotExist'
                            },
                            {
                                description: 'Токен доступа присутствует',
                                target: 'checkRefreshToken', cond: 'atExist'
                            }
                        ]
                    },
                    checkRefreshToken: {
                        description: 'Наличие токена обновления в контексте',
                        always: [
                            {
                                description: 'Токен обновления отсутствует',
                                target: '#auth.unauthorized', cond: 'rtNotExist'
                            },
                            {
                                description: 'Токен обновления присутствует',
                                target: 'checkUserId', cond: 'rtExist'
                            }
                        ]
                    },
                    checkUserId: {
                        description: 'Наличие Id пользователя в контексте',
                        always: [
                            {
                                description: 'id присутствует',
                                target: '#auth.authorized', cond: 'idExist'
                            },
                            {
                                description: 'id отсутствует',
                                target: 'verify', cond: 'idNotExist'
                            }
                        ]
                    },
                    verify: {
                        description: 'Верификация токена',
                        invoke: {
                            id: 'verify', src: 'verify',
                            description: 'Токен доступа верифицирован',
                            onDone: {
                                description: 'Успешная верификация',
                                target: '#auth.authorized',
                                actions: ['idFetchCtx'] // сохранить id пользователя в контекст машины
                            },
                            onError: [
                                {
                                    description: 'Время токена истекло',
                                    target: '#auth.authorized.refreshed', cond: 'tokenHasExpired',
                                    actions: [
                                        'atRMStore', // удалить токен доступа из хранилища браузера
                                        'atRMctx', // удалить токен доступа из контекста машины
                                    ]
                                },
                                {
                                    description: 'Ошибка верификации',
                                    target: '#auth.unauthorized',
                                    actions: [
                                        'idRM', // удалить id пользователя из контекста машины
                                        'atRMStore', // удалить токен доступа из хранилища браузера
                                        'atRMctx', // удалить токен доступа из контекста машины
                                        'rtRMStore', // удалить токен обновления из хранилища браузера
                                        'rtRMctx', // удалить токен из контекста машины
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            unauthorized: {
                description: 'Не авторизован',
                initial: 'idle',
                tags: 'unauthorized',
                states: {
                    idle: {
                        description: 'Не авторизован',
                        tags: 'unauthorized',
                        after: {
                            10: {
                                description: 'Очистка ошибок',
                                actions: ['errRM'] // удалить ошибку из контекста
                            }
                        },
                        on: {
                            JOIN: {
                                description: 'Зарегистрироваться',
                                target: 'join'
                            },
                            LOGIN: {
                                description: 'Войти',
                                target: 'login'
                            },
                            RESET: {
                                description: 'Сбросить пароль',
                                target: 'reset'
                            }
                        }
                    },
                    login: {
                        description: 'Авторизация',
                        tags: 'unauthorized',
                        invoke: {
                            id: 'login', src: 'login',
                            onDone: {
                                description: 'Успешная авторизация',
                                target: '#auth.authorized',
                                actions: [
                                    'idFetchCtx', // сохранить id пользователя в контекст машины
                                    'atFetchStore', // сохранить токен доступа из ответа сервера в хранилище браузера
                                    'atFetchCtx', // сохранить токен доступа из ответа сервера в контекст машины
                                    'rtFetchStore', // сохранить токен обновления из ответа сервера в хранилище браузера
                                    'rtFetchCtx'// сохранить токен обновления из ответа сервера в контекст машины
                                ]
                            },
                            onError: {
                                description: 'Ошибка авторизации',
                                target: '#auth.unauthorized',
                                actions: ['errFetchCtx'] // сохранить ошибку с сервера в контекст
                            }
                        }
                    },
                    join: {
                        description: 'Регистрация',
                        tags: 'unauthorized',
                        invoke: {
                            id: 'join', src: 'join',
                            onDone: {
                                description: 'Зарегистрирован',
                                target: '#auth.identification',
                                actions: [
                                    'idFetchCtx', // сохранить id пользователя в контекст машины
                                    'atFetchStore', // сохранить токен доступа из ответа сервера в хранилище браузера
                                    'atFetchCtx', // сохранить токен доступа из ответа сервера в контекст машины
                                    'rtFetchStore', // сохранить токен обновления из ответа сервера в хранилище браузера
                                    'rtFetchCtx'// сохранить токен обновления из ответа сервера в контекст машины
                                ]
                            },
                            onError: {
                                description: 'Ошибка регистрации',
                                target: '#auth.unauthorized',
                                actions: ['errFetchCtx'] // сохранить ошибку с сервера в контекст
                            }
                        }
                    },
                    reset: {
                        description: 'Сброс пароля',
                        tags: 'unauthorized',
                        invoke: {
                            id: 'reset', src: 'reset',
                            onDone: {
                                description: 'Пароль сброшен',
                                target: '#auth.authorized',
                            },
                            onError: {
                                description: 'Ошибка сброса пароля',
                                target: '#auth.authorized',
                            }
                        }
                    }
                }
            },
            authorized: {
                description: 'Авторизован',
                tags: 'authorized',
                on: {
                    LOGOUT: {
                        description: 'Выйти',
                        target: '#auth.unauthorized',
                        actions: [
                            'idRM', // удалить id пользователя из контекста машины
                            'atRMStore', // удалить токен доступа из хранилища браузера
                            'atRMctx', // удалить токен доступа из контекста машины
                            'rtRMStore', // удалить токен обновления из хранилища браузера
                            'rtRMctx', // удалить токен из контекста машины
                        ]
                    },
                    REFRESH: {
                        description: 'Обновить токен',
                        target: '#auth.authorized.refreshed',
                        actions: [
                            'atRMStore', // удалить токен доступа из хранилища браузера
                            'atRMctx', // удалить токен доступа из контекста машины
                        ]
                    }
                },
                initial: 'idle',
                states: {
                    idle: {
                        description: 'Авторизован',
                        tags: 'authorized'
                    },
                    refreshed: {
                        description: 'Обновление токена',
                        tags: 'authorized',
                        invoke: {
                            id: 'refresh', src: 'refresh',
                            onDone: {
                                description: 'Токен обновлен',
                                target: '#auth.authorized',
                                actions: [
                                    'atFetchStore', // сохранить токен доступа из ответа сервера в хранилище браузера
                                    'atFetchCtx', // сохранить токен доступа из ответа сервера в контекст машины
                                    'rtFetchStore', // сохранить токен обновления из ответа сервера в хранилище браузера
                                    'rtFetchCtx'// сохранить токен обновления из ответа сервера в контекст машины
                                ]
                            },
                            onError: {
                                description: 'Токен не обновлен',
                                target: '#auth.unauthorized',
                                actions: [
                                    'errFetchCtx', // показать ошибку
                                    'rtRMStore', // удалить токен обновления из хранилища браузера
                                    'rtRMctx', // удалить токен из контекста машины
                                    'redirectToLogin' // перенаправить пользователя на страницу авторизации
                                ]
                            }
                        }
                    }
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
            idExist: (context) => Boolean(context.id && context.username),
            idNotExist: (context) => !Boolean(context.id || context.username),
            // ACCESS_TOKEN
            atExist: (context) => Boolean(context.accessToken),
            atNotExist: (context) => !Boolean(context.accessToken),
            // REFRESH_TOKEN
            rtExist: (context) => Boolean(context.refreshToken),
            rtNotExist: (context) => !Boolean(context.refreshToken),
            // CHECK ERRORS
            tokenHasExpired: (_, {data: {code}}) => code === 422,
        },
        actions: {
            redirectToLogin: () => browser && goto('/auth/login'),
            // ERROR
            errRM: assign((context) => ({...context, error: null})),
            errFetchCtx: assign((context, {data: {error}}) => ({...context, error})),
            // USER
            idFetchCtx: assign((context, {data: {id, username}}) => ({...context, id, username})),
            idRM: assign((context) => ({...context, id: null, username: null})),
            // ACCESS_TOKEN
            atStoreCtx: assign((context) => ({...context, accessToken: localStorage.getItem(ACCESS_TOKEN)})),
            atFetchCtx: assign((context, {data: {accessToken}}) => ({...context, accessToken})),
            atRMctx: assign((context) => ({...context, accessToken: null})),
            atFetchStore: (_, {data: {accessToken}}) => localStorage.setItem(ACCESS_TOKEN, accessToken),
            atRMStore: () => localStorage.removeItem(ACCESS_TOKEN),
            // REFRESH_TOKEN
            rtStoreCtx: assign((context) => ({...context, refreshToken: localStorage.getItem(REFRESH_TOKEN)})),
            rtFetchCtx: assign((context, {data: {refreshToken}}) => ({...context, refreshToken})),
            rtRMctx: assign((context) => ({...context, refreshToken: null})),
            rtFetchStore: (_, {data: {refreshToken}}) => localStorage.setItem(REFRESH_TOKEN, refreshToken),
            rtRMStore: () => localStorage.removeItem(REFRESH_TOKEN)
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