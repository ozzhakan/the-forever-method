import { useState, type ReactNode } from "react";
import { Youtube, Play, ArrowRight, Map, Sparkles } from "lucide-react";
import {
  BrandPage, DotField, Eyebrow, Heading, Pink, Rule, BrandButton, Card,
  YOUTUBE_URL, YOUTUBE_HANDLE,
} from "../components/brand";
import Seo, { SITE } from "../components/Seo";

/* ───────────────────────────────────────────────────────────────
   VIDEO LIBRARY — single source of truth.
   As Kristina publishes, add one line per video. `id` is the part of
   the YouTube URL after watch?v=  (e.g. youtu.be/HPsy09z0Db0 -> "HPsy09z0Db0").
   playlist: "roadmap" (Wednesdays, explanatory) | "sugarless" (Saturdays).
   ─────────────────────────────────────────────────────────────── */
type Vid = { id: string; title: string; playlist: "roadmap" | "sugarless" };
const VIDEOS: Vid[] = [
  // { id: "XXXXXXXXXXX", title: "Why I Quit Low-Carb for NO-Carb (ADHD Changed Everything)", playlist: "roadmap" },
  // { id: "XXXXXXXXXXX", title: "Sugarless · Day 1: What a Full Day Without Sugar Looks Like", playlist: "sugarless" },
];

const SERIES = {
  roadmap: {
    label: "The Roadmap",
    eyebrow: "New videos every Wednesday",
    title: "From cravings to calm — explained",
    blurb:
      "The how and the why, one step at a time. Why an ADHD brain craves sugar, how processed food is engineered, what to actually eat, and exactly what to do when a craving hits.",
    icon: Map,
  },
  sugarless: {
    label: "Sugarless",
    eyebrow: "New videos every Saturday",
    title: "What life really looks like without sugar",
    blurb:
      "The honest, real-life side — what I eat in a day, the first week, eating out, the hard days, and what actually changes after months without sugar and junk.",
    icon: Sparkles,
  },
};

/* Lite YouTube embed — loads only the thumbnail until clicked, so the
   page stays fast even with many videos. */
function LiteYouTube({ id, title }: { id: string; title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-petal bg-forest/5">
      {open ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label={`Play: ${title}`}
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 bg-forest/10 group-hover:bg-forest/0 transition-colors" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-16 h-16 rounded-full bg-rose text-white shadow-lg group-hover:scale-105 transition-transform">
            <Play className="w-7 h-7 ml-1" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  );
}

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`rise ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>{children}</div>;
}

function Section({ kind }: { kind: "roadmap" | "sugarless" }) {
  const s = SERIES[kind];
  const vids = VIDEOS.filter((v) => v.playlist === kind);
  const isRoadmap = kind === "roadmap";
  return (
    <section className={`relative ${isRoadmap ? "bg-white" : "bg-cream"}`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-18">
        <Rise>
          <div className="flex items-start gap-4">
            <div className={`shrink-0 grid place-items-center w-12 h-12 rounded-xl ${isRoadmap ? "bg-mint" : "bg-petal"}`}>
              <s.icon className={`w-6 h-6 ${isRoadmap ? "text-forest" : "text-rose-deep"}`} />
            </div>
            <div>
              <Eyebrow color={isRoadmap ? "forest" : "rose"} className="justify-start">{s.eyebrow}</Eyebrow>
              <Heading className="mt-2 text-[1.8rem] sm:text-[2.3rem]">
                {s.label}
              </Heading>
            </div>
          </div>
          <p className="mt-4 font-body text-[15.5px] sm:text-[16.5px] text-ink-soft leading-relaxed max-w-2xl">
            {s.blurb}
          </p>
        </Rise>

        {vids.length > 0 ? (
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {vids.map((v, i) => (
              <Rise key={v.id} delay={i * 0.05}>
                <LiteYouTube id={v.id} title={v.title} />
                <h3 className="mt-3 font-body font-semibold text-[15px] text-ink leading-snug">{v.title}</h3>
              </Rise>
            ))}
          </div>
        ) : (
          <Rise className="mt-8">
            <Card className="p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-5 justify-between">
              <p className="font-body text-[15px] text-ink-soft text-center sm:text-left">
                The first {s.label} videos are dropping soon. Subscribe and they'll find you the moment they're live.
              </p>
              <BrandButton href={YOUTUBE_URL} external variant="primary" size="md" className="shrink-0">
                <Youtube className="w-4 h-4" /> Subscribe
              </BrandButton>
            </Card>
          </Rise>
        )}
      </div>
    </section>
  );
}

export default function Watch() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Kristina Oz — ADHD nutrition videos",
    itemListElement: VIDEOS.map((v, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://www.youtube.com/watch?v=${v.id}`,
      name: v.title,
    })),
  };

  return (
    <BrandPage>
      <Seo
        title="Watch — ADHD Nutrition Videos | Kristina Oz"
        description="Free videos on ADHD nutrition, sugar cravings and food freedom. The Roadmap series explains the how and why; Sugarless shows what life is really like without sugar — new videos every Wednesday and Saturday."
        path="/watch"
        jsonLd={jsonLd}
      />

      {/* hero */}
      <section className="relative overflow-hidden">
        <DotField />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[44rem] h-72 bg-petal/40 blur-3xl rounded-full" />
        <div className="relative max-w-4xl mx-auto px-5 sm:px-6 pt-14 pb-12 sm:pt-20 sm:pb-16 text-center">
          <Rise>
            <Eyebrow>On YouTube · {YOUTUBE_HANDLE}</Eyebrow>
            <Heading as="h1" className="mt-5 text-[2.3rem] sm:text-[3.1rem]">
              Watch & <Pink>learn</Pink>
            </Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[16px] sm:text-[17px] text-ink-soft max-w-xl mx-auto leading-relaxed">
              Two simple series, free on YouTube. The Roadmap explains how to eat for an ADHD brain; Sugarless shows what it actually looks like in real life.
            </p>
            <div className="mt-7">
              <BrandButton href={YOUTUBE_URL} external variant="primary" size="lg">
                <Youtube className="w-5 h-5" /> Subscribe on YouTube
              </BrandButton>
            </div>
          </Rise>
        </div>
      </section>

      <Section kind="roadmap" />
      <Section kind="sugarless" />

      {/* funnel CTA */}
      <section className="relative bg-cream">
        <div className="max-w-5xl mx-auto px-5 sm:px-6 py-16 sm:py-20">
          <Rise>
            <div className="relative overflow-hidden rounded-[2rem] bg-forest text-cream px-6 sm:px-12 py-12 sm:py-14 text-center">
              <DotField className="opacity-25" />
              <div className="relative">
                <Heading className="text-[1.9rem] sm:text-[2.5rem] text-cream">
                  Want it all <span className="text-petal">mapped out?</span>
                </Heading>
                <p className="mt-4 font-body text-[15px] text-cream/75 max-w-md mx-auto">
                  Start with the free 60-Day ADHD Meal Plan, or go deep with the full course.
                </p>
                <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
                  <BrandButton to="/adhd-meal-plan" variant="primary" size="lg">
                    Get the free meal plan <ArrowRight className="w-4 h-4" />
                  </BrandButton>
                  <BrandButton to="/course" variant="dark" size="lg" className="bg-cream/10 border border-cream/30">
                    Explore the course
                  </BrandButton>
                </div>
              </div>
            </div>
          </Rise>
        </div>
      </section>
    </BrandPage>
  );
}
