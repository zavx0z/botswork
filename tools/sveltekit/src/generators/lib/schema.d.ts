export interface LibGeneratorSchema {
    directory: string
    libName: string
    port: number
    type?: 'ui' | 'logic'
    xstate: boolean
}
