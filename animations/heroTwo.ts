import { gsap } from "@/lib/gsap";
import { onIntroDone } from "@/lib/introGate";
import type { MotionTokens } from "@/lib/motion";

/**
 * Intro de HeroTwo: el isotipo de partículas se arma solo (canvas) y,
 * cuando termina, el título aparece letra por letra (fade + blur, sin
 * desplazamiento) y los botones con un fade en el lugar.
 * Devuelve el cleanup (desuscripción de la señal).
 */
export function heroTwoIntro(
  scope: HTMLElement,
  motion: MotionTokens,
  reducedMotion: boolean,
) {
  // El isotipo se aleja levemente al hacer scroll
  if (!reducedMotion) {
    gsap.to("[data-hero-visual]", {
      yPercent: -10,
      autoAlpha: 0.4,
      ease: "none",
      scrollTrigger: {
        trigger: scope,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  if (reducedMotion) {
    gsap.set("[data-char], [data-hero-item]", { autoAlpha: 1 });
    return;
  }

  // Título: cada letra pasa de transparente y desenfocada a nítida
  const chars = gsap.utils.toArray<HTMLElement>("[data-char]", scope);
  gsap.set(chars, { autoAlpha: 0, filter: "blur(12px)" });

  const tl = gsap.timeline({ paused: true }).to(chars, {
    autoAlpha: 1,
    filter: "blur(0px)",
    duration: 1.1,
    ease: "power2.out",
    stagger: 0.06,
    clearProps: "filter",
  });

  // Botones: fade estático (sin desplazamiento)
  const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]", scope);
  gsap.set(items, { autoAlpha: 0 });
  tl.to(items, { autoAlpha: 1, duration: 1.2, ease: "power1.inOut" }, 0.6);

  const unsubscribe = onIntroDone(() => tl.play());

  return () => {
    unsubscribe();
    tl.kill();
  };
}
