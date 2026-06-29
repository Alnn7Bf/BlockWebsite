import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { normalizeDomain } from "@/utils/normalize-domain";

export async function POST(req : NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({
                ok: false,
                message: "No autorizado."
            }, { status: 401 });
        }

        const { domain } = await req.json();

        if(!domain) {
            return NextResponse.json({
                ok: false,
                message: "Ingresa un dominio."
            }, { status: 400 });
        }

        const normalized = normalizeDomain(domain);

        if(!normalized) {
            return NextResponse.json({
                ok: false,
                message: "Dominio inválido."
            }, { status: 400 });
        }

        await prisma.blockedSite.create({
            data: {
                domain: normalized,
                userId: Number(session.user.id)
            }
        });

        return NextResponse.json({
            ok: true
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            messaje: "Error al bloquear el sitio."
        }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({
                ok: false,
                message: "No autorizado."
            }, { status: 401 });
        }
        
        const sites = await req.json();

        if(!Array.isArray(sites)) {
            return NextResponse.json({
                ok: false,
                message: "Datos inválidos."
            }, { status: 400 });
        }
        await prisma.$transaction(
            sites.map(site => 
                prisma.blockedSite.updateMany({
                    where: {
                        id: site.id,
                        userId: Number(session.user.id),
                    }, data: {
                        isEnabled: site.isEnabled
                    },
                })
            )
        );

        return NextResponse.json({
            ok: true,
            message: "Cambios guardados correctamente.",
        });
    } catch(error) {
        return NextResponse.json({
            ok: false,
            message: "No fue posible guardar los cambios",
        }, { status: 500 });
    }
}