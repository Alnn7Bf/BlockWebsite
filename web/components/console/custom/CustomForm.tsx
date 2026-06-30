import { UseFormRegister } from "react-hook-form"
import type { CustomData } from "@/types/custom";

interface Props {
    register: UseFormRegister<CustomData>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
}

export default function CustomForm({ register, onSubmit } : Props) {
    return <form 
        id="custom-form"
        onSubmit={onSubmit}
        className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
            <label 
                htmlFor="blocked_title"
                className="text-xs uppercase tracking-subtitle text-foreground/40">
                Título
            </label>
            <input
                id="blocked_title"
                type="text"
                placeholder="Sitio bloqueado"
                className="border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                {...register("title")}
            />
        </div>
        <div className="flex flex-col gap-4">
            <label 
                htmlFor="blocked_description"
                className="text-xs uppercase tracking-subtitle text-foreground/40">
                Descripción
            </label>
            <textarea
                id="blocked_description"
                placeholder="Este sitio ha sido bloqueado para ayudarte a mantener el enfoque."
                className="min-h-44 resize-none border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                {...register("description")}
            />
        </div>
        <div className="flex flex-col gap-4">
            <label 
                htmlFor="blocked_redirect"
                className="text-xs uppercase tracking-subtitle text-foreground/40">
                Redirección
            </label>
            <input
                id="blocked_redirect"
                type="text"
                placeholder="https://block-website-nine.vercel.app/blocked"
                className="border border-foreground/10 bg-transparent focus:bg-foreground/2 px-5 py-4 outline-none placeholder:text-foreground/30 transition-all duration-200"
                {...register("redirect")}
            />
        </div>
    </form>
}