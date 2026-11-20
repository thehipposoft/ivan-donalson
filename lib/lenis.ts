import type Lenis from "lenis";

/**
 * Instancia activa de Lenis (smooth scroll). La crea components/layout/SmoothScroll
 * y otros componentes la usan para pausar el scroll (p. ej. el menú móvil).
 */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
