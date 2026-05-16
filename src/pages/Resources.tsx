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
  Printer,
  Loader2,
  Apple,
  CheckSquare,
  Search,
  X,
  Sprout,
  PlayCircle,
  Folder,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   RESOURCE METADATA — single source of truth
   ═══════════════════════════════════════════════════════════════ */
type ResourceCategory = "reference" | "template" | "guide" | "protocol";

export interface ResourceDef {
  slug: string;
  title: string;
  eyebrow: string;
  category: ResourceCategory;
  women?: boolean;
  module: string;                // human-readable label, e.g. "Module 6 & 7"
  relatedLessons: string[];      // lesson IDs this resource is bound to
  readTime: string;
  description: string;
  icon: LucideIcon;
  status: "ready" | "soon";
}

export const RESOURCES: ResourceDef[] = [
  // ─ Phase 1 ────────────────────────────────────────────────────
  { slug: "if-then-protocols",      title: "The If-Then Protocols Library",  eyebrow: "Protocol",  category: "protocol",  module: "Module 6 & 7",        relatedLessons: ["module-6", "module-7"],            readTime: "12 min read", description: "38 pre-decided protocols across time, emotion, place, social and cycle triggers — plus a build-your-own worksheet.",                                          icon: Zap,            status: "ready" },
  { slug: "hidden-names-of-sugar",  title: "The 60+ Hidden Names of Sugar",  eyebrow: "Reference", category: "reference", module: "Module 3",            relatedLessons: ["module-3"],                        readTime: "5 min read",  description: "Every alias sugar uses on a label, grouped so you can decode any ingredient list in 10 seconds.",                                                           icon: Tag,            status: "ready" },
  { slug: "yfas-self-check",        title: "YFAS Self-Check Card",           eyebrow: "Template",  category: "template",  module: "Module 1",            relatedLessons: ["module-1"],                        readTime: "8 min do",    description: "The Yale Food Addiction Scale, formatted as a printable self-rating sheet with clinical interpretation.",                                                  icon: ClipboardCheck, status: "ready" },
  { slug: "craving-log-24h",        title: "24-Hour Craving Log",            eyebrow: "Template",  category: "template",  module: "Module 2",            relatedLessons: ["module-2"],                        readTime: "Use for 24h", description: "A structured sheet for the Module 2 homework — log every craving with time, recent food, context, and emotional state.",                                  icon: Clock,          status: "ready" },
  { slug: "kitchen-audit-checklist",title: "Kitchen Audit Checklist",        eyebrow: "Template",  category: "template",  module: "Intermission 1",      relatedLessons: ["intermission-1"],                  readTime: "20 min do",   description: "Room-by-room walkthrough to see where ultra-processed food hides, plus a 'before' photo checklist for Intermission 1.",                                  icon: Home,           status: "ready" },
  { slug: "pantry-restock-list",    title: "Pantry Restock List",            eyebrow: "Reference", category: "reference", module: "Module 5 & 6",        relatedLessons: ["module-5", "module-6"],            readTime: "6 min read",  description: "What to actually fill your shelves with after clearing — categorized by protein, fat, volume, and safe slow-pleasure.",                                    icon: ShoppingCart,   status: "ready" },
  { slug: "personal-operating-system",title:"Personal Operating System Sheet",eyebrow: "Template", category: "template",  module: "Module 6",            relatedLessons: ["module-6"],                        readTime: "30 min do",   description: "Blank framework for writing the four to five if-then rules that will govern your real-life situations.",                                                    icon: Cog,            status: "ready" },
  { slug: "craving-protocol-template",title:"Craving Protocol Template",     eyebrow: "Template",  category: "template",  module: "Module 7",            relatedLessons: ["module-7"],                        readTime: "20 min do",   description: "Three rows: your top trigger, the real need underneath, your specific if-then response. Pinnable to fridge or wallpaper.",                                  icon: Shield,         status: "ready" },
  { slug: "the-watch-list",         title: "The Watch List",                 eyebrow: "Reference", category: "reference", module: "All modules",         relatedLessons: ["module-0", "module-9"],            readTime: "Watch any time", description: "Hand-picked videos Kristina recommends watching alongside the course — embedded right here so they're all in one place. The list grows as new ones land.",                       icon: PlayCircle,     status: "ready" },

  // ─ Women-specific set ────────────────────────────────────────
  { slug: "cycle-tracker",          title: "Cycle Tracker × Cravings Log",   eyebrow: "Template",  category: "template",  module: "Module 4",            relatedLessons: ["module-4"], women: true,          readTime: "28 days",     description: "Track cycle phase, cravings, mood, energy and skin daily — see your own pattern over one full month.",                                                     icon: Calendar,       status: "ready" },
  { slug: "pms-decoded",            title: "PMS Decoded",                    eyebrow: "Women's Guide", category: "guide", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "7 min read",  description: "Mood swings, breast tenderness, jawline acne, water retention — reframed as fixable hormonal output, not 'just how I am.'",                                icon: Sparkles,       status: "ready" },
  { slug: "pcos-sugar-connection",  title: "The PCOS–Sugar Connection",      eyebrow: "Women's Guide", category: "guide", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "8 min read",  description: "Insulin resistance is the upstream of PCOS. A specific protocol plus the labs to ask your doctor for.",                                                     icon: Activity,       status: "ready" },
  { slug: "skin-food-timeline",     title: "The Skin-Food Timeline",         eyebrow: "Women's Guide", category: "guide", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "6 min read",  description: "What changes in your skin at day 7, 14, 30 and 90 off ultra-processed food. Glycation, inflammation, collagen — explained.",                               icon: Droplet,        status: "ready" },
  { slug: "iron-for-women",         title: "Iron for Women",                 eyebrow: "Women's Guide", category: "guide", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "6 min read",  description: "Symptoms (often mistaken for sugar inflammation), real food sources, and when supplementation actually makes sense.",                                       icon: PillIcon,       status: "ready" },
  { slug: "diet-history",           title: "For Women With Diet History",    eyebrow: "Women's Guide", category: "guide", module: "Module 8",           relatedLessons: ["module-8"], women: true,          readTime: "7 min read",  description: "If you've spent 10+ years dieting, this protocol runs differently. Refeeding sensitivity, restriction triggers, putting the scale away.",                  icon: Heart,          status: "ready" },
  { slug: "female-lab-panel",       title: "The Female Lab Panel",           eyebrow: "Reference", category: "reference", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "5 min read",  description: "Exactly which labs to request from your doctor — fasting insulin, SHBG, free T, estradiol, full thyroid panel, ferritin, vitamin D.",                       icon: FlaskConical,   status: "ready" },

  // ─ Extras (added later) ────────────────────────────────────────
  { slug: "habit-tracker",          title: "30-Day Habit Tracker",           eyebrow: "Template",  category: "template",  module: "Module 9",            relatedLessons: ["module-9"],                        readTime: "30 days",     description: "One primary commitment + a small handful of supporting habits, tracked daily. Built around the 'one commitment' rule from Module 9.",                       icon: CheckSquare,    status: "ready" },
  { slug: "shopping-list-30-day",   title: "30-Day Shopping List",           eyebrow: "Reference", category: "reference", module: "Module 5",            relatedLessons: ["module-5"],                        readTime: "8 min read",  description: "A master grocery list built on the Module 5 food framework — weekly perishables, bi-weekly buys, monthly pantry restock, plus a four-week meal scaffold.",  icon: ShoppingCart,   status: "ready" },
  { slug: "truth-about-fructose",   title: "The Truth About Fructose",       eyebrow: "Guide",     category: "guide",     module: "Module 4",            relatedLessons: ["module-4"],                        readTime: "9 min read",  description: "Fructose is processed in the liver like alcohol — and modern fruits are not the wild fruits your biology evolved with. The honest version, with practical guidance.", icon: Apple,         status: "ready" },
  { slug: "cycle-nutrition",        title: "Cycle Nutrition — Phase by Phase", eyebrow: "Women's Guide", category: "guide", module: "Module 4",           relatedLessons: ["module-4"], women: true,          readTime: "8 min read",  description: "What to eat in each phase of your menstrual cycle — menstrual, follicular, ovulation, luteal. Specific nutrients, foods, and exercise guidance for each.",            icon: Sprout,         status: "ready" },
];

/* ═══════════════════════════════════════════════════════════════
   RESOURCE SHELL — shared chrome for every detail page
   ═══════════════════════════════════════════════════════════════ */
