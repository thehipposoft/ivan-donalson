import { RevealScope } from "@/components/ui/RevealScope";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { ArrowUpRight } from "@/components/ui/icons";
import { channels } from "@/lib/constants/channels";
import { contactContent } from "@/lib/constants/content";
import { sectionIds } from "@/lib/constants/site";

export function Contact() {
  return (
    <section
      id={sectionIds.contact}
      aria-labelledby="contact-title"
      className="bg-surface py-24 text-ink md:py-36"
    >
      <RevealScope className="container-site">
        <h2
          id="contact-title"
          data-reveal
          className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.5rem)] font-light leading-[1.08] tracking-[-0.01em]"
        >
          {contactContent.title}
        </h2>

        {/* Canales oficiales */}
        <ul data-reveal-group className="mt-14 border-t border-ink/25 md:mt-20">
          {channels.map((channel) => (
            <li key={channel.id} className="border-b border-ink/25">
              <a
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 py-6 md:grid-cols-[minmax(0,6fr)_minmax(0,4fr)_auto] md:py-8"
              >
                <span className="flex items-center gap-[0.45em] text-[clamp(1.75rem,5vw,3.75rem)] font-light uppercase leading-none tracking-display transition-transform duration-500 ease-brand group-hover:translate-x-2">
                  <SocialIcon id={channel.id} className="size-[0.72em] shrink-0" />
                  {channel.name}
                </span>

                <span className="col-start-1 row-start-2 text-sm font-bold tracking-[0.04em] md:col-start-2 md:row-start-1">
                  {channel.handle}
                </span>

                <span className="col-start-2 row-span-2 row-start-1 flex size-12 items-center justify-center rounded-full border border-ink/30 transition-colors duration-300 ease-brand group-hover:border-taupe group-hover:bg-taupe md:col-start-3 md:row-span-1 md:size-14">
                  <ArrowUpRight className="size-5 transition-transform duration-300 ease-brand group-hover:rotate-45" />
                </span>

                <span className="sr-only">(se abre en una pestaña nueva)</span>
              </a>
            </li>
          ))}
        </ul>
      </RevealScope>
    </section>
  );
}
