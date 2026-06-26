import Sidebar from "@/components/layout/Sidebar";
import ParticlesBackground from "@/components/ui/ParticlesBackground";

export default function DashboardLayout({ children } : { children: React.ReactNode; }) {
    return (
        <div className="relative flex h-screen overflow-hidden bg-background z-0">
            <ParticlesBackground />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 rounded-full bg-foreground/2 blur-6xl z-0" />
                <div className="absolute inset-0 opacity-3 bg-grid" />
            </div>
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-8 text-foreground">
                {children}
            </main>
        </div>
    );
}