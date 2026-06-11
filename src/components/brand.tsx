import { Link } from "react-router-dom";
import type { ReactNode, CSSProperties } from "react";

/* ═══════════════════════════════════════════════════════════════
   KRISTINA OZ · "FUEL MADE SIMPLE" — shared brand primitives
   The visual language pulled from the 60-Day ADHD Meal Plan PDF:
   warm cream canvas, forest/pink/gold/mint accents, dot confetti,
   rounded cards, eyebrow labels, chunky retro-serif headings.
   ═══════════════════════════════════════════════════════════════ */

/* ─────────── DOT CONFETTI ───────────
   The signature scattered-dot motif. Absolutely positioned, decorative
   only (pointer-events-none). Parent must be `relative overflow-hidden`. */
const DOTS: Array<{ top: string; left: string; size: number; color: string }> = [
  { top: "8%", left: "6%", size: 10, color: "var(--color-gold)" },
  { top: "14%", left: "92%", size: 8, color: "var(--color-petal)" },
  { top: "22%", left: "20%", size: 7, color: "var(--color-mint)" },
  { top: "30%", left: "78%", size: 11, color: "var(--color-rose)" },
  { top: "42%", left: "4%", size: 9, color: "var(--color-forest)" },
  { top: "50%", left: "95%", size: 7, color: "var(--color-gold)" },
  { top: "60%", left: "10%", size: 8, color: "var(--color-petal)" },
  { top: "68%", left: "88%", size: 10, color: "var(--color-mint)" },
  { top: "78%", left: "16%", size: 7, color: "var(--color-rose)" },
  { top: "85%", left: "82%", size: 9, color: "var(--color-gold)" },
  { top: "92%", left: "30%", size: 7, color: "var(--color-petal)" },
  { top: "90%", left: "66%", size: 8, color: "var(--color-forest)" },
];

export function DotField({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      {DOTS.map((d, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            background: d.color,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────── EYEBROW LABEL ───────────
   ·  ——  WIDE TRACKED LABEL  ——  ·   (pink, flanked by dashes + dots) */
export function Eyebrow({
  children,
  color = "rose",
  className = "",
}: {
  children: ReactNode;
  color?: "rose" | "forest";
  className?: string;
}) {
  const c = color === "forest" ? "text-forest" : "text-rose";
  const line = color === "forest" ? "bg-forest/50" : "bg-rose/50";
  const dot = color === "forest" ? "bg-forest" : "bg-rose";
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      <span className={`h-px w-5 sm:w-8 ${line}`} />
      <span className={`font-body text-[10.5px] sm:text-xs font-semibold uppercase tracking-[0.32em] ${c}`}>
        {children}
      </span>
      <span className={`h-px w-5 sm:w-8 ${line}`} />
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
    </div>
  );
}

/* ─────────── SECTION HEADING ───────────
   Chunky retro-serif display heading. Optionally split so the second
   half renders in pink (the recurring two-tone treatment). */
export function Heading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`font-display font-black text-forest leading-[1.04] tracking-tight ${className}`}
    >
      {children}
    </Tag>
  );
}

/* Small helper so pages can stamp a pink word inside a green heading. */
export function Pink({ children }: { children: ReactNode }) {
  return <span className="text-rose">{children}</span>;
}

/* ─────────── PILL DIVIDER ───────────
   The short pink underline that sits beneath headings in the PDF. */
export function Rule({ className = "" }: { className?: string }) {
  return <span className={`block h-1 w-12 rounded-full bg-rose mx-auto ${className}`} />;
}

/* ─────────── BUTTONS ───────────
   variant: primary (pink) · dark (forest) · outline (forest border) */
type BtnProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  variant?: "primary" | "dark" | "outline";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
};

