type ServiceVerify = {
    id: string
    username: string
    code?: number
    message?: string
}
type ServiceLogin = {
    id: string
    username: string
    accessToken: string
    refreshToken: string
}
type ServiceJoin = {
    id: string
    username: string
    accessToken: string
    refreshToken: string
}
type ServiceRefresh = {
    id: string
    accessToken: string
    refreshToken: string
}
type ServiceReset = {
    id: string
    accessToken: string
    refreshToken: string
}

export type Services = {
    verify: { data: ServiceVerify }
    login: { data: ServiceLogin }
    join: { data: ServiceJoin }
    refresh: { data: ServiceRefresh }
    reset: { data: ServiceReset }
}