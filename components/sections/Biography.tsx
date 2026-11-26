import Image from "next/image";
import { Fragment } from "react";
import { RevealScope } from "@/components/ui/RevealScope";
import { biography } from "@/lib/constants/biography";
import bioImage from "@/public/assets/images/ivan-biografia.jpg";
import coupleImage from "@/public/assets/images/ivanygianny.webp";

export const biographyId = "biografia";

/** Biografía completa: fondo negro de la marca, texto claro y centrado */
export function Biography() {
  return (
    <article
      id={biographyId}
      aria-labelledby="biography-title"
      className="bg-ink pb-28 pt-[calc(var(--header-height)+2.5rem)] text-paper md:pb-40 md:pt-[calc(var(--header-height)+4rem)]"
    >
      <RevealScope className="container-site flex flex-col items-center text-center">
        {/* Recorte: sin la parte alta del follaje y con zoom hacia Ivan */}
        <div
          data-reveal
          className="relative aspect-4/5 w-full max-w-xl overflow-hidden"
        >
          <Image
            src={bioImage}
            alt={biography.imageAlt}
            placeholder="blur"
            priority
            fill
            sizes="(min-width: 640px) 36rem, 100vw"
            className="origin-[50%_80%] scale-[1.18] object-cover object-[50%_85%]"
          />
        </div>

        <h1
          id="biography-title"
          data-reveal
          className="mt-16 whitespace-nowrap text-[clamp(1.25rem,6vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.01em] md:mt-24"
        >
          {biography.title}
        </h1>

        <div className="mt-12 max-w-[62ch] space-y-7 text-lg leading-relaxed text-paper/85 md:mt-16">
          {biography.paragraphs.map((p, i) => (
            <Fragment key={p}>
              <p data-reveal>{p}</p>
              {i === biography.coupleImage.afterParagraph ? (
                <figure data-reveal className="mx-auto max-w-md py-8 md:py-12">
                  <Image
                    src={coupleImage}
                    alt={biography.coupleImage.alt}
                    placeholder="blur"
                    sizes="(min-width: 768px) 28rem, 100vw"
                    className="w-full"
                  />
                </figure>
              ) : null}
            </Fragment>
          ))}
        </div>
      </RevealScope>
    </article>
  );
}
