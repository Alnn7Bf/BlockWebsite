"use client"

import { useEffect, useState } from "react";
import Link from "next/link"

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    
    return <header className={`fixed w-full ${scrolled? 'backdrop-blur-sm' : ''} z-20 border-b border-foreground/10 transition-all duration-300`}>
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-8">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center border border-foreground/10 bg-foreground/3">
                    B
                </div>
                <span className="font-medium tracking-tight">
                    Block Website
                </span>
            </div>
            <Link
                href="/login"
                className="flex items-center gap-2 border border-foreground/10 px-5 py-2.5 text-sm transition duration-200 hover:bg-foreground/10"
            >
                Iniciar sesión
            </Link>
        </div>
    </header>
}