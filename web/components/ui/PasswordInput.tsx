"use client";

import { useState, InputHTMLAttributes } from "react";
import { PasswordIcons } from "@/components/ui/Icons";

interface inputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function PasswordInput({ autoComplete = "off", ...props } : inputProps) {
    const [isHidden, setIsHidden] = useState(true);
    const Icon = isHidden? PasswordIcons['hide'] : PasswordIcons['view'];
    return (
        <div className="relative border border-foreground/10">
            <input
                type={isHidden? 'password' : 'text'}
                autoComplete={autoComplete}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                className="w-full bg-transparent px-4 py-3 pr-14 text-foreground outline-none focus:bg-foreground/2 transition-all duration-200"
                { ...props }
            />
            <button 
                type="button"
                onClick={() => setIsHidden(!isHidden)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 transition-all hover:text-foreground cursor-pointer"
            >
                <Icon size={25}/>
            </button>
        </div>
    );
}