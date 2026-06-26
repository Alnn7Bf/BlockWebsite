"use client"

import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image";

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
                <div>
                    <Image 
                        src={'/images/logo.png'}
                        width={40}
                        height={40}
                        alt="logo"
                    />
                </div>
                <span className="font-medium tracking-tight">
                    Block Website
                </span>
            </div>
            <Link
                href="/auth"
                className="flex items-center gap-2 border border-foreground/10 px-5 py-2.5 text-sm transition duration-200 hover:bg-foreground/10"
            >
                Iniciar sesión
            </Link>
        </div>
    </header>
}