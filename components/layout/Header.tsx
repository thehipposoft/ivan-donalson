"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { headerIntro } from "@/animations/header";
import { Logo } from "@/components/brand/Logo";
import { MaskLine } from "@/components/ui/MaskLine";
import {
  navItems,
  pageNavItems,
  routes,
  sectionIds,
} from "@/lib/constants/site";
import { channels } from "@/lib/constants/channels";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGsap } from "@/lib/hooks/useGsap";
import { getLenis } from "@/lib/lenis";

type HeaderProps = {
  /**
   * home: landing con nav de secciones, menú móvil y entrada sincronizada con
   * el isotipo. page: páginas internas oscuras (biografía), solo logo + Inicio.
   */
  variant?: "home" | "page";
  /** id del contenido principal para el skip link */
  mainId?: string;
};

/** Entrada escalonada de los links del menú móvil (después del panel) */
const menuItemDelays = ["delay-300", "delay-[380ms]", "delay-[460ms]"] as const;

export function Header({
  variant = "home",
  mainId = sectionIds.about,
}: HeaderProps) {
  const isPage = variant === "page";
  const headerRef = useRef<HTMLElement>(null);
  const menuOpenRef = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useGsap(headerRef, ({ scope, motion, reducedMotion }) => {
    // Entrada línea por línea, sincronizada con el fin de la intro del isotipo
    const cleanupIntro = headerIntro(scope, motion, reducedMotion, !isPage);

    // Fondo sólido al salir del tope de la página
    ScrollTrigger.create({
      start: 48,
      end: "max",
      onToggle: (self) => setScrolled(self.isActive),
    });

    if (reducedMotion) return cleanupIntro;

    // Se oculta al bajar y reaparece al subir
    const hide = gsap.quickTo(scope, "yPercent", {
      duration: motion.durationFast,
      ease: motion.ease,
    });
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const goingDown = self.direction === 1 && self.scroll() > 320;
        hide(goingDown && !menuOpenRef.current ? -100 : 0);
      },
    });

    return cleanupIntro;
  });

  // Menú móvil: bloquear scroll, cerrar con Escape y al pasar a desktop
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    root.classList.add("overflow-hidden");
    getLenis()?.stop();

    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setMenuOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.classList.remove("overflow-hidden");
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [menuOpen]);

  // Texto claro en páginas oscuras o con el menú móvil abierto (el hero es claro)
  const inverse = isPage || menuOpen;
  const items = isPage ? pageNavItems : navItems;
  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-brand ${
          isPage
            ? scrolled
              ? "border-b border-line-inverse bg-ink/85 text-paper backdrop-blur-md"
              : "text-paper"
            : inverse
              ? "text-paper"
              : scrolled
                ? "border-b border-line bg-paper/85 text-ink backdrop-blur-md"
                : "text-ink"
        }`}
      >
        <a
          href={`#${mainId}`}
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Saltar al contenido
        </a>

        <div className="container-site relative z-[55] flex h-(--header-height) items-center justify-between">
          <Link
            href={isPage ? routes.home : `#${sectionIds.hero}`}
            aria-label="Iván Donalson — volver al inicio"
            onClick={close}
            className="rounded-sm"
          >
            <MaskLine inline>
              <Logo
                alt=""
                priority
                tone={inverse ? "taupe" : "color"}
                className="block h-9 w-auto md:h-11"
              />
            </MaskLine>
          </Link>

          <nav
            aria-label="Principal"
            className={isPage ? "block" : "hidden md:block"}
          >
            <ul className="flex items-center gap-10">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="relative py-1 text-[0.8125rem] font-normal uppercase tracking-[0.18em] after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-brand-in-out hover:after:scale-x-100"
                  >
                    <MaskLine inline>{item.label}</MaskLine>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {!isPage && (
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((v) => !v)}
              className="-mr-2 flex size-12 items-center justify-center rounded-full md:hidden"
            >
              <MaskLine inline>
                <span className="relative block h-3 w-6" aria-hidden="true">
                  <span
                    className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 ease-brand ${
                      menuOpen ? "translate-y-1.5 rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 ease-brand ${
                      menuOpen ? "-translate-y-1.5 -rotate-45" : ""
                    }`}
                  />
                </span>
              </MaskLine>
            </button>
          )}
        </div>
      </header>

      {/*
        Menú móvil. Va fuera del <header>: el header recibe transform (se oculta
        al scrollear) y eso convertiría al header en el contenedor del fixed,
        dejando el panel del alto del header.
      */}
      {!isPage && (
        <div
          id={menuId}
          inert={!menuOpen}
          aria-hidden={!menuOpen}
          className={`fixed inset-0 z-40 bg-ink-800 text-paper transition-[translate,visibility] duration-700 ease-brand-in-out md:hidden ${
            menuOpen ? "visible translate-x-0" : "invisible translate-x-full"
          }`}
        >
          <nav
            aria-label="Menú móvil"
            className="container-site flex h-full flex-col justify-between pb-10 pt-[calc(var(--header-height)+3rem)]"
          >
            <ul className="space-y-2">
              {navItems.map((item, i) => (
                <li
                  key={item.href}
                  className={`transition-[opacity,translate] duration-700 ease-brand ${
                    menuOpen
                      ? `translate-x-0 opacity-100 ${menuItemDelays[i % menuItemDelays.length]}`
                      : "translate-x-8 opacity-0"
                  }`}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-2 text-4xl font-light uppercase tracking-display"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul
              className={`flex flex-wrap gap-x-6 gap-y-3 border-t border-line-inverse pt-6 transition-opacity duration-700 ease-brand ${
                menuOpen ? "opacity-100 delay-500" : "opacity-0"
              }`}
            >
              {channels.map((channel) => (
                <li key={channel.id}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="eyebrow inline-block py-2 text-taupe-300"
                  >
                    {channel.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
