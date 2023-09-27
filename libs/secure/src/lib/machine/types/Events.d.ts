type ErrorData = {
    code: number
    error: string
}

export type Events =
    { type: 'LOGOUT' }
    | { type: 'JOIN'; username: string; password: string }
    | { type: 'LOGIN'; username: string; password: string }
    | { type: 'REFRESH' }
    | { type: 'RESET'; username: string }
    | { type: 'error.platform.verify'; data: ErrorData }
    | { type: 'error.platform.login'; data: ErrorData }
    | { type: 'error.platform.join'; data: ErrorData }
    | { type: 'error.platform.refresh'; data: ErrorData }
