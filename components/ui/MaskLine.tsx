import type { ReactNode } from "react";

type MaskLineProps = {
  children: ReactNode;
  /** inline-flex para links, botones o ítems en fila (se ajusta al contenido) */
  inline?: boolean;
  className?: string;
};

/**
 * Máscara para revelar "línea por línea": el contenido entra en vertical
 * desde el overflow. La animación vive en animations/lineReveal.ts.
 * El padding/margen negativo deja lugar a acentos, descendentes y al anillo de foco.
 */
export function MaskLine({ children, inline = false, className = "" }: MaskLineProps) {
  return (
    <span
      className={`${inline ? "inline-flex align-top" : "block"} -m-[0.15em] overflow-hidden p-[0.15em] ${className}`}
    >
      <span data-line className="block">
        {children}
      </span>
    </span>
  );
}
