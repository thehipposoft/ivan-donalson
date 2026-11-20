import type { ReactNode } from "react";

type Variant =
  | "solid-light"
  | "outline-light"
  | "solid-dark"
  | "outline-dark"
  | "solid-gold";

/** Color base del botón + color del relleno (::before) y del texto en hover */
const variants: Record<Variant, string> = {
  "solid-light": "bg-paper text-ink before:bg-sage-300",
  "outline-light":
    "border border-line-inverse text-paper before:bg-paper hover:border-paper hover:text-ink focus-visible:text-ink",
  "solid-dark": "bg-ink text-paper before:bg-teal",
  "outline-dark":
    "border border-ink/25 text-ink before:bg-ink hover:border-ink hover:text-paper focus-visible:text-paper",
  /** Dorado 7536 C → relleno negro de la marca con texto claro */
  "solid-gold":
    "bg-taupe text-ink before:bg-ink hover:text-paper focus-visible:text-paper",
};

/**
 * Relleno con pseudoelemento: entra desde abajo y sale por arriba.
 * El transform-origin cambia sin transición (abajo en hover, arriba en reposo)
 * y sólo se anima la escala vertical.
 */
const fill = [
  "before:absolute before:inset-0 before:-z-10 before:rounded-[inherit]",
  "before:origin-top before:scale-y-0",
  "before:transition-transform before:duration-500 before:ease-brand-in-out",
  "hover:before:origin-bottom hover:before:scale-y-100",
  "focus-visible:before:origin-bottom focus-visible:before:scale-y-100",
].join(" ");

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  /** Abre en pestaña nueva (sitios externos) */
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "solid-light",
  icon,
  external = false,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group relative isolate inline-flex h-12 items-center gap-3 overflow-hidden whitespace-nowrap rounded-full px-6 text-[0.8125rem] font-bold uppercase tracking-[0.14em] transition-[color,border-color] duration-500 ease-brand-in-out ${fill} ${variants[variant]}`}
    >
      {children}
      {icon ? (
        <span className="transition-transform duration-300 ease-brand group-hover:translate-y-0.5">
          {icon}
        </span>
      ) : null}
      {external ? <span className="sr-only">(se abre en una pestaña nueva)</span> : null}
    </a>
  );
}
