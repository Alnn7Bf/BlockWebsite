import BlockedSiteForm from "@/components/console/blocked/BlockedSiteForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/auth.config";
import { prisma } from "@/lib/prisma";
import BlockedSiteList from "@/components/console/blocked/BlockedSiteList";

export default async function BlockedSitesPage() {
    const session = await getServerSession(authOptions);

    if(!session?.user.id) {
        return <main className="p-8">
            <p className="text-red-500">No autorizado</p>
        </main>
    }

    const sites = await prisma.blockedSite.findMany({
        where: {
            userId: Number(session.user.id),
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    const hasSites = sites.length > 0;

    return (
        <main className="flex flex-col p-8">
            <section className="flex flex-col gap-4 my-8">
                <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                    Configuración
                </p>
                <div className="flex items-end justify-between gap-6">
                    <div className="flex flex-col gap-3">
                        <h1 className="text-5xl font-medium tracking-tight text-foreground">
                            Sitios bloqueados
                        </h1>
                        <p className="max-w-2xl text-foreground/60">
                            Administra los sitios web restringidos por tu extensión. Agrega, elimina o modifica dominios bloqueados.
                        </p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col gap-6 my-8">
                <BlockedSiteForm />
            </section>
            <section className="my-8 flex flex-col gap-6">
                <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                            Lista
                        </p>
                        <h2 className="text-3xl font-medium tracking-tight text-foreground">
                            Dominios bloqueados
                        </h2>
                    </div>
                    <p className="text-sm text-foreground/40">
                        {
                            sites.length + (sites.length === 1? ' sitio bloqueado' : ' sitios bloqueados')
                        }
                    </p>
                </div>
                {!hasSites ? (
                    <div className="flex min-h-80 items-center justify-center border border-foreground/10">
                        <div className="flex max-w-md flex-col items-center gap-4 text-center">
                            <h3 className="text-2xl font-medium tracking-tight text-foreground">
                                No hay sitios bloqueados
                            </h3>
                            <p className="leading-relaxed text-foreground/50">
                                Agrega tu primer dominio para comenzar a bloquear páginas específicas desde tu navegador.
                            </p>
                        </div>
                    </div>
                ) : (
                    <BlockedSiteList sites={sites}/>
                )}
            </section>
        </main>
    );
}