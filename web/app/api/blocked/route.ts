import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { unauthorized, badRequest, serverError, success, conflict } from "@/lib/api";
import { normalizeDomain } from "@/utils/normalize-domain";

export async function POST(req : NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) return unauthorized();

        const { domain } = await req.json();
        if(!domain) return badRequest("Ingresa un dominio.");

        const normalized = normalizeDomain(domain);
        if(!normalized) return badRequest("Dominio inválido.");

        const exists = await prisma.blockedSite.findFirst({
            where: {
                userId: user.id,
                domain: normalized,
            },
        });

        if(exists) return conflict("Este dominio ya está bloqueado.");

        await prisma.blockedSite.create({
            data: {
                domain: normalized,
                userId: user.id
            }
        });

        return success();
    } catch (error) {
        return serverError("Error al bloquear el sitio.");
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) return unauthorized();
        
        const sites = await req.json();
        if(!Array.isArray(sites)) return badRequest("Datos inválidos.");

        await prisma.$transaction(
            sites.map(site => 
                prisma.blockedSite.updateMany({
                    where: {
                        id: site.id,
                        userId: user.id,
                    }, data: {
                        isEnabled: site.isEnabled
                    },
                })
            )
        );

        return success("Cambios guardados correctamente.");
    } catch(error) {
        return serverError("No fue posible guardar los cambios.");
    }
}