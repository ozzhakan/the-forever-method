import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import {
  BrandPage, DotField, Eyebrow, Heading, Pink, Rule, Card,
} from "../components/brand";
import Seo, { SITE } from "../components/Seo";
import { POSTS, STAGE_LABEL, type Stage, type Post } from "../content/blog";

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const ORDER: Stage[] = ["TOFU", "MOFU", "BOFU"];
const STAGE_BLURB: Record<Stage, string> = {
  TOFU: "New to this? Start with the why.",
  MOFU: "Ready to change how you eat — the how-to.",
  BOFU: "When you want the whole system.",
};

function Rise({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return <div className={`rise ${className}`} style={delay ? { animationDelay: `${delay}s` } : undefined}>{children}</div>;
}

function PostCard({ p }: { p: Post }) {
  return (
    <Link to={`/blog/${p.slug}`} className="block group h-full">
      <Card className="h-full p-6 flex flex-col hover:-translate-y-0.5 transition-transform">
        <div className="flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-deep">
          <span>{p.category}</span>
        </div>
        <h3 className="mt-2.5 font-display font-bold text-forest text-[19px] leading-snug group-hover:text-forest-deep">{p.title}</h3>
        <p className="mt-2.5 font-body text-[14px] text-ink-soft leading-relaxed flex-1">{p.excerpt}</p>
        <div className="mt-4 flex items-center justify-between font-body text-[12.5px] text-ink-soft">
          <span>{fmtDate(p.date)}</span>
          <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {p.readMins} min</span>
        </div>
      </Card>
    </Link>
  );
}

export default function Blog() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Kristina Oz — ADHD Nutrition Blog",
    url: `${SITE}/blog`,
    blogPost: POSTS.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      url: `${SITE}/blog/${p.slug}`,
      author: { "@type": "Person", name: "Kristina Oz" },
    })),
  };

  return (
    <BrandPage>
      <Seo
        title="ADHD Nutrition Blog — Sugar, Cravings & Food Freedom | Kristina Oz"
        description="Genuinely useful articles on ADHD nutrition, sugar cravings, food noise and how to quit sugar without willpower. Start with the why, then the how."
        path="/blog"
        jsonLd={jsonLd}
      />

      {/* hero */}
      <section className="relative overflow-hidden">
        <DotField />
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[44rem] h-72 bg-petal/40 blur-3xl rounded-full" />
        <div className="relative max-w-3xl mx-auto px-5 sm:px-6 pt-14 pb-10 sm:pt-20 sm:pb-12 text-center">
          <Rise>
            <Eyebrow>The blog</Eyebrow>
            <Heading as="h1" className="mt-5 text-[2.3rem] sm:text-[3rem]">
              ADHD nutrition, <Pink>made clear</Pink>
            </Heading>
            <Rule className="mt-5" />
            <p className="mt-5 font-body text-[16px] sm:text-[17px] text-ink-soft max-w-xl mx-auto leading-relaxed">
              Honest, useful articles on sugar cravings, food noise, and how to eat for an ADHD brain — no shame, no calorie counting.
            </p>
          </Rise>
        </div>
      </section>

      {/* posts grouped by funnel stage */}
      {ORDER.map((stage) => {
        const posts = POSTS.filter((p) => p.stage === stage);
        if (!posts.length) return null;
        return (
          <section key={stage} className="relative bg-white odd:bg-cream">
            <div className="max-w-5xl mx-auto px-5 sm:px-6 py-12 sm:py-16">
              <Rise className="text-center mb-8">
                <Eyebrow color={stage === "BOFU" ? "rose" : "forest"}>{STAGE_LABEL[stage]}</Eyebrow>
                <p className="mt-3 font-body text-[15px] text-ink-soft">{STAGE_BLURB[stage]}</p>
              </Rise>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {posts.map((p, i) => <Rise key={p.slug} delay={i * 0.06}><PostCard p={p} /></Rise>)}
              </div>
            </div>
          </section>
        );
      })}

      {/* funnel CTA */}
      <section className="relative bg-cream">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 py-16 text-center">
          <Rise>
            <Heading className="text-[1.8rem] sm:text-[2.3rem]">Start with the <Pink>free plan</Pink></Heading>
            <p className="mt-4 font-body text-[15px] text-ink-soft max-w-md mx-auto">
              The simplest place to begin — the 60-Day ADHD Meal Plan, free.
            </p>
            <div className="mt-6">
              <Link to="/adhd-meal-plan" className="inline-flex items-center gap-2 rounded-full bg-rose text-white font-body font-semibold px-7 py-3.5 hover:bg-rose-deep transition-colors">
                Get the free meal plan <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Rise>
        </div>
      </section>
    </BrandPage>
  );
}
