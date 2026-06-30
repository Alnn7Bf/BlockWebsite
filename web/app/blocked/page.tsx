import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/auth";

const defaults = {
    title: "Sitio bloqueado",
    description:
        "Este sitio ha sido bloqueado para ayudarte a mantener el enfoque.",
    redirect: "/",
};

function getBlockedSite(searchParams: { site?: string; url?: string }) {
    if (searchParams.site) {
        return searchParams.site;
    }

    if (searchParams.url) {
        try {
            return new URL(searchParams.url).hostname;
        } catch {
            return searchParams.url;
        }
    }

    return undefined;
}

type Props = {
    searchParams: Promise<{
        site?: string;
        url?: string;
    }>;
};

export default async function BlockedPage({ searchParams } : Props ) {
    const session = await getCurrentSession();

    const params = await searchParams;
    const blockedSite = getBlockedSite(params);

    let settings = null;
    
    if (session?.user?.email) {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            }, include: {
                settings: true,
            },
        });

        settings = user?.settings ?? null;
    }

    const title = settings?.blockPageTitle || defaults.title;
    const description = settings?.blockPageDescription || defaults.description;
    
    return (
        <div className="relative min-h-screen z-0 overflow-hidden bg-background text-foreground">
            <ParticlesBackground />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 rounded-full bg-foreground/2 blur-6xl" />
                <div className="absolute inset-0 opacity-3 bg-grid" />
            </div>
            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
                <section className="flex max-w-2xl flex-col items-center text-center">
                    <p className="mb-6 text-sm uppercase tracking-subtitle text-foreground/30">
                        BlockWebsite
                    </p>
                    <h1 className="text-6xl font-medium tracking-tight">
                        {title}
                    </h1>
                    <p className="mt-6 max-w-xl text-foreground/60">
                        {description}
                    </p>
                    <div className="mt-12 flex w-full max-w-md items-center justify-between border border-foreground/10 px-5 py-4 gap-6">
                        <div className="flex items-center gap-4">
                            <img
                                src={`https://www.google.com/s2/favicons?domain=${blockedSite}&sz=64`}
                                alt={blockedSite}
                                className="size-8 opacity-80"
                            />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] uppercase tracking-subtitle text-foreground/30">
                                    Sitio bloqueado
                                </span>
                                <span className="mt-1 font-mono tracking-wide text-foreground/80">
                                    {blockedSite}
                                </span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-foreground/10" />
                        <span className="text-xs uppercase tracking-subtitle text-foreground/30">
                            Activo
                        </span>
                    </div>
                    <a
                        href="/"
                        className="mt-10 border border-foreground/10 px-6 py-3 hover:bg-foreground/5 transition"
                    >
                        Continuar
                    </a>
                </section>
            </main>
        </div>
    )
}