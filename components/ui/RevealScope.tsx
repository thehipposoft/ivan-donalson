"use client";

import { useRef, type ReactNode } from "react";
import { useGsap } from "@/lib/hooks/useGsap";
import { revealOnScroll } from "@/animations/reveal";

type RevealScopeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scope cliente para las animaciones de entrada por scroll.
 * Permite que las secciones sigan siendo Server Components.
 */
export function RevealScope({ children, className = "" }: RevealScopeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, ({ scope, motion, reducedMotion }) => {
    revealOnScroll(scope, motion, reducedMotion);
  });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
