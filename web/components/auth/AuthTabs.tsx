type AuthMode = "login" | "register";

interface Props {
    mode: AuthMode;
    setMode: (mode: AuthMode) => void;
}

export default function AuthTabs({ mode, setMode }: Props) {
    return (
        <div className="flex border border-foreground/10">
            <button
                onClick={() => setMode("login")}
                className={`
                    flex-1 
                    px-6 
                    py-4 
                    text-sm 
                    tracking-wide 
                    transition 
                    duration-200 
                    cursor-pointer 
                    ${mode === 'login'? 'bg-foreground/5 text-foreground' : 'text-foreground/40 hover:text-foreground/70'}
                `}
            >
                Iniciar sesión
            </button>
            <button
                onClick={() => setMode("register")}
                className={`
                    flex-1 
                    px-6 
                    py-4 
                    text-sm 
                    tracking-wide 
                    transition 
                    duration-200 
                    cursor-pointer 
                    ${mode === 'register'? 'bg-foreground/5 text-foreground' : 'text-foreground/40 hover:text-foreground/70'}
                `}
            >
                Crear cuenta
            </button>
        </div>
    );
}