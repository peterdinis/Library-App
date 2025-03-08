import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import type { DefaultSession, NextAuthConfig } from "next-auth";
import { db } from "~/server/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      status: string;
      role: string
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Chýba email alebo heslo.");
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("Používateľ neexistuje.");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new Error("Nesprávne heslo.");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.fullName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
