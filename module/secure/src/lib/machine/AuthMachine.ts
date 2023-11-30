import { assign, createMachine } from "xstate"

const ACCESS_TOKEN = "at"
const REFRESH_TOKEN = "rt"

export default createMachine(
  {
    id: "auth",
    initial: "identification",
    entry: [
      "atStoreCtx", // установить токен доступа в контекст из хранилища браузера
      "rtStoreCtx", // установить токен обновления в контекст из хранилища браузера
    ],
    states: {
      identification: {
        description: "Идентификация",
        initial: "checkAccessToken",
        states: {
          checkAccessToken: {
            description: "Наличие токена доступа в контексте",
            always: [
              {
                description: "Токен доступа отсутствует",
                target: "#auth.unauthorized",
                guard: "atNotExist",
              },
              {
                description: "Токен доступа присутствует",
                target: "checkRefreshToken",
                guard: "atExist",
              },
            ],
          },
          checkRefreshToken: {
            description: "Наличие токена обновления в контексте",
            always: [
              {
                description: "Токен обновления отсутствует",
                target: "#auth.unauthorized",
                guard: "rtNotExist",
              },
              {
                description: "Токен обновления присутствует",
                target: "checkUserId",
                guard: "rtExist",
              },
            ],
          },
          checkUserId: {
            description: "Наличие Id пользователя в контексте",
            always: [
              {
                description: "id присутствует",
                target: "#auth.authorized",
                guard: "idExist",
              },
              {
                description: "id отсутствует",
                target: "verify",
                guard: "idNotExist",
              },
            ],
          },
          // checkExpiredToken: {
          //     description: 'Срок действия токена доступа',
          //     always: [
          //         {
          //             description: 'Срок действия истек',
          //             target: '#auth.authorized', guard: 'atExpired'
          //         },
          //         {
          //             description: 'Срок действия не истек',
          //             target: 'verify', guard: 'atNotExpired'
          //         }
          //     ]
          // },
          verify: {
            description: "Верификация токена",
            invoke: {
              id: "verify",
              src: "verify",
              // description: "Токен доступа верифицирован",
              onDone: {
                description: "Успешная верификация",
                target: "#auth.authorized",
                actions: ["idFetchCtx"], // сохранить id пользователя в контекст машины
              },
              onError: [
                {
                  description: "Время токена истекло",
                  target: "#auth.authorized.refreshed",
                  guard: "tokenHasExpired",
                },
                {
                  description: "Ошибка верификации",
                  target: "#auth.unauthorized",
                  actions: ["errFetchCtx"], // сохранить ошибку с сервера в контекст
                },
              ],
            },
          },
        },
      },
      unauthorized: {
        description: "Не авторизован",
        initial: "idle",
        tags: "unauthorized",
        entry: [
          "idRM", // удалить id пользователя из контекста машины
          "atRMStore", // удалить токен доступа из хранилища браузера
          "atRMctx", // удалить токен доступа из контекста машины
          "rtRMStore", // удалить токен обновления из хранилища браузера
          "rtRMctx", // удалить токен из контекста машины
        ],
        states: {
          idle: {
            description: "Не авторизован",
            tags: "unauthorized",
            after: {
              10: {
                description: "Очистка ошибок",
                actions: ["errRM"], // удалить ошибку из контекста
              },
            },
            on: {
              JOIN: {
                description: "Зарегистрироваться",
                target: "join",
              },
              LOGIN: {
                description: "Войти",
                target: "login",
              },
              RESET: {
                description: "Сбросить пароль",
                target: "reset",
              },
            },
          },
          login: {
            description: "Авторизация",
            tags: "unauthorized",
            invoke: {
              id: "login",
              src: "login",

              onDone: {
                description: "Успешная авторизация",
                target: "#auth.authorized",
                actions: [
                  "idFetchCtx", // сохранить id пользователя в контекст машины
                  "atFetchStore", // сохранить токен доступа из ответа сервера в хранилище браузера
                  "atFetchCtx", // сохранить токен доступа из ответа сервера в контекст машины
                  "rtFetchStore", // сохранить токен обновления из ответа сервера в хранилище браузера
                  "rtFetchCtx", // сохранить токен обновления из ответа сервера в контекст машины
                ],
              },
              onError: {
                description: "Ошибка авторизации",
                target: "#auth.unauthorized",
                actions: ["errFetchCtx"], // сохранить ошибку с сервера в контекст
              },
            },
          },
          join: {
            description: "Регистрация",
            tags: "unauthorized",
            invoke: {
              id: "join",
              src: "join",
              input: ({ context }) => ({ username: context.username, password: context.password }),
              onDone: {
                description: "Зарегистрирован",
                target: "#auth.identification",
                actions: [
                  "idFetchCtx", // сохранить id пользователя в контекст машины
                  "atFetchStore", // сохранить токен доступа из ответа сервера в хранилище браузера
                  "atFetchCtx", // сохранить токен доступа из ответа сервера в контекст машины
                  "rtFetchStore", // сохранить токен обновления из ответа сервера в хранилище браузера
                  "rtFetchCtx", // сохранить токен обновления из ответа сервера в контекст машины
                ],
              },
              onError: {
                description: "Ошибка регистрации",
                target: "#auth.unauthorized",
                actions: ["errFetchCtx"], // сохранить ошибку с сервера в контекст
              },
            },
          },
          reset: {
            description: "Сброс пароля",
            tags: "unauthorized",
            invoke: {
              id: "reset",
              src: "reset",
              onDone: {
                description: "Пароль сброшен",
                target: "#auth.authorized",
              },
              onError: {
                description: "Ошибка сброса пароля",
                target: "#auth.authorized",
              },
            },
          },
        },
      },
      authorized: {
        description: "Авторизован",
        tags: "authorized",
        entry: ["errRM"],
        on: {
          LOGOUT: {
            description: "Выйти",
            target: "#auth.unauthorized",
          },
          REFRESH: {
            description: "Обновить токен",
            target: "#auth.authorized.refreshed",
          },
        },
        initial: "idle",
        states: {
          idle: {
            description: "Авторизован",
            tags: "authorized",
          },
          refreshed: {
            entry: [
              "atRMStore", // удалить токен доступа из хранилища браузера
              "atRMctx", // удалить токен доступа из контекста машины
            ],
            description: "Обновление токена",
            tags: "authorized",
            invoke: {
              id: "refresh",
              src: "refresh",
              onDone: {
                description: "Токен обновлен",
                target: "#auth.authorized",
                actions: [
                  "atFetchStore", // сохранить токен доступа из ответа сервера в хранилище браузера
                  "atFetchCtx", // сохранить токен доступа из ответа сервера в контекст машины
                  "rtFetchStore", // сохранить токен обновления из ответа сервера в хранилище браузера
                  "rtFetchCtx", // сохранить токен обновления из ответа сервера в контекст машины
                ],
              },
              onError: {
                description: "Токен не обновлен",
                target: "#auth.unauthorized",
                // actions: ['errFetchCtx', /* показать ошибку */]
              },
            },
          },
        },
      },
    },
    // types:{}as { services:  Services, context:  Context, events:  Events },
  },
  {
    guards: {
      // USER
      idExist: ({ context }) => Boolean(context.id && context.username),
      idNotExist: ({ context }) => !Boolean(context.id || context.username),
      // ACCESS_TOKEN
      atExist: ({ context }) => Boolean(context.accessToken),
      atNotExist: ({ context }) => !Boolean(context.accessToken),
      // REFRESH_TOKEN
      rtExist: ({ context }) => Boolean(context.refreshToken),
      rtNotExist: ({ context }) => !Boolean(context.refreshToken),
      // CHECK ERRORS
      tokenHasExpired: ({ event }) => event.data.code === 422,
    },
    actions: {
      // ERROR
      errRM: assign(({ context }) => ({ ...context, error: null })),
      errFetchCtx: assign(({ context, event }) => ({ ...context, error: event.data.error })),
      // USER
      idFetchCtx: assign(({ context, event }) => ({ ...context, id: event.data.id, username: event.data.username })),
      idRM: assign(({ context }) => ({ ...context, id: null, username: null })),
      // ACCESS_TOKEN
      atStoreCtx: assign(({ context }) => ({ ...context, accessToken: localStorage.getItem(ACCESS_TOKEN) })),
      atFetchCtx: assign(({ context, event }) => ({ ...context, accessToken: event.data.accessToken })),
      atRMctx: assign(({ context }) => ({ ...context, accessToken: null })),
      atFetchStore: ({ event }) => localStorage.setItem(ACCESS_TOKEN, event.data.accessToken),
      atRMStore: () => localStorage.removeItem(ACCESS_TOKEN),
      // REFRESH_TOKEN
      rtStoreCtx: assign(({ context }) => ({ ...context, refreshToken: localStorage.getItem(REFRESH_TOKEN) })),
      rtFetchCtx: assign(({ context, event }) => ({ ...context, refreshToken: event.data.refreshToken })),
      rtRMctx: assign(({ context }) => ({ ...context, refreshToken: null })),
      rtFetchStore: ({ event }) => localStorage.setItem(REFRESH_TOKEN, event.data.refreshToken),
      rtRMStore: () => localStorage.removeItem(REFRESH_TOKEN),
    },
  },
)