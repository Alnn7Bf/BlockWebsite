export default function CustomBlockPage() {
    return (
        <main className="flex flex-col p-8">
            <section className="flex flex-col gap-4 my-8">
                <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                    Personalización
                </p>
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-medium tracking-tight text-foreground">
                        Página de bloqueo
                    </h1>
                    <p className="max-w-2xl leading-relaxed text-foreground/60">
                        Personaliza el mensaje mostrado cuando un sitio sea bloqueado por la extensión.
                    </p>
                </div>
            </section>
            <section className="my-8 grid gap-x-20 gap-y-10 xl:grid-cols-[minmax(0,1fr)_500px]">
                <div className="flex flex-col gap-14">
                    <div className="flex flex-col gap-4">
                        <label 
                            htmlFor="blocked_title"
                            className="text-xs uppercase tracking-subtitle text-foreground/40">
                            Título
                        </label>
                        <input
                            id="blocked_title"
                            type="text"
                            placeholder="Sitio bloqueado"
                            className="border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label 
                            htmlFor="blocked_description"
                            className="text-xs uppercase tracking-subtitle text-foreground/40">
                            Descripción
                        </label>
                        <textarea
                            id="blocked_description"
                            placeholder="Este sitio ha sido bloqueado para ayudarte a mantener el enfoque."
                            className="min-h-44 resize-none border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label 
                            htmlFor="blocked_redirect"
                            className="text-xs uppercase tracking-subtitle text-foreground/40">
                            Redirección
                        </label>
                        <input
                            id="blocked_redirect"
                            type="text"
                            placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                            className="border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                        Vista previa
                    </p>
                    <div className="flex flex-1 flex-col items-center justify-center border border-foreground/10 p-12 text-center">
                        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-foreground/30">
                            BlockWebsite
                        </p>
                        <h2 className="text-4xl font-medium tracking-tight text-foreground">
                            Sitio bloqueado
                        </h2>
                        <p className="mt-6 max-w-sm leading-relaxed text-foreground/50">
                            Este sitio ha sido bloqueado para ayudarte a
                            mantener el enfoque.
                        </p>
                        <button className="mt-10 border border-foreground/10 px-6 py-3 text-sm transition duration-200 hover:bg-foreground/5 cursor-pointer">
                            Continuar
                        </button>
                    </div>
                </div>
                <div className="xl:col-span-2 flex justify-end border-t border-foreground/10 pt-8">
                    <button className="border border-foreground/10 px-8 py-4 text-sm tracking-wider text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer">
                        Guardar cambios
                    </button>
                </div>
            </section>
        </main>
    );
}