import { gsap } from "@/lib/gsap";
import type { MotionTokens } from "@/lib/motion";

/**
 * Entrada "línea por línea": cada [data-line] entra en vertical desde el
 * overflow de su máscara (components/ui/MaskLine).
 * - from "below": sube desde abajo (hero)
 * - from "above": baja desde arriba (header)
 * Devuelve un timeline pausado para dispararlo cuando corresponda.
 */
type LineRevealOptions = {
  from?: "below" | "above";
  stagger?: number;
  duration?: number;
  ease?: string;
};

export function lineReveal(
  targets: gsap.TweenTarget,
  motion: MotionTokens,
  options: LineRevealOptions = {},
) {
  // 140% cubre también el padding de la máscara en elementos bajos (ícono de menú)
  const offset = options.from === "above" ? -140 : 140;
  gsap.set(targets, { yPercent: offset, autoAlpha: 1 });

  return gsap
    .timeline({ paused: true })
    .to(targets, {
      yPercent: 0,
      duration: options.duration ?? motion.durationSlow,
      ease: options.ease ?? "expo.out",
      stagger: options.stagger ?? motion.stagger * 1.5,
    });
}
