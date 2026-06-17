import Link from "next/link";
import { Icons, LogOutIcon } from "@/components/ui/Icons";

type IconName = keyof typeof Icons;

interface LinkButtonProps {
    icon: IconName;
    children: React.ReactNode;
    href: string;
}

const sidebarElements : LinkButtonProps[] = [{
    icon: "blocked",
    children: "Bloquear Sitios",
    href: "/console/blocked",
  }, {
    icon: "paint",
    children: "Personalizar Página de Bloqueo",
    href: "/console/custom",
  }, {
    icon: "lock",
    children: "Protección con Contraseña",
    href: "/console/password",
  }, {
    icon: "settings",
    children: "Ajustes",
    href: "/console/settings",
  }, {
    icon: "about",
    children: "Acerca de",
    href: "/console/about",
  },
];

const LinkButton = ({ icon, children, href} : LinkButtonProps) => {
    const Icon = Icons[icon];
    return (
        <Link 
            href={href}
            className="group flex items-center gap-4 p-4 text-foreground/60 hover:bg-foreground/5 hover:text-foreground transition-all duration-200"
        >
            <Icon size={25}/>
            <span className="text-sm tracking-sidebar">
                {children}
            </span>
        </Link>
    )
}

export default function Sidebar() {
    return (
        <aside className="flex flex-col w-72 h-screen border-r border-foreground/10 bg-background">
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
                        sidebarElements.map(({icon, children, href}, index) => {
                            return <LinkButton key={index} icon={icon} href={href}>{children}</LinkButton>
                        })
                    }
                </ul>
            </nav>
            <div className="border-t border-foreground/10 p-3">
                <button className="flex w-full items-center gap-3 p-3 text-sm tracking-wide text-foreground/70 transition duration-200 hover:bg-foreground/5 hover:text-foreground cursor-pointer">
                    <LogOutIcon size={20}/>
                    <span>LogOut</span>
                </button>
            </div>
        </aside>
    );
}