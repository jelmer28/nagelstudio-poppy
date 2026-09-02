type Variant = "ink" | "poppy" | "stone" | "clay" | "duo";

const gradients: Record<Variant, string> = {
  ink: "radial-gradient(120% 140% at 20% 15%, #3a2a22 0%, #1c1815 55%, #100d0b 100%)",
  poppy:
    "radial-gradient(130% 150% at 80% 20%, #d1543f 0%, #b3392a 45%, #6e1f16 100%)",
  stone:
    "radial-gradient(140% 140% at 30% 10%, #efe9df 0%, #ded4c2 55%, #b6a892 100%)",
  clay: "radial-gradient(130% 130% at 70% 80%, #cba792 0%, #a8785f 55%, #5c3c2c 100%)",
  duo: "linear-gradient(155deg, #1c1815 0%, #1c1815 42%, #b3392a 42%, #b3392a 100%)",
};

/**
 * Stand-in for real studio photography. Renders an art-directed
 * gradient + grain field in the brand palette with a visible caption
 * naming the shot brief, so every placement is unambiguous about what
 * a photoshoot needs to deliver there before launch.
 */
export default function Photo({
  variant = "ink",
  label,
  className = "",
  labelTone = "light",
}: {
  variant?: Variant;
  label: string;
  className?: string;
  labelTone?: "light" | "dark";
}) {
  const decorative = label === "";

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: gradients[variant] }}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative || undefined}
    >
      <div className="grain" />
      <span
        className={`absolute left-4 bottom-4 right-4 text-[0.66rem] tracking-[0.1em] uppercase leading-snug ${
          labelTone === "light" ? "text-parchment/70" : "text-ink/60"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
