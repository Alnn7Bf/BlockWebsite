import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";
import argon2 from "argon2";

import type { Account, User } from "next-auth";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET,
    trustHost: true,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            }, async authorize(credentials, req) {
                if(!credentials?.email || !credentials.password) throw new Error("Empty field");

                const userFound = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if(!userFound) throw new Error('User not found');
                if(!userFound.password) return null;

                const matchPassword = await argon2.verify(userFound.password, credentials.password);

                if(!matchPassword) throw new Error('Wrong password');

                return {
                    id: String(userFound.id),
                    name: userFound.name,
                    email: userFound.email
                }
            }
        }), Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ], callbacks: {
        async signIn({ user, account } : { user : User; account : Account | null }) {
            if(account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email! },
                });

                if(!existingUser) {
                    await prisma.user.create({
                        data: {
                            name: user.name ?? "Sin nombre",
                            email: user.email!,
                            provider: "GOOGLE",
                        },
                    });
                }
            }

            return true;
        },
    }, pages: {
        signIn: "/auth"
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }