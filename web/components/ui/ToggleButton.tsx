"use client";

import { useState } from "react";

export default function ToggleButton() {
    const [enabled, setEnabled] = useState(false);

    return (
        <button
            onClick={() => setEnabled(!enabled)}
            className={`
                flex 
                h-7 
                w-14 
                items-center 
                ${enabled? "bg-foreground/15 border-foreground/20" : "bg-foreground/5 border-foreground/10"}
                rounded-full 
                border 
                p-1 
                cursor-pointer 
                transition-all 
                duration-300
            `}
        >
            <div className={`
                h-5 
                w-5 
                rounded-full 
                bg-foreground/70 
                ${enabled ? "translate-x-4" : "translate-x-0"}
                transition-all 
                duration-300 
                ease-in-out
            `}/>
        </button>
    )
}