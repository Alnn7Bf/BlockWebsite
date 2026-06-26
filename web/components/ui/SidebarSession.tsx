"use client"

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { LogOutIcon } from "./Icons";

export default function SidebarSession() {
    const { data: session } = useSession();

    const name = session?.user?.name ?? "Usuario";
    const email = session?.user?.email ?? "";
    const image = session?.user?.image;

    return (
        <div className="border-t border-foreground/10">
            <div className="flex items-center gap-4 p-4 text-foreground/60 hover:bg-foreground/5 transition-all duration-200 cursor-pointer">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        width={32}
                        height={32}
                        className="rounded-full"
                    />
                ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-xs font-medium">
                        {name.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground/60">
                        {name}
                    </p>

                    <p className="truncate text-xs text-foreground/30">
                        {email}
                    </p>
                </div>
                <span className="text-foreground/30 text-xs p-2">›</span>
            </div>
            <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/auth" })}
                className="group flex w-full items-center gap-4 p-4 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-all duration-200 cursor-pointer"
            >
                <LogOutIcon size={25} />
                <span className="text-sm tracking-sidebar">
                    Cerrar sesión
                </span>
            </button>

        </div>
    );
}