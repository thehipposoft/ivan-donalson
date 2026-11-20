type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
};

/** Etiqueta editorial de sección: "01 —— Sobre Iván" */
export function SectionLabel({ index, label, className = "" }: SectionLabelProps) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${className}`}>
      <span aria-hidden="true">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span>{label}</span>
    </p>
  );
}
