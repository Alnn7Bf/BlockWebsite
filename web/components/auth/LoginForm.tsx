import Link from "next/link";
import PasswordInput from "@/components/ui/PasswordInput";

export default function LoginForm() {
  return (
    <form 
      autoComplete="off"
      className="flex flex-col gap-8"
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
          name="email"
          type="email"
          placeholder="correo@ejemplo.com"
          className="border border-foreground/10 w-full bg-transparent px-4 py-3 pr-14 text-foreground outline-none focus:bg-foreground/2 transition-all duration-200"
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
          name="password" 
          autoComplete="current-password"
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

      <div className="border-t border-foreground/10 pt-8">
        <button className="w-full border border-foreground/10 px-8 py-4 text-sm tracking-wider text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer">
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}