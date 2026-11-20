import { ButtonLink } from "@/components/ui/ButtonLink";
import { ArrowUpRight } from "@/components/ui/icons";
import { RevealScope } from "@/components/ui/RevealScope";
import { featuredProject } from "@/lib/constants/content";

/** Banner full width de proyecto destacado: Sendero Åureo */
export function FeaturedProject() {
  return (
    <aside
      aria-labelledby="featured-project-title"
      className="relative isolate overflow-hidden bg-taupe-100 py-16 text-ink md:py-24"
    >
      {/* Anillos decorativos, eco del isotipo */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/2 -z-10 w-[26rem] -translate-y-1/2 text-taupe opacity-50 md:right-[4vw] md:w-[32rem]"
      >
        <circle
          cx="200"
          cy="200"
          r="196"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="146"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="96"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>

      <RevealScope className="container-site">
        <div data-reveal className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <h2
              id="featured-project-title"
              className="text-[clamp(1.75rem,3.6vw,3rem)] font-light leading-[1.1] tracking-[-0.01em]"
            >
              {featuredProject.title}{" "}
              <span className="font-bold">{featuredProject.titleEmphasis}</span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed">
              {featuredProject.description}
            </p>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <ButtonLink
              href={featuredProject.href}
              variant="solid-dark"
              external
              icon={<ArrowUpRight className="size-4" />}
            >
              {featuredProject.cta}
            </ButtonLink>
          </div>
        </div>
      </RevealScope>
    </aside>
  );
}
