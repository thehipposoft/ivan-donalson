"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  type DependencyList,
  type RefObject,
} from "react";
import { gsap } from "@/lib/gsap";
import {
  getMotionTokens,
  prefersReducedMotion,
  type MotionTokens,
} from "@/lib/motion";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export type GsapSetup<T extends HTMLElement> = (args: {
  scope: T;
  motion: MotionTokens;
  reducedMotion: boolean;
}) => gsap.core.Timeline | (() => void) | void;

/**
 * Hook único para animaciones GSAP con scope de componente.
 * - useLayoutEffect (isomórfico) para animar antes del paint.
 * - gsap.context() limita los selectores al scope y revierte todo al desmontar.
 * - Si el setup devuelve un timeline, se mata explícitamente con tl.kill().
 * - Si devuelve una función, se ejecuta como cleanup (ej. desuscribir eventos).
 */
export function useGsap<T extends HTMLElement>(
  scopeRef: RefObject<T | null>,
  setup: GsapSetup<T>,
  deps: DependencyList = [],
) {
  const setupRef = useRef(setup);

  useIsomorphicLayoutEffect(() => {
    setupRef.current = setup;
  });

  useIsomorphicLayoutEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    let result: ReturnType<GsapSetup<T>>;
    const ctx = gsap.context(() => {
      result = setupRef.current({
        scope,
        motion: getMotionTokens(),
        reducedMotion: prefersReducedMotion(),
      });
    }, scope);

    return () => {
      if (typeof result === "function") result();
      else result?.kill();
      ctx.revert();
    };
  }, deps);
}
