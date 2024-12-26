declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CONVEX_DEPLOYMENT: string;
            NODE_ENV: 'development' | 'production';
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
            CLERK_SECRET_KEY: string;
            NEXT_PUBLIC_CONVEX_URL: string;
            NEXT_PUBLIC_CONVEX_DOMAIN: string;
            NEXT_PUBLIC_CLERK_SIGN_IN_URL: string;
            NEXT_PUBLIC_CLERK_SIGN_UP_URL: string;
            CLERK_WEBHOOK_SECRET: string;
            OPENAI_API_KEY: string;
        }
    }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
