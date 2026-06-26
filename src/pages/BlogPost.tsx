import { useEffect, type ReactNode } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Clock, Download, Brain, Youtube } from "lucide-react";
import {
  BrandPage, DotField, Eyebrow, Heading, Pink, BrandButton, Card,
} from "../components/brand";
import Seo, { SITE } from "../components/Seo";
import { POSTS, postBySlug, STAGE_LABEL, type Block, type Post } from "../content/blog";

/* inline markup: **bold** and [text](href) */
const TOKEN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0, i = 0, m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      const label = m[1], href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={i} to={href} className="text-rose-deep underline underline-offset-2 hover:no-underline">{label}</Link>
        ) : (
          <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-rose-deep underline underline-offset-2 hover:no-underline">{label}</a>
        )
      );
    } else if (m[3] !== undefined) {
      out.push(<strong key={i} className="font-semibold text-ink">{m[3]}</strong>);
    }
    last = m.index + m[0].length; i++;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const CTA = {
  pdf: { to: "/adhd-meal-plan", icon: Download, title: "Get the free 60-Day ADHD Meal Plan", body: "Two simple plates a day, no calorie counting. The easiest place to start.", label: "Get the free plan" },
  course: { to: "/course", icon: Brain, title: "The Unhooked Method", body: "The full system — the science, the food framework, and exact craving protocols.", label: "Explore the course" },
  watch: { to: "/watch", icon: Youtube, title: "Watch on YouTube", body: "See what it actually looks like in real life — new videos every Wednesday and Saturday.", label: "Watch the videos" },
} as const;

function renderBlock(b: Block, i: number) {
  switch (b.t) {
    case "h2":
      return <Heading key={i} as="h2" className="mt-10 mb-3 text-[1.55rem] sm:text-[1.9rem]">{b.text}</Heading>;
    case "p":
      return <p key={i} className="font-body text-[16px] sm:text-[17.5px] leading-[1.75] text-ink/90 mb-5">{inline(b.text)}</p>;
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {b.items.map((it, j) => (
            <li key={j} className="flex items-start gap-3 font-body text-[16px] sm:text-[17px] text-ink/90">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-rose shrink-0" />
              <span>{inline(it)}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div key={i} className="my-7 rounded-2xl bg-petal-pale border-l-4 border-rose px-6 py-5">
          <p className="font-display text-[18px] sm:text-[20px] text-forest leading-snug italic">{inline(b.text)}</p>
        </div>
      );
    case "cta": {
      const c = CTA[b.kind];
      return (
        <div key={i} className="my-8">
          <Card className="p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5 justify-between bg-cream">
            <div className="flex items-start gap-4">
              <div className="shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-forest text-cream">
                <c.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-forest text-[18px]">{c.title}</h3>
                <p className="font-body text-[14px] text-ink-soft mt-0.5 max-w-md">{c.body}</p>
              </div>
            </div>
            <BrandButton to={c.to} variant="primary" size="md" className="shrink-0">
              {c.label} <ArrowRight className="w-4 h-4" />
            </BrandButton>
          </Card>
        </div>
      );
    }
  }
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

function RelatedCard({ p }: { p: Post }) {
  return (
    <Link to={`/blog/${p.slug}`} className="block group">
      <Card className="h-full p-5 hover:-translate-y-0.5 transition-transform">
        <span className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-rose-deep">{p.category}</span>
        <h3 className="mt-2 font-display font-bold text-forest text-[17px] leading-snug group-hover:text-forest-deep">{p.title}</h3>
        <p className="mt-2 font-body text-[13.5px] text-ink-soft leading-relaxed line-clamp-3">{p.excerpt}</p>
      </Card>
    </Link>
  );
}

export default function BlogPost() {
  const { slug = "" } = useParams();
  const navigate = useNavigate();
  const post = postBySlug(slug);

  useEffect(() => { if (!post) navigate("/blog", { replace: true }); }, [post, navigate]);
  if (!post) return null;

  const url = `${SITE}/blog/${post.slug}`;
  const related = post.related.map(postBySlug).filter(Boolean) as Post[];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Person", name: "Kristina Oz", url: SITE },
      publisher: { "@id": `${SITE}/#org` },
      mainEntityOfPage: url,
      image: `${SITE}/brand/free-cover.jpg`,
      articleSection: post.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];

  return (
    <BrandPage>
      <Seo title={`${post.title} | Kristina Oz`} description={post.description} path={`/blog/${post.slug}`} type="article" jsonLd={jsonLd} />

      <article className="relative overflow-hidden">
        <DotField className="opacity-60" />
        <div className="relative max-w-2xl mx-auto px-5 sm:px-6 pt-10 pb-16 sm:pt-14">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-[13px] text-ink-soft mb-6">
            <Link to="/blog" className="inline-flex items-center gap-1 hover:text-rose"><ArrowLeft className="w-3.5 h-3.5" /> All articles</Link>
          </nav>

          <Eyebrow color="rose" className="justify-start">{STAGE_LABEL[post.stage]} · {post.category}</Eyebrow>
          <Heading as="h1" className="mt-4 text-[2rem] sm:text-[2.7rem] leading-[1.1]">{post.title}</Heading>
          <div className="mt-4 flex items-center gap-3 font-body text-[13px] text-ink-soft">
            <span>{fmtDate(post.date)}</span>
            <span className="w-1 h-1 rounded-full bg-rose/50" />
            <span className="inline-flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readMins} min read</span>
          </div>

          <p className="mt-6 font-body text-[17px] sm:text-[19px] leading-relaxed text-ink/80 italic">{post.excerpt}</p>
          <div className="mt-2 h-px bg-petal" />

          <div className="mt-8">
            {post.body.map(renderBlock)}
          </div>
        </div>
      </article>

      {/* related */}
      {related.length > 0 && (
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-5 sm:px-6 py-14">
            <Heading className="text-[1.5rem] sm:text-[1.9rem] text-center">Keep <Pink>reading</Pink></Heading>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {related.map((p) => <RelatedCard key={p.slug} p={p} />)}
            </div>
          </div>
        </section>
      )}
    </BrandPage>
  );
}

export { POSTS };
