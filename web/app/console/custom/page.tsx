"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomForm from "@/components/console/custom/CustomForm";
import PreviewPanel from "@/components/console/custom/PreviewPanel";

import type { CustomData } from "@/types/custom";

export default function CustomBlockPage() {
    const { register, handleSubmit, watch, reset, formState: { isDirty } } = useForm<CustomData>({
        defaultValues: {
            title: "",
            description: "",
            redirect: "",
        }
    });

    const previewData = watch();

    useEffect(() => {
        const loadSettings = async () => {
            const res = await fetch('/api/custom');

            if(!res.ok) return;

            const json = await res.json();

            reset(json.data);
        }
        loadSettings();
    }, [reset]);

    const onSubmit = handleSubmit(async (data) => {
        const res = await fetch('/api/custom', {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if(!res.ok) return;

        const json = await res.json();

        reset(json.data);
    });

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
                <CustomForm
                    register={register}
                    onSubmit={onSubmit}
                />
                <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                        Vista previa
                    </p>
                    <PreviewPanel data={previewData} />
                </div>
                <div className="xl:col-span-2 flex justify-end border-t border-foreground/10 pt-8">
                    <button
                        type="submit"
                        form="custom-form"
                        disabled={!isDirty}
                        className={`
                            border
                            px-6
                            py-3
                            text-sm
                            tracking-wide
                            transition-all
                            duration-200
                            ${isDirty
                                ? "cursor-pointer border-foreground/10 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                                : "cursor-default border-foreground/5 text-foreground/20"
                            }
                        `}
                    >
                        Guardar cambios
                    </button>
                </div>
            </section>
        </main>
    );
}