import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import { SidebarItem, sidebarElements } from "@/config/sidebar.config";
import SidebarProviders from "../ui/SidebarProviders";
import SidebarSession from "../ui/SidebarSession";

const LinkButton = ({ icon, label, href } : SidebarItem) => {
    const Icon = Icons[icon];
    return (
        <Link 
            href={href}
            className="group flex items-center gap-4 p-4 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-all duration-200"
        >
            <Icon size={25}/>
            <span className="text-sm tracking-sidebar">
                {label}
            </span>
        </Link>
    )
}

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-72 h-screen border-r border-foreground/10">
            <div className="flex h-24 items-center justify-between border-b border-foreground/10 px-6">
                <div className="flex flex-col">
                    <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
                        Panel
                    </p>
                    <h1 className="text-xl font-medium tracking-tight text-foreground">
                        BlockWebsite
                    </h1>
                </div>
            </div>
            <nav className="flex-1 py-6">
                <ul className="flex flex-col">
                    {
                        sidebarElements.map(item => (
                            <li key={item.href}>
                                <LinkButton { ...item } />
                            </li>
                        ))
                    }
                </ul>
            </nav>
            <SidebarProviders>
                <SidebarSession />
            </SidebarProviders>
        </aside>
    );
}