"use client";

import { useState } from "react";
import AuthTabs from "./AuthTabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

type AuthMode = "login" | "register";

export default function AuthCard() {
    const [mode, setMode] = useState<AuthMode>("login");

    const isLogin = mode === "login";

    return (
        <section className="w-full max-w-xl border border-foreground/10 bg-foreground/2 backdrop-blur-xl">
            <div className="flex flex-col gap-8 p-8 xl:p-10">
                <div className="flex flex-col gap-4">
                    <p className="text-xs uppercase tracking-subtitle text-foreground/40">
                        Cuenta
                    </p>
                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl font-medium tracking-tight text-foreground xl:text-5xl">
                            {isLogin? "Bienvenido de nuevo" : "Crea tu cuenta"}
                        </h1>
                        <p className="max-w-md leading-relaxed text-foreground/60">
                            {isLogin? "Retoma el control de tus hábitos digitales y continúa donde te quedaste." : "Comienza a construir un entorno digital más limpio y enfocado."}
                        </p>
                    </div>
                </div>
                <AuthTabs
                    mode={mode}
                    setMode={setMode}
                />
                {isLogin ? (<LoginForm />) : (<RegisterForm />)}
            </div>
        </section>
    );
}