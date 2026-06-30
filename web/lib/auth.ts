import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { prisma } from "./prisma";

export async function getCurrentSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions);

    if(!session?.user.email) {
        return null;
    }

    return prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })
}