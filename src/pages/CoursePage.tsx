import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowRight,
  Brain,
  Soup,
  Wrench,
  Lock,
  Clock,
  ShieldCheck,
  Check,
  Infinity as InfinityIcon,
} from "lucide-react";
import {
  BrandPage,
  DotField,
  Eyebrow,
  Heading,
  Pink,
  Rule,
  BrandButton,
  Card,
} from "../components/brand";
import {
  PRICE,
  ORIGINAL_PRICE,
  SAVINGS_AMOUNT,
  DISCOUNT_PCT,
  useCountdown,
  formatCountdown,
} from "../lib/launchOffer";

const CHECKOUT_URL = "https://www.paypal.com/ncp/payment/U2TRU278WRCM4";

const IMG = {
  cover: "/brand/course-cover.jpg",
  brain: "/brand/course-brain.jpg",
  fullness: "/brand/course-fullness.jpg",
  tools: "/brand/course-tools.jpg",
  whatYouGet: "/brand/course-what-you-get.jpg",
  curriculum: "/brand/course-curriculum.jpg",
};

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`rise ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/* Framed page-from-the-course, as product photography */
function ShowImage({ src, alt, rotate = 0 }: { src: string; alt: string; rotate?: number }) {
  return (
    <div
      className="rounded-2xl overflow-hidden bg-white ring-1 ring-petal/70 shadow-[0_24px_60px_-26px_rgba(45,42,38,0.5)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt={alt} loading="lazy" className="block w-full h-auto" />
    </div>
  );
}

/* Alternating image + copy feature row */
function Feature({
  img,
  alt,
  eyebrow,
  title,
  pink,
  body,
  icon: Icon,
  reverse = false,
  rotate = 0,
}: {
  img: string;
  alt: string;
  eyebrow: string;
  title: string;
  pink: string;
  body: ReactNode;
  icon: typeof Brain;
  reverse?: boolean;
  rotate?: number;
}) {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      <Rise className={reverse ? "lg:order-2" : ""}>
        <ShowImage src={img} alt={alt} rotate={rotate} />
      </Rise>
      <Rise delay={0.08} className={reverse ? "lg:order-1" : ""}>
        <div className="inline-grid place-items-center w-12 h-12 rounded-xl bg-mint mb-4">
          <Icon className="w-6 h-6 text-forest" />
        </div>
        <Eyebrow color="rose" className="justify-start">{eyebrow}</Eyebrow>
        <Heading className="mt-3 text-[1.8rem] sm:text-[2.3rem]">
          {title} <Pink>{pink}</Pink>
        </Heading>
        <p className="mt-4 font-body text-[15.5px] sm:text-[16.5px] text-ink-soft leading-relaxed max-w-xl">
          {body}
        </p>
      </Rise>
    </div>
  );
}

const WHAT_YOU_GET = [
  "The full course — nine modules of self-paced video lessons, start to finish.",
  "Understand your brain — the neuroscience behind every craving, made simple.",
  "The food framework — steady meals, eat to fullness, no counting.",
  "Craving tools & protocols — 38 if-then scripts for the exact moment.",
  "The resource library — 19 cheat sheets, templates & guides.",
];

function OfferBox() {
  const remaining = useCountdown();
  return (
    <Card className="relative overflow-hidden p-7 sm:p-10 text-center max-w-xl mx-auto">
      <span className="inline-block rounded-full bg-rose/10 text-rose-deep font-body font-black text-[12px] uppercase tracking-[0.18em] px-4 py-1.5">
        {DISCOUNT_PCT}% off · launch
      </span>
      <div className="mt-5 flex items-center justify-center gap-3">
        <span className="font-body text-ink-soft line-through text-xl">{ORIGINAL_PRICE}</span>
        <span className="font-display font-black text-forest text-5xl">{PRICE}</span>
      </div>
      <p className="mt-1 font-body text-[13px] text-rose-deep font-semibold">You save {SAVINGS_AMOUNT}</p>

      <div className="mt-5">
        <BrandButton href={CHECKOUT_URL} external variant="dark" size="lg" className="w-full sm:w-auto">
          Get instant access — {PRICE} <ArrowRight className="w-4 h-4" />
        </BrandButton>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-body text-[12px] text-ink-soft font-medium">
        <span className="inline-flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" /> Secure checkout</span>
        <span className="text-petal">·</span>
        <span className="inline-flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> 14-day refund</span>
        <span className="text-petal">·</span>
        <span className="inline-flex items-center gap-1.5"><InfinityIcon className="w-3.5 h-3.5" /> Yours forever</span>
      </div>

      <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-body text-[12px] text-ink-soft">
        <Clock className="w-3.5 h-3.5 text-rose" />
        <span>Launch price ends in</span>
        <span className="font-black tabular-nums text-rose-deep">{formatCountdown(remaining)}</span>
      </div>
    </Card>
  );
}

export default function CoursePage() {
  const [, force] = useState(0);
  useEffect(() => {
    const prev = document.title;
    document.title = "The Unhooked Method — Break the Food-Addiction Loop With Science | Kristina Oz";
    force((n) => n + 1);
    return () => { document.title = prev; };
  }, []);

  return (
    <BrandPage>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <DotField />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[44rem] h-72 bg-petal/40 blur-3xl rounded-full" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-20">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
            <Rise>
              <Eyebrow className="justify-start">The full course · self-paced</Eyebrow>
              <Heading as="h1" className="mt-5 text-[2.3rem] sm:text-[3rem] md:text-[3.4rem]">
                The Unhooked <Pink>Method</Pink>
              </Heading>
              <p className="mt-5 font-body text-[16px] sm:text-[18px] leading-relaxed text-ink/85 max-w-xl">
                Break the food-addiction loop with <strong className="font-semibold text-ink">science, not willpower</strong>.
                The deeper system behind the free meal plan — dopamine, the food framework, and exactly
                what to do the moment a craving hits.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {["Neuroscience", "Nutrition", "Real tools"].map((t) => (
                  <span key={t} className="rounded-full border border-forest/40 text-forest font-body font-semibold text-[12.5px] uppercase tracking-[0.1em] px-4 py-2">
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center">
                <BrandButton href={CHECKOUT_URL} external variant="primary" size="lg">
                  Get instant access — {PRICE} <ArrowRight className="w-4 h-4" />
                </BrandButton>
                <span className="font-body text-[13px] text-ink-soft">
                  <span className="line-through">{ORIGINAL_PRICE}</span> · 14-day money-back guarantee
                </span>
              </div>
            </Rise>

            <Rise delay={0.12} className="relative mx-auto w-full max-w-sm">
              <div className="absolute -inset-5 bg-gradient-to-br from-mint/40 via-petal/40 to-butter/40 blur-2xl rounded-[2rem]" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-petal shadow-[0_30px_70px_-28px_rgba(45,42,38,0.55)] rotate-2">
                <img src={IMG.cover} alt="The Unhooked Method — full self-paced course" className="block w-full h-auto" />
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ═══════════ FEATURE: BRAIN ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Feature
            img={IMG.brain}
            alt="Your brain decoded — the three-layer craving system"
            eyebrow="The science"
            title="Your brain,"
            pink="decoded"
            icon={Brain}
            rotate={-1.5}
            body={<>Most people fight cravings with willpower — and lose. Inside, you map the <strong className="text-ink font-semibold">three layers behind every craving</strong> — neurochemical, psychological and physiological — so you finally see what you're actually up against. It was never a lack of willpower.</>}
          />
        </div>
      </section>

      {/* ═══════════ FEATURE: FULLNESS ═══════════ */}
      <section className="relative bg-cream">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Feature
            img={IMG.fullness}
            alt="Eat to fullness — the food framework"
            eyebrow="The food framework"
            title="Eat to"
            pink="fullness"
            icon={Soup}
            reverse
            rotate={1.5}
            body={<>No calorie counting. No willpower. Just a blueprint: <strong className="text-ink font-semibold">protein at the center</strong>, real fat for satiety, whole-food volume for the rest. Build two simple plates a day that genuinely fill you up.</>}
          />
        </div>
      </section>

      {/* ═══════════ FEATURE: TOOLS ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Feature
            img={IMG.tools}
            alt="Tools for the moment — 38 if-then protocols"
            eyebrow="When a craving hits"
            title="Tools for"
            pink="the moment"
            icon={Wrench}
            rotate={-1.5}
            body={<>A craving is a signal, not a command. You'll get <strong className="text-ink font-semibold">38 pre-decided if-then protocols</strong>, the Notes Dump, and the Social Shield — exact scripts for the real moment, so you never have to improvise under pressure.</>}
          />
        </div>
      </section>

      {/* ═══════════ WHAT YOU GET ═══════════ */}
      <section className="relative bg-cream">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Rise><ShowImage src={IMG.whatYouGet} alt="What you get inside The Unhooked Method" rotate={1.5} /></Rise>
            <Rise delay={0.08}>
              <Eyebrow color="rose" className="justify-start">What's inside</Eyebrow>
              <Heading className="mt-3 text-[1.9rem] sm:text-[2.4rem]">What you <Pink>get</Pink></Heading>
              <ul className="mt-6 space-y-3.5">
                {WHAT_YOU_GET.map((t, i) => (
                  <li key={i} className="flex items-start gap-3 font-body text-[15px] text-ink">
                    <span className="mt-0.5 grid place-items-center w-6 h-6 rounded-full bg-forest text-cream shrink-0 font-body font-bold text-[12px]">
                      {i + 1}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </div>
      </section>

      {/* ═══════════ CURRICULUM ═══════════ */}
      <section className="relative overflow-hidden bg-white">
        <DotField className="opacity-50" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center">
            <Eyebrow>The full curriculum</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">Everything, <Pink>mapped out</Pink></Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[15.5px] text-ink-soft max-w-2xl mx-auto leading-relaxed">
              Nine modules, mapped start to finish — plus kitchen intermissions along the way. Watch at
              your own pace on any device, and keep the full 19-piece resource library for whenever a
              craving hits.
            </p>
          </Rise>
          <Rise delay={0.1} className="mt-10">
            <ShowImage src={IMG.curriculum} alt="The Unhooked Method curriculum — 9 modules, 14 lessons" />
          </Rise>
          <Rise className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {["9 modules · 14 lessons", "Self-paced, any device", "Resources yours to keep"].map((t) => (
              <span key={t} className="rounded-full bg-cream px-4 py-2 font-body text-[13px] font-medium text-ink">{t}</span>
            ))}
          </Rise>
        </div>
      </section>

      {/* ═══════════ OFFER ═══════════ */}
      <section className="relative bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center mb-8">
            <Eyebrow color="rose">Get started</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">One decision beats <Pink>a thousand</Pink></Heading>
            <p className="mt-4 font-body text-[15.5px] text-ink-soft max-w-xl mx-auto leading-relaxed">
              Decide once, calmly — not a hundred times a day. Everything you need is inside, yours forever.
            </p>
          </Rise>
          <Rise delay={0.1}><OfferBox /></Rise>
        </div>
      </section>
    </BrandPage>
  );
}
