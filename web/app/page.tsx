import Link from "next/link";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
    return (
        <div className="relative min-h-screen z-0 overflow-hidden bg-background text-foreground">
            <ParticlesBackground />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 rounded-full bg-foreground/2 blur-6xl" />
                <div className="absolute inset-0 opacity-3 bg-grid" />
            </div>
            <Navbar />
            <main className="relative z-10 my-44">
                <section className="mx-auto flex min-h-11/12 w-full max-w-7xl flex-col items-center px-8 text-center">
                    <div className="fixed top-20 border border-foreground/10 bg-foreground/5 px-4 py-2 text-sm text-foreground/60 backdrop-blur-sm">
                        Mantente enfocado · Reduce distracciones
                    </div>
                    <h1 className="max-w-5xl text-5xl font-semibold tracking-tight leading-[1.05] sm:text-6xl lg:text-7xl">
                        Recupera el control
                        <br />
                        sobre tu tiempo
                        <span className="text-foreground/50">
                            &nbsp;en internet
                        </span>
                    </h1>
                    <p className="mt-8 max-w-2xl text-lg leading-8 text-foreground/60">
                        Bloquea sitios distractores, protege
                        configuraciones importantes y crea un
                        entorno digital más limpio para estudiar,
                        trabajar y concentrarte.
                    </p>
                    <div className="mt-12 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/auth"
                            className="group flex items-center justify-center gap-2 bg-foreground px-6 py-4 text-background transition duration-200 hover:opacity-90"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href="/console/about"
                            className="border border-foreground/10 px-6 py-4 transition duration-200 hover:bg-foreground/5"
                        >
                            Conocer más
                        </Link>
                    </div>

                    {/* Features */}
                    <section className="mt-28 grid w-full max-w-5xl gap-5 md:grid-cols-3">
                        <article className="border p-8 border-foreground/10 bg-foreground/5 hover:bg-foreground/3 text-left transition duration-200">
                            <h2 className="text-lg font-medium">
                                Bloqueo inteligente
                            </h2>
                            <p className="mt-3 leading-7 text-foreground/60">
                                Restringe sitios distractores
                                y evita interrupciones durante
                                sesiones de estudio o trabajo.
                            </p>
                        </article>
                        <article className="border p-8 border-foreground/10 bg-foreground/5 hover:bg-foreground/3 text-left transition duration-200">
                            <h2 className="text-lg font-medium">
                                Protección segura
                            </h2>
                            <p className="mt-3 leading-7 text-foreground/60">
                                Configura contraseña para evitar
                                cambios accidentales y mantener
                                tus reglas protegidas.
                            </p>
                        </article>
                        <article className="border p-8 border-foreground/10 bg-foreground/5 hover:bg-foreground/3 text-left transition duration-200">
                            <h2 className="text-lg font-medium">
                                Navegación enfocada
                            </h2>
                            <p className="mt-3 leading-7 text-foreground/60">
                                Construye un entorno digital
                                más limpio para reducir hábitos
                                impulsivos y procrastinación.
                            </p>
                        </article>
                    </section>
                </section>
            </main>
            <footer className="relative bg-linear-0 from-background to-transparent z-10 border-t border-foreground/10">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-8 py-8 text-sm text-foreground/50 sm:flex-row">
                    <p>
                        &copy; &copy;{
                            new Date().getFullYear()
                        } 
                        <a 
                            href="https://github.com/Alnn7Bf" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-foreground/80 hover:text-foreground transition-colors"
                        > Alan Bf
                        </a>.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="transition hover:text-foreground"
                        >
                            Privacidad
                        </Link>
                        <Link
                            href="/terms"
                            className="transition hover:text-foreground"
                        >
                            Términos
                        </Link>
                        <Link
                            href="/support"
                            className="transition hover:text-foreground"
                        >
                            Soporte
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}