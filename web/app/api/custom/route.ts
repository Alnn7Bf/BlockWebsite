import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { serverError, success, unauthorized } from "@/lib/api";

import type { CustomData } from "@/types/custom";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if(!user) return unauthorized();

        const settings = await prisma.userSettings.findUnique({
            where: {
                userId: user.id
            }
        });

        return success(undefined, {
            title: settings?.blockPageTitle ?? "",
            description: settings?.blockPageDescription ?? "",
            redirect: settings?.blockPageRedirect ?? ""
        })

    } catch (error) {
        return serverError();
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if(!user) return unauthorized();

        const data: CustomData = await req.json();

        const settings = await prisma.userSettings.upsert({
            where: {
                userId: user.id
            }, update: {
                blockPageTitle: data.title,
                blockPageDescription: data.description,
                blockPageRedirect: data.redirect
            }, create: {
                userId: user.id,
                blockPageTitle: data.title,
                blockPageDescription: data.description,
                blockPageRedirect: data.redirect
            }
        });

        return success(undefined, {
            title: settings.blockPageTitle ?? "",
            description: settings.blockPageDescription ?? "",
            redirect: settings.blockPageRedirect ?? ""
        });

    } catch (error) {
        return serverError();
    }
}