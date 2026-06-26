"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";

import type { FormData } from "@/types/auth";

export default function RegisterForm() {
    const { register, handleSubmit } = useForm<FormData>();

    const router = useRouter();

    const onSubmit = handleSubmit(async (data) => {
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const resJSON = await res.json();

        if(!resJSON.ok) return;

        const loginRes = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if(loginRes?.ok) router.push("/console/blocked");
    });

    return (
        <form
            autoComplete="off"
            onSubmit={onSubmit}
            className="flex flex-col gap-8"
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
                        required: {
                            value: true,
                            message: "Name is required"
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
                        required: {
                            value: true,
                            message: "Email is required"
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
                        required: {
                            value: true,
                            message: "Password is required"
                        }
                    })}
                />
            </div>
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