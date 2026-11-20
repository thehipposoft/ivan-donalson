import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { donation } from "@/lib/constants/content";
import { routes, sectionIds, site } from "@/lib/constants/site";

/** Link en mayúsculas con subrayado que se dibuja en hover (igual al header) */
const linkClass =
  "relative py-1 text-[0.8125rem] font-bold uppercase tracking-[0.18em] after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-brand-in-out hover:after:scale-x-100 focus-visible:after:scale-x-100";

function DonateLink() {
  return (
    <a
      href={donation.href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClass}
    >
      {donation.label}
      <span className="sr-only"> (se abre en una pestaña nueva)</span>
    </a>
  );
}

type FooterProps = {
  /** home: claro, junto a Canales. page: oscuro, para páginas internas (biografía) */
  variant?: "home" | "page";
};

export function Footer({ variant = "home" }: FooterProps) {
  if (variant === "page") {
    return (
      <footer className="border-t border-line-inverse bg-ink text-paper">
        <div className="container-site flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <Link
            href={routes.home}
            aria-label="Iván Donalson — ir al inicio"
            className="self-start"
          >
            <Logo alt="" tone="taupe" className="h-12 w-auto md:h-14" />
          </Link>
          <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:gap-10">
            <p className="eyebrow whitespace-nowrap text-paper/70">© {site.name}</p>
            <nav aria-label="Pie de página">
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
                <li>
                  <Link href={routes.home} className={linkClass}>
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${routes.home}#${sectionIds.contact}`}
                    className={linkClass}
                  >
                    Canales
                  </Link>
                </li>
                <li>
                  <DonateLink />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-surface text-ink">
      <div className="container-site flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between md:py-12">
        <Logo className="h-12 w-auto md:h-14" />
        <div className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:gap-10">
          <p className="eyebrow whitespace-nowrap">© {site.name}</p>
          <div className="self-start md:self-auto">
            <DonateLink />
          </div>
        </div>
      </div>
    </footer>
  );
}
