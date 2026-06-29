"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";
import PasswordRequirement from "./PasswordRequirement";
import { getPasswordStrength, strengthColors } from "@/utils/password-strength";

import type { FormData } from "@/types/auth";

export default function RegisterForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();

    const [error, setError] = useState<string | null>(null);
    const clearServerError = () => setError(null);

    const password = watch("password", "");
    const passwordStrength = getPasswordStrength(password);

    const formError = 
        errors.name?.message ||
        errors.email?.message ||
        errors.password?.message;

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        setError(null);

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resJSON = await res.json();

        if(!resJSON.ok) {
            setError(resJSON.message ?? "No fue posible crear la cuenta");
            return;
        }

        const loginRes = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if(!loginRes?.ok) {
            console.error("No fue posible iniciar sesión automáticamente.");
            return;
        }

        router.push("/console/blocked");
    });

    return (
        <form
            autoComplete="off"
            onSubmit={onSubmit}
            className="flex flex-col gap-6"
        >
            <div className="flex flex-col gap-4">
                <label
                    htmlFor="register_name"
                    className="text-xs uppercase tracking-subtitle text-foreground/40"
                >
                    Nombre
                </label>
                <input
                    id="register_name"
                    type="text"
                    placeholder="Tu nombre"
                    className="border border-foreground/10 w-full bg-transparent px-4 py-3 pr-14 text-foreground outline-none focus:bg-foreground/2 transition-all duration-200"
                    {...register("name", {
                        onChange: clearServerError,
                        required: {
                            value: true,
                            message: "Ingresa tu nombre."
                        }
                    })}
                />
            </div>
            <div className="flex flex-col gap-4">
                <label
                    htmlFor="register_email"
                    className="text-xs uppercase tracking-subtitle text-foreground/40"
                >
                    Correo electrónico
                </label>
                <input
                    id="register_email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    className="border border-foreground/10 w-full bg-transparent px-4 py-3 pr-14 text-foreground outline-none focus:bg-foreground/2 transition-all duration-200"
                    {...register("email", {
                        onChange: clearServerError,
                        required: {
                            value: true,
                            message: "Ingresa un correo electrónico."
                        },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo electrónico válido."
                        }
                    })}
                />
            </div>
            <div className="flex flex-col gap-4">
                <label
                    htmlFor="register_password"
                    className="text-xs uppercase tracking-subtitle text-foreground/40"
                >
                    Contraseña
                </label>
                <PasswordInput
                    id="register_password"
                    autoComplete="current-password"
                    {...register("password", {
                        onChange: clearServerError,
                        required: {
                            value: true,
                            message: "Ingresa una contraseña."
                        }
                    })}
                />
            </div>
            {password.length > 0 && (
                <div className="flex flex-col gap-2 text-xs">
                    <p className="text-foreground/60">
                        Seguridad:{" "}
                        <span className={strengthColors[passwordStrength.score]}>
                            {passwordStrength.label}
                        </span>
                    </p>
                    <ul className="space-y-1 text-foreground/50">
                        <PasswordRequirement ok={passwordStrength.checks.length} label="Al menos 8 caracteres"/>
                        <PasswordRequirement ok={passwordStrength.checks.letter} label="Contiene letras"/>
                        <PasswordRequirement ok={passwordStrength.checks.number} label="Contiene un número"/>
                        <PasswordRequirement ok={passwordStrength.checks.special} label="Carácter especial (opcional)"/>
                    </ul>
                </div>
            )}
            {(formError || error) && (
                <div className="border border-red-500/80 bg-red-500/5 px-4 py-2">
                    <p className="text-sm text-red-500 text-center">
                        {formError ?? error}
                    </p>
                </div>
            )}
            <div className="border-t border-foreground/10 pt-8">
                <button 
                    type="submit"
                    className="w-full border border-foreground/10 px-8 py-4 text-sm tracking-wider text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer"
                >
                    Crear cuenta
                </button>
            </div>
        </form>
    );
}