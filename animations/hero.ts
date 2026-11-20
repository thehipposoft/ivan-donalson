import { gsap } from "@/lib/gsap";
import type { MotionTokens } from "@/lib/motion";

/**
 * Intro del hero + movimiento ambiental de los anillos.
 * Debe ejecutarse dentro de un gsap.context() (useGsap) con scope en el hero.
 */
export function heroIntro(
  scope: HTMLElement,
  motion: MotionTokens,
  reducedMotion: boolean,
) {
  if (reducedMotion) {
    gsap.set("[data-hero-item], [data-hero-ring]", { autoAlpha: 1 });
    return;
  }

  const tl = gsap.timeline({
    defaults: { ease: motion.ease, duration: motion.duration },
  });

  tl.fromTo(
    "[data-hero-ring]",
    { autoAlpha: 0, scale: 0.92 },
    {
      autoAlpha: 1,
      scale: 1,
      duration: motion.durationSlow,
      stagger: 0.15,
      transformOrigin: "50% 50%",
    },
  ).fromTo(
    "[data-hero-item]",
    { autoAlpha: 0, y: motion.distance },
    { autoAlpha: 1, y: 0, stagger: motion.stagger },
    "<0.25",
  );

  // Texto circular girando lentamente (eco del logotipo)
  gsap.to("[data-hero-orbit]", {
    rotate: 360,
    duration: 90,
    repeat: -1,
    ease: "none",
    svgOrigin: "200 200",
  });

  // Parallax suave de los anillos al hacer scroll
  gsap.to("[data-hero-rings]", {
    yPercent: 12,
    ease: "none",
    scrollTrigger: {
      trigger: scope,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  return tl;
}
