/**
 * Logotipos oficiales extraídos como vectores de la guía de marca (GUÍA_Iván.pdf).
 * Archivos en public/assets/images/logo/
 *
 * Tonos según "Fondos permitidos" de la guía:
 * - color → taupe + gris, sobre fondos claros
 * - taupe → taupe monocromo, sobre fondo oscuro (ink)
 * - white → blanco, sobre fondo sage
 */
export const logoVariants = {
  horizontal: { width: 407.64, height: 109.47 },
  vertical: { width: 272.15, height: 216.79 },
  circular: { width: 247.24, height: 251.06 },
  isotipo: { width: 109.44, height: 109.47 },
} as const;

export type LogoVariant = keyof typeof logoVariants;
export type LogoTone = "color" | "taupe" | "white";

export function logoSrc(variant: LogoVariant, tone: LogoTone = "color") {
  const suffix = tone === "color" ? "" : `-${tone}`;
  return `/assets/images/logo/ivan-donalson-${variant}${suffix}.svg`;
}
