import Image from "next/image";
import {
  logoSrc,
  logoVariants,
  type LogoTone,
  type LogoVariant,
} from "@/lib/constants/brand";
import { site } from "@/lib/constants/site";

type LogoProps = {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Controlar el tamaño con la altura (ej. "h-10 w-auto") */
  className?: string;
  priority?: boolean;
  /** Pasar "" cuando el logo está dentro de un link que ya tiene aria-label */
  alt?: string;
};

/**
 * Logotipo oficial (vectores extraídos de la guía de marca).
 * Respetar las reducciones mínimas de la guía: horizontal 1.7 cm, circular 1.5 cm.
 */
export function Logo({
  variant = "horizontal",
  tone = "color",
  className = "h-10 w-auto",
  priority = false,
  alt = site.name,
}: LogoProps) {
  const { width, height } = logoVariants[variant];

  return (
    <Image
      src={logoSrc(variant, tone)}
      alt={alt}
      width={Math.round(width)}
      height={Math.round(height)}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}
