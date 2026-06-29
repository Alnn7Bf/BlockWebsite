"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type FormData = {
    domain: string;
}

export default function BlockedSiteForm() {
    const { register, handleSubmit, reset } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        setError(null);
        setLoading(true);

        const res = await fetch('/api/blocked', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await res.json();

        setLoading(false);

        if(!json.ok) {
            setError(json.message);
            return;
        }
        
        reset();
        router.refresh();
    });

    useEffect(() => {
        if(!error) return;

        const timer = setTimeout(() => {
            setError(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);

    return <form
        onSubmit={onSubmit}
        autoComplete="off"
        className="flex flex-col gap-3"
    >
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
                autoComplete="off"
                placeholder="ejemplo.com"
                className="flex-1 bg-transparent focus:bg-foreground/2 px-5 py-4 text-foreground outline-none placeholder:text-foreground/30 transition-all duration-200"
                {...register("domain", {
                    required: {
                        value: true,
                        message: "Ingresa un dominio."
                    }
                })}
            />
            <button
                type="submit"
                disabled={loading}
                className="border-l border-foreground/10 px-6 text-sm tracking-wide text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer"
            >
                Bloquear
            </button>
        </div>
        {error && (
            <p className="text-red-500 text-sm">{error}</p>
        )}
    </form>
}