const ResourceShell = ({
  resource,
  onBack,
  backLabel = "Back to Resource Library",
  children,
}: {
  resource: ResourceDef;
  onBack: () => void;
  backLabel?: string;
  children: ReactNode;
}) => {
  const articleRef = useRef<HTMLElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const prev = document.title;
    document.title = `${resource.title} · The Unhooked Method`;
    return () => { document.title = prev; };
  }, [resource.title]);

  const handleDownload = async () => {
    if (!articleRef.current || isGenerating) return;
    setIsGenerating(true);
    try {
      // Lazy-load PDF deps so they don't bloat the initial bundle.
      // html2canvas-pro (vs vanilla html2canvas) is critical — it parses
      // Tailwind v4's oklch colour tokens correctly.
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas-pro"),
        import("jspdf"),
      ]);

      // Capture the article DOM as a high-DPI canvas
      const canvas = await html2canvas(articleRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // A4 portrait, 12mm horizontal + vertical margins
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 12;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;

      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      // Multi-page: shift the same image up the y-axis on each new page
      let heightLeft = imgH;
      let position = margin;
      pdf.addImage(imgData, "JPEG", margin, position, imgW, imgH);
      heightLeft -= pageH - margin * 2;
      while (heightLeft > 0) {
        position = margin - (imgH - heightLeft);
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, imgW, imgH);
        heightLeft -= pageH - margin * 2;
      }

      pdf.save(`unhooked-method-${resource.slug}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Sorry, the download couldn't be generated. Please try again or use Print instead.");
    } finally {
      setIsGenerating(false);
    }
  };

  const Icon = resource.icon;

  return (
    <article
      ref={articleRef}
      className="max-w-3xl mx-auto px-5 sm:px-8 py-6 sm:py-10 print:px-0 print:py-0 print:max-w-full"
    >
      {/* Screen-only action bar */}
      <div className="print:hidden flex items-center justify-between gap-3 mb-6 sm:mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-bold text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{backLabel}</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 rounded-full transition-colors"
            title="Open browser print dialog"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 disabled:opacity-70 rounded-full shadow-md shadow-amber-300/40 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Generating…</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
                <span className="sm:hidden">PDF</span>
              </>
            )}
          </button>
        </div>
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

      {/* Bottom back navigation — context-aware, mirrors the top action */}
      <div className="print:hidden mt-14 sm:mt-16 flex justify-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 text-[13.5px] sm:text-sm font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 hover:border-amber-300 rounded-full transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-12 sm:mt-16 pt-8 border-t border-gray-100 print:mt-10 print:pt-6">
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
            Questions? Write us on WhatsApp · +31 6 18784896
          </div>
        </div>
      </footer>
    </article>
  );
};

/* ═══════════════════════════════════════════════════════════════
   REUSABLE CONTENT PRIMITIVES
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
        {num && <span className="text-amber-600 font-black text-base sm:text-lg tabular-nums">{num}</span>}
        {eyebrow && <span className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.22em]">{eyebrow}</span>}
      </div>
    )}
    <h2 className="text-xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4 sm:mb-5 print:text-2xl">{title}</h2>
    {intro && <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed mb-6">{intro}</p>}
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

const Checklist = ({ items }: { items: string[] }) => (
  <ul className="space-y-2.5 mt-3">
    {items.map((s, i) => (
      <li key={i} className="flex gap-3 items-start text-[14.5px] sm:text-[15px] text-gray-800 print:break-inside-avoid">
        <span className="w-5 h-5 mt-0.5 border-2 border-amber-300 rounded flex-shrink-0" />
        <span className="leading-snug">{s}</span>
      </li>
    ))}
  </ul>
);

const BlankLine = ({ label }: { label?: string }) => (
  <div className="mt-3">
    {label && <p className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.2em] mb-1.5">{label}</p>}
    <div className="border-b border-dashed border-gray-300 h-6" />
  </div>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto mt-4 print:overflow-visible">
    <table className="w-full border-collapse text-[13.5px] sm:text-sm">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="text-left text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] px-3 py-2 bg-amber-50 border-b-2 border-amber-300">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className="print:break-inside-avoid">
            {row.map((cell, ci) => (
              <td key={ci} className="px-3 py-2.5 border-b border-gray-100 text-gray-700 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: If-Then Protocols Library
   ═══════════════════════════════════════════════════════════════ */
const IfThenProtocols = () => (
  <>
    <Section eyebrow="01 · Why pre-decision works" title="The anatomy of an if-then">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>Willpower lives in the prefrontal cortex — and the prefrontal cortex depletes across the day. By 9pm, after work, decisions, emotion management and a slightly low blood sugar, it is running on fumes. That is exactly when the craving hits hardest.</p>
        <p>An if-then protocol moves the decision out of that moment. You decide once, in the morning, sitting calmly. When the trigger fires, there is no negotiation — only execution. The format is fixed:</p>
        <Callout variant="amber">
          <span className="font-bold text-amber-900">If</span> [a very specific trigger]{" "}
          <span className="text-amber-700">→</span>{" "}
          <span className="font-bold text-amber-900">then</span> [a very specific action]
        </Callout>
        <p className="text-gray-600">Notice the two words doing the work: <em>specific</em>, twice. Vague triggers ("if I feel tired") and vague actions ("I'll be careful") collapse under pressure. The protocols below are all written so a depleted brain can run them without thinking.</p>
      </div>
    </Section>

    <Section eyebrow="02" title="Time-based triggers" intro="Recurring clock-driven moments — the brain wired sugar to specific times of day. Reroute those exact slots.">
      <ProtocolList items={[
        { num: 1, if_: "the clock hits 3pm and I'm at my desk", then_: "I stand up, drink 500ml of water, eat a handful of almonds, and take five minutes outside." },
        { num: 2, if_: "it's 9pm and I find myself in the kitchen", then_: "I make a strong herbal tea and a sparkling water, sit on the couch with my notes, and write for three minutes before deciding anything." },
        { num: 3, if_: "it's Friday afternoon and I'm leaving work", then_: "I eat my pre-prepared protein snack in the parking lot before I drive home." },
        { num: 4, if_: "it's Sunday afternoon and boredom is rising", then_: "I leave the house for thirty minutes — walk, café, anywhere with people but no decisions." },
        { num: 5, if_: "dinner just ended", then_: "I brush my teeth immediately and move to a different room." },
      ]} />
    </Section>

    <Section eyebrow="03" title="Emotional states" intro="The craving rarely wants food. Name what it actually wants — then meet that need directly.">
      <ProtocolList items={[
        { num: 6, if_: "I notice I'm bored and reaching for the cabinet", then_: "I name what I actually need (entertainment, novelty, rest, contact) and respond to that need — not to food." },
        { num: 7, if_: "I'm anxious and want to eat", then_: "I do sixty seconds of 4-7-8 breathing first. If the urge remains after that, I revisit." },
        { num: 8, if_: "I'm frustrated after a hard call or meeting", then_: "I walk outside for ten minutes before opening anything in the kitchen." },
        { num: 9, if_: "I'm lonely and the kitchen is calling", then_: "I text one specific friend (pre-decided name) before opening any cabinet." },
        { num: 10, if_: "I slept less than six hours", then_: "I extra-protect breakfast (eggs + avocado), nothing sweet, and accept today is harder." },
        { num: 11, if_: "I want to numb out", then_: "I lie on the floor for five minutes, eyes closed, before any food decision." },
      ]} />
    </Section>

    <Section eyebrow="04" title="Environment & place" intro="The brain learned which physical places mean sugar. Change the route, change the response.">
      <ProtocolList items={[
        { num: 12, if_: "I walk past the bakery on my street", then_: "I cross to the other side of the road. No exceptions." },
        { num: 13, if_: "I'm in the supermarket and a craving fires", then_: "I go directly to the drinks aisle, buy a strong sparkling water, and leave by a different aisle — skipping the checkout candy." },
        { num: 14, if_: "I'm in the office break room", then_: "I make my coffee or tea and leave within two minutes — no browsing." },
        { num: 15, if_: "I'm at an airport waiting for a flight", then_: "I find a real-food kiosk first, buy a protein item, then sit down." },
        { num: 16, if_: "I'm staying in a hotel", then_: "I do a small grocery run on arrival — yogurt, fruit, nuts — so I don't depend on hotel breakfast or the minibar." },
        { num: 17, if_: "I'm at the cinema", then_: "I bring a bag of mixed nuts from home, or I eat nothing." },
      ]} />
    </Section>

    <Section eyebrow="05" title="Social situations" intro="Other people will offer, ask, joke. Decide the response in advance, warmly and without debate.">
      <ProtocolList items={[
        { num: 18, if_: "someone offers me ultra-processed food at a work or social event", then_: "I say: \"Thank you, I have an allergy\" — and change the subject." },
        { num: 19, if_: "there's a birthday cake at the office", then_: "I show up, congratulate, hold a glass of water, and decline with the allergy line." },
        { num: 20, if_: "the dessert menu arrives at a restaurant", then_: "I close it and order a coffee instead." },
        { num: 21, if_: "it's wine night with friends", then_: "I have one drink and switch to sparkling water for the rest. No sweet cocktails." },
        { num: 22, if_: "a family member pressures me", then_: "I say once, warmly: \"I've found I feel much better when I don't eat this, so I'm keeping to that.\" Said once. Then I change the topic." },
        { num: 23, if_: "I'm visiting my parents or in-laws", then_: "I bring my own breakfast option, eat that, and join communal dinner with whatever fits the framework." },
        { num: 24, if_: "I'm going to a wedding or event", then_: "I eat a real meal at home first so I don't arrive vulnerable." },
      ]} />
    </Section>

    <Section eyebrow="06" title="Practical & logistical" intro="Most slips happen because the day wasn't set up to succeed. Front-load the decisions.">
      <ProtocolList items={[
        { num: 25, if_: "I'm leaving home for more than two hours", then_: "I eat before I go, or I pack: hard-boiled eggs, nuts, cheese, a piece of fruit." },
        { num: 26, if_: "I'm grocery shopping", then_: "I go with a list, I do not browse, and I take the same route through the store every time." },
        { num: 27, if_: "I haven't eaten in four-plus hours", then_: "I eat real food before any decision about anything else." },
        { num: 28, if_: "my child has leftover food on the plate", then_: "I scrape it straight into the trash. No taste-testing." },
      ]} />
    </Section>

    <Section eyebrow="07 · Women" title="Cycle & physiology" intro="The female system runs on a 28-ish day rhythm. Two specific windows need protocols of their own.">
      <ProtocolList items={[
        { num: 29, if_: "I'm in the luteal phase (the week before my period)", then_: "I double protein at every meal, accept lower energy, and lighten my schedule." },
        { num: 30, if_: "cycle-onset signs are showing (cravings, mood shifts)", then_: "I mark the date and front-load magnesium-rich foods — dark leafy greens, pumpkin seeds, 90%+ dark chocolate." },
        { num: 31, if_: "I'm on my period and exhausted", then_: "I prioritize iron-rich foods (red meat, liver, spinach) and remove non-essential obligations from the day." },
      ]} />
    </Section>

    <Section eyebrow="08" title="Slips & setbacks" intro="A slip is data, not a verdict. Pre-decide the recovery so a slip doesn't snowball.">
      <ProtocolList items={[
        { num: 32, if_: "I ate something I didn't plan to", then_: "I return to baseline at the very next meal. No 'ruined day,' no compensation, no skipping the next meal." },
        { num: 33, if_: "I notice a three-day slip pattern forming", then_: "I do a 24-hour reset — write what triggered it, find the protocol gap, update my operating system." },
        { num: 34, if_: "I'm in a full relapse spiral", then_: "I message Kristina on WhatsApp. Not later — now." },
      ]} />
    </Section>

    <Section eyebrow="09" title="Morning, screens, foundations" intro="The first hour of the day, and the last hour at night, decide most of what happens in between.">
      <ProtocolList items={[
        { num: 35, if_: "it's morning", then_: "I eat protein and fat within the first hour. No coffee on an empty stomach." },
        { num: 36, if_: "I've just finished a workout", then_: "I eat within thirty to sixty minutes, protein-forward." },
        { num: 37, if_: "I'm scrolling and reaching for food at the same time", then_: "I close the screen first, then check whether I'm actually hungry." },
        { num: 38, if_: "I'm binge-watching a series", then_: "I keep plain sparkling water and a small pre-portioned bowl of nuts in reach — nothing else." },
      ]} />
    </Section>

    <Section eyebrow="10 · Worksheet" title="Build your own — three protocols">
      <Callout variant="gray" title="Use the three-line format below for your top three triggers.">
        Don't try to write twenty at once. Three personal protocols, lived for two weeks, beat thirty borrowed protocols read once.
      </Callout>
      <div className="mt-6 space-y-5">
        {[1, 2, 3].map((n) => (
          <div key={n} className="border border-gray-200 rounded-2xl p-5 sm:p-6 print:break-inside-avoid">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-3">Protocol {n}</p>
            <BlankLine label="If" />
            <BlankLine label="The real need underneath" />
            <BlankLine label="→ Then" />
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
   RESOURCE: Hidden Names of Sugar
   ═══════════════════════════════════════════════════════════════ */
const HiddenNamesOfSugar = () => (
  <>
    <Section eyebrow="01 · Why this list" title="Sugar wears sixty masks. Here are all of them.">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>Food labels list ingredients by weight, highest first. If a product would have to put "sugar" in its top three ingredients, manufacturers split that sugar into several different names — so each one falls lower on the list and the product can claim "low sugar" or "no added sugar" on the front of the box.</p>
        <p>The result: bread, yogurt, pasta sauce, granola bars, salad dressing and "healthy" cereals are often built on three or four sugars under different names. Once you recognize the aliases, the supermarket changes permanently.</p>
        <Callout variant="amber" title="The supermarket rule">
          Read the ingredient list, not the front of the package. If any sugar — under any name on this list — appears in the first three ingredients, sugar is a primary component of that product. Always.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="02 · Cane & beet sugars" title="The classics" intro="Refined from sugarcane or sugar beet. All behave identically in the body.">
      <NameGrid names={["Sucrose","Cane sugar","Cane juice","Cane crystals","Evaporated cane juice","Cane sugar syrup","Beet sugar","Brown sugar","Demerara sugar","Muscovado sugar","Turbinado sugar","Confectioner's sugar","Caster sugar","Icing sugar","Invert sugar"]} />
    </Section>

    <Section eyebrow="03 · Corn-derived" title="The industrial workhorses" intro="Cheap, calorie-dense, and in nearly every ultra-processed product in the United States.">
      <NameGrid names={["Corn syrup","High-fructose corn syrup (HFCS)","HFCS-42 · HFCS-55","Crystalline fructose","Glucose syrup","Glucose-fructose syrup","Dextrose","Dextrose monohydrate","Maltose","Maltodextrin","Corn sweetener"]} />
    </Section>

    <Section eyebrow="04 · Fruit-based" title="The 'natural' aliases" intro="They sound healthier than they are. In the body, refined fruit sugars behave like any other refined sugar.">
      <NameGrid names={["Fruit juice concentrate","Apple juice concentrate","Pear juice concentrate","Grape juice concentrate","Date syrup","Date sugar","Coconut sugar","Palm sugar","Agave nectar","Agave syrup","Fructose (added)"]} />
      <Callout variant="warning" title="On fructose specifically">
        Added fructose and crystalline fructose are metabolized almost entirely by the liver. The fructose in whole fruit — with fiber, water, and structure — is not the same input.
      </Callout>
    </Section>

    <Section eyebrow="05 · Malt & grain syrups" title="The bakery & cereal group" intro="Heavy in bread, breakfast cereals, energy bars and beer-adjacent products.">
      <NameGrid names={["Malt syrup","Barley malt extract","Barley malt syrup","Maltol","Rice syrup","Brown rice syrup","Oat syrup","Sorghum syrup"]} />
    </Section>

    <Section eyebrow="06 · Honey & traditional syrups" title="Yes, these count too" intro="Honey, maple, and traditional syrups are less refined — but biologically still a concentrated sugar load.">
      <NameGrid names={["Honey","Maple syrup","Maple sugar","Molasses","Treacle","Golden syrup","Sorghum molasses"]} />
    </Section>

    <Section eyebrow="07 · The '-ose' suffix" title="The chemistry-class disguise" intro="Anything ending in -ose is, by definition, a sugar. Spot the suffix and you've spotted a sugar.">
      <NameGrid names={["Sucrose","Glucose","Fructose","Lactose","Maltose","Galactose","Dextrose","Trehalose","Ribose"]} />
    </Section>

    <Section eyebrow="08" title="How to scan a label in 10 seconds">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Turn the package over. Find the ingredient list — not the front-of-box marketing.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Look at the <strong>first three ingredients</strong>. Ingredients are listed by weight — the first three define the product.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>Scan for any name on this list. Also scan for any word ending in <strong>-ose</strong> or <strong>-syrup</strong>.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>Count the total number of sugar aliases anywhere on the list. Three or more = an engineered product. Put it back.</span></li>
      </ol>
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
        <p>The Yale Food Addiction Scale (YFAS) was developed in 2009 by Dr. Ashley Gearhardt and colleagues at Yale. They took the psychiatric diagnostic criteria for substance addiction — the same framework used for cocaine, alcohol, and nicotine — and applied them to food behavior. The result is a nine-marker scale that has been validated across hundreds of thousands of people since.</p>
        <p>A meta-analysis of nearly 200,000 people found that <strong className="text-gray-900">roughly one in five</strong> meets the YFAS criteria for clinical food addiction. The number skews significantly higher in women.</p>
        <Callout variant="amber" title="This is not for self-judgment.">
          The point of running this scale on yourself is to move what you've been carrying as "I'm broken" into clinical language: <em>a measurable response to a specific stimulus in a specific environment</em>. That reframe is where everything else in the course starts.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="02 · The nine markers" title="Mark each one honestly" intro="For each marker, decide: does this describe you? Rate severity 0 (never) → 4 (almost always). Write a one-line example next to any you score 2 or higher.">
      <div className="space-y-4 sm:space-y-5">
        {[
          { n: 1, title: "Eating more than intended", body: "I regularly eat more than I planned, especially sweet, salty, or fatty food. I sit down for \"just a little\" and the whole thing disappears." },
          { n: 2, title: "Failed attempts to cut back", body: "I have tried to stop or cut back many times. The attempts collapse — same triggers, same time of day, same emotional weather." },
          { n: 3, title: "Mental energy spent on food", body: "A significant amount of my mental energy goes to food — not just eating, but thinking about it, planning around it, managing guilt about it." },
          { n: 4, title: "Intense, physical-feeling cravings", body: "I experience cravings that feel almost physical in their intensity, especially under stress, loneliness, or anxiety." },
          { n: 5, title: "Eating despite known harm", body: "I keep eating this way knowing it's hurting me — my skin, energy, sleep, mood, maybe relationships." },
          { n: 6, title: "Activities given up", body: "Things I used to enjoy — hobbies, seeing people, work I cared about — have quietly been pushed aside as food takes the space." },
          { n: 7, title: "Seeing harm clearly, reaching anyway", body: "I see the harm clearly. My hand reaches anyway." },
          { n: 8, title: "Tolerance", body: "What used to satisfy me doesn't anymore. The amount or intensity keeps moving up." },
          { n: 9, title: "Withdrawal symptoms", body: "When I try to remove a trigger food completely, I get real symptoms: irritability, anxiety, headaches, fatigue, a crawling restlessness." },
        ].map((m) => (
          <div key={m.n} className="border border-gray-200 rounded-2xl p-5 sm:p-6 print:break-inside-avoid">
            <div className="flex items-start gap-3 sm:gap-4 mb-3">
              <span className="text-amber-700 font-black text-lg sm:text-xl tabular-nums leading-none pt-0.5 flex-shrink-0">{String(m.n).padStart(2, "0")}</span>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">{m.title}</h3>
              </div>
            </div>
            <p className="text-gray-600 text-[14px] sm:text-[15px] leading-relaxed mb-4">{m.body}</p>
            <div className="flex items-center gap-1.5 sm:gap-2 mb-3 flex-wrap">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">Score</span>
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} className="w-7 h-7 sm:w-8 sm:h-8 border-2 border-gray-200 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">{s}</span>
              ))}
              <span className="text-[10px] font-bold text-gray-400 ml-1">0 = never · 4 = almost always</span>
            </div>
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
        <p>Per the clinical literature, <strong className="text-gray-900">two or three of these markers persisting over time</strong> meets the threshold for food addiction. The number isn't a verdict on your character. It is a diagnostic snapshot of a system that has been running for a while.</p>
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
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: 24-Hour Craving Log (template)
   ═══════════════════════════════════════════════════════════════ */
const CravingLog24h = () => (
  <>
    <Section eyebrow="01 · Why this log" title="What twenty-four hours of honest observation reveals">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Module 2 walks through the three layers behind every craving — dopamine, conditioning, physiological amplifiers. Before you can interrupt them, you have to <em>see</em> them. This log is the seeing tool. One day of honest data is more useful than a month of guessing what your patterns are.
      </p>
      <Callout variant="amber" title="Today's only job is to observe.">
        Don't try to change anything yet. Don't try to "be good." Just write down what happens. You can't engineer around a pattern you haven't documented.
      </Callout>
    </Section>

    <Section eyebrow="02 · How to use it" title="Four fields, every time a craving fires">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span><strong>Time</strong> — to the nearest 15 minutes. You'll see clock patterns emerge.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span><strong>What you ate in the past 2–3 hours</strong> — including coffee, snacks, "nothing." Insulin crashes from earlier meals show up here.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span><strong>What was happening just before the craving</strong> — a Zoom ended, you opened Instagram, you walked past the kitchen, you finished a task.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span><strong>What emotional state you were in</strong> — bored, anxious, lonely, frustrated, tired, restless, fine.</span></li>
      </ol>
    </Section>

    <Section eyebrow="03 · The log" title="One row per craving — fill freely">
      <Callout variant="amber" title="Print or download this page to fill in by hand.">
        Use the <strong>Print</strong> or <strong>Download PDF</strong> button at the top of this page. Pen-and-paper is the highest-signal way to do it — you'll write less, but notice more. Twelve blank rows fit on one printed page.
      </Callout>
      <div className="mt-6">
        <Table
          headers={["Time", "Recent food (past 2–3h)", "What just happened", "Emotional state"]}
          rows={Array.from({ length: 12 }).map(() => ["", "", "", ""])}
        />
      </div>
      <Callout variant="gray" title="Extra rows? Add lines on the back of the printed page.">
        Twelve rows is plenty for one day for most people. Some days fire more often — that itself is data.
      </Callout>
    </Section>

    <Section eyebrow="04 · After 24 hours" title="The three questions to ask the data">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span><strong>Time pattern?</strong> Did cravings cluster around specific clock times? (3pm, post-dinner, late evening.)</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span><strong>Food pattern?</strong> Did they follow a refined-carb meal by 2–3 hours? That's the insulin crash signature.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span><strong>Emotional pattern?</strong> Was it the same emotion most times? Boredom and exhaustion are the top two for almost everyone.</span></li>
      </ol>
      <Callout variant="amber" title="What you do with this">
        Take the strongest pattern you found and turn it into one if-then protocol. See <em>The If-Then Protocols Library</em> for examples — and the Personal Operating System sheet for blanks.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Kitchen Audit Checklist (template)
   ═══════════════════════════════════════════════════════════════ */
const KitchenAuditChecklist = () => (
  <>
    <Section eyebrow="01 · Room-by-room walkthrough" title="Where ultra-processed food likes to hide">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-5">
        Walk through your kitchen with this list in hand. The point isn't to remove anything yet — just to <em>see</em> what's there. Awareness comes first; the clearing happens later, after Module 6.
      </p>
      <div className="space-y-5">
        {[
          { area: "Fridge — top shelf", look: "Pre-made sauces, dressings, flavored yogurts, juice cartons, anything with 5+ ingredients on the label." },
          { area: "Fridge — door", look: "Condiments and dressings live here. Most contain hidden sugars (check our Names of Sugar reference)." },
          { area: "Freezer", look: "Ice cream, pre-made meals, breaded items, frozen pastries." },
          { area: "Pantry — eye level", look: "Cereals, granola bars, crackers, cookies, chips, instant oatmeal packets." },
          { area: "Pantry — top shelf", look: "The 'occasion' stash. Baking supplies you only use twice a year still count." },
          { area: "Pantry — bottom shelf", look: "Drinks: sodas, sports drinks, sweetened iced teas." },
          { area: "Counter / fruit bowl", look: "Cookies in a jar, candy in a dish, sweet condiments left out." },
          { area: "Office / bedside / car", look: "The honest stash. This is the most important one — it's the easiest to grab when willpower is depleted." },
        ].map((row, i) => (
          <div key={i} className="border border-gray-200 rounded-2xl p-5 print:break-inside-avoid">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-6 h-6 border-2 border-amber-300 rounded flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.2em] mb-1">{row.area}</p>
                <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">{row.look}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="02 · Before any changes" title="Capture the 'before' state">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-5">
        Before you change anything, take three photos. The purpose is simple — capture where your kitchen is <em>right now</em>, so you have a clean record of the starting point. Don't tidy first. Don't curate. Just photograph it as it is.
      </p>
      <Checklist items={[
        "Inside the fridge — door open, every shelf visible.",
        "Your main snack or pantry shelf — the one you reach for most.",
        "Your secret stash — wherever the food you reach for when you're not actually hungry lives. A drawer. A jar by the bed. The glove compartment. The desk drawer.",
      ]} />
      <Callout variant="amber" title="That's the whole task for now.">
        Save the photos somewhere you'll find them later. You'll understand why they matter as the course unfolds — and the actual clearing-out happens after Module 6, with its own dedicated guide.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Pantry Restock List (reference)
   ═══════════════════════════════════════════════════════════════ */
const PantryRestockList = () => (
  <>
    <Section eyebrow="01" title="What to actually buy after you clear the kitchen">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Clearing the house creates a vacuum, and a vacuum at 9pm is dangerous. The day after you do the Module 6 kitchen clear-out, do a single grocery run with the categories below. The goal is to make the path of least resistance always lead to real food.
      </p>
    </Section>

    <Section eyebrow="02 · Protein staples" title="The foundation of every meal" intro="Build every meal around one of these. Pick three to keep on hand at all times.">
      <NameGrid names={[
        "Eggs (a dozen, always)",
        "Plain Greek yogurt (full-fat, no fruit)",
        "Cottage cheese",
        "Aged cheese (cheddar, gouda, parmesan)",
        "Tinned fish (sardines, mackerel, tuna in olive oil)",
        "Smoked salmon",
        "Cured meats (jamón, prosciutto — quality ones)",
        "Chicken thighs + wings (skin-on, bone-in if possible)",
        "Ground beef (higher-fat, 15–20%)",
        "Steak (good cut, weekly)",
        "Lentils, chickpeas (dried or quality canned)",
        "Tofu / tempeh (if you eat them)",
      ]} />
    </Section>

    <Section eyebrow="03 · Fat staples" title="What carries flavor + stabilizes energy">
      <NameGrid names={[
        "Extra virgin olive oil (for finishing)",
        "Butter (real, salted)",
        "Ghee (for high-heat cooking)",
        "Beef tallow or coconut oil",
        "Avocados (a few at different ripeness)",
        "Olives (a jar of good ones)",
        "Raw nuts: almonds, walnuts, brazil nuts, macadamia",
        "Seeds: pumpkin, sunflower, flax",
        "Tahini",
        "Full-fat coconut milk",
      ]} />
    </Section>

    <Section eyebrow="04 · Volume & variety" title="Whole-food carbs and vegetables">
      <NameGrid names={[
        "Leafy greens (spinach, rocket, kale)",
        "Cruciferous (broccoli, cauliflower, brussels sprouts)",
        "Tomatoes (fresh + tinned, no sugar added)",
        "Cucumbers, peppers, courgette",
        "Onions, garlic, herbs",
        "Sweet potato",
        "Mushrooms",
        "Berries (frozen + fresh)",
        "Apples, pears (whole)",
        "Lemon, lime (cheap insurance)",
        "Sauerkraut, kimchi (good for gut)",
        "Whole grain — if it works for you: oats, quinoa, buckwheat",
      ]} />
    </Section>

    <Section eyebrow="05 · Safe slow-pleasure" title="What replaces the sweet hit without restarting the cycle">
      <NameGrid names={[
        "90%+ dark chocolate (one square is satisfying)",
        "Frozen berries with full-fat Greek yogurt",
        "A handful of nuts + a piece of aged cheese",
        "Mint or fennel tea after dinner",
        "Sparkling water (strong carbonation, fruit aroma, no sweetener)",
        "Bone broth",
      ]} />
      <Callout variant="warning" title="A note on the 'safe sweet'">
        For someone with real food addiction, even 90% chocolate can be a trigger early in recovery. Test, observe. If a single square reliably becomes the whole bar, take it out for the first two months and revisit later.
      </Callout>
    </Section>

    <Section eyebrow="06 · Shopping route" title="How to get in and out without sliding">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Never shop hungry. Eat first or carry a snack.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Always go with a list. Don't browse.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>Stick to the perimeter — produce, meat, fish, dairy. The center aisles are mostly ultra-processed.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>Skip the candy at checkout. Same route, same exit, every time.</span></li>
      </ol>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Personal Operating System Sheet (template)
   ═══════════════════════════════════════════════════════════════ */
const PersonalOSSheet = () => (
  <>
    <Section eyebrow="01" title="The decisions you make tonight protect you for the next year">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Your operating system is the set of pre-decided rules that govern how you act in your most reliable trouble spots. Once written, they're not up for debate at 9pm. The decision was already made by the version of you that was rested, clear, and fully online.
      </p>
      <Callout variant="amber" title="Format: if-then. Always.">
        Each rule has the form: <strong>If</strong> [specific situation] <strong>→ then</strong> [specific action]. Keep them concrete. Keep them executable in one step.
      </Callout>
    </Section>

    <Section eyebrow="02 · Worksheet" title="Write your four to five rules">
      <div className="space-y-5">
        {[1, 2, 3, 4, 5].map((n) => (
          <div key={n} className="border border-gray-200 rounded-2xl p-5 sm:p-6 print:break-inside-avoid">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-4">Rule {n}</p>
            <BlankLine label="The situation (If…)" />
            <BlankLine label="My action (Then…)" />
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="03 · Where to keep it" title="Make it visible">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-3">
        A rule that lives in a notebook in a drawer is a rule you'll forget. Pin this list where you'll see it in the first few weeks, while the rules are still new:
      </p>
      <Checklist items={[
        "The fridge door",
        "The bathroom mirror",
        "Your phone wallpaper",
        "Inside your wallet",
        "Inside your kitchen cabinet door",
      ]} />
      <Callout variant="gray">
        After two to three months, most of these rules become automatic and you won't need to re-read them. Until then, see them every day.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Craving Protocol Template (template)
   ═══════════════════════════════════════════════════════════════ */
const CravingProtocolTemplate = () => (
  <>
    <Section eyebrow="01" title="Your top three triggers — and the exact response for each">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Module 7 ends with a homework task: write your personal craving protocol. This sheet is the structured form. Three triggers is the right number — enough to cover most of your real life, few enough to actually remember.
      </p>
    </Section>

    <Section eyebrow="02" title="For each trigger, three things">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span><strong>The trigger itself</strong> — the specific time, place, or emotional state.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span><strong>What's usually underneath</strong> — the real need the craving is pointing at (boredom, exhaustion, loneliness, overwhelm).</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span><strong>Your if-then response</strong> — pre-decided, specific, one-step.</span></li>
      </ol>
    </Section>

    <Section eyebrow="03 · Your protocols" title="Fill these in tonight, before you close the video">
      <div className="space-y-5">
        {["Most reliable trigger", "Second most common trigger", "Third trigger to address"].map((label, i) => (
          <div key={i} className="border-2 border-amber-200 rounded-2xl p-5 sm:p-6 print:break-inside-avoid">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-1">Protocol {i + 1}</p>
            <p className="text-sm font-semibold text-gray-900 mb-4">{label}</p>
            <BlankLine label="Trigger (If…)" />
            <BlankLine label="Real need underneath" />
            <BlankLine label="Response (Then…)" />
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="04" title="Where to put it">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Pin it somewhere physical. Not because you'll need to re-read it mid-craving — but because writing it tonight and seeing it tomorrow makes the decision real. You'll execute the protocol from memory; the page just confirms you decided.
      </p>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: The Watch List — 7 hand-picked YouTube videos embedded
   ═══════════════════════════════════════════════════════════════ */
const WATCH_LIST_VIDEOS = [
  { id: "XeN6eGO6FVQ", n: 1 },
  { id: "KVXnVe8eOkM", n: 2 },
  { id: "B7tnfSPySb0", n: 3 },
  { id: "xjEFo3a1AnI", n: 4 },
  { id: "n28W4AmvMDE", n: 5 },
  { id: "ZE_H7rijrVk", n: 6 },
  { id: "DI92VHEmSb0", n: 7 },
];

const TheWatchList = () => (
  <>
    <Section eyebrow="01" title="A growing list of videos Kristina recommends — embedded here so you don't lose them in a YouTube rabbit hole">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          The point of this list is small and specific: each video extends something covered in the course, ranked by how high-leverage it is for what you're working on. Watch in order, or pick the one that feels most urgent for where you are right now. New videos are added as Kristina comes across them — bookmark this page.
        </p>
        <Callout variant="amber" title="How to use this">
          One video at a time. Watch it once, sit with it, do nothing else for an hour. Don't binge the list — that turns information into noise. The point is shift, not consumption.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="02" title="The videos">
      {/* Tile grid — 2 per row on tablet/desktop, single column on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
        {WATCH_LIST_VIDEOS.map((v) => (
          <div key={v.id} className="print:break-inside-avoid">
            <div className="flex items-center gap-3 mb-2.5">
              <span className="text-[11px] sm:text-xs font-black text-amber-700 uppercase tracking-[0.22em] tabular-nums">
                Video {String(v.n).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-amber-100" />
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-md print:hidden">
              <iframe
                src={`https://www.youtube.com/embed/${v.id}?modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&color=white`}
                title={`Watch List · Video ${v.n}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Print-only fallback: show direct link */}
            <p className="hidden print:block text-[13px] text-gray-700 leading-relaxed">
              Watch on YouTube:{" "}
              <span className="font-mono text-amber-800">youtu.be/{v.id}</span>
            </p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="03" title="A note from Kristina">
      <Callout variant="gray">
        Information without application doesn't move anything. After each video, ask one question: <em>what's the one thing from this that I could try this week?</em> If nothing — that video wasn't for you. Skip to the next one.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Cycle Tracker × Cravings Log (women)
   ═══════════════════════════════════════════════════════════════ */
const CycleTracker = () => (
  <>
    <Section eyebrow="01 · Why this exists" title="Your cycle isn't a side note. It's the whole rhythm.">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Most generic nutrition advice was developed on men or on women whose cycles weren't tracked. The result: the framework misses the predictable, repeating window where cravings spike, energy drops, and the same protocol that worked perfectly in week 2 collapses in week 4. One full cycle of honest data fixes that.
      </p>
      <Callout variant="amber">
        Track for at least 28 consecutive days — ideally 60. The pattern only becomes visible across cycles, not days.
      </Callout>
    </Section>

    <Section eyebrow="02 · The four phases" title="What changes when">
      <div className="space-y-4">
        {[
          { phase: "Menstrual (days 1–5)", body: "Lowest hormone levels. Energy is low, iron is dropping. Need: rest, iron-rich food, less obligation." },
          { phase: "Follicular (days 6–14)", body: "Estrogen rising. Energy and motivation peak. Best window for hard workouts and new habits." },
          { phase: "Ovulatory (days 14–17)", body: "Estrogen and testosterone peak. Most social, most confident. Cravings usually quiet." },
          { phase: "Luteal (days 18–28)", body: "Progesterone rises then drops. Sensitivity to insulin drops too. Cravings — especially for sugar and salt — spike. This is the danger window." },
        ].map((p, i) => (
          <div key={i} className="border-l-2 border-amber-300 pl-5 py-1">
            <p className="font-bold text-gray-900 text-[15px] sm:text-base mb-1">{p.phase}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="03 · The grid" title="One row per day — five fields, sixty seconds">
      <Table
        headers={["Day", "Phase", "Cravings (0–5)", "Mood (1–5)", "Energy (1–5)", "Skin"]}
        rows={Array.from({ length: 14 }).map((_, i) => [String(i + 1), "", "", "", "", ""])}
      />
      <Callout variant="gray">
        Add a second sheet for days 15–28. Some cycles are 26 days, some 32 — track all of yours.
      </Callout>
    </Section>

    <Section eyebrow="04 · What to look for" title="After one full cycle">
      <Checklist items={[
        "Did cravings cluster in luteal phase (days 18–28)? Almost always yes.",
        "Did mood drop predictably in the same window? That's hormonal, not personal.",
        "Did energy collapse near day 25–28? Plan around it.",
        "Did skin shift through the cycle? Acne by jawline = hormonal output, not skincare failure.",
        "Did one specific food crash you harder than others in luteal week?",
      ]} />
      <Callout variant="amber" title="The pattern is the prescription.">
        Once you see your luteal window, you can pre-decide for it: more protein, less obligation, lighter schedule, sparkling water at every social event, an early bedtime. You're not "losing willpower" in luteal — you're working against a hormone gradient. Design around it.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: PMS Decoded (women)
   ═══════════════════════════════════════════════════════════════ */
const PMSDecoded = () => (
  <>
    <Section eyebrow="01 · The reframe" title="PMS isn't your personality. It's a measurable hormonal output.">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Most women have been told some version of "PMS is just how women are." That framing is wrong, and it has cost generations of women clarity about their own bodies. What gets called "PMS" is a specific, predictable cascade of hormonal events — and most of the symptoms are downstream of one thing the course covered in Module 4: <strong>insulin dysregulation</strong>.
      </p>
    </Section>

    <Section eyebrow="02 · The cascade" title="Insulin → SHBG → sex hormones → symptoms">
      <ol className="space-y-3.5 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Chronic refined-carb intake keeps insulin elevated.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Elevated insulin lowers SHBG (sex hormone binding globulin) — the protein that keeps your sex hormones in balance.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>SHBG drops → active estrogen rises, testosterone becomes less regulated, progesterone recedes.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>The symptoms below appear — predictably, in the same window each month.</span></li>
      </ol>
    </Section>

    <Section eyebrow="03 · The symptoms, decoded" title="What each one is actually signalling">
      <div className="space-y-4">
        {[
          { symptom: "Worsened PMS, mood swings", reason: "Progesterone is the 'calm' hormone. When it recedes, mood becomes more reactive." },
          { symptom: "Breast tenderness, water retention", reason: "Estrogen dominance. Body holds water. Tissues feel tender." },
          { symptom: "Jawline & chin acne", reason: "Active testosterone is rising because SHBG isn't binding it. The lower face is the androgen zone." },
          { symptom: "Belly bloat that won't resolve", reason: "Insulin-driven inflammation + gut microbiome shifts in luteal phase." },
          { symptom: "Sugar and carb cravings spike", reason: "Progesterone affects insulin sensitivity; the body's actually less efficient at handling carbs this week." },
          { symptom: "Sleep gets shallower", reason: "Cortisol dysregulation rides shotgun on insulin dysregulation." },
        ].map((s, i) => (
          <div key={i} className="border border-gray-200 rounded-2xl p-5 print:break-inside-avoid">
            <p className="font-bold text-gray-900 text-[15px] sm:text-base mb-1">{s.symptom}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">{s.reason}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="04 · The luteal protocol" title="What to actually do in PMS week">
      <Checklist items={[
        "Double your protein at every meal. Aim for 30–40g per sitting.",
        "Add real fat liberally (olive oil, avocado, full-fat dairy, fatty fish). Don't fear it.",
        "Remove all refined carbs — even the ones you tolerate other weeks. This is the week they hurt most.",
        "Front-load magnesium-rich foods: dark leafy greens, pumpkin seeds, 90%+ dark chocolate, mineral water.",
        "Move gently — walks, yoga, mobility. Not the week for max-effort training.",
        "Sleep an extra hour. Your body is doing more under the surface.",
        "Pre-decide your luteal-week if-then protocols. Pin them somewhere visible.",
      ]} />
    </Section>

    <Section eyebrow="05 · Nutrient brief" title="Three actual moves with strong evidence">
      <div className="space-y-4">
        {[
          { n: "Magnesium glycinate (300–400mg evening)", w: "Reduces PMS severity in clinical trials. Helps sleep + mood + cramps." },
          { n: "Vitamin B6 (50mg, with food)", w: "Cofactor in serotonin synthesis. Reduces mood symptoms in luteal phase." },
          { n: "Omega-3 (2–3g EPA+DHA daily)", w: "Anti-inflammatory; reduces cramps and breast tenderness." },
        ].map((x, i) => (
          <div key={i} className="border-l-2 border-amber-300 pl-5 py-1">
            <p className="font-bold text-gray-900 text-[15px] sm:text-base mb-0.5">{x.n}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">{x.w}</p>
          </div>
        ))}
      </div>
      <Callout variant="warning" title="Disclaimer">
        Talk to your doctor before adding supplements, especially if you're on medication or have a medical condition. The point of this list is informed conversation, not self-prescription.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: PCOS-Sugar Connection (women)
   ═══════════════════════════════════════════════════════════════ */
const PCOSSugarConnection = () => (
  <>
    <Section eyebrow="01 · The fact" title="PCOS is, at its core, an insulin problem">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Polycystic ovary syndrome affects roughly 1 in 10 women of reproductive age. The conventional framing is hormonal — irregular periods, acne, hair growth, weight that won't move — and that's accurate, but it stops at the surface. The upstream driver in the majority of PCOS cases is <strong>insulin resistance</strong>. The hormones reorganize around the metabolism, not the other way around.
      </p>
      <Callout variant="amber" title="The implication">
        If insulin resistance is the upstream cause, then the upstream intervention isn't another hormonal treatment — it's the food framework from Module 5. Most women with PCOS see measurable improvement within 6–12 weeks of removing refined carbohydrates.
      </Callout>
    </Section>

    <Section eyebrow="02 · How it cascades" title="From insulin to ovary">
      <ol className="space-y-3.5 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Years of refined-carb intake → chronically elevated insulin.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Elevated insulin pushes ovaries to produce more androgens (testosterone).</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>Elevated insulin also lowers SHBG, so the testosterone that exists is more biologically active.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>High active testosterone → cystic ovaries, irregular cycles, hirsutism, acne, scalp hair loss, weight resistant to typical interventions.</span></li>
      </ol>
    </Section>

    <Section eyebrow="03 · The protocol" title="What changes the cascade">
      <Checklist items={[
        "Remove refined carbs entirely (sugar, white flour, fruit juice). This is non-negotiable for PCOS recovery.",
        "Build every meal around protein (30g+) and real fat. This stabilizes insulin moment-to-moment.",
        "Whole-food carbs only — vegetables, legumes, berries, small amounts of whole grains if tolerated.",
        "Avoid grazing. Eat 2–3 distinct meals with clear stops between them — gives insulin time to come down.",
        "Resistance training 2–3x/week. Muscle is the largest insulin-sensitive tissue you have.",
        "Inositol (myo + d-chiro, 4:40 ratio, ~2g/day) — strong evidence for improving insulin sensitivity in PCOS.",
        "Sleep 7+ hours. Sleep debt directly worsens insulin resistance.",
        "Be patient. Cycles re-regulate over 3–6 months, not 3–6 weeks.",
      ]} />
    </Section>

    <Section eyebrow="04 · Labs to ask for" title="Take this list to your doctor">
      <Checklist items={[
        "Fasting insulin (most important — many doctors skip this)",
        "Fasting glucose + HbA1c",
        "HOMA-IR (calculated from fasting insulin + glucose)",
        "SHBG",
        "Free testosterone + total testosterone",
        "DHEA-S",
        "Estradiol + progesterone (day 21 if you're cycling)",
        "Full thyroid panel (TSH, free T3, free T4, antibodies — PCOS often runs with thyroid issues)",
        "Vitamin D, B12, ferritin",
      ]} />
      <Callout variant="warning" title="If your doctor refuses">
        Some primary-care doctors will tell you fasting insulin isn't needed. It is. Ask again. You can also order it yourself through private labs in most countries.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Skin-Food Timeline (women)
   ═══════════════════════════════════════════════════════════════ */
const SkinFoodTimeline = () => (
  <>
    <Section eyebrow="01 · The mechanism" title="Your skin is downstream of your blood sugar">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Module 4 introduced glycation — the process where excess glucose bonds to collagen and elastin, stiffening the proteins that give skin firmness and bounce. The compounds this produces (AGEs — advanced glycation end products) accumulate, drive inflammation, and visibly age the skin from inside out. Sugar also feeds <em>P. acnes</em> bacteria and amplifies the androgens behind hormonal breakouts.
      </p>
      <Callout variant="amber" title="The honest version">
        No topical product can reach the depth where glycation happens. Serums work on the surface; the damage is happening below it. The only intervention that addresses the root is changing the input.
      </Callout>
    </Section>

    <Section eyebrow="02 · Day 7" title="What changes in the first week">
      <Checklist items={[
        "Morning puffiness reduces — the water retention from insulin spikes settles.",
        "Skin starts to feel slightly less oily by mid-afternoon.",
        "Existing breakouts may flare briefly as the body clears — this is normal, lasts 5–10 days.",
      ]} />
      <p className="text-[13.5px] sm:text-sm text-gray-500 italic mt-3">
        This is too early to see structural change. What you're noticing is fluid + inflammation settling.
      </p>
    </Section>

    <Section eyebrow="03 · Day 14" title="The first visible shift">
      <Checklist items={[
        "Skin tone evens out — less reactive redness.",
        "Pores look smaller because sebum production is normalizing.",
        "Eye bags reduce noticeably for many people.",
        "The 'tired face' lifts — a function of reduced inflammation, not topical anything.",
      ]} />
    </Section>

    <Section eyebrow="04 · Day 30" title="Structural change begins">
      <Checklist items={[
        "Hormonal acne (jawline, chin) noticeably calmer as SHBG and insulin stabilize.",
        "New breakouts are fewer in number and less inflamed when they do appear.",
        "Texture starts to smooth — the dullness lifts.",
        "Sleep is deeper, which itself supports skin repair overnight.",
      ]} />
    </Section>

    <Section eyebrow="05 · Day 90 and beyond" title="The deeper repair window">
      <Checklist items={[
        "Collagen production resumes its normal rhythm (it was being interrupted by glycation).",
        "Skin elasticity measurably improves — the 'snap back' returns to younger ranges.",
        "AGEs that have accumulated start to clear, slowly. Full clearance takes months to years.",
        "The compounding becomes visible: skin in month 6 looks meaningfully different from skin on day 1.",
      ]} />
      <Callout variant="amber" title="Photographs help">
        Take a no-makeup photo in the same lighting on day 1, day 30, day 90, and month 6. Day-to-day change is invisible; month-to-month is dramatic. The photos are the evidence the mirror can't give you.
      </Callout>
    </Section>

    <Section eyebrow="06" title="What still needs topicals">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Diet does not replace skincare. It removes the underlying driver. You still need: sunscreen daily (the single most important topical), a gentle cleanser, retinoid 2–3x/week, and moisturizer. With the diet input fixed, all of those work better than they ever did before.
      </p>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Iron for Women (women)
   ═══════════════════════════════════════════════════════════════ */
const IronForWomen = () => (
  <>
    <Section eyebrow="01 · Why this matters" title="Iron deficiency is the most common nutritional deficiency in women — and it mimics other things you may be blaming on sugar.">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Women lose iron every cycle. Heavy periods, vegetarian/vegan eating, gut absorption issues, and chronic inflammation all compound the loss. By age 30, somewhere between 20–40% of menstruating women have low iron — and most of them don't know it because the symptoms look like a hundred other things.
      </p>
    </Section>

    <Section eyebrow="02 · The symptoms" title="What low iron actually feels like">
      <Checklist items={[
        "Persistent fatigue, even after sleep",
        "Brain fog — thoughts feel slow, words feel further away",
        "Hair shedding, brittle nails",
        "Pale inner eyelids (a quick visual check)",
        "Cold hands and feet, even in warm rooms",
        "Restless legs at night",
        "Shortness of breath on mild exertion",
        "Cravings for ice, raw starches, or non-food (pica — a strong signal)",
        "Lowered exercise capacity",
        "Heavier-than-usual periods (a cause and a consequence)",
      ]} />
      <Callout variant="warning" title="The overlap problem">
        Many of these are also caused by chronic sugar-driven inflammation. So women fix their diet, feel better, but still have residual fatigue and brain fog — because the iron piece was never addressed. If you're 3 months into the protocol and still tired, get iron tested.
      </Callout>
    </Section>

    <Section eyebrow="03 · Food sources" title="Heme (animal) vs non-heme (plant)" intro="Heme iron is roughly 3–4x more bioavailable than non-heme. If you eat meat, this is the most reliable source. If you don't, you need more food + better pairing.">
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 mt-3">
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-3">Heme iron (animal)</p>
          <NameGrid names={[
            "Liver (the highest iron food)",
            "Red meat (beef, lamb)",
            "Dark poultry meat",
            "Oysters, mussels, clams",
            "Sardines, anchovies",
            "Egg yolks (modest)",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-3">Non-heme iron (plant)</p>
          <NameGrid names={[
            "Cooked spinach",
            "Lentils",
            "White beans, kidney beans",
            "Pumpkin seeds",
            "Tofu",
            "Dark chocolate (90%+)",
            "Quinoa",
            "Dried apricots",
          ]} />
        </div>
      </div>
    </Section>

    <Section eyebrow="04 · Pairing & cooking tricks" title="Boosting absorption">
      <Checklist items={[
        "Pair non-heme iron with vitamin C (lemon on spinach, peppers with beans). Vitamin C 3x's absorption.",
        "Don't drink coffee or tea within an hour of iron-rich meals — tannins block absorption.",
        "Cook acidic foods (tomato sauce, chili) in a cast iron pan — measurable iron transfers into the food.",
        "Animal protein + plant iron in the same meal increases non-heme absorption (the 'meat factor').",
        "Calcium competes with iron — don't take a calcium supplement with an iron-rich meal.",
      ]} />
    </Section>

    <Section eyebrow="05 · Testing & supplementing" title="When to act">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-4">
        Ask your doctor for a <strong>full iron panel</strong>, not just hemoglobin. Hemoglobin is the last thing to drop — by the time it's low, you've been deficient for a long time. The panel should include:
      </p>
      <Checklist items={[
        "Ferritin (iron storage — the most important early indicator)",
        "Serum iron",
        "Transferrin saturation",
        "TIBC (total iron-binding capacity)",
        "Hemoglobin + hematocrit",
      ]} />
      <Callout variant="amber" title="Ferritin reference points">
        Lab ranges often say ferritin is "normal" above 15. That's the threshold for anemia, not for feeling well. Most clinicians who actually work with women's energy target ferritin <strong>50–100 ng/mL</strong> for optimal function. Below 30 and you'll likely feel it.
      </Callout>
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mt-4">
        If you need to supplement, gentler forms (iron bisglycinate, or beef liver capsules) cause fewer GI issues than ferrous sulfate. Take with vitamin C, on an empty stomach if you can tolerate it, every other day (research shows this absorbs better than daily). Always under your doctor's guidance — too much iron is harmful.
      </p>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: For Women With Diet History (women)
   ═══════════════════════════════════════════════════════════════ */
const ForWomenWithDietHistory = () => (
  <>
    <Section eyebrow="01 · The honest start" title="If you've been on diets for ten or twenty years, this protocol runs differently for you.">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Most nutrition guidance is written for someone with a neutral, casual relationship to food — someone who can "just eat normally" without much internal noise. If that's not you, the standard advice can actually make things worse before it makes them better. You need a few adjustments. Here they are.
      </p>
    </Section>

    <Section eyebrow="02 · The cycle you're coming out of" title="Why diet history complicates this work">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-4">
        Every restriction cycle teaches the body two things: <em>food is scarce</em> and <em>the dieter cannot be trusted with food</em>. Over years, both lessons compound. Your body becomes hypersensitive to perceived restriction; your brain becomes hypersensitive to "starting over." A single skipped meal can trigger a binge cascade that would never happen in someone without that history.
      </p>
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        This is not a character problem. It's a learned biological response. The course's framework still works — but the early weeks need to look different.
      </p>
    </Section>

    <Section eyebrow="03 · Five adjustments" title="What changes for you specifically">
      <div className="space-y-5">
        {[
          { num: "01", t: "Don't undereat — especially at first.", b: "If your default is restriction, eat MORE protein and MORE fat than feels intuitive. Three full meals. The framework only works if your body trusts there will be enough." },
          { num: "02", t: "Don't track calories. Don't weigh yourself.", b: "Both reactivate the diet-brain. Put the scale in a closet for 90 days. Stop using calorie apps. Your body's signals come back when external metrics go away." },
          { num: "03", t: "Add before you subtract.", b: "Other women in the course remove things first. You add first. Add protein at breakfast. Add fat at every meal. Add vegetables. The 'removal' happens naturally because you're full." },
          { num: "04", t: "Watch for refeeding spikes.", b: "When you start eating enough after years of under-eating, hunger may spike temporarily — sometimes dramatically. This is normal and good. Eat. Don't restrict it. It settles in 2–4 weeks." },
          { num: "05", t: "If a slip happens, don't 'compensate.'", b: "Compensation (skipping the next meal, working out 'to make up for it') restarts the cycle that broke you in the first place. Eat the next meal as planned. The protocol holds." },
        ].map((x) => (
          <div key={x.num} className="border-l-2 border-amber-300 pl-5 py-1 print:break-inside-avoid">
            <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-1.5">{x.num}</p>
            <p className="font-bold text-gray-900 text-[15px] sm:text-base mb-1">{x.t}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">{x.b}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="04 · Signs you're underfeeding" title="The body will tell you, if you listen">
      <Checklist items={[
        "Hair shedding more than usual",
        "Periods get lighter, shorter, or disappear",
        "Cold all the time, even in warm rooms",
        "Sleep gets shallow, you wake at 3am wired",
        "Mood drops; small things feel huge",
        "Workouts feel impossible",
        "Cravings spike dramatically every evening",
      ]} />
      <Callout variant="warning" title="If you see two or more of these">
        You're not eating enough. Add 500 calories a day of protein and fat for two weeks and reassess. The framework isn't about eating less; it's about eating right things in enough quantity.
      </Callout>
    </Section>

    <Section eyebrow="05" title="When to seek professional support">
      <Callout variant="warning" title="Honest line">
        If you have an active eating disorder — current bulimic episodes, restrictive anorexia, binge eating disorder, or any pattern that has compromised your physical or mental health — work with an eating disorder specialist, not just this course. Message Kristina and she'll point you toward people qualified to support you. The course can run alongside that support, but not in place of it.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Female Lab Panel (women)
   ═══════════════════════════════════════════════════════════════ */
const FemaleLabPanel = () => (
  <>
    <Section eyebrow="01" title="What to actually ask your doctor for">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Annual physicals usually cover hemoglobin, cholesterol, basic thyroid, and a glucose reading. That's not enough to understand metabolic and hormonal health. The panel below adds the labs that matter — and most of them are inexpensive when included with a regular blood draw. Print this and bring it to your appointment.
      </p>
    </Section>

    <Section eyebrow="02 · Metabolic" title="The insulin layer">
      <Table
        headers={["Lab", "What it shows"]}
        rows={[
          ["Fasting insulin", "The most important early indicator. Elevated insulin precedes high blood sugar by years."],
          ["Fasting glucose", "Standard. Mostly normal until things are quite advanced."],
          ["HbA1c", "Average blood sugar over the past 3 months. A better picture than a single glucose reading."],
          ["HOMA-IR (calculated)", "Insulin resistance score from fasting insulin + glucose. Most doctors don't calculate it; you can. Target < 1.5."],
          ["Lipid panel (full)", "Triglycerides matter more than total cholesterol. High trigs + low HDL = insulin resistance."],
        ]}
      />
    </Section>

    <Section eyebrow="03 · Sex hormones" title="Time matters here">
      <Callout variant="amber" title="When to draw">
        If you're cycling, draw on day 21 (luteal phase) for progesterone, and day 3 for FSH/LH/estradiol. If you're not cycling, draw any time but note that.
      </Callout>
      <Table
        headers={["Lab", "What it shows"]}
        rows={[
          ["Estradiol (E2)", "Primary estrogen. High = dominance; low = perimenopause / underfueling."],
          ["Progesterone (day 21)", "If low while cycling, you may not be ovulating or have luteal phase deficit."],
          ["FSH + LH", "Pituitary signaling. Useful for PCOS (LH > FSH) or perimenopause (rising FSH)."],
          ["SHBG", "Sex hormone binding globulin. Low SHBG = insulin resistance or PCOS pattern."],
          ["Free testosterone + total T", "Elevated free T often signals PCOS or insulin-driven androgen excess."],
          ["DHEA-S", "Adrenal androgen output. High in some PCOS subtypes."],
        ]}
      />
    </Section>

    <Section eyebrow="04 · Thyroid" title="Almost never run completely, almost always relevant">
      <Callout variant="warning" title="Standard issue">
        Most doctors order only TSH. This misses up to 40% of thyroid dysfunction. Insist on the full panel.
      </Callout>
      <Table
        headers={["Lab", "What it shows"]}
        rows={[
          ["TSH", "Pituitary signal. Reference ranges are wide; functional medicine targets 1–2."],
          ["Free T4", "Inactive thyroid hormone."],
          ["Free T3", "Active thyroid hormone — what your tissues actually use."],
          ["Reverse T3", "If high, your body is shunting T4 away from active form. Stress / undereating signal."],
          ["TPO antibodies", "Hashimoto's marker. Often present years before TSH shifts."],
          ["TG antibodies", "Second autoimmune thyroid marker."],
        ]}
      />
    </Section>

    <Section eyebrow="05 · Iron, vitamins, minerals" title="The deficiency layer">
      <Table
        headers={["Lab", "What it shows"]}
        rows={[
          ["Ferritin", "Iron stores. Target 50–100 for energy, not just > 15."],
          ["Serum iron + TIBC + transferrin saturation", "Full iron picture."],
          ["Vitamin D (25-OH)", "Most women are deficient. Target 40–60 ng/mL."],
          ["Vitamin B12", "Low B12 mimics depression, brain fog. Target > 500."],
          ["Folate", "Often paired with B12."],
          ["Magnesium (RBC)", "Serum magnesium is unreliable — ask for RBC magnesium if available."],
        ]}
      />
    </Section>

    <Section eyebrow="06 · Inflammation" title="The chronic-burn marker">
      <Table
        headers={["Lab", "What it shows"]}
        rows={[
          ["hs-CRP", "High-sensitivity C-reactive protein. Cheap, easy, surprisingly informative. Target < 1.0."],
        ]}
      />
    </Section>

    <Section eyebrow="07 · How to use this" title="The conversation">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Print this page and bring it to your appointment.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>Ask: "I'd like the labs on this list with my next blood draw, please." Most are inexpensive and standard.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>If your doctor refuses some labs, you can usually order them privately. Costs vary by country.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>Get a copy of the actual numbers — not just "normal." Track them over time. Patterns matter more than single readings.</span></li>
      </ol>
      <Callout variant="warning" title="Final note">
        This is not a substitute for medical advice. Bring the numbers to a clinician you trust. The point of running them is informed conversation about your own body, not self-diagnosis.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: 30-Day Habit Tracker (template)
   ═══════════════════════════════════════════════════════════════ */
const HabitTracker = () => (
  <>
    <Section eyebrow="01 · Why a tracker, not a streak app" title="Habits, not motivation. Visible, not buried.">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Module 8 ends with a hard truth: tools hold until life gets hard — what determines whether you stay or go back is what you actually value, at the level your repeated choices reveal. The work of recovery is converting one-off decisions into automatic behavior, until the new identity holds without willpower.
      </p>
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mt-3">
        Module 9 narrows that to a single commitment: pick the one thing that, done consistently for 30 days, moves everything else forward. This tracker is the structured form of that commitment. Use it for 30 days, then review.
      </p>
      <Callout variant="amber" title="The rule of three">
        One primary commitment. Two or three supporting habits. That's it. More than that and the brain stops engaging by week two.
      </Callout>
    </Section>

    <Section eyebrow="02 · The grid" title="One row per habit · one box per day">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-4">
        Write your primary commitment in the first row. Write 2–3 supporting habits below it. Each day, mark the box if you did it. Leave it blank if you didn't. <strong>No backfilling, no estimates.</strong> The honest pattern is the useful data.
      </p>
      <Table
        headers={["Habit", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
        rows={[
          ["Primary commitment:", "", "", "", "", "", "", "", "", "", ""],
          ["Supporting habit 1:", "", "", "", "", "", "", "", "", "", ""],
          ["Supporting habit 2:", "", "", "", "", "", "", "", "", "", ""],
          ["Supporting habit 3:", "", "", "", "", "", "", "", "", "", ""],
        ]}
      />
      <div className="mt-6">
        <Table
          headers={["Habit", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20"]}
          rows={[
            ["Primary commitment", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 1", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 2", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 3", "", "", "", "", "", "", "", "", "", ""],
          ]}
        />
      </div>
      <div className="mt-6">
        <Table
          headers={["Habit", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"]}
          rows={[
            ["Primary commitment", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 1", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 2", "", "", "", "", "", "", "", "", "", ""],
            ["Supporting habit 3", "", "", "", "", "", "", "", "", "", ""],
          ]}
        />
      </div>
    </Section>

    <Section eyebrow="03 · Habit ideas, by category" title="What's worth tracking">
      <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
        <div className="border-l-2 border-amber-300 pl-5 py-1">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Foundation</p>
          <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed mb-3">Every-day basics that compound.</p>
          <Checklist items={[
            "Protein + fat breakfast",
            "30g protein per meal",
            "2 litres of water",
            "Sleep 7+ hours",
            "Walk 20+ minutes",
          ]} />
        </div>
        <div className="border-l-2 border-amber-300 pl-5 py-1">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Replacement</p>
          <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed mb-3">Substitutes for old patterns.</p>
          <Checklist items={[
            "Sparkling water at 9pm",
            "Walk after dinner",
            "Tea instead of dessert",
            "Notes dump before food",
            "Call instead of snack",
          ]} />
        </div>
        <div className="border-l-2 border-amber-300 pl-5 py-1">
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Avoidance</p>
          <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed mb-3">Triggers you keep out.</p>
          <Checklist items={[
            "No UPF in house today",
            "No screens after 9pm",
            "No coffee after 2pm",
            "No grazing between meals",
            "No scale weighing",
          ]} />
        </div>
      </div>
    </Section>

    <Section eyebrow="04 · After day 30" title="The review — five honest questions">
      <ol className="space-y-3 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span><strong>Which habit hit 25+ days?</strong> That one is already in your operating system — keep going.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span><strong>Which one fell apart by week two?</strong> Either it wasn't realistic, or the environment doesn't support it. Don't blame yourself — redesign it.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span><strong>What got measurably better?</strong> Energy, skin, sleep, mood, cravings — be specific.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span><strong>What's harder than you thought?</strong> Surface the friction — that's what the next operating system rule addresses.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">5.</span><span><strong>What's your next 30-day primary?</strong> Keep the one that's stuck. Pick a new primary to add.</span></li>
      </ol>
      <Callout variant="amber">
        Three rounds of 30 days each — and most of these become automatic. That's 90 days. Nothing pharmaceutical works that fast. Behavior change at this layer is what makes the reframe permanent.
      </Callout>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: 30-Day Shopping List (reference)
   ═══════════════════════════════════════════════════════════════ */
const ShoppingList30Day = () => (
  <>
    <Section eyebrow="01 · How to use this list" title="Same staples, different meals every week">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        The Module 5 food framework is built on protein, fat, and whole-food volume. Once you stock those three categories well, you stop having to plan every meal — you assemble. The lists below are organized by purchase rhythm: what you buy every week (perishables), every two weeks (semi-perishable), and once a month (pantry staples).
      </p>
      <Callout variant="amber" title="80% is the same, 20% rotates">
        Same anchor foods every week. Different proteins or vegetables on rotation for variety. This is how the framework runs in real life without becoming a meal-planning second job.
      </Callout>
    </Section>

    <Section eyebrow="02 · Weekly buys (every shop)" title="Fresh perishables — never run out of these">
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Protein</p>
          <Checklist items={[
            "Eggs (1 dozen minimum)",
            "Chicken thighs (1–1.5 kg)",
            "Chicken wings, legs, drumsticks (skin-on, bone-in)",
            "Whole chicken (roast on Sunday, eat through the week)",
            "Ground beef — higher-fat, 15–20% (500g–1 kg)",
            "Fattier cuts: brisket, short ribs, lamb shoulder, pork belly",
            "Liver, heart, kidney (organ meat — once a week, huge for iron)",
            "Salmon or white fish (2 portions)",
            "Greek yogurt, full-fat (1 large tub)",
            "Aged cheese (200g block)",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Vegetables</p>
          <Checklist items={[
            "Leafy greens (spinach + 1 other)",
            "Cruciferous (broccoli, cauliflower OR brussels)",
            "Tomatoes or peppers (fresh)",
            "Onions, garlic (always)",
            "Cucumber or courgette",
            "Mushrooms",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Fat & dairy</p>
          <Checklist items={[
            "Avocados (2–3, different ripeness)",
            "Butter (real, salted)",
            "Olives (jar)",
            "Lemons, fresh herbs",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Fruit (small)</p>
          <Checklist items={[
            "Berries (fresh or frozen — primary fruit)",
            "Apples or pears (1–2)",
            "OPTIONAL: kiwi, citrus",
          ]} />
        </div>
      </div>
    </Section>

    <Section eyebrow="03 · Bi-weekly buys" title="Larger packs, deeper variety">
      <Checklist items={[
        "Steak (good cut — ribeye, sirloin, hanger)",
        "Lamb chops, lamb shoulder (alternate weeks)",
        "Pork shoulder or pork belly",
        "Bone broth (or bones to make your own)",
        "Cured / smoked fish (sardines, mackerel tins)",
        "Hard cheese (parmesan, manchego, aged gouda)",
        "Fermented (sauerkraut, kimchi)",
      ]} />
    </Section>

    <Section eyebrow="04 · Monthly pantry restock" title="Stock once, use for weeks">
      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Cooking fats</p>
          <Checklist items={[
            "Extra virgin olive oil (large bottle)",
            "Ghee or coconut oil",
            "Beef tallow (if you cook a lot)",
            "Sesame oil (small bottle, finishing)",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Nuts & seeds</p>
          <Checklist items={[
            "Almonds, walnuts, brazil nuts (raw, unsalted)",
            "Pumpkin seeds, sunflower seeds",
            "Tahini (one jar)",
            "Nut butter (no sugar — almond or peanut)",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Tinned & jarred</p>
          <Checklist items={[
            "Sardines, mackerel, tuna in olive oil",
            "Whole tomatoes (no sugar added)",
            "Tomato passata",
            "Olives (Kalamata, green)",
            "Mustard (Dijon, whole-grain)",
          ]} />
        </div>
        <div>
          <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Dry goods</p>
          <Checklist items={[
            "Lentils, chickpeas, white beans",
            "Quinoa or buckwheat (if you tolerate)",
            "Vinegars (apple cider, balsamic, red wine)",
            "Spices (sea salt, pepper, paprika, cumin, oregano)",
            "Dark chocolate 90%+ (if it's a safe slow-pleasure for you)",
          ]} />
        </div>
      </div>
    </Section>

    <Section eyebrow="05 · 4-week meal scaffold" title="Same proteins, different meals">
      <p className="text-gray-700 text-[14.5px] sm:text-[15px] leading-[1.65] mb-4">
        Every week you have: eggs, chicken thighs, fish, beef on rotation. Vegetables shift slightly. Result: the same shop, four different weeks.
      </p>
      <Table
        headers={["Week", "Breakfast", "Lunch", "Dinner"]}
        rows={[
          ["Week 1", "Eggs + avocado + spinach", "Chicken thighs + roasted broccoli", "Salmon + cauliflower mash + olive oil"],
          ["Week 2", "Greek yogurt + berries + walnuts", "Tuna salad with cucumber, eggs, olives", "Beef stir-fry with mushrooms and peppers"],
          ["Week 3", "Smoked salmon + cream cheese + tomato", "Lentil soup with poached egg and olive oil", "Chicken thighs with sweet potato and sauerkraut"],
          ["Week 4", "Eggs scrambled in butter + cheese", "Cold roast chicken + leafy greens + tahini", "Lamb chops + roasted vegetables + Greek yogurt sauce"],
        ]}
      />
    </Section>

    <Section eyebrow="06 · Shopping rules" title="Stay protected at the supermarket">
      <Checklist items={[
        "Always go with this list. No browsing.",
        "Stick to the perimeter — produce, meat, fish, dairy. Center aisles are mostly ultra-processed.",
        "Same route through the store every time.",
        "Skip checkout candy — exit through a different lane if needed.",
        "Never shop hungry. Eat first or carry a snack.",
        "Read labels on anything packaged — see the Hidden Names of Sugar reference.",
      ]} />
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: The Truth About Fructose (guide)
   ═══════════════════════════════════════════════════════════════ */
const TruthAboutFructose = () => (
  <>
    <Section eyebrow="01 · The mechanism" title="Fructose has one address in your body: the liver">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        Glucose, the other half of sugar, is processed by every cell in your body. Fructose is different. It is metabolized almost exclusively by the liver — and the pathway it takes through that liver looks remarkably similar to how the liver processes ethanol. That comparison isn't a marketing claim; it's biochemistry.
      </p>
      <Callout variant="amber" title="The shorthand">
        Glucose: every cell helps clear it. Fructose: the liver does it alone. Repeat this for years, and the liver shows the same kind of damage chronic alcohol use produces — non-alcoholic fatty liver disease, insulin resistance, the metabolic syndrome cascade.
      </Callout>
    </Section>

    <Section eyebrow="02 · What happens in the liver" title="The cascade that nobody told you about">
      <ol className="space-y-3.5 text-[14.5px] sm:text-base text-gray-700 leading-relaxed">
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">1.</span><span>Fructose arrives at the liver. The liver can't store much of it.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">2.</span><span>What it can't store, it converts to fat — through a process called <em>de novo lipogenesis</em>.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">3.</span><span>That fat accumulates in and around the liver. NAFLD (non-alcoholic fatty liver disease) is now the most common liver condition in adults, including children.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">4.</span><span>The fatty liver becomes insulin-resistant. Whole-body insulin resistance follows. Then the cascade we covered in Module 4.</span></li>
        <li className="flex gap-3"><span className="text-amber-700 font-black tabular-nums">5.</span><span>Inflammation, oxidative stress, and uric acid go up — increasing risk for gout, kidney issues, cardiovascular disease.</span></li>
      </ol>
    </Section>

    <Section eyebrow="03 · Where the worst fructose hides" title="The forms that hit hardest">
      <div className="space-y-4">
        {[
          { name: "High-fructose corn syrup (HFCS)", note: "In nearly every American ultra-processed product. 55% fructose, 45% glucose — fast, concentrated dose." },
          { name: "Agave nectar", note: "Marketed as 'natural and low-glycemic.' It is — because it's ~90% fructose. Liver damage is the trade." },
          { name: "Fruit juice concentrate", note: "Pretends to be 'fruit' on the label. Functionally identical to syrup once it's concentrated." },
          { name: "Fruit juice (even '100% pure')", note: "Strips the fiber that slows fructose absorption. The body gets the load without the brakes." },
          { name: "Dried fruit", note: "Concentrated sugar with most of the water removed. A handful of raisins has more fructose than three fresh grapes." },
          { name: "Smoothies", note: "Especially shop-bought. Blending breaks the fiber matrix. Half the fructose is absorbed like juice." },
        ].map((x, i) => (
          <div key={i} className="border-l-2 border-amber-300 pl-5 py-1 print:break-inside-avoid">
            <p className="font-bold text-gray-900 text-[15px] sm:text-base mb-0.5">{x.name}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-600 leading-relaxed">{x.note}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="04 · The modern fruit reframe" title="The fruit you eat today is not the fruit your biology was built for">
      <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p>
          For most of human history, fruit was small, sour, fibrous, and seasonal. A wild apple was the size of a cherry and tart. Wild bananas were stubby and full of hard seeds. Wild blackberries were the size of peas. Fruit was a brief, regional luxury — eaten when ripe, then unavailable for the rest of the year.
        </p>
        <p>
          Modern fruit is the product of <strong>centuries of selective breeding for one trait: sweetness</strong>. Today's apple has 3–4 times the sugar of its ancestor. A modern banana is bred to be roughly 16g of sugar at full ripeness. Grapes are essentially edible candy.
        </p>
        <Callout variant="warning" title="The 'vitamin bomb' marketing">
          The defense of fruit is usually "but it has vitamins!" A banana does contain vitamin B6 and potassium. It also contains 16g of sugar. The vitamin-to-sugar ratio is poor. You can get the same vitamins from leafy greens, fish, eggs, and nuts — with no metabolic cost. Calling fruit a vitamin bomb is marketing, not nutrition science.
        </Callout>
      </div>
    </Section>

    <Section eyebrow="05 · What's still safe — berries" title="Why berries get a different recommendation">
      <p className="text-gray-700 text-[15px] sm:text-base leading-[1.65] mb-4">
        Not all fruit is equal. Berries (blueberries, raspberries, blackberries, strawberries) are the closest thing in the produce aisle to ancestral fruit — and they're genuinely worth eating, daily if you want.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { name: "Lower fructose per gram", note: "Blueberries are about 5g sugar per 100g. An apple is 11g. A banana is 12g." },
          { name: "Higher fiber", note: "Fiber slows fructose absorption — the liver gets it gradually instead of in a flood." },
          { name: "Highest antioxidant density", note: "Anthocyanins (the pigment) genuinely fight inflammation. Not all 'antioxidants' are equal — these ones are." },
          { name: "Polyphenols with real evidence", note: "Cardiovascular, cognitive, and metabolic benefits documented across studies." },
        ].map((x, i) => (
          <div key={i} className="bg-amber-50/40 border border-amber-100 rounded-2xl p-4 sm:p-5 print:break-inside-avoid">
            <p className="font-bold text-amber-900 text-[14.5px] sm:text-base mb-1">{x.name}</p>
            <p className="text-[13.5px] sm:text-sm text-gray-700 leading-relaxed">{x.note}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section eyebrow="06 · Practical guidance" title="If you do eat fruit — how to do it well">
      <Checklist items={[
        "Berries first. Frozen is as good as fresh.",
        "Whole > juiced > dried, always. Skip juice entirely.",
        "Pair with protein or fat — slows the absorption curve (Greek yogurt + berries, apple + peanut butter).",
        "Earlier in the day, when insulin sensitivity is higher.",
        "After exercise, when muscles soak up glucose preferentially.",
        "Avoid as a standalone snack between meals — it spikes insulin alone.",
        "Skip smoothies (or accept them as dessert, not a meal).",
      ]} />
    </Section>

    <Section eyebrow="07 · The honest 80/20" title="Where fruit fits in this framework">
      <div className="space-y-3 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
        <p><span className="font-bold text-gray-900">✓ Berries every day:</span> fine. Genuinely beneficial. Treat them as a regular part of your meals.</p>
        <p><span className="font-bold text-gray-900">✓ Other whole fruit, occasional:</span> a piece every few days. Paired with protein/fat. Earlier in the day.</p>
        <p><span className="font-bold text-gray-900">✗ Fruit juice:</span> treat it like soda. It's sugar water with a halo.</p>
        <p><span className="font-bold text-gray-900">✗ Dried fruit:</span> concentrated sugar. A small handful is the upper limit, occasionally.</p>
        <p><span className="font-bold text-gray-900">✗ Daily smoothies:</span> usually a hidden sugar bomb. Most "healthy smoothies" contain 40–60g of sugar.</p>
        <Callout variant="warning" title="On 'natural'">
          'Natural' on a food label means nothing. Tobacco is natural. Arsenic is natural. The question isn't whether fructose exists in nature — it's whether your liver evolved to process the amount and form you're putting in it. For most people, the answer is no.
        </Callout>
      </div>
    </Section>
  </>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE: Cycle Nutrition — Phase by Phase (women)
   ═══════════════════════════════════════════════════════════════ */
const CycleNutrition = () => {
  const Phase = ({
    emoji,
    title,
    days,
    physiology,
    nutrients,
    foods,
    activity,
  }: {
    emoji: string;
    title: string;
    days: string;
    physiology: string;
    nutrients: { name: string; why: string }[];
    foods: string[];
    activity: string;
  }) => (
    <div className="rounded-3xl border border-amber-100 bg-amber-50/30 p-6 sm:p-8 print:break-inside-avoid">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-2xl sm:text-3xl">{emoji}</span>
        <h3 className="text-lg sm:text-2xl font-black text-gray-900 tracking-tight">{title}</h3>
        <span className="ml-auto text-[10px] sm:text-[11px] font-black text-amber-700 uppercase tracking-[0.2em]">{days}</span>
      </div>
      <p className="text-[13.5px] sm:text-sm text-gray-600 italic leading-relaxed mb-5">
        {physiology}
      </p>

      <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Key nutrients</p>
      <ul className="space-y-1.5 mb-5">
        {nutrients.map((n, i) => (
          <li key={i} className="flex gap-2 text-[14px] sm:text-[15px] text-gray-800">
            <span className="text-amber-600 font-black flex-shrink-0">·</span>
            <span><span className="font-bold text-gray-900">{n.name}</span> — {n.why}</span>
          </li>
        ))}
      </ul>

      <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-2">Foods</p>
      <NameGrid names={foods} />

      <p className="text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mt-5 mb-2">Movement</p>
      <p className="text-[14px] sm:text-[15px] text-gray-700 leading-relaxed">{activity}</p>
    </div>
  );

  return (
    <>
      <Section eyebrow="01 · The reframe" title="Eat with your cycle, not against it">
        <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
          <p>
            The female body runs on a roughly 28-day rhythm, not a 24-hour one. Hormone levels shift across four distinct phases — and so do your energy, sleep, mood, cravings, and what your body actually needs from food. Generic "eat clean every day" advice misses this completely.
          </p>
          <p>
            This guide is a phase-by-phase nutritional map: what to prioritize in each window, why, the foods that deliver it, and the kind of movement that fits the hormonal landscape. Use it alongside the Cycle Tracker resource to find your personal pattern.
          </p>
          <Callout variant="amber" title="A note before you start">
            Cycle lengths vary. The day ranges below are a 28-day template — yours may run shorter or longer. Track your actual cycle for one or two months and adjust the day windows accordingly.
          </Callout>
        </div>
      </Section>

      <Section eyebrow="02" title="The four phases, in order">
        <div className="space-y-5 sm:space-y-6">
          <Phase
            emoji="🩸"
            title="Menstrual Phase"
            days="Days 1–5"
            physiology="Estrogen and progesterone drop. Energy is low, iron is being lost, cramps and irritability are common. Your body is resetting — match it, don't override it."
            nutrients={[
              { name: "Iron", why: "compensates for blood loss" },
              { name: "Magnesium", why: "eases cramps and irritability" },
              { name: "Omega-3", why: "anti-inflammatory" },
              { name: "Vitamin C", why: "boosts iron absorption when paired with iron-rich meals" },
            ]}
            foods={[
              "Beef liver, red meat, oysters",
              "Pumpkin seeds, lentils, chickpeas",
              "Bell peppers, kiwi, black currants, broccoli, citrus",
              "Cocoa powder, almonds, cashews, spinach, avocado",
              "Salmon, sardines, mackerel",
              "Ground flax, chia seeds, flaxseed oil",
              "Dark chocolate (90%+)",
            ]}
            activity="Light to moderate. Walks, stretching, yoga, gentle mobility. This isn't the week for max-effort training — recovery is the priority, and your body knows what it's asking for."
          />

          <Phase
            emoji="🌱"
            title="Follicular Phase"
            days="Days 6–13"
            physiology="Estrogen rises steadily. Energy returns, focus sharpens, the body adapts to training stress best. This is your high-output window."
            nutrients={[
              { name: "B vitamins", why: "energy production and nervous system support" },
              { name: "Zinc", why: "skin health and ovulation prep" },
              { name: "Antioxidants (A, C, E)", why: "cell renewal" },
              { name: "Protein", why: "tissue repair and growth" },
            ]}
            foods={[
              "Eggs, chicken breast, salmon",
              "Spinach, almonds, chickpeas, lentils",
              "Avocado, carrots, pumpkin, sunflower seeds",
              "Blueberries, broccoli",
              "Beef, cashews, quinoa",
              "Cottage cheese, potatoes (B6), bananas (B6 + antioxidants)",
            ]}
            activity="Best window for strength training, cardio, and learning new movement skills. The body adapts most efficiently here — push during this week, plan around it."
          />

          <Phase
            emoji="💥"
            title="Ovulation"
            days="Days 14–15"
            physiology="Estrogen peaks, LH surges. Highest energy, libido, social ease, and verbal fluency of the cycle. Brief but powerful — use it."
            nutrients={[
              { name: "Zinc and magnesium", why: "support ovulation and hormonal balance" },
              { name: "Antioxidants", why: "cell protection and inflammation control during the LH surge" },
              { name: "Electrolytes + water", why: "hydration becomes especially important" },
            ]}
            foods={[
              "Pumpkin seeds, spinach, kale",
              "Bananas, blueberries, raspberries",
              "Turmeric with black pepper",
              "Green tea, matcha",
              "Cucumbers, watermelon, celery",
              "Coconut water, mineral water",
              "Bone broth, slow-cooked soups",
            ]}
            activity="Peak intensity window. HIIT, heavy lifting, running, dancing, competition — pour the energy in. This is the day you schedule the hard workout, the difficult conversation, the demanding deadline."
          />

          <Phase
            emoji="🌕"
            title="Luteal Phase"
            days="Days 16–28"
            physiology="Progesterone rises, then drops sharply. Energy fades, appetite climbs, PMS symptoms start. This is the window where the cravings the rest of the course teaches you to manage come on hardest."
            nutrients={[
              { name: "Magnesium + Vitamin B6", why: "reduces PMS severity, mood swings, breast tenderness" },
              { name: "Calcium", why: "lowers irritability" },
              { name: "Slow carbs (low GI)", why: "stabilize blood sugar — fight insulin sensitivity drop" },
              { name: "Tryptophan", why: "precursor to serotonin, supports mood" },
            ]}
            foods={[
              "Turkey, chicken, salmon",
              "Buckwheat, oatmeal, quinoa, sweet potatoes",
              "Lentils, beans",
              "Bananas, dark chocolate (90%+), spinach",
              "Potatoes with skin",
              "Kefir, cottage cheese, live yogurt",
              "Sardines with bones, sesame, tahini, poppy seeds",
              "Leafy cabbage, sauerkraut, kimchi",
            ]}
            activity="Moderate, listening-led. Pilates, stretching, walking, light strength. If you're exhausted, rest is the protocol — not the failure. Schedule lighter weeks here, on purpose."
          />
        </div>
      </Section>

      <Section eyebrow="03 · Putting it together" title="One full cycle of phase-aware eating">
        <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-[1.65]">
          <p>
            Don't try to overhaul everything at once. Start with the easy ones:
          </p>
          <ul className="space-y-2.5 ml-1">
            {[
              "Add iron-rich foods in the menstrual phase (just lentils + red meat + leafy greens, once a day).",
              "Add an extra protein-forward meal during follicular when energy is high.",
              "Add hydration + electrolytes around ovulation.",
              "Add magnesium + slow carbs every evening in luteal — fight the craving curve.",
            ].map((s, i) => (
              <li key={i} className="flex gap-3 text-[14.5px] sm:text-[15px]">
                <span className="text-amber-600 font-black flex-shrink-0">·</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <Callout variant="amber" title="Combine with the Cycle Tracker">
            Track one full cycle while running this guide. By month two, the patterns become unmistakable — and you'll know exactly which days need extra protection and which days can take a big training load.
          </Callout>
        </div>
      </Section>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RESOURCE DETAIL — looks up the right content component
   ═══════════════════════════════════════════════════════════════ */
export const ResourceDetail = ({
  slug,
  onBack,
  backLabel = "Back to Resource Library",
}: {
  slug: string;
  onBack: () => void;
  backLabel?: string;
}) => {
  const resource = RESOURCES.find((r) => r.slug === slug);
  if (!resource) return null;

  const contentMap: Record<string, ReactNode> = {
    "if-then-protocols": <IfThenProtocols />,
    "hidden-names-of-sugar": <HiddenNamesOfSugar />,
    "yfas-self-check": <YFASSelfCheck />,
    "craving-log-24h": <CravingLog24h />,
    "kitchen-audit-checklist": <KitchenAuditChecklist />,
    "pantry-restock-list": <PantryRestockList />,
    "personal-operating-system": <PersonalOSSheet />,
    "craving-protocol-template": <CravingProtocolTemplate />,
    "the-watch-list": <TheWatchList />,
    "cycle-tracker": <CycleTracker />,
    "pms-decoded": <PMSDecoded />,
    "pcos-sugar-connection": <PCOSSugarConnection />,
    "skin-food-timeline": <SkinFoodTimeline />,
    "iron-for-women": <IronForWomen />,
    "diet-history": <ForWomenWithDietHistory />,
    "female-lab-panel": <FemaleLabPanel />,
    "habit-tracker": <HabitTracker />,
    "shopping-list-30-day": <ShoppingList30Day />,
    "truth-about-fructose": <TruthAboutFructose />,
    "cycle-nutrition": <CycleNutrition />,
  };

  const body = contentMap[resource.slug] ?? (
    <div className="py-16 text-center">
      <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full text-amber-800 text-sm font-bold mb-5">
        <Sparkles className="w-4 h-4" />
        Coming soon
      </div>
      <p className="text-gray-600 max-w-md mx-auto text-[15px] leading-relaxed">
        This resource is being prepared.
      </p>
    </div>
  );

  return (
    <ResourceShell resource={resource} onBack={onBack} backLabel={backLabel}>
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
  // The Watch List has its own tab now, so don't double-list it in the grid
  const RESOURCES_IN_GRID = RESOURCES.filter((r) => r.slug !== "the-watch-list");
  const readyCount = RESOURCES_IN_GRID.filter((r) => r.status === "ready").length;
  const [tab, setTab] = useState<"resources" | "watch-list">("resources");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | "all" | "women">("all");

  const q = query.trim().toLowerCase();
  const filtered = RESOURCES_IN_GRID.filter((r) => {
    // Category filter
    if (activeCategory === "women") {
      if (!r.women) return false;
    } else if (activeCategory !== "all") {
      if (r.category !== activeCategory) return false;
    }
    // Text search
    if (q) {
      const hay = `${r.title} ${r.description} ${r.eyebrow} ${r.module}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  // When showing "all", group women resources into a single folder tile
  // so the library isn't dominated by 8 women cards. The folder still
  // shows up — just collapsed by default. When the user has typed a
  // search or picked a specific category, show every match individually.
  const useWomenFolder = activeCategory === "all" && !q;
  const womenInLibrary = useWomenFolder
    ? filtered.filter((r) => r.women)
    : [];
  const visibleResources = useWomenFolder
    ? filtered.filter((r) => !r.women)
    : filtered;

  const categories: { key: typeof activeCategory; label: string }[] = [
    { key: "all", label: "All" },
    { key: "reference", label: "Reference" },
    { key: "template", label: "Templates" },
    { key: "guide", label: "Guides" },
    { key: "protocol", label: "Protocols" },
    { key: "women", label: "Women" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <header className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-300/40">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div>
            <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.3em]">
              The Unhooked Method
            </p>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">
              {readyCount} resources · download as PDF or print
            </p>
          </div>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-3">
          {tab === "resources" ? "Resource Library" : "Watch List"}
        </h1>
        <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed max-w-2xl">
          {tab === "resources"
            ? "Cheat sheets, templates, protocols and women-specific guides — built to live alongside the course videos. Every resource is readable here and downloadable as a PDF."
            : "Hand-picked videos Kristina recommends watching alongside the course — embedded here so they're all in one place. The list grows as new ones land."}
        </p>
      </header>

      {/* Top-level tabs: Resources | Watch List */}
      <div className="mb-6 sm:mb-8 flex items-center gap-2 border-b border-gray-200">
        {([
          { key: "resources" as const, label: "Resources", icon: BookOpen },
          { key: "watch-list" as const, label: "Watch List", icon: PlayCircle },
        ]).map(({ key, label, icon: TabIcon }) => {
          const isActive = tab === key;
          return (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-3 text-[13px] sm:text-sm font-bold transition-colors ${
                isActive
                  ? "text-amber-700"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              <TabIcon className="w-4 h-4" />
              {label}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-amber-600" />
              )}
            </button>
          );
        })}
      </div>

      {tab === "watch-list" ? (
        <LibraryWatchList />
      ) : (
        <>
      {/* Search + category chips */}
      <div className="mb-6 sm:mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources by title, topic or module…"
            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-2xl text-sm sm:text-[15px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const isActive = activeCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-bold rounded-full border transition-all ${
                  isActive
                    ? "bg-amber-600 text-white border-amber-600 shadow-sm shadow-amber-300/50"
                    : "bg-white text-gray-600 border-gray-200 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {(query || activeCategory !== "all") && (
          <p className="text-[12px] sm:text-xs text-gray-500 font-semibold">
            {filtered.length === 0
              ? "No resources match — try a different search or category."
              : `${filtered.length} resource${filtered.length === 1 ? "" : "s"} match.`}
          </p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
        {visibleResources.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.button
              key={r.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.03 }}
              onClick={() => onOpen(r.slug)}
              className="text-left bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-amber-300 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100">
                  <Icon className="w-5 h-5 text-amber-700" />
                </div>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                  <span className="text-[9.5px] sm:text-[10px] font-black text-amber-700 uppercase tracking-[0.22em]">
                    {r.eyebrow}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-gray-400 font-semibold">
                    {r.module}
                  </span>
                </div>
                {r.women && (
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
                <span className="font-semibold flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3 h-3" />
                  {r.readTime}
                </span>
                <span className="flex items-center gap-1 text-amber-700 font-bold group-hover:gap-2 transition-all">
                  Open
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          );
        })}
        {womenInLibrary.length > 0 && (
          <WomenFolderCard resources={womenInLibrary} onOpen={onOpen} />
        )}
      </div>

      <div className="mt-12 sm:mt-16 p-5 sm:p-6 bg-amber-50/50 border border-amber-100 rounded-2xl text-center">
        <p className="text-[13px] sm:text-sm text-amber-900 leading-relaxed">
          <strong>Want a resource that's not here?</strong> Write us on WhatsApp and tell us what would help.
        </p>
      </div>
        </>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   LIBRARY WATCH LIST — same embedded videos as TheWatchList,
   rendered directly inside the library (no detail-page hop).
   ═══════════════════════════════════════════════════════════════ */
const LibraryWatchList = () => (
  <div className="space-y-8 sm:space-y-10">
    <Callout variant="amber" title="How to use this">
      One video at a time. Watch it once, sit with it, do nothing else for an hour. Don't binge the list — that turns information into noise. The point is shift, not consumption. New videos are added as Kristina comes across them — bookmark this page.
    </Callout>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
      {WATCH_LIST_VIDEOS.map((v) => (
        <div key={v.id}>
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] sm:text-xs font-black text-amber-700 uppercase tracking-[0.22em] tabular-nums">
              Video {String(v.n).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-amber-100" />
          </div>
          <div className="aspect-video rounded-2xl overflow-hidden bg-gray-900 shadow-md">
            <iframe
              src={`https://www.youtube.com/embed/${v.id}?modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&color=white`}
              title={`Watch List · Video ${v.n}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      ))}
    </div>
    <Callout variant="gray">
      Information without application doesn't move anything. After each video, ask one question: <em>what's the one thing from this that I could try this week?</em> If nothing — that video wasn't for you. Skip to the next one.
    </Callout>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   RESOURCE CARD — shared layout for related-resources + library grids
   ═══════════════════════════════════════════════════════════════ */
const ResourceCardLink = ({
  resource,
  onOpen,
}: {
  resource: ResourceDef;
  onOpen: (slug: string) => void;
}) => {
  const Icon = resource.icon;
  return (
    <button
      onClick={() => onOpen(resource.slug)}
      className="flex items-start gap-3 sm:gap-4 text-left p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl hover:border-amber-300 hover:shadow-md transition-all group"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-100">
        <Icon className="w-5 h-5 text-amber-700" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[9.5px] sm:text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-1">
          {resource.eyebrow}
        </p>
        <p className="font-bold text-gray-900 text-[14px] sm:text-[15px] leading-snug mb-1.5">
          {resource.title}
        </p>
        <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2">
          {resource.description}
        </p>
        <div className="mt-2 flex items-center gap-1 text-amber-700 font-bold text-[12px] sm:text-xs group-hover:gap-2 transition-all">
          Open
          <ChevronRight className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
};

/* ═══════════════════════════════════════════════════════════════
   WOMEN FOLDER CARD — expandable, holds all women resources
   When collapsed: looks like one folder tile. When expanded:
   reveals its contents inline as a sub-grid. Spans the full row.
   ═══════════════════════════════════════════════════════════════ */
const WomenFolderCard = ({
  resources,
  onOpen,
}: {
  resources: ResourceDef[];
  onOpen: (slug: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  if (resources.length === 0) return null;

  return (
    <div className="sm:col-span-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start gap-3 sm:gap-4 text-left p-4 sm:p-5 bg-gradient-to-br from-amber-50/70 to-white border border-amber-200 rounded-2xl hover:border-amber-400 hover:shadow-md transition-all group"
        aria-expanded={open}
      >
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-amber-500 to-amber-700 shadow-sm shadow-amber-300/40">
          <Folder className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[9.5px] sm:text-[10px] font-black text-amber-700 uppercase tracking-[0.22em] mb-1">
            Women · Folder
          </p>
          <p className="font-bold text-gray-900 text-[14px] sm:text-[15px] leading-snug mb-1.5">
            Women — Hormonal Health &amp; Cycle
          </p>
          <p className="text-[12px] sm:text-[13px] text-gray-500 leading-relaxed">
            {resources.length} guides on cycle, PMS, PCOS, skin, iron, labs &amp; nutrition by phase — grouped together so they don't clutter the list.
          </p>
          <div className="mt-2 flex items-center gap-1 text-amber-700 font-bold text-[12px] sm:text-xs">
            {open ? "Hide" : `Open folder · ${resources.length} inside`}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
          </div>
        </div>
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-3 sm:mt-4 ml-2 sm:ml-6 pl-3 sm:pl-5 border-l-2 border-amber-200"
        >
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
            {resources.map((r) => (
              <ResourceCardLink key={r.slug} resource={r} onOpen={onOpen} />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════
   RELATED RESOURCES — for use inside LessonView
   Women resources are auto-grouped into a single folder card
   so the related-resources area stays compact.
   ═══════════════════════════════════════════════════════════════ */
export const RelatedResources = ({
  lessonId,
  onOpen,
}: {
  lessonId: string;
  onOpen: (slug: string) => void;
}) => {
  const related = RESOURCES.filter(
    (r) => r.status === "ready" && r.relatedLessons.includes(lessonId)
  );
  if (related.length === 0) return null;

  const womenRelated = related.filter((r) => r.women);
  const otherRelated = related.filter((r) => !r.women);

  return (
    <section className="mt-8 sm:mt-10 mb-6 sm:mb-8">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className="h-px flex-1 bg-amber-100" />
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.22em]">
            Related Resources
          </span>
        </div>
        <div className="h-px flex-1 bg-amber-100" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {otherRelated.map((r) => (
          <ResourceCardLink key={r.slug} resource={r} onOpen={onOpen} />
        ))}
        {womenRelated.length > 0 && (
          <WomenFolderCard resources={womenRelated} onOpen={onOpen} />
        )}
      </div>
    </section>
  );
};

