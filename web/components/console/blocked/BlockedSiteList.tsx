"use client";

import { useState, useEffect } from "react";
import type { BlockedSite } from "@/lib/generated/prisma/client";
import { useRouter } from "next/navigation";
import ToggleButton from "../../ui/ToggleButton";
import { ToggleIcon } from "@/components/ui/Icons";


type Props = {
    sites: BlockedSite[];
}

export default function BlockedSiteList({ sites } : Props) {
    const router = useRouter();

    const [localSites, setLocalSites] = useState(sites);

    useEffect(() => {
        setLocalSites(sites);
    }, [sites]);

    const toggleSite = (id : number) => {
        setLocalSites(current =>
            current.map(site => {
                if(site.id !== id) return site;

                return {
                    ...site,
                    isEnabled: !site.isEnabled,
                };
            })
        );
    };

    const saveChanges = async () => {
        const res = await fetch('/api/blocked', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(localSites),
        });

        const json = await res.json();

        if(!json.ok) {
            console.error(json.message);
            return;
        }
        
        router.refresh();
    };

    const hasChanges = JSON.stringify(localSites) !== JSON.stringify(sites);
 
    return <div>
        <ul className="flex flex-col border border-foreground/10">
            {localSites.map((site) => (
                <li
                    key={site.id}
                    className="flex items-center justify-between border border-transparent px-5 py-4 hover:bg-foreground/2 hover:border-foreground/20 transition-all duration-200"
                >
                    <div className={`flex items-center gap-5 ${site.isEnabled? 'opacity-100' : 'opacity-30'} transition-all duration-200`}>
                        <img 
                            src={`https://www.google.com/s2/favicons?domain=${site.domain}&sz=64`}
                            alt=""
                            className="size-5.5 mx-2 rounded-sm opacity-80"
                        />
                        <span className="font-mono tracking-wide text-sm">
                            {site.domain}
                        </span>
                    </div>
                    <div className="flex items-center gap-8">
                        <span className={`
                            w-auto
                            text-right
                            uppercase
                            tracking-subtitle
                            text-foreground/40
                            ${site.isEnabled? 'opacity-100' : 'opacity-30'}
                            transition-all
                            duration-200
                        `}>
                            {site.isEnabled ? <ToggleIcon.lock size={25} /> : <ToggleIcon.unlock size={25} /> }
                        </span>
                        <ToggleButton
                            enabled={site.isEnabled}
                            onToggle={() => toggleSite(site.id)}
                        />
                    </div>
                </li>
            ))}
        </ul>
        <div className="flex items-center justify-end border-t-0 border-foreground/10 py-4">
            <button
                disabled={!hasChanges}
                onClick={saveChanges}
                className={`
                    border
                    px-6
                    py-3
                    text-sm
                    tracking-wide
                    transition-all
                    duration-200
                    ${hasChanges
                        ? "cursor-pointer border-foreground/10 text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                        : "cursor-default border-foreground/5 text-foreground/20"
                    }
                `}
            >
                Guardar cambios
            </button>
        </div>
    </div>
}