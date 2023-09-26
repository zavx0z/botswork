type ErrorData = {
    code: number
    error: string
}

export type Events =
    { type: 'IDLE', payload: string }
    | { type: 'error.platform.service'; data: ErrorData }
