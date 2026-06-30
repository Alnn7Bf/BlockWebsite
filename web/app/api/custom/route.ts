import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";

import type { CustomData } from "@/types/custom";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "No autorizado."
                },
                {
                    status: 401
                }
            );
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json(
                {
                    ok: false,
                    message: "Usuario no encontrado."
                },
                {
                    status: 404
                }
            );
        }

        const settings = await prisma.userSettings.findUnique({
            where: {
                userId: user.id
            }
        });

        return NextResponse.json({
            ok: true,
            data: {
                title: settings?.blockPageTitle ?? "",
                description: settings?.blockPageDescription ?? "",
                redirect: settings?.blockPageRedirect ?? ""
            }
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                ok: false,
                message: "Ocurrió un error interno."
            },
            {
                status: 500
            }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({
                ok: false,
                message: "No autorizado."
            }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        });

        if (!user) {
            return NextResponse.json({
                ok: false,
                message: "Usuario no encontrado."
            }, { status: 404 });
        }

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

        return NextResponse.json({
            ok: true,
            data: {
                title: settings.blockPageTitle ?? "",
                description: settings.blockPageDescription ?? "",
                redirect: settings.blockPageRedirect ?? ""
            }
        });

    } catch (error) {
        console.error(error);

        return NextResponse.json({
            ok: false,
            message: "Ocurrió un error interno."
        }, { status: 500 });
    }
}