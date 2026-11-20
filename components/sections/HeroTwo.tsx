"use client";

import dynamic from "next/dynamic";
import { Fragment, useRef } from "react";
import { heroTwoIntro } from "@/animations/heroTwo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowDown } from "@/components/ui/icons";
import { heroContent } from "@/lib/constants/content";
import { sectionIds, site } from "@/lib/constants/site";
import { useGsap } from "@/lib/hooks/useGsap";

// three.js sólo en el cliente y fuera del bundle inicial
const ParticleIsotype = dynamic(
  () => import("@/components/three/ParticleIsotype"),
  { ssr: false },
);

export function HeroTwo() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ scope, motion, reducedMotion }) =>
    heroTwoIntro(scope, motion, reducedMotion),
  );

  return (
    <section
      ref={ref}
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-surface pb-[18vh] pt-(--header-height) text-center text-ink"
    >
      {/* Isotipo de partículas (decorativo, interactivo con el cursor) */}
      <div data-hero-visual className="w-[min(92vw,36rem,60svh)]">
        <ParticleIsotype className="aspect-square w-full" />
      </div>

      <h1
        id="hero-title"
        className="-mt-4 pl-[0.08em] text-[clamp(1.875rem,8vw,6.5rem)] font-light uppercase leading-none tracking-display"
      >
        {/* Letra por letra para la entrada con blur; el lector lee el nombre entero */}
        <span className="sr-only">{site.name}</span>
        <span aria-hidden="true">
          {site.name.split(" ").map((word, w) => (
            <Fragment key={word}>
              {w > 0 ? " " : null}
              {/* Cada palabra no se corta entre letras */}
              <span className="inline-block whitespace-nowrap">
                {Array.from(word).map((char, i) => (
                  <span key={i} data-char className="inline-block">
                    {char}
                  </span>
                ))}
              </span>
            </Fragment>
          ))}
        </span>
      </h1>

      <div
        data-hero-item
        className="mt-10 flex flex-wrap justify-center gap-3 px-4"
      >
        <ButtonLink
          href={`#${sectionIds.contact}`}
          icon={<ArrowDown className="size-4" />}
          variant="solid-gold"
        >
          {heroContent.primaryCta}
        </ButtonLink>
        <ButtonLink href={`#${sectionIds.about}`} variant="outline-dark">
          {heroContent.secondaryCta}
        </ButtonLink>
      </div>
    </section>
  );
}
