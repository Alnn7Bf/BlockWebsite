"use client";

import { NextParticles, NextParticlesProvider } from "@tsparticles/nextjs";
import type { Engine } from "@tsparticles/engine";
import { particlesConfig } from "@/config/particles.config";

const init = async (engine: Engine): Promise<void> => {
    const [{ loadSlim }, { loadThemesPlugin }] = await Promise.all([
        import("@tsparticles/slim"),
        import("@tsparticles/plugin-themes"),
    ]);

    await Promise.all([loadSlim(engine), loadThemesPlugin(engine)]);
};

export default function ParticlesBackground() {
    return (
        <NextParticlesProvider init={init}>
            <NextParticles 
                id="tsparticles" 
                className="absolute inset-0 -z-10"
                options={particlesConfig} 
            />
        </NextParticlesProvider>
    );
}