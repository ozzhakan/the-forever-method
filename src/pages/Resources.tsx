import { motion } from "motion/react";
import {
  ArrowLeft,
  Download,
  Clock,
  ChevronRight,
  Sparkles,
  Tag,
  ClipboardCheck,
  Home,
  ShoppingCart,
  Cog,
  Shield,
  BookOpen,
  Calendar,
  Activity,
  Droplet,
  Pill as PillIcon,
  Heart,
  FlaskConical,
  Zap,
  Flame,
  AlertTriangle,
  type LucideIcon,
} from "lucide-react";
import { useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   RESOURCE METADATA — single source of truth
   ═══════════════════════════════════════════════════════════════ */
type ResourceCategory = "reference" | "template" | "guide" | "protocol";

export interface ResourceDef {
  slug: string;
  title: string;
  eyebrow: string;             // short label shown on card and detail header
  category: ResourceCategory;
  women?: boolean;             // women-specific cross-tag
  module: string;              // e.g. "Module 4" — bound module label
  readTime: string;            // e.g. "5 min read"
  description: string;         // 1-2 line summary for the card
  icon: LucideIcon;
  status: "ready" | "soon";    // gates whether the detail is clickable
}

export const RESOURCES: ResourceDef[] = [
  {
    slug: "if-then-protocols",
    title: "The If-Then Protocols Library",
    eyebrow: "Protocol",
    category: "protocol",
    module: "Module 6 & 7",
    readTime: "12 min read",
    description: "35+ pre-decided protocols across time, emotion, place, social and cycle triggers — plus a build-your-own worksheet.",
    icon: Zap,
    status: "ready",
  },
  {
    slug: "hidden-names-of-sugar",
    title: "The 60+ Hidden Names of Sugar",
    eyebrow: "Reference",
    category: "reference",
    module: "Module 3",
    readTime: "5 min read",
    description: "Every alias sugar uses on a label, grouped so you can decode any ingredient list in 10 seconds.",
    icon: Tag,
    status: "ready",
  },
  {
    slug: "yfas-self-check",
    title: "YFAS Self-Check Card",
    eyebrow: "Template",
    category: "template",
    module: "Module 1",
    readTime: "8 min do",
    description: "The Yale Food Addiction Scale, formatted as a printable self-rating sheet with clinical interpretation.",
    icon: ClipboardCheck,
    status: "ready",
  },
  // — Coming soon placeholders (Phase 1 + women set, not yet written) —
  { slug: "craving-log-24h", title: "24-Hour Craving Log", eyebrow: "Template", category: "template", module: "Module 2", readTime: "—", description: "A printable sheet for the Module 2 homework — log every craving with time, recent food, context, and emotional state.", icon: Clock, status: "soon" },
  { slug: "kitchen-audit-checklist", title: "Kitchen Audit Checklist", eyebrow: "Template", category: "template", module: "Intermission 1", readTime: "—", description: "Room-by-room walkthrough to prepare your three kitchen photos and clear ultra-processed food.", icon: Home, status: "soon" },
  { slug: "pantry-restock-list", title: "Pantry Restock List", eyebrow: "Reference", category: "reference", module: "Module 5 & 6", readTime: "—", description: "What to actually fill your shelves with after clearing — categorized by protein, fat, volume, and safe slow-pleasure.", icon: ShoppingCart, status: "soon" },
  { slug: "personal-operating-system", title: "Personal Operating System Sheet", eyebrow: "Template", category: "template", module: "Module 6", readTime: "—", description: "Blank framework for writing the 4-5 if-then rules that govern your real-life situations.", icon: Cog, status: "soon" },
  { slug: "craving-protocol-template", title: "Craving Protocol Template", eyebrow: "Template", category: "template", module: "Module 7", readTime: "—", description: "Three rows: your top trigger, the real need underneath, your specific if-then response.", icon: Shield, status: "soon" },
  { slug: "listen-read-watch", title: "Listen · Read · Watch List", eyebrow: "Reference", category: "reference", module: "All modules", readTime: "—", description: "Kristina's curated trio — podcasts, books, and documentaries worth your time, with 1-line reasons.", icon: BookOpen, status: "soon" },

  { slug: "cycle-tracker", title: "Cycle Tracker × Cravings Log", eyebrow: "Template", category: "template", module: "Module 4", women: true, readTime: "—", description: "Track cycle phase, cravings, mood, energy, and skin daily — see your own pattern over one full month.", icon: Calendar, status: "soon" },
  { slug: "pms-decoded", title: "PMS Decoded", eyebrow: "Women's Guide", category: "guide", module: "Module 4", women: true, readTime: "—", description: "Mood swings, breast tenderness, jawline acne, water retention — reframed as fixable hormonal output, not 'just how I am.'", icon: Sparkles, status: "soon" },
  { slug: "pcos-sugar-connection", title: "The PCOS–Sugar Connection", eyebrow: "Women's Guide", category: "guide", module: "Module 4", women: true, readTime: "—", description: "Insulin resistance is the upstream of PCOS. A specific protocol + the labs to ask for.", icon: Activity, status: "soon" },
  { slug: "skin-food-timeline", title: "The Skin-Food Timeline", eyebrow: "Women's Guide", category: "guide", module: "Module 4", women: true, readTime: "—", description: "What changes in your skin at day 7, 14, 30 and 90 off ultra-processed food. Glycation, inflammation, collagen — illustrated.", icon: Droplet, status: "soon" },
  { slug: "iron-for-women", title: "Iron for Women", eyebrow: "Women's Guide", category: "guide", module: "Module 4", women: true, readTime: "—", description: "Symptoms (often mistaken for sugar inflammation), real food sources, and when supplementation makes sense.", icon: PillIcon, status: "soon" },
  { slug: "diet-history", title: "For Women With Diet History", eyebrow: "Women's Guide", category: "guide", module: "Module 8", women: true, readTime: "—", description: "If you've spent 10+ years dieting, this protocol runs differently. Refeeding sensitivity, restriction triggers, and putting the scale away.", icon: Heart, status: "soon" },
  { slug: "female-lab-panel", title: "The Female Lab Panel", eyebrow: "Reference", category: "reference", module: "Module 4", women: true, readTime: "—", description: "Exactly which labs to request from your doctor — fasting insulin, SHBG, free T, estradiol, thyroid panel, ferritin, vitamin D.", icon: FlaskConical, status: "soon" },
];

/* ═══════════════════════════════════════════════════════════════
   RESOURCE SHELL — shared chrome for every resource detail page
   ═══════════════════════════════════════════════════════════════ */
const ResourceShell = ({
  resource,
  onBack,
  children,
}: {
  resource: ResourceDef;
  onBack: () => void;
  children: ReactNode;
}) => {
  useEffect(() => {
    // Update <title> while reading a resource so a Save-as-PDF gets a good filename
    const prev = document.title;
    document.title = `${resource.title} · The Unhooked Method`;
    return () => { document.title = prev; };
  }, [resource.title]);

  const Icon = resource.icon;

  return (
    <article className="max-w-3xl mx-auto px-5 sm:px-8 py-6 sm:py-10 print:px-0 print:py-0 print:max-w-full">
      {/* Screen-only action bar */}
      <div className="print:hidden flex items-center justify-between gap-3 mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-bold text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Resource Library</span>
          <span className="sm:hidden">Back</span>
        </button>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full shadow-md shadow-amber-300/40 transition-all"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* Print-only brand header */}
      <header className="hidden print:flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
        <div className="w-6 h-6 bg-amber-700 rounded flex items-center justify-center">
          <Flame className="w-3.5 h-3.5 text-white" />
        </div>
        <span className="text-xs font-black tracking-tight text-gray-900">The Unhooked Method</span>
        <span className="ml-auto text-[10px] font-bold text-gray-400 uppercase tracking-widest">{resource.eyebrow} · {resource.module}</span>
      </header>

      {/* Title block */}
      <header className="mb-10 sm:mb-14 print:mb-8">
        <div className="flex items-center gap-3 mb-5 print:hidden">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100 flex items-center justify-center">
            <Icon className="w-6 h-6 text-amber-700" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-[11px] font-black text-amber-700 uppercase tracking-[0.25em]">
              {resource.eyebrow}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-gray-400">
              {resource.module}
            </span>
          </div>
        </div>

        <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4 print:text-3xl">
          {resource.title}
        </h1>

        <p className="text-[15px] sm:text-lg text-gray-600 leading-relaxed">
          {resource.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs sm:text-sm text-gray-500 print:hidden">
          <Clock className="w-3.5 h-3.5" />
          <span className="font-semibold">{resource.readTime}</span>
        </div>
      </header>

      {/* Content */}
      <div className="space-y-12 sm:space-y-16 print:space-y-8">
        {children}
      </div>

      {/* Footer */}
      <footer className="mt-16 sm:mt-20 pt-8 border-t border-gray-100 print:mt-10 print:pt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-[13px] sm:text-sm text-gray-600">
              Made with care by <span className="font-bold text-gray-900">Kristina Oz</span>
            </p>
            <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
              The Unhooked Method · Resource Library
            </p>
          </div>
          <div className="print:hidden text-[11px] sm:text-xs text-gray-400">
            Questions? Message Kristina on WhatsApp · +31 6 18784896
          </div>
        </div>
      </footer>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════════
   REUSABLE CONTENT PRIMITIVES — for resource bodies
   ═══════════════════════════════════════════════════════════════ */
const Section = ({
  num,
  eyebrow,
  title,
  intro,
  children,
}: {
  num?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) => (
  <section>
    {(num || eyebrow) && (
      <div className="flex items-baseline gap-3 mb-3">
        {num && (
          <span className="text-amber-600 font-black text-base sm:text-lg tabular-nums">
            {num}
          </span>
        )}
        {eyebrow && (
          <span className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.22em]">
            {eyebrow}
          </span>
        )}
      </div>
    )}
    <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4 sm:mb-5 print:text-2xl">
      {title}
    </h2>
    {intro && (
      <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-6">
        {intro}
      </p>
    )}
    {children}
  </section>
);

const Callout = ({
  variant = "amber",
  title,
  children,
}: {
  variant?: "amber" | "gray" | "warning";
  title?: string;
  children: ReactNode;
}) => {
  const styles = {
    amber: "bg-amber-50 border-amber-300 text-amber-900",
    gray: "bg-gray-50 border-gray-300 text-gray-800",
    warning: "bg-orange-50 border-orange-300 text-orange-900",
  }[variant];
  const Icon = variant === "warning" ? AlertTriangle : Sparkles;
  return (
    <div className={`flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border-l-4 ${styles}`}>
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 print:hidden" />
      <div className="flex-1 min-w-0">
        {title && <p className="font-bold mb-1.5">{title}</p>}
        <div className="text-[14px] sm:text-[15px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

const ProtocolList = ({ items }: { items: { num: number; if_: string; then_: string }[] }) => (
  <ol className="space-y-3.5 sm:space-y-4">
    {items.map((item) => (
      <li key={item.num} className="flex gap-3 sm:gap-4 print:break-inside-avoid">
        <span className="text-amber-700 font-black text-[13px] sm:text-sm tabular-nums w-6 sm:w-7 flex-shrink-0 pt-0.5">
          {String(item.num).padStart(2, "0")}
        </span>
        <p className="flex-1 text-gray-800 text-[14.5px] sm:text-[15.5px] leading-[1.6]">
          <span className="font-bold text-amber-900">If</span> {item.if_}{" "}
          <span className="font-bold text-amber-900">→ then</span> {item.then_}
        </p>
      </li>
    ))}
  </ol>
);

const Pill = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] sm:text-xs font-semibold text-amber-800">
    {children}
  </span>
);

const NameGrid = ({ names }: { names: string[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mt-3">
    {names.map((n) => (
      <div key={n} className="flex items-start gap-2 text-[14px] sm:text-[15px] text-gray-800 print:break-inside-avoid">
        <span className="text-amber-500 mt-1.5 flex-shrink-0">•</span>
        <span>{n}</span>
      </div>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: The If-Then Protocols Library
   ═══════════════════════════════════════════════════════════════ */
const IfThenProtocols = () => (
  <>
    <Section eyebrow="01 · Why pre-decision works" title="The anatomy of an if-then">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          Willpower lives in the prefrontal cortex — and the prefrontal cortex depletes across the day. By 9pm, after work, decisions, emotion management and a slightly low blood sugar, it is running on fumes. That is exactly when the craving hits hardest.
        </p>
        <p>
          An if-then protocol moves the decision out of that moment. You decide once, in the morning, sitting calmly. When the trigger fires, there is no negotiation — only execution. The format is fixed:
        </p>
        <Callout variant="amber">
          <span className="font-bold text-amber-900">If</span> [a very specific trigger]
          <span className="text-amber-700"> → </span>
          <span className="font-bold text-amber-900">then</span> [a very specific action]
        </Callout>
        <p className="text-gray-600">
          Notice the two words doing the work: <em>specific</em>, twice. Vague triggers ("if I feel tired") and vague actions ("I'll be careful") collapse under pressure. The protocols below are all written so a depleted brain can run them without thinking.
        </p>
      </div>
    </Section>

    <Section eyebrow="02" title="Time-based triggers" intro="Recurring clock-driven moments — the brain wired sugar to specific times of day. Reroute those exact slots.">
      <ProtocolList
        items={[
          { num: 1, if_: "the clock hits 3pm and I'm at my desk", then_: "I stand up, drink 500ml of water, eat a handful of almonds, and take five minutes outside." },
          { num: 2, if_: "it's 9pm and I find myself in the kitchen", then_: "I make a strong herbal tea and a sparkling water, sit on the couch with my notes, and write for three minutes before deciding anything." },
          { num: 3, if_: "it's Friday afternoon and I'm leaving work", then_: "I eat my pre-prepared protein snack in the parking lot before I drive home." },
          { num: 4, if_: "it's Sunday afternoon and boredom is rising", then_: "I leave the house for thirty minutes — walk, café, anywhere with people but no decisions." },
          { num: 5, if_: "dinner just ended", then_: "I brush my teeth immediately and move to a different room." },
        ]}
      />
    </Section>

    <Section eyebrow="03" title="Emotional states" intro="The craving rarely wants food. Name what it actually wants — then meet that need directly.">
      <ProtocolList
        items={[
          { num: 6, if_: "I notice I'm bored and reaching for the cabinet", then_: "I name what I actually need (entertainment, novelty, rest, contact) and respond to that need — not to food." },
          { num: 7, if_: "I'm anxious and want to eat", then_: "I do sixty seconds of 4-7-8 breathing first. If the urge remains after that, I revisit." },
          { num: 8, if_: "I'm frustrated after a hard call or meeting", then_: "I walk outside for ten minutes before opening anything in the kitchen." },
          { num: 9, if_: "I'm lonely and the kitchen is calling", then_: "I text one specific friend (pre-decided name) before opening any cabinet." },
          { num: 10, if_: "I slept less than six hours", then_: "I extra-protect breakfast (eggs + avocado), nothing sweet, and accept today is harder." },
          { num: 11, if_: "I want to numb out", then_: "I lie on the floor for five minutes, eyes closed, before any food decision." },
        ]}
      />
    </Section>

    <Section eyebrow="04" title="Environment & place" intro="The brain learned which physical places mean sugar. Change the route, change the response.">
      <ProtocolList
        items={[
          { num: 12, if_: "I walk past the bakery on my street", then_: "I cross to the other side of the road. No exceptions." },
          { num: 13, if_: "I'm in the supermarket and a craving fires", then_: "I go directly to the drinks aisle, buy a strong sparkling water, and leave by a different aisle — skipping the checkout candy." },
          { num: 14, if_: "I'm in the office break room", then_: "I make my coffee or tea and leave within two minutes — no browsing." },
          { num: 15, if_: "I'm at an airport waiting for a flight", then_: "I find a real-food kiosk first, buy a protein item, then sit down." },
          { num: 16, if_: "I'm staying in a hotel", then_: "I do a small grocery run on arrival — yogurt, fruit, nuts — so I don't depend on hotel breakfast or the minibar." },
          { num: 17, if_: "I'm at the cinema", then_: "I bring a bag of mixed nuts from home, or I eat nothing." },
        ]}
      />
    </Section>

    <Section eyebrow="05" title="Social situations" intro="Other people will offer, ask, joke. Decide the response in advance, warmly and without debate.">
      <ProtocolList
        items={[
          { num: 18, if_: "someone offers me ultra-processed food at a work or social event", then_: "I say: \"Thank you, I have an allergy\" — and change the subject." },
          { num: 19, if_: "there's a birthday cake at the office", then_: "I show up, congratulate, hold a glass of water, and decline with the allergy line." },
          { num: 20, if_: "the dessert menu arrives at a restaurant", then_: "I close it and order a coffee instead." },
          { num: 21, if_: "it's wine night with friends", then_: "I have one drink and switch to sparkling water for the rest. No sweet cocktails." },
          { num: 22, if_: "a family member pressures me", then_: "I say once, warmly: \"I've found I feel much better when I don't eat this, so I'm keeping to that.\" Said once. Then I change the topic." },
          { num: 23, if_: "I'm visiting my parents or in-laws", then_: "I bring my own breakfast option, eat that, and join communal dinner with whatever fits the framework." },
          { num: 24, if_: "I'm going to a wedding or event", then_: "I eat a real meal at home first so I don't arrive vulnerable." },
        ]}
      />
    </Section>

    <Section eyebrow="06" title="Practical & logistical" intro="Most slips happen because the day wasn't set up to succeed. Front-load the decisions.">
      <ProtocolList
        items={[
          { num: 25, if_: "I'm leaving home for more than two hours", then_: "I eat before I go, or I pack: hard-boiled eggs, nuts, cheese, a piece of fruit." },
          { num: 26, if_: "I'm grocery shopping", then_: "I go with a list, I do not browse, and I take the same route through the store every time." },
          { num: 27, if_: "I haven't eaten in four-plus hours", then_: "I eat real food before any decision about anything else." },
          { num: 28, if_: "my child has leftover food on the plate", then_: "I scrape it straight into the trash. No taste-testing." },
        ]}
      />
    </Section>

    <Section eyebrow="07 · Women" title="Cycle & physiology" intro="The female system runs on a 28-ish day rhythm. Two specific windows need protocols of their own.">
      <ProtocolList
        items={[
          { num: 29, if_: "I'm in the luteal phase (the week before my period)", then_: "I double protein at every meal, accept lower energy, and lighten my schedule." },
          { num: 30, if_: "cycle-onset signs are showing (cravings, mood shifts)", then_: "I mark the date and front-load magnesium-rich foods — dark leafy greens, pumpkin seeds, 90%+ dark chocolate." },
          { num: 31, if_: "I'm on my period and exhausted", then_: "I prioritize iron-rich foods (red meat, liver, spinach) and remove non-essential obligations from the day." },
        ]}
      />
    </Section>

    <Section eyebrow="08" title="Slips & setbacks" intro="A slip is data, not a verdict. Pre-decide the recovery so a slip doesn't snowball.">
      <ProtocolList
        items={[
          { num: 32, if_: "I ate something I didn't plan to", then_: "I return to baseline at the very next meal. No 'ruined day,' no compensation, no skipping the next meal." },
          { num: 33, if_: "I notice a three-day slip pattern forming", then_: "I do a 24-hour reset — write what triggered it, find the protocol gap, update my operating system." },
          { num: 34, if_: "I'm in a full relapse spiral", then_: "I message Kristina on WhatsApp. Not later — now." },
        ]}
      />
    </Section>

    <Section eyebrow="09" title="Morning, screens, foundations" intro="The first hour of the day, and the last hour at night, decide most of what happens in between.">
      <ProtocolList
        items={[
          { num: 35, if_: "it's morning", then_: "I eat protein and fat within the first hour. No coffee on an empty stomach." },
          { num: 36, if_: "I've just finished a workout", then_: "I eat within thirty to sixty minutes, protein-forward." },
          { num: 37, if_: "I'm scrolling and reaching for food at the same time", then_: "I close the screen first, then check whether I'm actually hungry." },
          { num: 38, if_: "I'm binge-watching a series", then_: "I keep plain sparkling water and a small pre-portioned bowl of nuts in reach — nothing else." },
        ]}
      />
    </Section>

    <Section eyebrow="10 · Worksheet" title="Build your own — three protocols">
      <Callout variant="gray" title="Use the 3-line format below for your top three triggers.">
        Don't try to write twenty at once. Three personal protocols, lived for two weeks, beat thirty borrowed protocols read once.
      </Callout>

      <div className="mt-6 space-y-5">
        {[1, 2, 3].map((n) => (
          <div key={n} className="border border-gray-200 rounded-2xl p-5 sm:p-6">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-3">
              Protocol {n}
            </p>
            <div className="space-y-3 text-[14px] sm:text-[15px]">
              <p className="text-gray-500"><span className="font-bold text-gray-900">If</span> ____________________________________________________________</p>
              <p className="text-gray-500"><span className="font-bold text-gray-900">The real need underneath:</span> ___________________________________</p>
              <p className="text-gray-500"><span className="font-bold text-gray-900">→ Then</span> _________________________________________________________</p>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="11" title="Common mistakes to avoid">
      <ul className="space-y-3.5 text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">
        {[
          { wrong: "If I'm tired…", right: "If I've slept less than six hours…" },
          { wrong: "I'll be careful", right: "I drink sparkling water and leave by aisle 4" },
          { wrong: "More than three steps in one protocol", right: "Single, executable action. The brain skips multi-step under pressure." },
          { wrong: "\"I won't eat sugar\"", right: "Write the positive replacement: what you WILL do." },
          { wrong: "Twenty protocols at once", right: "Three protocols, mastered, then add more." },
        ].map((m, i) => (
          <li key={i} className="flex gap-3 sm:gap-4">
            <span className="text-red-400 font-black text-base sm:text-lg leading-none pt-0.5">✗</span>
            <div className="flex-1">
              <p className="text-gray-500 line-through">{m.wrong}</p>
              <p className="text-gray-900 font-semibold flex items-start gap-2 mt-0.5">
                <span className="text-amber-700">→</span>
                <span>{m.right}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: The 60+ Hidden Names of Sugar
   ═══════════════════════════════════════════════════════════════ */
const HiddenNamesOfSugar = () => (
  <>
    <Section eyebrow="01 · Why this list" title="Sugar wears sixty masks. Here are all of them.">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          Food labels list ingredients by weight, highest first. If a product would have to put "sugar" in its top three ingredients, manufacturers split that sugar into several different names — so each one falls lower on the list and the product can claim "low sugar" or "no added sugar" on the front of the box.
        </p>
        <p>
          The result: bread, yogurt, pasta sauce, granola bars, salad dressing and "healthy" cereals are often built on three or four sugars under different names. Once you recognize the aliases, the supermarket changes permanently.
        </p>
        <Callout variant="amber" title="The supermarket rule">
          Read the ingredient list, not the front of the package. If any sugar — under any name on this list — appears in the first three ingredients, sugar is a primary component of that product. Always.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="02 · Cane & beet sugars" title="The classics" intro="Refined from sugarcane or sugar beet. All behave identically in the body.">
      <NameGrid names={[
        "Sucrose",
        "Cane sugar",
        "Cane juice",
        "Cane crystals",
        "Evaporated cane juice",
        "Cane sugar syrup",
        "Beet sugar",
        "Brown sugar",
        "Demerara sugar",
        "Muscovado sugar",
        "Turbinado sugar",
        "Confectioner's sugar",
        "Caster sugar",
        "Icing sugar",
        "Invert sugar",
      ]} />
    </Section>

    <Section eyebrow="03 · Corn-derived" title="The industrial workhorses" intro="Cheap, calorie-dense, and in nearly every ultra-processed product in the United States.">
      <NameGrid names={[
        "Corn syrup",
        "High-fructose corn syrup (HFCS)",
        "HFCS-42 · HFCS-55",
        "Crystalline fructose",
        "Glucose syrup",
        "Glucose-fructose syrup",
        "Dextrose",
        "Dextrose monohydrate",
        "Maltose",
        "Maltodextrin",
        "Corn sweetener",
      ]} />
    </Section>

    <Section eyebrow="04 · Fruit-based" title="The 'natural' aliases" intro="They sound healthier than they are. In the body, refined fruit sugars behave like any other refined sugar.">
      <NameGrid names={[
        "Fruit juice concentrate",
        "Apple juice concentrate",
        "Pear juice concentrate",
        "Grape juice concentrate",
        "Date syrup",
        "Date sugar",
        "Coconut sugar",
        "Palm sugar",
        "Agave nectar",
        "Agave syrup",
        "Fructose (added)",
      ]} />
      <Callout variant="warning" title="On fructose specifically">
        Added fructose and crystalline fructose are metabolized almost entirely by the liver — see the separate <em>Truth About Fructose</em> guide. The fructose in whole fruit (with fiber, water, and structure) is not the same input.
      </Callout>
    </Section>

    <Section eyebrow="05 · Malt & grain syrups" title="The bakery & cereal group" intro="Heavy in bread, breakfast cereals, energy bars and beer-adjacent products.">
      <NameGrid names={[
        "Malt syrup",
        "Barley malt extract",
        "Barley malt syrup",
        "Maltol",
        "Rice syrup",
        "Brown rice syrup",
        "Oat syrup",
        "Sorghum syrup",
      ]} />
    </Section>

    <Section eyebrow="06 · Honey & traditional syrups" title="Yes, these count too" intro="Honey, maple, and traditional syrups are less refined — but biologically still a concentrated sugar load.">
      <NameGrid names={[
        "Honey",
        "Maple syrup",
        "Maple sugar",
        "Molasses",
        "Treacle",
        "Golden syrup",
        "Sorghum molasses",
      ]} />
    </Section>

    <Section eyebrow="07 · The '-ose' suffix" title="The chemistry-class disguise" intro="Anything ending in -ose is, by definition, a sugar. Spot the suffix and you've spotted a sugar.">
      <NameGrid names={[
        "Sucrose",
        "Glucose",
        "Fructose",
        "Lactose",
        "Maltose",
        "Galactose",
        "Dextrose",
        "Trehalose",
        "Ribose",
      ]} />
    </Section>

    <Section eyebrow="08" title="How to scan a label in 10 seconds">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Turn the package over. Find the ingredient list — not the front-of-box marketing.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Look at the <strong>first three ingredients</strong>. Ingredients are listed by weight — the first three define the product.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>Scan for any name on this list. Also scan for any word ending in <strong>-ose</strong> or <strong>-syrup</strong>.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>Count the total number of sugar aliases anywhere on the list. Three or more = an engineered product. Put it back.</span></li>
      </ol>
      <Callout variant="amber" title="Two products to spot-check this week">
        Pick one from your fridge and one from your pantry. Read both labels using the 4 steps above. Send Kristina what you found on WhatsApp — that's a real Intermission 2 input.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: YFAS Self-Check Card
   ═══════════════════════════════════════════════════════════════ */
const YFASSelfCheck = () => (
  <>
    <Section eyebrow="01 · Why this tool" title="The clinical scale you can score yourself on">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          The Yale Food Addiction Scale (YFAS) was developed in 2009 by Dr. Ashley Gearhardt and colleagues at Yale. They took the psychiatric diagnostic criteria for substance addiction — the same framework used for cocaine, alcohol, and nicotine — and applied them to food behavior. The result is a nine-marker scale that has been validated across hundreds of thousands of people since.
        </p>
        <p>
          A meta-analysis of nearly 200,000 people found that <strong className="text-gray-900">roughly one in five</strong> meets the YFAS criteria for clinical food addiction. The number skews significantly higher in women.
        </p>
        <Callout variant="amber" title="This is not for self-judgment.">
          The point of running this scale on yourself is to move what you've been carrying as "I'm broken" into clinical language: <em>a measurable response to a specific stimulus in a specific environment</em>. That reframe is where everything else in the course starts.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="02 · The nine markers" title="Mark each one honestly" intro="For each marker, decide: does this describe you? Rate severity 0 (never) → 4 (almost always). Write a one-line example next to any you score 2 or higher.">
      <div className="space-y-4 sm:space-y-5">
        {[
          {
            n: 1,
            title: "Eating more than intended",
            body: "I regularly eat more than I planned, especially sweet, salty, or fatty food. I sit down for \"just a little\" and the whole thing disappears.",
          },
          {
            n: 2,
            title: "Failed attempts to cut back",
            body: "I have tried to stop or cut back many times. The attempts collapse — same triggers, same time of day, same emotional weather.",
          },
          {
            n: 3,
            title: "Mental energy spent on food",
            body: "A significant amount of my mental energy goes to food — not just eating, but thinking about it, planning around it, managing guilt about it.",
          },
          {
            n: 4,
            title: "Intense, physical-feeling cravings",
            body: "I experience cravings that feel almost physical in their intensity, especially under stress, loneliness, or anxiety.",
          },
          {
            n: 5,
            title: "Eating despite known harm",
            body: "I keep eating this way knowing it's hurting me — my skin, energy, sleep, mood, maybe relationships.",
          },
          {
            n: 6,
            title: "Activities given up",
            body: "Things I used to enjoy — hobbies, seeing people, work I cared about — have quietly been pushed aside as food takes the space.",
          },
          {
            n: 7,
            title: "Seeing harm clearly, reaching anyway",
            body: "I see the harm clearly. My hand reaches anyway.",
          },
          {
            n: 8,
            title: "Tolerance",
            body: "What used to satisfy me doesn't anymore. The amount or intensity keeps moving up.",
          },
          {
            n: 9,
            title: "Withdrawal symptoms",
            body: "When I try to remove a trigger food completely, I get real symptoms: irritability, anxiety, headaches, fatigue, a crawling restlessness.",
          },
        ].map((m) => (
          <div key={m.n} className="border border-gray-200 rounded-2xl p-5 sm:p-6 print:break-inside-avoid">
            <div className="flex items-start gap-3 sm:gap-4 mb-3">
              <span className="text-amber-700 font-black text-lg sm:text-xl tabular-nums leading-none pt-0.5 flex-shrink-0">
                {String(m.n).padStart(2, "0")}
              </span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                  {m.title}
                </h3>
              </div>
            </div>
            <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">
              {m.body}
            </p>

            {/* Scale row */}
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Score</span>
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">
                  {s}
                </span>
              ))}
              <span className="text-[10px] font-bold text-gray-400 ml-1">0 = never · 4 = almost always</span>
            </div>

            {/* Example field */}
            <div className="border-t border-gray-100 pt-3 mt-3">
              <span className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em]">Your example (if score ≥ 2)</span>
              <div className="mt-2 border-b border-gray-200 h-6"></div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="03 · Interpretation" title="What your score actually means">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          Per the clinical literature, <strong className="text-gray-900">two or three of these markers persisting over time</strong> meets the threshold for food addiction. The number isn't a verdict on your character. It is a diagnostic snapshot of a system that has been running for a while.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mt-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.22em] mb-2">2 markers</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">Mild</p>
            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">A real pattern. Module 5–7 protocols address this directly.</p>
          </div>
          <div className="bg-amber-100/60 border border-amber-300 rounded-2xl p-5">
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.22em] mb-2">4–5 markers</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">Moderate</p>
            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">Environment design (Module 6) and values work (Module 8) matter at least as much as food rules.</p>
          </div>
          <div className="bg-amber-200/50 border border-amber-400 rounded-2xl p-5">
            <p className="text-[10px] font-black text-amber-800 uppercase tracking-[0.22em] mb-2">6+ markers</p>
            <p className="text-sm sm:text-base font-bold text-gray-900 mb-1">Severe</p>
            <p className="text-[13px] sm:text-sm text-gray-600 leading-relaxed">Work the course in full, and consider professional support alongside. See the note below.</p>
          </div>
        </div>

        <Callout variant="warning" title="Honest disclaimer">
          If you're in active crisis with an eating disorder — bulimia, binge eating disorder, anorexia, or any pattern that has compromised your physical or mental health — this course is not a substitute for medical or psychiatric care. Message Kristina and she'll point you toward people who can help you better. There's no shame in that.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="04 · What's next" title="Take this with you into Module 2">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          Keep the markers you scored 2+ on in mind. In Module 2 you'll see the three biological layers that produce them — dopamine, conditioning, physiological amplifiers — and the markers will stop feeling like a personality assessment and start feeling like an engineering report.
        </p>
        <p className="text-gray-900 font-semibold">
          You are not broken. You were given the wrong explanation, then blamed for failing with it. That ends here.
        </p>
      </div>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE DETAIL — looks up which content component to render
   ═══════════════════════════════════════════════════════════════ */
export const ResourceDetail = ({
  slug,
  onBack,
}: {
  slug: string;
  onBack: () => void;
}) => {
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) return null;

  let body: ReactNode = null;
  if (resource.status === "ready") {
    if (resource.slug === "if-then-protocols") body = <IfThenProtocols />;
    else if (resource.slug === "hidden-names-of-sugar") body = <HiddenNamesOfSugar />;
    else if (resource.slug === "yfas-self-check") body = <YFASSelfCheck />;
  } else {
    body = (
      <div className="py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-bold mb-5">
          <Sparkles className="w-4 h-4" />
          Coming soon
        </div>
        <p className="text-gray-600 max-w-md mx-auto text-[15px] leading-relaxed">
          This resource is being prepared. Check back shortly — and feel free to message Kristina on WhatsApp if you'd like to know when it's ready.
        </p>
      </div>
    );
  }

  return (
    <ResourceShell resource={resource} onBack={onBack}>
      {body}
    </ResourceShell>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RESOURCE LIBRARY — the index grid
   ═══════════════════════════════════════════════════════════════ */
export const ResourceLibrary = ({
  onOpen,
}: {
  onOpen: (slug: string) => void;
}) => {
  const readyCount = RESOURCES.filter((r) => r.status === "ready").length;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <header className="mb-10 sm:mb-14">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-300/40">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.3em]">
              The Unhooked Method
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">
              {readyCount} of {RESOURCES.length} resources ready · more on the way
            </p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-3">
          Resource Library
        </h1>
        <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed max-w-2xl">
          Cheat sheets, templates, protocols and women-specific guides — built to live alongside the course videos. Every resource is readable here and downloadable as a PDF.
        </p>
      </header>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {RESOURCES.map((r, i) => {
          const Icon = r.icon;
          const isReady = r.status === "ready";
          return (
            <motion.button
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onClick={() => onOpen(r.slug)}
              className={`text-left bg-white border rounded-2xl p-5 sm:p-6 transition-all group ${
                isReady
                  ? "border-gray-200 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1"
                  : "border-gray-100 opacity-70 hover:opacity-90"
              }`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isReady
                    ? "bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100"
                    : "bg-gray-50 border border-gray-100"
                }`}>
                  <Icon className={`w-5 h-5 ${isReady ? "text-amber-700" : "text-gray-400"}`} />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-[9.5px] sm:text-[10px] font-black text-amber-700 uppercase tracking-[0.22em]">
                    {r.eyebrow}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">
                    {r.module}
                  </span>
                </div>
                {!isReady && <Pill>Coming soon</Pill>}
                {r.women && isReady && (
                  <span className="text-[9px] font-black text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Women
                  </span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-snug tracking-tight mb-2">
                {r.title}
              </h3>
              <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                {r.description}
              </p>

              <div className="flex items-center justify-between text-[12px] sm:text-xs">
                <span className={`font-semibold flex items-center gap-1.5 ${isReady ? "text-gray-500" : "text-gray-400"}`}>
                  <Clock className="w-3 h-3" />
                  {r.readTime}
                </span>
                {isReady && (
                  <span className="flex items-center gap-1 text-amber-700 font-bold group-hover:gap-2 transition-all">
                    Open
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom note */}
      <div className="mt-12 sm:mt-16 p-5 sm:p-6 bg-amber-50/50 border border-amber-100 rounded-2xl text-center">
        <p className="text-[13px] sm:text-sm text-amber-900 leading-relaxed">
          <strong>More resources are being added.</strong> If there's something specific you want me to build next, message me on WhatsApp.
        </p>
      </div>
    </div>
  );
};

