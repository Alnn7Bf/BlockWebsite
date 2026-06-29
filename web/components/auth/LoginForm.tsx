"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/ui/PasswordInput";

import type { FormData } from "@/types/auth";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [hasError, setHasError] = useState(false);
  const clearServerError = () => setHasError(false);

  const formError = 
    errors.email?.message ||
    errors.password?.message;

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setHasError(false);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if(res?.ok) {
      router.push("/console/blocked")
    } else {
      setHasError(true);
    }

  });
  
  return (
    <form 
      autoComplete="off"
      onSubmit={onSubmit}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-col gap-4">
        <label 
          htmlFor="login_email"
          className="text-xs uppercase tracking-subtitle text-foreground/40"
        >
          Correo electrónico
        </label>
        <input
          id="login_email"
          type="email"
          placeholder="correo@ejemplo.com"
          className="border border-foreground/10 w-full bg-transparent px-4 py-3 pr-14 text-foreground outline-none focus:bg-foreground/2 transition-all duration-200"
          {...register("email", {
            onChange: clearServerError,
            required: {
              value: true,
              message: "Ingresa tu correo electrónico."
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
          htmlFor="login_password"
          className="text-xs uppercase tracking-subtitle text-foreground/40"
        >
          Contraseña
        </label>
        <PasswordInput 
          id="login_password"
          autoComplete="current-password"
          {...register("password", {
            onChange: clearServerError,
            required: {
              value: true,
              message: "Ingresa tu contraseña."
            }
          })}
        />
      </div>
      <div className="flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm text-foreground/40 transition hover:text-foreground/70"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>
      {(formError || hasError) && (
        <div className="border border-red-500/80 bg-red-500/5 px-4 py-2">
          <p className="text-sm text-red-500 text-center">
            {formError ?? "Correo o contraseña incorrectos."}
          </p>
        </div>
      )}
      <div className="border-t border-foreground/10 pt-8">
        <button 
          type="submit"
          className="w-full border border-foreground/10 px-8 py-4 text-sm tracking-wider text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}