declare global {
    namespace NodeJS {
        interface ProcessEnv {
            AUTH_SECRET: string;
            DATABASE_URL: string;
            UPLOADTHING_TOKEN: string;
            REDIS_ENDPOINT: string;
            REDIS_TOKEN: string 
            QSTASH_URL: string;
            QSTASH_TOKEN: string;
            RESEND_TOKEN: string;
            QSTASH_CURRENT_SIGNING_KEY: string;
            QSTASH_NEXT_SIGNING_KEY: string;
        }
    }
}

export {};