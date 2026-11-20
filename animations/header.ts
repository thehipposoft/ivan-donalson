import { gsap } from "@/lib/gsap";
import { onIntroDone } from "@/lib/introGate";
import type { MotionTokens } from "@/lib/motion";
import { lineReveal } from "./lineReveal";

/**
 * Entrada del header: logo, links y botón de menú bajan desde arriba de su
 * máscara, todos juntos y de forma sutil, a la par del título del hero.
 */
export function headerIntro(
  scope: HTMLElement,
  motion: MotionTokens,
  reducedMotion: boolean,
  /** false en páginas sin isotipo: entra apenas carga */
  waitForIntro = true,
) {
  const lines = gsap.utils.toArray<HTMLElement>("[data-line]", scope);

  if (reducedMotion) {
    gsap.set(lines, { autoAlpha: 1 });
    return;
  }

  const tl = lineReveal(lines, motion, {
    from: "above",
    stagger: 0,
    duration: 1.8,
    ease: "power3.out",
  });
  if (!waitForIntro) {
    const start = gsap.delayedCall(0.15, () => tl.play());
    return () => {
      start.kill();
      tl.kill();
    };
  }

  const unsubscribe = onIntroDone(() => tl.play());

  return () => {
    unsubscribe();
    tl.kill();
  };
}
