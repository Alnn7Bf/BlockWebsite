export default function BlockedSitesPage() {
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
                    <button className="border border-foreground/10 px-6 py-3 text-sm tracking-wide text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer" >
                        Agregar sitio
                    </button>
                </div>
            </section>
            <section className="flex flex-col gap-6 my-8">
                <div className="flex flex-col gap-3">
                    <label 
                        htmlFor="new_domain"
                        className="text-xs uppercase tracking-subtitle text-foreground/40"
                    >
                        Nuevo dominio
                    </label>

                    <div className="flex border border-foreground/10">
                        <input
                            id="new_domain"
                            type="text"
                            placeholder="ejemplo.com"
                            className="flex-1 bg-transparent focus:bg-foreground/2 px-5 py-4 text-foreground outline-none placeholder:text-foreground/30 transition-all duration-200"
                        />
                        <button className="border-l border-foreground/10 px-6 text-sm tracking-wide text-foreground/60 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer">
                            Bloquear
                        </button>
                    </div>
                </div>
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
                        0 sitios bloqueados
                    </p>
                </div>
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
            </section>
        </main>
    );
}