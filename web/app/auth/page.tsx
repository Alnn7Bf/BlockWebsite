import ParticlesBackground from "@/components/ui/ParticlesBackground";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground z-0">
            <ParticlesBackground />
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 rounded-full bg-foreground/2 blur-6xl" />
                <div className="absolute inset-0 opacity-3 bg-grid" />
            </div>
            <main className="relative z-10 flex min-h-screen items-center justify-center px-8 py-16">
                <AuthCard />
            </main>
        </div>
    );
}