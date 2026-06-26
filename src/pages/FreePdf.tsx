import { type ReactNode } from "react";
import { motion } from "motion/react";
import {
  Zap,
  Target,
  HeartHandshake,
  FileText,
  CalendarDays,
  UtensilsCrossed,
  Brain,
  Soup,
  Sparkles,
} from "lucide-react";
import {
  BrandPage,
  DotField,
  Eyebrow,
  Heading,
  Pink,
  Rule,
  Card,
  YOUTUBE_URL,
  YOUTUBE_HANDLE,
} from "../components/brand";
import EmailCaptureForm from "../components/EmailCaptureForm";
import Seo from "../components/Seo";

/* Product-page images (finished marketing art, used as product photography) */
const IMG = {
  cover: "/brand/free-cover.jpg",
  whatYouGet: "/brand/free-what-you-get.jpg",
  stability: "/brand/free-stability.jpg",
  aDay: "/brand/free-a-day.jpg",
  getIt: "/brand/free-get-it.jpg",
};

/* Bulletproof entrance wrapper — CSS reveal that always ends visible
   (no scroll-gated JS that could leave a sales section blank). */
function Rise({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/* ─────────── WHAT'S INSIDE — 5 points (SEO + skimmers) ─────────── */
const INSIDE = [
  { icon: FileText, color: "bg-mint text-forest", title: "The Meal Building Blocks", body: "Protein, natural fats & carbs — explained simply." },
  { icon: CalendarDays, color: "bg-petal text-rose-deep", title: "Your Weekly Template", body: "Two easy meals a day, mapped Monday to Sunday." },
  { icon: UtensilsCrossed, color: "bg-butter text-cocoa", title: "14 Meal Ideas on a Plate", body: "Real food photos, so there's zero guesswork." },
  { icon: Brain, color: "bg-mint text-forest", title: "Craving & Focus Hacks", body: "Science-based tools, made for the ADHD brain." },
  { icon: Soup, color: "bg-petal text-rose-deep", title: "Eat-to-Fullness Approach", body: "No calorie counting. No willpower. No overwhelm." },
];

/* ─────────── BENEFITS — stability is the goal ─────────── */
const BENEFITS = [
  { icon: Zap, ring: "bg-mint", ink: "text-forest", title: "Steadier energy", body: "No 3pm crash, no sugar rollercoaster." },
  { icon: Target, ring: "bg-petal", ink: "text-rose-deep", title: "Calmer focus", body: "Steady fuel helps an ADHD brain settle." },
  { icon: HeartHandshake, ring: "bg-butter", ink: "text-cocoa", title: "Fewer cravings", body: "Full, satisfying meals quietly switch them off." },
];

/* A page from the guide, framed as a product photo. */
function PeekPage({
  src,
  alt,
  rotate = 0,
  className = "",
}: {
  src: string;
  alt: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white ring-1 ring-petal/70 shadow-[0_24px_60px_-26px_rgba(45,42,38,0.5)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt={alt} loading="lazy" className="block w-full h-auto" />
    </div>
  );
}

export default function FreePdf() {
  return (
    <BrandPage>
      <Seo
        title="Free 60-Day ADHD Meal Plan — Steady Fuel, Calm Cravings | Kristina Oz"
        description="Grab the free 60-Day ADHD Meal Plan: two simple plates a day, 14 meal ideas, and craving hacks made for the ADHD brain. No calorie counting, no willpower. Instant download."
        path="/adhd-meal-plan"
      />
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <DotField />
        {/* soft pink glow top */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[44rem] h-72 bg-petal/40 blur-3xl rounded-full" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            {/* Copy + form */}
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Eyebrow className="justify-start sm:justify-start">Fuel Made Simple</Eyebrow>
              <Heading as="h1" className="mt-5 text-[2.4rem] sm:text-[3.1rem] md:text-[3.6rem]">
                Your 60-Day
                <br />
                <Pink>ADHD Meal Plan</Pink>
              </Heading>
              <p className="mt-3 font-display italic text-forest/80 text-xl sm:text-2xl">
                ( free pdf! )
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Steady fuel", "Calm cravings"].map((t) => (
                  <span key={t} className="rounded-full border border-rose/50 text-rose-deep font-body font-semibold text-[12.5px] uppercase tracking-[0.12em] px-4 py-2">
                    {t}
                  </span>
                ))}
              </div>

              <p className="mt-6 font-body text-[16px] sm:text-[17px] leading-relaxed text-ink/85 max-w-xl">
                60 days of steady, ADHD-friendly meals — <strong className="font-semibold text-ink">two simple plates a day</strong>, zero overwhelm. No calorie counting, no willpower battles.
              </p>

              <div className="mt-7 max-w-xl">
                <EmailCaptureForm source="adhd-meal-plan-hero" />
              </div>
            </motion.div>

            {/* Product shot — the cover, as product photography */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 2 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative mx-auto w-full max-w-sm"
            >
              <div className="absolute -inset-5 bg-gradient-to-br from-petal/50 via-mint/30 to-butter/40 blur-2xl rounded-[2rem]" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-petal shadow-[0_30px_70px_-28px_rgba(45,42,38,0.55)]">
                <img src={IMG.cover} alt="Your 60-Day ADHD Meal Plan — free PDF guide cover" className="block w-full h-auto" />
              </div>
              {/* FREE badge */}
              <div className="absolute -top-4 -right-3 sm:-right-5 grid place-items-center w-20 h-20 rounded-full bg-rose text-white shadow-lg rotate-[8deg]">
                <span className="font-display font-black text-lg leading-none">FREE</span>
              </div>
            </motion.div>
          </div>

          {/* mini value strip */}
          <Rise className="mt-12 sm:mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-body text-[13px] sm:text-[14px] text-ink-soft">
            {["13-page guide", "14 meal ideas", "Weekly template", "Zero counting"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="hidden sm:inline w-1 h-1 rounded-full bg-rose/50" />}
                <span className="font-medium text-ink/75">{t}</span>
              </span>
            ))}
          </Rise>
        </div>
      </section>

      {/* ═══════════ WHY IT WORKS — benefits ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center">
            <Eyebrow>Why it works</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">
              Stability is the <Pink>goal</Pink>
            </Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[15.5px] sm:text-[17px] text-ink-soft max-w-2xl mx-auto leading-relaxed">
              A simple, repeatable way to eat that steadies your brain — no spikes, no crashes.
            </p>
          </Rise>

          <div className="mt-10 grid sm:grid-cols-3 gap-4 sm:gap-5">
            {BENEFITS.map((b, i) => (
              <Rise key={b.title} delay={i * 0.08}>
                <Card className="h-full p-6 sm:p-7 text-center sm:text-left">
                  <div className={`inline-grid place-items-center w-14 h-14 rounded-full ${b.ring} mb-4`}>
                    <b.icon className={`w-6 h-6 ${b.ink}`} />
                  </div>
                  <h3 className={`font-display font-bold text-xl ${b.ink}`}>{b.title}</h3>
                  <p className="mt-1.5 font-body text-[14.5px] text-ink-soft leading-relaxed">{b.body}</p>
                </Card>
              </Rise>
            ))}
          </div>

          <Rise className="mt-8 text-center">
            <span className="inline-block rounded-full bg-petal-pale px-6 py-3 font-body font-semibold text-[13px] sm:text-[14px] uppercase tracking-[0.14em] text-rose-deep">
              No calorie counting · No willpower · No overwhelm
            </span>
          </Rise>
        </div>
      </section>

      {/* ═══════════ PEEK INSIDE — product gallery ═══════════ */}
      <section className="relative overflow-hidden">
        <DotField className="opacity-60" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center">
            <Eyebrow>A peek inside</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">
              See what you're <Pink>getting</Pink>
            </Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[15.5px] sm:text-[17px] text-ink-soft max-w-2xl mx-auto leading-relaxed">
              A clean, beautifully laid-out guide — real food photos, a week you can repeat, and the
              science behind it, all in 13 pages.
            </p>
          </Rise>

          <div className="mt-12 grid md:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
            <Rise><PeekPage src={IMG.whatYouGet} alt="What you get inside the ADHD meal plan — five sections" rotate={-1.5} /></Rise>
            <Rise delay={0.08} className="md:mt-10"><PeekPage src={IMG.stability} alt="Stability is the goal — steadier energy, calmer focus, fewer cravings" rotate={1.5} /></Rise>
            <Rise delay={0.12} className="md:-mt-6"><PeekPage src={IMG.aDay} alt="A day on your plate — sample breakfast and second meal" rotate={1} /></Rise>
            <Rise delay={0.16} className="md:mt-4"><PeekPage src={IMG.getIt} alt="Get the 60-Day ADHD Meal Plan free" rotate={-1} /></Rise>
          </div>
        </div>
      </section>

      {/* ═══════════ WHAT YOU GET — list ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center">
            <Eyebrow>What's inside</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">
              What you <Pink>get</Pink>
            </Heading>
            <Rule className="mt-5" />
          </Rise>

          <div className="mt-10 space-y-3">
            {INSIDE.map((item, i) => (
              <Rise key={item.title} delay={i * 0.05}>
                <div className="flex items-start gap-4 rounded-2xl border border-petal/60 bg-cream/40 p-4 sm:p-5">
                  <div className={`shrink-0 grid place-items-center w-11 h-11 rounded-xl ${item.color}`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-body font-semibold text-ink text-[16px]">{item.title}</h3>
                    <p className="font-body text-[14px] text-ink-soft leading-relaxed">{item.body}</p>
                  </div>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="relative bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise>
            <div className="relative overflow-hidden rounded-[2rem] bg-forest text-cream px-6 sm:px-12 py-12 sm:py-16 text-center">
              <DotField className="opacity-25" />
              <div className="relative">
                <Eyebrow color="rose">Fuel Made Simple</Eyebrow>
                <Heading className="mt-5 text-[2.3rem] sm:text-[3rem] text-cream">
                  Get it <span className="text-petal">free</span>
                </Heading>
                <p className="mt-4 font-body text-[15px] sm:text-[16px] text-cream/75 max-w-md mx-auto">
                  Your 60-Day ADHD Meal Plan · instant download · 100% free · no fluff.
                </p>
                <div className="mt-7 max-w-xl mx-auto">
                  <EmailCaptureForm source="adhd-meal-plan-footer" variant="dark" />
                </div>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center gap-2 font-body text-[13.5px] text-cream/70 hover:text-white transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Watch the videos on YouTube · {YOUTUBE_HANDLE}
                </a>
              </div>
            </div>
          </Rise>
        </div>
      </section>
    </BrandPage>
  );
}
