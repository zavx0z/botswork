export interface LibGeneratorSchema {
    name: string
    libName: string
    port: number
    type?: 'ui' | 'logic'
    xstate: boolean
}
