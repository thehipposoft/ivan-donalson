import type { Pillar } from "@/types";

/**
 * Copy de la landing.
 * Todo lo marcado con TODO(copy) es provisorio y se reemplaza con el texto final.
 */

export const heroContent = {
  eyebrow: "Meditación · Mentalismo · Conocimiento",
  titleLines: ["Iván", "Donalson"],
  // TODO(copy)
  lead: "Un espacio para entrenar la mente, explorar la percepción y volver a lo esencial.",
  primaryCta: "Ver canales oficiales",
  secondaryCta: "Conocé a Iván",
} as const;

export const aboutContent = {
  eyebrow: "Sobre Iván",
  title: "Sobre mí",
  paragraphs: [
    "Siempre me he considerado un buscador. En este maravilloso camino que es la vida, aprendo de diferentes visiones y enseñanzas, encontrando siempre un equilibrio entre la modernidad y la ancestralidad. Creo que encontrar el equilibrio dentro de nosotros es la clave para la felicidad.",
  ],
  roles: [
    "Terapeuta Gestalt",
    "Músico",
    "Productor Musical",
    "Maestro de Meditación",
    "Facilitador de Procesos de Consciencia",
  ],
  imageAlt: "Retrato de Iván Donalson",
  bioLink: { label: "Leer biografía completa", href: "/biografia" },
} as const;

// TODO(copy): descripciones finales de cada pilar
export const pillars: Pillar[] = [
  {
    title: "Meditación",
    description: "Prácticas guiadas para calmar, enfocar y habitar el presente.",
  },
  {
    title: "Mentalismo",
    description: "El arte de leer la percepción, la atención y la conducta humana.",
  },
  {
    title: "Conocimiento",
    description: "Ideas y herramientas para pensar con más claridad.",
  },
];

export const contactContent = {
  eyebrow: "Canales oficiales",
  title: "Conoce mis únicos canales oficiales",
} as const;

/** Banner de proyecto destacado (sección Canales) */
export const featuredProject = {
  title: "Descubre",
  titleEmphasis: "Sendero Åureo",
  description:
    "El proyecto de Iván y Gianny donde se comparten programas en línea, talleres, frecuencias personalizadas y más.",
  cta: "Visitar Sendero Åureo",
  href: "https://www.senderoaureo.com/",
} as const;

/** Donaciones (footer) */
export const donation = {
  label: "Donar",
  href: "https://www.paypal.com/donate?token=ve8YV5THGkbEj2DH4c6Hdi7X4_sdisRNnWDT-QxSTiK6B68Es_gH4kCXq5Jgquh_QE_fjVPbIW2M03Fi",
} as const;
