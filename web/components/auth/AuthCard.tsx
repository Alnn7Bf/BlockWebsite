"use client";

import { useState } from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { GoogleIcon } from "../ui/Icons";
import { signIn } from "next-auth/react";

type AuthMode = "login" | "register";

export default function AuthCard() {
    const [mode, setMode] = useState<AuthMode>("login");

    const isLogin = mode === "login";

    return (
        <section className="w-full max-w-xl">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-3">
                    <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                        Cuenta
                    </p>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-medium tracking-tight text-foreground xl:text-5xl">
                            {isLogin? "Bienvenido de nuevo" : "Crea tu cuenta"}
                        </h1>
                        <p className="max-w-md leading-relaxed text-foreground/60 text-sm font-light tracking-wide">
                            {isLogin? "Continúa donde lo dejaste." : "Empieza en segundos."}
                        </p>
                    </div>
                </div>
                <AuthTabs
                    mode={mode}
                    setMode={setMode}
                />
                <button
                    type="button"
                    onClick={() => {
                        signIn("google", { callbackUrl: "/console/blocked" })
                    }}
                    className="flex items-center justify-center gap-3 border border-foreground/10 px-6 py-4 text-sm text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground  cursor-pointer"
                >
                    <GoogleIcon size={22} />
                    Continuar con Google
                </button>
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-foreground/10" />
                    <span className="text-xs uppercase tracking-subtitle text-foreground/40">
                        o continúa con correo
                    </span>
                    <div className="h-px flex-1 bg-foreground/10" />
                </div>
                {isLogin ? (<LoginForm />) : (<RegisterForm />)}
            </div>
        </section>
    );
}