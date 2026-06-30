import { CustomData } from "@/types/custom"
import { DEFAULT_CUSTOM_DATA } from "@/config/custom.config";

interface Props {
    data: CustomData;
}

export default function PreviewPanel({ data } : Props) {
    return <div className="flex flex-1 flex-col items-center justify-center border border-foreground/10 p-12 text-center">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-foreground/30">
            BlockWebsite
        </p>
        <h2 className="text-4xl font-medium tracking-tight text-foreground">
            { data.title || DEFAULT_CUSTOM_DATA.title }
        </h2>
        <p className="mt-6 max-w-sm leading-relaxed text-foreground/50">
            { data.description || DEFAULT_CUSTOM_DATA.description }
        </p>
        <button className="mt-10 border border-foreground/10 px-6 py-3 text-sm transition duration-200 hover:bg-foreground/5 cursor-pointer">
            Continuar
        </button>
    </div>
}