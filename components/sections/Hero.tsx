"use client";

import { useId, useRef } from "react";
import { heroIntro } from "@/animations/hero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowDown } from "@/components/ui/icons";
import { heroContent } from "@/lib/constants/content";
import { sectionIds } from "@/lib/constants/site";
import { useGsap } from "@/lib/hooks/useGsap";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGsap(ref, ({ scope, motion, reducedMotion }) =>
    heroIntro(scope, motion, reducedMotion),
  );

  return (
    <section
      ref={ref}
      id={sectionIds.hero}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-end overflow-hidden lg:items-center bg-surface text-ink"
    >
      <HeroRings />

      <div className="container-site relative pb-14 pt-[calc(var(--header-height)+4rem)] md:pb-20 lg:py-[var(--header-height)]">
        <h1
          id="hero-title"
          className="text-[clamp(3.25rem,12.5vw,10.5rem)] font-light uppercase leading-[0.92] tracking-display"
        >
          {heroContent.titleLines.map((line) => (
            <span key={line} data-hero-item className="block">
              {line}
            </span>
          ))}
        </h1>

        <div className="mt-10 border-t border-line pt-8 md:mt-14">
          <div data-hero-item className="flex flex-wrap gap-3">
            <ButtonLink
              href={`#${sectionIds.contact}`}
              icon={<ArrowDown className="size-4" />}
              variant="solid-light"
            >
              {heroContent.primaryCta}
            </ButtonLink>
            <ButtonLink href={`#${sectionIds.about}`} variant="outline-dark">
              {heroContent.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Anillos concéntricos + texto circular, eco del isotipo de la marca */
function HeroRings() {
  const pathId = useId();
  const orbitText = "Meditación · Mentalismo · Conocimiento · ";

  return (
    <div
      aria-hidden="true"
      data-hero-rings
      className="pointer-events-none absolute -right-[45%] top-[8%] -z-10 aspect-square w-[150vw] text-taupe sm:-right-[25%] sm:w-[95vw] lg:-right-[8%] lg:top-1/2 lg:w-[min(70vw,58rem)] lg:-translate-y-1/2"
    >
      <svg viewBox="0 0 400 400" fill="none" className="size-full">
        <defs>
          <path
            id={pathId}
            d="M200,200 m-172,0 a172,172 0 1,1 344,0 a172,172 0 1,1 -344,0"
          />
        </defs>

        <g stroke="currentColor" strokeWidth="0.6" vectorEffect="non-scaling-stroke">
          <circle data-hero-ring cx="200" cy="200" r="196" opacity="0.45" />
          <circle data-hero-ring cx="200" cy="200" r="150" opacity="0.55" />
          <circle data-hero-ring cx="200" cy="200" r="104" opacity="0.45" />
          <circle data-hero-ring cx="200" cy="200" r="58" opacity="0.35" />
        </g>

        <g data-hero-ring>
          <g data-hero-orbit>
            <text
              fill="currentColor"
              opacity="0.85"
              fontSize="9"
              letterSpacing="4"
              className="font-condensed uppercase"
            >
              <textPath href={`#${pathId}`} textLength="1076" lengthAdjust="spacing">
                {orbitText.repeat(2).toUpperCase()}
              </textPath>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
