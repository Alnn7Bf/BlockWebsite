import PasswordInput from "@/components/ui/PasswordInput";
import ToggleButton from "@/components/ui/ToggleButton";

export default function PasswordProtectionPage() {

    return (
        <main className="flex flex-col p-8">
            <section className="flex flex-col gap-4 my-8">
                <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                    Seguridad
                </p>
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl xl:text-5xl font-medium tracking-tight text-foreground">
                        Protección con contraseña
                    </h1>
                    <p className="max-w-2xl leading-relaxed text-foreground/60">
                        Agrega una contraseña para evitar cambios rápidos en la configuración o desbloqueos accidentales.
                    </p>
                </div>
            </section>
            <section className="my-8 grid gap-x-20 gap-y-10 xl:grid-cols-[minmax(0,1fr)_420px]">
                <div className="flex flex-col gap-14">
                    <div className="flex items-center justify-between border border-foreground/10 p-6">
                        <div className="flex flex-col gap-2">
                            <p className="text-sm tracking-wide text-foreground">
                                Activar protección
                            </p>
                            <p className="max-w-md text-sm leading-relaxed text-foreground/50">
                                Requerir contraseña antes de modificar configuraciones importantes.
                            </p>
                        </div>
                        <ToggleButton />
                    </div>
                    <div className="flex flex-col gap-4">
                        <label 
                            htmlFor="password_1"
                            className="text-xs uppercase tracking-subtitle text-foreground/40"
                        >
                            Contraseña
                        </label>
                        <PasswordInput id="password_1"/>
                    </div>
                    <div className="flex flex-col gap-4">
                        <label 
                            htmlFor="password_2"
                            className="text-xs uppercase tracking-subtitle text-foreground/40"
                        >
                            Confirmar contraseña
                        </label>
                        <PasswordInput id="password_2"/>
                        <p className="text-sm leading-relaxed text-foreground/40">
                            Asegúrate de recordar esta contraseña.
                        </p>
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