import Link from "next/link";

export default function AboutPage() {
    return (
        <main className="flex flex-col p-8">
            <header className="flex flex-col gap-4 my-8">
                <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                    Información
                </p>
                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl font-medium tracking-tight text-foreground">
                        Acerca de la extensión
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-foreground/60">
                        Mantén el enfoque, reduce distracciones y recupera el control sobre tu tiempo en internet.
                    </p>
                </div>
            </header>
            <section className="grid gap-12 my-8">
                <div className="border-b border-foreground/10 pb-12">
                    <h2 className="mb-3 text-xl font-medium">
                        Enfoque sin fricción
                    </h2>
                    <p className="max-w-3xl leading-relaxed text-foreground/70">
                        Esta extensión está diseñada para ayudarte a mantener la concentración bloqueando sitios distractores y reduciendo el acceso impulsivo a páginas que interrumpen tu flujo de trabajo, estudio o descanso.
                    </p>
                </div>
                <div className="border-b border-foreground/10 pb-12">
                    <h2 className="mb-3 text-xl font-medium">
                        Bloqueo de sitios
                    </h2>
                    <p className="max-w-3xl leading-relaxed text-foreground/70">
                        Agrega páginas web a tu lista de bloqueo para evitar distracciones. Cuando intentes acceder a un sitio restringido, el acceso será bloqueado automáticamente.
                    </p>
                </div>
                <div className="border-b border-foreground/10 pb-12">
                    <h2 className="mb-3 text-xl font-medium">
                        Protección por contraseña
                    </h2>
                    <p className="max-w-3xl leading-relaxed text-foreground/70">
                        Protege configuraciones importantes mediante contraseña para evitar cambios accidentales o desactivar restricciones fácilmente.
                    </p>
                </div>
                <div className="border-b border-foreground/10 pb-12">
                    <h2 className="mb-3 text-xl font-medium">
                        Modo incógnito
                    </h2>
                    <p className="max-w-3xl leading-relaxed text-foreground/70">
                        La extensión puede funcionar también en ventanas privadas, siempre que el navegador permita habilitar esta opción manualmente.
                    </p>
                </div>
                <div className="border-b border-foreground/10 pb-12">
                    <h2 className="mb-3 text-xl font-medium">
                        Privacidad
                    </h2>
                    <p className="max-w-3xl leading-relaxed text-foreground/70">
                        Se busca recopilar únicamente la información necesaria para el funcionamiento de la extensión. Consulta la política de privacidad para obtener más detalles sobre el manejo de datos.
                    </p>
                </div>
                <section className="flex flex-col gap-6 pt-4">
                    <div>
                        <h2 className="text-xl font-medium">
                            Enlaces útiles
                        </h2>
                        <p className="mt-2 text-foreground/60">
                            Más información sobre privacidad, términos y soporte.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Link 
                            href={''}
                            className="border border-foreground/10 px-5 py-3 transition duration-200 hover:bg-foreground/5 cursor-pointer">
                            Política de privacidad
                        </Link>
                        <Link 
                            href={''}
                            className="border border-foreground/10 px-5 py-3 transition duration-200 hover:bg-foreground/5 cursor-pointer">
                            Términos de uso
                        </Link>
                        <Link 
                            href={''}
                            className="border border-foreground/10 px-5 py-3 transition duration-200 hover:bg-foreground/5 cursor-pointer">
                            Contacto y soporte
                        </Link>
                    </div>
                </section>
            </section>
        </main>
    );
}