type ImagePlaceholderProps = {
  alt: string;
  note?: string;
  className?: string;
  tone?: "light" | "dark";
};

const tones = {
  light: { box: "bg-taupe-100", note: "text-ink-600" },
  dark: { box: "bg-ink", note: "text-taupe-300" },
} as const;

/**
 * PROVISORIO: reemplazar por next/image cuando lleguen las fotos
 * (public/assets/images). Mantiene la proporción para no mover el layout.
 */
export function ImagePlaceholder({
  alt,
  note = "Imagen pendiente",
  className = "",
  tone = "light",
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative isolate flex items-end overflow-hidden rounded-sm ${tones[tone].box} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 m-auto w-3/4 text-taupe opacity-50"
      >
        <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="66" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="36" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <span className={`eyebrow relative p-5 ${tones[tone].note}`}>{note}</span>
    </div>
  );
}
