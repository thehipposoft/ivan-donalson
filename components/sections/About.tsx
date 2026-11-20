import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";
import { RevealScope } from "@/components/ui/RevealScope";
import { aboutContent } from "@/lib/constants/content";
import ivanPortrait from "@/public/assets/images/ivan-1.jpeg";
import { sectionIds } from "@/lib/constants/site";

/** Bullets con los colores de la marca, en rotación */
const bulletColors = ["bg-teal", "bg-taupe", "bg-sage", "bg-ink"] as const;

export function About() {
  return (
    <section
      id={sectionIds.about}
      aria-labelledby="about-title"
      className="bg-gray-100 py-24 text-ink md:py-36"
    >
      <RevealScope className="container-site">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div data-reveal className="md:col-span-5">
            <Image
              src={ivanPortrait}
              alt={aboutContent.imageAlt}
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="aspect-3/4 w-full object-cover"
            />
          </div>

          <div className="flex flex-col md:col-span-6 md:col-start-7">
            <div data-reveal>
              <h2
                id="about-title"
                className="max-w-[16ch] text-[clamp(2rem,4.4vw,3.5rem)] font-normal leading-[1.08] tracking-[-0.01em]"
              >
                {aboutContent.title}
              </h2>
              <div className="mt-8 max-w-[58ch] space-y-5 text-lg leading-relaxed">
                {aboutContent.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <ul data-reveal-group className="space-y-1">
                {aboutContent.roles.map((role, i) => (
                  <li
                    key={role}
                    className="flex items-center gap-4 py-3"
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2.5 shrink-0 rounded-full ${bulletColors[i % bulletColors.length]}`}
                    />
                    <span className="text-sm font-bold uppercase tracking-[0.16em]">{role}</span>
                  </li>
                ))}
              </ul>

              <div data-reveal className="mt-10">
                <Link
                  href={aboutContent.bioLink.href}
                  className="group relative inline-flex items-center gap-3 py-2 text-[0.8125rem] font-bold uppercase tracking-[0.16em] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-700 after:ease-brand-in-out hover:after:origin-left hover:after:scale-x-100 focus-visible:after:origin-left focus-visible:after:scale-x-100"
                >
                  {aboutContent.bioLink.label}
                  <ArrowRight className="size-4 -translate-x-2 opacity-0 transition-[opacity,translate] duration-500 ease-brand group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </RevealScope>
    </section>
  );
}
