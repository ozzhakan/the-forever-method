import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Target,
  HeartHandshake,
  Youtube,
  ArrowRight,
  Brain,
  Sparkles,
  Check,
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
  YOUTUBE_URL,
  INSTAGRAM_HANDLE,
} from "../components/brand";
import EmailCaptureForm from "../components/EmailCaptureForm";

const KRISTINA = "/kristina.jpg";
const FREE_COVER = "/brand/free-cover.jpg";
const COURSE_COVER = "/brand/course-cover.jpg";

/* Bulletproof CSS entrance (matches FreePdf) */
function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`rise ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

const BENEFITS = [
  { icon: Zap, ring: "bg-mint", ink: "text-forest", title: "Steadier energy", body: "No 3pm crash, no sugar rollercoaster — even fuel all day." },
  { icon: Target, ring: "bg-petal", ink: "text-rose-deep", title: "Calmer focus", body: "A steady base lets a fast, busy brain finally settle." },
  { icon: HeartHandshake, ring: "bg-butter", ink: "text-cocoa", title: "Fewer cravings", body: "Full, satisfying meals quietly switch the hunt off." },
];

export default function Home() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Kristina Oz — ADHD Nutrition Made Simple | Free 60-Day Meal Plan";
    return () => { document.title = prev; };
  }, []);

  return (
    <BrandPage>
      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden">
        <DotField />
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[46rem] h-72 bg-petal/40 blur-3xl rounded-full" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-12 items-center">
            <Rise>
              <Eyebrow className="justify-start">Fuel Made Simple</Eyebrow>
              <Heading as="h1" className="mt-5 text-[2.5rem] sm:text-[3.3rem] md:text-[3.9rem]">
                Steady fuel for
                <br />
                <Pink>an ADHD brain</Pink>
              </Heading>
              <p className="mt-6 font-body text-[16px] sm:text-[18px] leading-relaxed text-ink/85 max-w-xl">
                Calmer focus, fewer cravings, no 3pm crash — a simple, repeatable way to eat for a
                fast, creative mind. <strong className="font-semibold text-ink">No calorie counting. No willpower.</strong>
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:items-center">
                <BrandButton to="/adhd-meal-plan" variant="primary" size="lg">
                  Get the free meal plan <ArrowRight className="w-4 h-4" />
                </BrandButton>
                <a
                  href={YOUTUBE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-[15px] text-forest hover:text-forest-deep px-3 py-2 transition-colors"
                >
                  <Youtube className="w-5 h-5 text-rose" />
                  Watch on YouTube
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 font-body text-[13px] text-ink-soft">
                {["Free 60-day plan", "Instant download", "No spam"].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-forest" /> {t}
                  </span>
                ))}
              </div>
            </Rise>

            {/* Kristina portrait */}
            <Rise delay={0.12} className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 -m-4 bg-gradient-to-br from-mint/50 via-petal/40 to-butter/40 blur-2xl rounded-full" />
              <div className="relative mx-auto w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-[6px] border-forest shadow-[0_24px_60px_-24px_rgba(45,42,38,0.5)] bg-petal">
                <img src={KRISTINA} alt="Kristina Oz" className="w-full h-full object-cover" />
              </div>
              {/* floating signature chip */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-5 py-2 flex items-center gap-2 whitespace-nowrap">
                <span className="font-script text-2xl text-forest leading-none pt-1">Kristina Oz</span>
                <span className="font-body text-[11px] text-ink-soft">· {INSTAGRAM_HANDLE}</span>
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ═══════════ POSITIONING / BENEFITS ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise className="text-center">
            <Eyebrow>Why eat this way</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">
              Stability is the <Pink>goal</Pink>
            </Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[15.5px] sm:text-[17px] text-ink-soft max-w-2xl mx-auto leading-relaxed">
              Eating runs every day — so it can't run on willpower and daily battles. A steady,
              truly nourishing way to eat smooths out the ups and downs and gives a fast brain a
              calmer base to run on.
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
        </div>
      </section>

      {/* ═══════════ FREE PDF — primary lead magnet ═══════════ */}
      <section className="relative overflow-hidden bg-cream">
        <DotField className="opacity-50" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14 items-center">
            {/* cover */}
            <Rise className="order-2 lg:order-1 relative mx-auto w-full max-w-xs">
              <div className="absolute -inset-4 bg-gradient-to-br from-petal/50 to-mint/40 blur-2xl rounded-[2rem]" />
              <div className="relative rounded-2xl overflow-hidden ring-1 ring-petal shadow-[0_28px_60px_-26px_rgba(45,42,38,0.5)] rotate-[-2deg]">
                <img src={FREE_COVER} alt="Your 60-Day ADHD Meal Plan — free PDF" className="block w-full h-auto" loading="lazy" />
              </div>
              <div className="absolute -top-3 -right-2 grid place-items-center w-16 h-16 rounded-full bg-rose text-white shadow-lg rotate-[8deg]">
                <span className="font-display font-black text-[15px] leading-none">FREE</span>
              </div>
            </Rise>
            {/* copy + form */}
            <Rise delay={0.1} className="order-1 lg:order-2">
              <Eyebrow className="justify-start">Start here · free</Eyebrow>
              <Heading className="mt-4 text-[2rem] sm:text-[2.8rem]">
                Your 60-Day <Pink>ADHD Meal Plan</Pink>
              </Heading>
              <p className="mt-4 font-body text-[15.5px] sm:text-[17px] text-ink-soft max-w-xl leading-relaxed">
                A 13-page guide: the meal building blocks, a week you can repeat, 14 real-food meal
                ideas, and craving hacks made for the ADHD brain. Two simple plates a day, zero
                overwhelm.
              </p>
              <div className="mt-6 max-w-lg">
                <EmailCaptureForm source="home-feature" />
              </div>
            </Rise>
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT KRISTINA ═══════════ */}
      <section className="relative bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16 sm:py-20 text-center">
          <Rise>
            <Eyebrow>Hello</Eyebrow>
            <Heading className="mt-4 text-[2rem] sm:text-[2.7rem]">About <Pink>me</Pink></Heading>
            <Rule className="mt-5" />
            <div className="mt-8 mx-auto w-28 h-28 rounded-full overflow-hidden border-4 border-forest shadow-lg bg-petal">
              <img src={KRISTINA} alt="Kristina Oz" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <p className="mt-7 font-body text-[15.5px] sm:text-[17px] text-ink/85 leading-relaxed">
              Hi, I'm Kristina. I spent over ten years stuck in a cycle of sugar cravings and
              disordered eating, sure the problem was my willpower. It wasn't. Once I understood how
              sugar, dopamine and my own biology were working against me — and started eating in a
              way that actually fuels an ADHD brain — the cravings finally loosened their grip. Now I
              share what I learned the hard way, for anyone caught in the same loop.
            </p>
            <div className="mt-7 font-script text-4xl text-forest">Kristina Oz</div>
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 font-body text-[14px] font-medium text-ink-soft hover:text-rose transition-colors"
            >
              <Youtube className="w-5 h-5 text-rose" /> {INSTAGRAM_HANDLE} on YouTube
            </a>
          </Rise>
        </div>
      </section>

      {/* ═══════════ COURSE TEASER — secondary ═══════════ */}
      <section className="relative bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-[1fr_0.85fr]">
                <div className="p-7 sm:p-10 lg:p-12 order-2 md:order-1">
                  <Eyebrow color="rose" className="justify-start">Want the whole system?</Eyebrow>
                  <Heading className="mt-4 text-[1.9rem] sm:text-[2.4rem]">
                    The Unhooked <Pink>Method</Pink>
                  </Heading>
                  <p className="mt-4 font-body text-[15px] sm:text-[16px] text-ink-soft leading-relaxed">
                    The full self-paced course goes deep on the dopamine science, the food framework,
                    and <strong className="text-ink font-semibold">38 if-then protocols</strong> for the
                    exact moment a craving hits. Nine modules, a resource library, and tools for the
                    real moment.
                  </p>
                  <ul className="mt-5 space-y-2">
                    {["Your brain, decoded — the 3-layer craving system", "Eat-to-fullness food framework", "38 if-then protocols + the resource library"].map((t) => (
                      <li key={t} className="flex items-start gap-2.5 font-body text-[14.5px] text-ink">
                        <span className="mt-1 grid place-items-center w-4 h-4 rounded-full bg-mint shrink-0">
                          <Check className="w-2.5 h-2.5 text-forest" />
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7">
                    <BrandButton to="/course" variant="dark" size="lg">
                      <Brain className="w-4 h-4" /> Explore the course
                    </BrandButton>
                  </div>
                </div>
                <div className="relative bg-forest/5 grid place-items-center p-8 order-1 md:order-2 overflow-hidden">
                  <DotField className="opacity-40" />
                  <div className="relative rounded-xl overflow-hidden ring-1 ring-petal shadow-xl rotate-2 max-w-[14rem]">
                    <img src={COURSE_COVER} alt="The Unhooked Method — full course" className="block w-full h-auto" loading="lazy" />
                  </div>
                </div>
              </div>
            </Card>
          </Rise>
        </div>
      </section>

      {/* ═══════════ YOUTUBE BAND ═══════════ */}
      <section className="relative overflow-hidden bg-forest text-cream">
        <DotField className="opacity-25" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 py-14 sm:py-16 text-center">
          <Rise>
            <Sparkles className="w-7 h-7 text-petal mx-auto" />
            <Heading className="mt-4 text-[1.9rem] sm:text-[2.5rem] text-cream">
              New videos every week
            </Heading>
            <p className="mt-3 font-body text-[15px] text-cream/75 max-w-md mx-auto">
              Craving hacks, ADHD-friendly nutrition, and the science-based tools that actually help.
            </p>
            <div className="mt-7">
              <BrandButton href={YOUTUBE_URL} external variant="primary" size="lg">
                <Youtube className="w-5 h-5" /> Subscribe on YouTube
              </BrandButton>
            </div>
          </Rise>
        </div>
      </section>
    </BrandPage>
  );
}
