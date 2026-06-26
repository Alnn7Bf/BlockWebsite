"use client"

import { SessionProvider } from "next-auth/react";

export default function SidebarProviders({ children } : { children : React.ReactNode}) {
    return <SessionProvider>{children}</SessionProvider>
}