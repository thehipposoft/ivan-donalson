import { gsap } from "@/lib/gsap";
import type { MotionTokens } from "@/lib/motion";

/**
 * Revela al hacer scroll:
 * - [data-reveal]          → el elemento entra solo
 * - [data-reveal-group]    → sus hijos directos entran en cascada
 */
export function revealOnScroll(
  scope: HTMLElement,
  motion: MotionTokens,
  reducedMotion: boolean,
) {
  if (reducedMotion) return;

  gsap.utils.toArray<HTMLElement>("[data-reveal]", scope).forEach((el) => {
    gsap.from(el, {
      autoAlpha: 0,
      y: motion.distance,
      duration: motion.duration,
      ease: motion.ease,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  gsap.utils
    .toArray<HTMLElement>("[data-reveal-group]", scope)
    .forEach((group) => {
      gsap.from(group.children, {
        autoAlpha: 0,
        y: motion.distance * 0.6,
        duration: motion.duration,
        ease: motion.ease,
        stagger: motion.stagger,
        scrollTrigger: { trigger: group, start: "top 85%", once: true },
      });
    });
}
