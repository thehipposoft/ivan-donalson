import type { NavItem } from "@/types";

export const site = {
  name: "Ivan Donalson",
  tagline: "Meditación · Mentalismo · Conocimiento",
  // TODO(copy): descripción SEO definitiva
  description:
    "Sitio oficial de Ivan Donalson. Meditación, mentalismo y conocimiento: conocé su trabajo y todos sus canales oficiales.",
} as const;

export const sectionIds = {
  hero: "inicio",
  about: "sobre-ivan",
  contact: "canales",
} as const;

export const routes = {
  home: "/",
  biography: "/biografia",
} as const;

export const navItems: NavItem[] = [
  { label: "Sobre Ivan", href: `#${sectionIds.about}` },
  { label: "Biografía", href: routes.biography },
  { label: "Canales", href: `#${sectionIds.contact}` },
];

/** Nav de las páginas internas (biografía) */
export const pageNavItems: NavItem[] = [{ label: "Inicio", href: routes.home }];
