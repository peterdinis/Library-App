declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      NEXTAUTH_URL: string;
      DATABASE_URL: string;
      UPLOADTHING_TOKEN: string;
      REDIS_ENDPOINT: string;
      REDIS_TOKEN: string;
      QSTASH_URL: string;
      QSTASH_TOKEN: string;
      QSTASH_CURRENT_SIGNING_KEY: string;
      QSTASH_NEXT_SIGNING_KEY: string;
      NODEMAILER_USER: string;
      NODEMAILER_PASS: string;
      NODEMAILER_HOST: string;
      NODEMAILER_PORT: number;
    }
  }
}

export {};
