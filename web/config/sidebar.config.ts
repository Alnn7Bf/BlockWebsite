import type { IconName } from "@/types/icons";

export interface SidebarItem {
    icon: IconName;
    label: string;
    href: string;
}

export const sidebarElements : SidebarItem[] = [{
    icon: "blocked",
    label: "Bloquear Sitios",
    href: "/console/blocked",
  }, {
    icon: "paint",
    label: "Personalizar Página de Bloqueo",
    href: "/console/custom",
  }, {
    icon: "lock",
    label: "Protección con Contraseña",
    href: "/console/password",
  }, {
    icon: "settings",
    label: "Ajustes",
    href: "/console/settings",
  }, {
    icon: "about",
    label: "Acerca de",
    href: "/console/about",
  },
];