export function BrandButton({
  children,
  href,
  to,
  onClick,
  variant = "primary",
  size = "lg",
  className = "",
  type = "button",
  external = false,
}: BtnProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-all active:scale-[0.98] text-center";
  const sizes = {
    md: "px-6 py-3 text-[14px]",
    lg: "px-8 py-4 text-[15px] sm:text-[16px]",
  };
  const variants = {
    primary:
      "bg-rose text-white shadow-lg shadow-rose/30 hover:bg-rose-deep hover:-translate-y-0.5",
    dark:
      "bg-forest text-cream shadow-lg shadow-forest/25 hover:bg-forest-deep hover:-translate-y-0.5",
    outline:
      "border-2 border-forest text-forest hover:bg-forest hover:text-cream",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (to) return <Link to={to} className={cls} onClick={onClick}>{children}</Link>;
  if (href)
    return (
      <a
        href={href}
        className={cls}
        onClick={onClick}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

/* ─────────── PLATE RING ───────────
   A circular image inside a coloured ring — the food-photo treatment
   used across the PDF. Ring colour rotates through the palette. */
const RING = ["border-forest", "border-rose", "border-gold", "border-mint", "border-petal"];
export function PlateRing({
  src,
  alt,
  index = 0,
  size = 72,
  className = "",
}: {
  src: string;
  alt: string;
  index?: number;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full overflow-hidden border-[3px] ${RING[index % RING.length]} bg-white shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
    </span>
  );
}

/* ─────────── CARD ───────────
   White rounded card with soft shadow — the PDF's content container. */
export function Card({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-[0_18px_50px_-24px_rgba(45,42,38,0.35)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

/* ─────────── BRAND NAV ───────────
   Lightweight top bar shared by the public brand pages. */
export function BrandNav() {
  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md border-b border-petal/60">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-forest text-cream font-display font-black text-lg leading-none pt-0.5">
            K
          </span>
          <span className="font-display font-bold text-forest text-[17px] tracking-tight">
            Kristina Oz
          </span>
        </Link>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/course"
            className="hidden sm:inline-flex font-body text-[14px] font-medium text-ink/80 hover:text-forest px-3 py-2 transition-colors"
          >
            The course
          </Link>
          <BrandButton to="/adhd-meal-plan" variant="primary" size="md">
            Free meal plan
          </BrandButton>
        </div>
      </nav>
    </header>
  );
}

/* ─────────── BRAND FOOTER ───────────
   The recurring kristinaoz.com · @oz.kristina credit line, expanded
   into a real footer with nav + legal + YouTube. */
export const YOUTUBE_URL = "https://www.youtube.com/@oz.kristina";
export const INSTAGRAM_HANDLE = "@oz.kristina";

export function BrandFooter() {
  return (
    <footer className="relative bg-forest text-cream/90 overflow-hidden">
      <DotField className="opacity-30" />
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="max-w-xs">
            <div className="font-display font-black text-cream text-2xl tracking-tight">
              Kristina Oz
            </div>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-cream/70">
              Fuel made simple. A steady, repeatable way to eat for an
              ADHD brain — calmer focus, fewer cravings.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 font-body text-[14px]">
            <span className="font-semibold text-cream/50 uppercase tracking-[0.2em] text-[11px] mb-1">
              Explore
            </span>
            <Link to="/adhd-meal-plan" className="hover:text-white transition-colors">Free 60-Day Meal Plan</Link>
            <Link to="/course" className="hover:text-white transition-colors">The Unhooked Method course</Link>
            <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              YouTube · {INSTAGRAM_HANDLE}
            </a>
          </div>
          <div className="flex flex-col gap-2.5 font-body text-[14px]">
            <span className="font-semibold text-cream/50 uppercase tracking-[0.2em] text-[11px] mb-1">
              Legal
            </span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-white transition-colors">Refund policy</Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-cream/15 flex flex-col sm:flex-row items-center justify-between gap-3 font-body text-[12px] text-cream/55">
          <span>© {2026} Kristina Oz · All rights reserved</span>
          <span className="italic">
            This guide shares what worked for Kristina — it is not medical advice.
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────── PAGE SHELL ───────────
   Wraps a public brand page: cream canvas + brand body font + nav/footer. */
export function BrandPage({
  children,
  nav = true,
  footer = true,
}: {
  children: ReactNode;
  nav?: boolean;
  footer?: boolean;
}) {
  return (
    <div className="min-h-screen bg-cream font-body text-ink antialiased">
      {nav && <BrandNav />}
      {children}
      {footer && <BrandFooter />}
    </div>
  );
}
