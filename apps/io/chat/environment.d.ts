declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IO_CHAT_PORT: string;
        }
    }
}
export {}