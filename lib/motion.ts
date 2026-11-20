/**
 * Lee los tokens de animación definidos en styles/variables.css (--gsap-*)
 * para que GSAP y CSS compartan la misma fuente de verdad.
 */
export type MotionTokens = {
  duration: number;
  durationSlow: number;
  durationFast: number;
  stagger: number;
  distance: number;
  ease: string;
  easeInOut: string;
};

const fallback: MotionTokens = {
  duration: 0.9,
  durationSlow: 1.4,
  durationFast: 0.45,
  stagger: 0.08,
  distance: 32,
  ease: "power3.out",
  easeInOut: "power2.inOut",
};

export function getMotionTokens(): MotionTokens {
  if (typeof window === "undefined") return fallback;

  const styles = getComputedStyle(document.documentElement);
  const read = (name: string) => styles.getPropertyValue(name).trim();
  const num = (name: string, fb: number) => {
    const value = Number.parseFloat(read(name));
    return Number.isFinite(value) ? value : fb;
  };

  return {
    duration: num("--gsap-duration", fallback.duration),
    durationSlow: num("--gsap-duration-slow", fallback.durationSlow),
    durationFast: num("--gsap-duration-fast", fallback.durationFast),
    stagger: num("--gsap-stagger", fallback.stagger),
    distance: num("--gsap-distance", fallback.distance),
    ease: read("--gsap-ease") || fallback.ease,
    easeInOut: read("--gsap-ease-in-out") || fallback.easeInOut,
  };
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
