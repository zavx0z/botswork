declare global {
    namespace NodeJS {
        interface ProcessEnv {
            IO_CHAT_PORT: string;
            REDIS_HOST: string;
            REDIS_PORT: string;
        }
    }
}
export {}