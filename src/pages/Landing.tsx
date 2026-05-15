import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Menu,
  X,
  Flame,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Brain,
  Clock,
  Activity,
  Building2,
  Apple,
  Home,
  Zap,
  Target,
  Flag,
  Camera,
  Receipt,
  Heart,
  Video,
  ShieldCheck,
  Lock,
  PenLine,
  Eye,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

/* ───────── CONSTANTS ───────── */
const CHECKOUT_URL = "https://www.paypal.com/ncp/payment/DQDESNZ9DVQ7G";
const PRICE = "$8";
const CONTACT_EMAIL = "krudstina@gmail.com";
const VSL_URL = ""; // TODO: paste the VSL YouTube link

/* ───────── YOUTUBE HELPER ───────── */
const toYouTubeEmbed = (url: string): string => {
  if (!url) return "";
  if (url.includes("/embed/")) return url;
  const shortMatch = url.match(/youtu\.be\/([\w-]+)/);
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch[1]}`;
  const watchMatch = url.match(/[?&]v=([\w-]+)/);
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch[1]}`;
  const shortsMatch = url.match(/\/shorts\/([\w-]+)/);
  if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
  return url;
};

/* ───────────────────────── NAVBAR ───────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-md shadow-amber-200/50">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-[15px] tracking-tight text-gray-900">
              The Unhooked Method
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#mechanism" className="text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors">How it works</a>
            <a href="#journey" className="text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors">The Journey</a>
            <a href="#curriculum" className="text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors">Curriculum</a>
            <a href="#about" className="text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors">About</a>
            <a href="#credentials" className="text-sm font-semibold text-gray-600 hover:text-amber-700 transition-colors">Credentials</a>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-br from-amber-600 to-amber-700 rounded-full hover:from-amber-700 hover:to-amber-800 transition-all shadow-md shadow-amber-200/50"
            >
              Get instant access — {PRICE}
            </a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900 p-2 -mr-2" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-5 overflow-hidden space-y-3"
          >
            <a href="#mechanism" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 py-1">How it works</a>
            <a href="#journey" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 py-1">The Journey</a>
            <a href="#curriculum" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 py-1">Curriculum</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 py-1">About</a>
            <a href="#credentials" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900 py-1">Credentials</a>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-base font-bold text-white bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl mt-2"
            >
              Get instant access — {PRICE}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ───────────────────────── HERO + VSL ───────────────────────── */
const Hero = () => (
  <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-gray-950 relative overflow-hidden">
    {/* Background accents — warm gold glow */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(245,158,11,0.10),transparent)]" />
    <div className="absolute top-32 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px]" />
    <div className="absolute top-52 right-1/4 w-80 h-80 bg-amber-700/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-700/40 to-transparent" />

    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">

        {/* Headline — descriptive, concrete */}
        <h1 className="text-[2rem] leading-[1.08] sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-5 sm:mb-7 mt-4 sm:mt-2">
          End sugar and food addiction <br className="hidden sm:block" />{" "}
          <span className="italic text-amber-400 font-black">
            without willpower or restriction.
          </span>
        </h1>

        {/* Subheadline — guided journey + personal review + WhatsApp */}
        <p className="text-gray-400 text-[15px] sm:text-lg leading-relaxed mb-8 sm:mb-12 max-w-3xl mx-auto">
          A <span className="text-white font-semibold">guided 9-module journey</span> out of sugar and food addiction, built on neuroscience and ten years of clinical work.
          Every module ends with a task designed to move you toward the solution —{" "}
          <span className="text-white font-semibold">two of them are personally reviewed by Kristina</span>.
          Direct WhatsApp access throughout the course. <span className="text-white font-semibold">{PRICE} · yours forever.</span>
        </p>

        {/* VSL Video Player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mb-7 sm:mb-10"
        >
          {/* Frame glow — warm gold */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-br from-amber-500/25 via-amber-600/15 to-amber-500/25 rounded-2xl sm:rounded-3xl blur-2xl" />

          <div className="relative aspect-video bg-gray-900 rounded-xl sm:rounded-3xl overflow-hidden shadow-2xl shadow-amber-500/10 border border-gray-800">
            {VSL_URL ? (
              <iframe
                src={toYouTubeEmbed(VSL_URL)}
                title="The Unhooked Method — Watch Why This Works"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full flex items-center justify-center mb-4 sm:mb-5 shadow-2xl shadow-amber-500/30">
                  <Video className="w-7 h-7 sm:w-11 sm:h-11 text-white ml-1" />
                </div>
                <span className="text-white text-sm sm:text-lg font-bold mb-1.5 sm:mb-2">Watch the 4-minute walkthrough</span>
                <span className="text-gray-400 text-[11px] sm:text-sm max-w-md leading-relaxed px-2">
                  Kristina explains what the workshop covers, who it's for, and why it works.
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* CTA below VSL */}
        <div className="flex flex-col items-center">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 sm:gap-2.5 px-8 sm:px-12 py-4 sm:py-5 text-[15px] sm:text-lg font-bold text-white bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 rounded-full shadow-2xl shadow-amber-500/25 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center max-w-sm"
          >
            Get instant access — {PRICE}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-[10px] sm:text-xs text-gray-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Secure checkout
            </div>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              30-day refund
            </div>
            <span className="text-gray-700">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Instant access
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─────────── THE 3-LAYER MECHANISM ─────────── */
const Mechanism = () => {
  const layers = [
    {
      num: "01",
      label: "Dopamine",
      icon: Brain,
      headline: "Your brain learns to want it.",
      body: "Sugar triggers a dopamine release far larger than natural rewards. Receptors downregulate — you need more for the same effect, and everything slower feels flat.",
    },
    {
      num: "02",
      label: "Conditioning",
      icon: Clock,
      headline: "Context fires the craving — before any hunger.",
      body: "Like Pavlov's dogs. 3pm. The drive home. A specific emotional state. Your brain learned to associate them with sugar — and now the bell rings on schedule.",
    },
    {
      num: "03",
      label: "Amplifiers",
      icon: Activity,
      headline: "Your body sends false hunger signals.",
      body: "Vagus nerve sensors detect hidden sugar and demand more. Insulin overshoots after refined carbs, glucose drops below baseline, your brain reads it as an emergency.",
    },
  ];

  return (
    <section id="mechanism" className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-600" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-[0.3em]">
              The mechanism
            </span>
            <div className="h-px w-8 bg-amber-600" />
          </div>
          <h2 className="text-[1.7rem] sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5">
            Sugar addiction isn't one problem.<br />
            <span className="text-amber-700">It's three — firing at once.</span>
          </h2>
          <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed px-2 sm:px-0">
            Most programs address one layer — the food, or the mindset, or the behavior. That's why they stop working. This workshop addresses all three, in sequence.
          </p>
        </div>

        {/* Layer cards */}
        <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
          {layers.map((layer, i) => {
            const Icon = layer.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all"
              >
                {/* Number */}
                <div className="absolute -top-3 sm:-top-4 left-6 sm:left-8 text-6xl sm:text-8xl font-black text-amber-100 leading-none tabular-nums select-none">
                  {layer.num}
                </div>

                <div className="relative">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 shadow-sm border border-amber-100">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
                  </div>
                  <div className="text-[10px] font-black text-amber-700 uppercase tracking-[0.25em] mb-2 sm:mb-3">
                    {layer.label}
                  </div>
                  <h3 className="text-base sm:text-xl font-black text-gray-900 leading-snug tracking-tight mb-2 sm:mb-3">
                    {layer.headline}
                  </h3>
                  <p className="text-gray-600 text-[13.5px] sm:text-[15px] leading-relaxed">
                    {layer.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-2 sm:px-0"
        >
          <p className="text-[15px] sm:text-lg text-gray-700 leading-relaxed">
            <span className="text-gray-900 font-semibold">You weren't fighting yourself.</span> You were fighting three biological systems at once,
            in an environment engineered to keep all three active. Now you'll see exactly how — and exactly what to do about it.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────── THE JOURNEY — guided + personally reviewed + WhatsApp ─────────── */
const Journey = () => {
  const features = [
    {
      num: "01",
      icon: PenLine,
      title: "Guided, module by module",
      body: "Every module ends with a specific task — built to take what you just learned and turn it into a real shift in how you eat, think, and live. Not busywork. Each task is designed to move you measurably closer to the solution.",
    },
    {
      num: "02",
      icon: Eye,
      title: "Two tasks personally reviewed by Kristina",
      body: "At two key moments — your kitchen audit and your grocery receipt — you'll send Kristina photos directly. She reads every one personally and writes back with two or three specific things she notices in your real environment. No team, no chatbot, no template reply.",
    },
    {
      num: "03",
      icon: MessageCircle,
      title: "Direct WhatsApp access — throughout",
      body: "Have a realization mid-module? Stuck on a homework task? Just need someone to read what you wrote? You can message Kristina any time during the course. She reads every message herself.",
    },
  ];

  return (
    <section id="journey" className="py-20 sm:py-32 bg-amber-50/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-600" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-[0.3em]">
              A guided journey
            </span>
            <div className="h-px w-8 bg-amber-600" />
          </div>
          <h2 className="text-[1.7rem] sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5">
            This isn't a video library.<br />
            <span className="text-amber-700">It's designed to actually move you.</span>
          </h2>
          <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Most courses give you information and leave you alone with it. This one is built differently — structured, task-driven, and personally supported.
          </p>
        </div>

        {/* Feature cards */}
        <div className="space-y-4 sm:space-y-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 hover:shadow-md hover:border-amber-200 transition-all"
              >
                <div className="flex gap-4 sm:gap-6">
                  <div className="flex flex-col items-center gap-3 flex-shrink-0">
                    <span className="text-amber-700 font-black text-xl sm:text-2xl tabular-nums leading-none">
                      {feature.num}
                    </span>
                    <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm">
                      <Icon className="w-5 h-5 text-amber-700" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-xl font-black text-gray-900 leading-snug tracking-tight mb-2 sm:mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-[14px] sm:text-[15.5px] leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-14 text-center"
        >
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            <span className="text-gray-900 font-semibold">Most workshops give you information.</span>{" "}
            <span className="text-amber-800">This one is built to actually transform something.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────── CURRICULUM PATH — 9 modules + 2 intermissions ─────────── */
const Curriculum = () => {
  type CurriculumEntry =
    | { kind: "intro"; num: string; title: string; desc: string; icon: typeof Heart }
    | { kind: "module"; num: string; title: string; desc: string; icon: typeof Heart }
    | { kind: "intermission"; num: string; title: string; desc: string; icon: typeof Camera };

  const entries: CurriculumEntry[] = [
    { kind: "intro", num: "00", title: "Welcome + My Story", desc: "What this course is. What it isn't. And the ten-year arc that led to building it.", icon: Sparkles },
    { kind: "module", num: "01", title: "You Are Not Broken", desc: "Food addiction is a clinically defined condition affecting roughly 1 in 5 people — and it skews higher in women. The Yale Food Addiction Scale, the bliss point, and why willpower was always the wrong tool.", icon: Heart },
    { kind: "module", num: "02", title: "What's Happening In Your Brain", desc: "The three layers behind every craving — dopamine, conditioning, and the physiological amplifiers (vagus nerve, insulin crash). In plain language.", icon: Brain },
    { kind: "intermission", num: "i1", title: "Intermission 1 — Your Kitchen", desc: "Take three photos and send them to Kristina on WhatsApp. She reads every one personally and writes back with two or three specific things she notices in your real environment.", icon: Camera },
    { kind: "module", num: "03", title: "Who Built This Environment", desc: "The 1967 Sugar Research Foundation. The corruption of US dietary guidelines. The bliss point and the billion-dollar engineering that followed. Anger, redirected.", icon: Building2 },
    { kind: "module", num: "04", title: "What Ultra-Processed Food Is Doing To You", desc: "The specific cascade — visceral fat, insulin resistance, hormonal disruption, glycation, gut microbiome damage. Not theory. Your body. And what's reversible.", icon: Activity },
    { kind: "intermission", num: "i2", title: "Intermission 2 — Your Receipt", desc: "Send Kristina a photo of your next grocery receipt. In 30 seconds she'll see what would take a week of food journaling to surface — and write back with two or three specific swaps.", icon: Receipt },
    { kind: "module", num: "05", title: "The Food Framework", desc: "The first part of the solution. Protein as foundation, fat as fuel, whole foods, and an honest conversation about flexibility (why the 80/20 rule is dangerous for real food addiction).", icon: Apple },
    { kind: "module", num: "06", title: "Environment & Operating System", desc: "Your home isn't neutral. The buying principle. Pre-decided if-then rules. The allergy line. The crab basket effect. How to design around your neurology instead of against it.", icon: Home },
    { kind: "module", num: "07", title: "When The Craving Hits", desc: "Five tools for the moments that still come — the sparkling water protocol, naming the source, the notes dump, environment shifts, and the if-then protocol.", icon: Zap },
    { kind: "module", num: "08", title: "Values & The Long Game", desc: "What makes recovery permanent. The identity-level shift. Why removing sugar leaves a dopamine gap — and what to fill it with.", icon: Target },
    { kind: "module", num: "09", title: "What Comes Next", desc: "The one commitment you take forward. And the single sentence that, if you remember nothing else, holds the whole course.", icon: Flag },
  ];

  return (
    <section id="curriculum" className="py-20 sm:py-32 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-500/60" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-[0.3em]">
              The full curriculum
            </span>
            <div className="h-px w-8 bg-amber-500/60" />
          </div>
          <h2 className="text-[1.7rem] sm:text-5xl font-black text-white leading-[1.1] tracking-tight mb-5">
            9 modules. 2 intermissions.<br />
            <span className="text-amber-400">Every layer covered.</span>
          </h2>
          <p className="text-gray-400 text-[15px] sm:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
            Watch in an evening, or space it across two weeks. Yours forever — revisit any module whenever you need it.
          </p>
        </div>

        {/* Path */}
        <div className="relative">
          <div className="absolute left-[19px] sm:left-7 top-3 bottom-3 w-px bg-gradient-to-b from-amber-500/40 via-amber-500/20 to-transparent" />

          <div className="space-y-3 sm:space-y-4">
            {entries.map((entry, i) => {
              const Icon = entry.icon;
              const isIntermission = entry.kind === "intermission";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="relative flex gap-3.5 sm:gap-6"
                >
                  {/* Node */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                      isIntermission
                        ? "bg-gradient-to-br from-amber-500 to-amber-700 shadow-amber-500/40 ring-4 ring-amber-500/10"
                        : "bg-gray-800 border border-gray-700 shadow-gray-900/50"
                    }`}>
                      <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${isIntermission ? "text-white" : "text-amber-400"}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`flex-1 min-w-0 rounded-2xl p-4 sm:p-6 border transition-colors ${
                    isIntermission
                      ? "bg-amber-500/[0.04] border-amber-500/30"
                      : "bg-gray-900/40 border-gray-800 hover:border-gray-700"
                  }`}>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`text-[9.5px] sm:text-[11px] font-black tabular-nums tracking-[0.2em] uppercase ${
                        isIntermission ? "text-amber-400" : "text-gray-500"
                      }`}>
                        {isIntermission ? "Intermission" : `Module ${entry.num}`}
                      </span>
                      {isIntermission && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded-full">
                          <Eye className="w-2.5 h-2.5 text-amber-300" />
                          <span className="text-[9px] font-black text-amber-300 uppercase tracking-wider">Personally reviewed</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-[15px] sm:text-lg font-bold leading-snug mb-1.5 sm:mb-2 text-white">
                      {entry.title}
                    </h3>
                    <p className={`text-[13.5px] sm:text-sm leading-relaxed ${
                      isIntermission ? "text-amber-50/80" : "text-gray-400"
                    }`}>
                      {entry.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bonus extras callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-14 p-5 sm:p-7 bg-gray-900/40 border border-gray-800 rounded-2xl"
        >
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-black text-amber-400 uppercase tracking-[0.25em]">Plus 4 bonus guides</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 sm:gap-x-6 sm:gap-y-3">
            {[
              "Eating through your menstrual cycle",
              "The 50+ hidden names of sugar",
              "The truth about fructose",
              "A curated listening list (Huberman, Lustig, the documentary worth your hour)",
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-[13.5px] sm:text-sm text-gray-300 leading-relaxed">{b}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─────────── BENEFITS — what you walk away with ─────────── */
const Benefits = () => {
  const items = [
    {
      title: "You'll finally understand why this has been so hard.",
      body: "The mechanism — brain, body, behavior. Once you see it, the struggle stops being a character flaw and starts being a solvable problem.",
    },
    {
      title: "You'll know exactly what to eat to make cravings quieter.",
      body: "Specific foods, specific timings, and why they work. Not a rigid meal plan — a framework you can run in any kitchen, at any restaurant, on any budget.",
    },
    {
      title: "You'll have real tools for the emotional eating moments.",
      body: "Because the hard days are the whole game. You'll know what to do when the craving hits at 10 PM, and what to do when you slip — because you will, and that's part of it.",
    },
    {
      title: "You'll see through food marketing — permanently.",
      body: "Once you learn what's engineered, why, and by whom, you can't unsee it. Grocery runs change. Restaurant menus read differently. This one sticks.",
    },
    {
      title: "You'll rebuild trust with yourself.",
      body: "One kept promise at a time. Not in a motivational-speech way — in a practical, 'here's the exact sequence' way that makes the next promise easier than the last.",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-5 sm:mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-[0.2em]">
              What you'll walk away with
            </span>
          </div>
          <h2 className="text-[1.7rem] sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight max-w-2xl mx-auto px-2 sm:px-0">
            Five things that{" "}
            <span className="text-amber-700">won't leave you</span> when the workshop ends.
          </h2>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 hover:shadow-lg hover:border-amber-200 transition-all"
            >
              <div className="flex gap-4 sm:gap-7">
                <span className="text-amber-700 font-black text-xl sm:text-3xl tabular-nums leading-none pt-1 flex-shrink-0">
                  0{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-bold text-base sm:text-xl leading-snug mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[14px] sm:text-base leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────── ABOUT KRISTINA ─────────── */
const About = () => (
  <section id="about" className="py-20 sm:py-32 bg-amber-50/30 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col md:flex-row gap-8 md:gap-14 items-center md:items-start">
        <div className="flex-shrink-0 w-40 sm:w-48 md:w-auto md:max-w-[260px] mx-auto md:mx-0 relative">
          <img
            src="/kristina.jpg"
            alt="Kristina Oz"
            className="w-full aspect-[4/5] rounded-3xl object-cover shadow-xl"
          />
          <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-to-br from-amber-600 to-amber-800 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-2xl shadow-lg">
            <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Based in</div>
            <div className="text-xs sm:text-sm font-black">The Netherlands</div>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-amber-600" />
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.3em]">
              About the teacher
            </p>
          </div>
          <h2 className="text-[1.7rem] sm:text-4xl font-black text-gray-900 mb-3 sm:mb-5 tracking-tight leading-tight">
            Kristina Oz
          </h2>
          <p className="text-amber-800 font-semibold text-[13.5px] sm:text-base mb-5 sm:mb-6">
            Nutritionist · 10 years with sugar and food addiction
          </p>
          <div className="space-y-4 sm:space-y-5 text-gray-700 text-[14.5px] sm:text-base leading-relaxed">
            <p>
              I didn't come to this work as an academic. I came to it as someone who couldn't stop eating sugar — through ten
              years of bulimia, compulsive bingeing, and regular relapses that no diet, no exercise plan, and no
              psychologist could touch.
            </p>
            <p>
              The turning point wasn't a new rule or a stricter plan. It was understanding the mechanism. What sugar
              does to the brain. Why every meal either helps or hurts. Why behavior is downstream of biology.
            </p>
            <p>
              Today my relationship with food is free. I don't restrict — yet 95% of the time I naturally choose
              whole food, because the craving and dependency are simply gone. This workshop is the condensed map of
              what got me here.
            </p>
            <div className="mt-6 sm:mt-7 pl-4 sm:pl-5 border-l-2 border-amber-600">
              <p className="text-gray-600 italic text-[14.5px] sm:text-base leading-relaxed">
                "I priced it this way on purpose. I don't want money to be the reason someone stays stuck in a fight they never
                needed to be in alone."
              </p>
              <p className="mt-3 text-[10px] font-bold text-amber-800 uppercase tracking-[0.2em]">
                — Kristina
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ─────────── CREDENTIALS — formal training proof ─────────── */
const Credentials = () => {
  const certs = [
    {
      image: "/cert-wageningen.png",
      year: "2023",
      title: "Professional Certificate in Food, Nutrition and Health",
      institution: "Wageningen University & Research",
      via: "via WageningenX · edX",
    },
    {
      image: "/cert-stanford.png",
      year: "2023",
      title: "Stanford Introduction to Food and Health",
      institution: "Stanford University · School of Medicine",
      via: "via Stanford Online · Coursera",
    },
  ];

  return (
    <section id="credentials" className="py-20 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full mb-5 sm:mb-6 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-[10px] sm:text-[11px] font-bold text-amber-800 uppercase tracking-[0.2em]">
              Formal training
            </span>
          </div>
          <h2 className="text-[1.7rem] sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight mb-5 px-2 sm:px-0">
            Backed by training from<br className="hidden sm:block" />{" "}
            <span className="text-amber-700">leading institutions.</span>
          </h2>
          <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed px-2 sm:px-0">
            Kristina's clinical understanding is grounded in formal education from Wageningen University and Stanford — not internet credentials.
          </p>
        </div>

        {/* Certificate cards */}
        <div className="grid sm:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto">
          {certs.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4 hover:shadow-xl hover:border-amber-200 hover:-translate-y-1 transition-all"
            >
              {/* Certificate image */}
              <div className="rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 mb-4 sm:mb-5">
                <img
                  src={cert.image}
                  alt={`${cert.institution} — ${cert.title}`}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>

              {/* Caption */}
              <div className="px-2 sm:px-3 pb-2 sm:pb-3">
                <div className="text-[10px] font-bold text-amber-700 uppercase tracking-[0.22em] mb-2">
                  Issued {cert.year}
                </div>
                <h3 className="text-[15px] sm:text-lg font-bold text-gray-900 leading-snug tracking-tight mb-1.5">
                  {cert.title}
                </h3>
                <p className="text-[13px] sm:text-sm text-gray-700 font-semibold leading-relaxed">
                  {cert.institution}
                </p>
                <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                  {cert.via}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 text-center text-gray-500 text-[13px] sm:text-sm max-w-2xl mx-auto px-2"
        >
          Plus ten years of lived recovery and one-on-one work with clients on the same problem. The course is the distilled overlap of all three.
        </motion.p>
      </div>
    </section>
  );
};

/* ─────────── OFFER STACK — click-funnel pricing block ─────────── */
const OfferStack = () => (
  <section id="pricing" className="py-20 sm:py-32 bg-gray-950 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(245,158,11,0.12),transparent)]" />
    <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-700/15 rounded-full blur-[120px] -translate-y-1/2" />
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-[120px] -translate-y-1/2" />

    <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-amber-500/60" />
          <span className="text-[10px] sm:text-[11px] font-bold text-amber-400 uppercase tracking-[0.3em]">
            The offer
          </span>
          <div className="h-px w-8 bg-amber-500/60" />
        </div>
        <h2 className="text-[1.7rem] sm:text-5xl font-black text-white leading-[1.1] tracking-tight">
          Everything you need to end<br />sugar and food addiction.
        </h2>
      </div>

      {/* Offer card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl shadow-amber-500/10 border border-gray-100"
      >
        <div className="flex items-center justify-center gap-2 mb-6 sm:mb-7">
          <div className="h-px w-6 bg-amber-600/60" />
          <p className="text-[10px] font-bold text-amber-800 uppercase tracking-[0.3em] text-center">
            The Unhooked Method
          </p>
          <div className="h-px w-6 bg-amber-600/60" />
        </div>

        {/* What's included — explicit stack */}
        <ul className="space-y-3.5 mb-7 sm:mb-8">
          {[
            { strong: "9 in-depth video modules", rest: "(nutrition, psychology, behavior, food industry — full curriculum)" },
            { strong: "A guided task after every module", rest: "designed to move you toward the solution" },
            { strong: "2 tasks personally reviewed by Kristina", rest: "(your kitchen audit + grocery receipt)" },
            { strong: "Direct WhatsApp access throughout the course" },
            { strong: "Welcome + My Story intro videos" },
            { strong: "4 bonus guides", rest: "(cycle eating, hidden sugar names, fructose truth, listening list)" },
            { strong: "Instant access · yours forever", rest: "· no subscription, no recurring charges" },
          ].map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-700 text-[14px] sm:text-[15px] leading-relaxed">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <span className="font-bold text-gray-900">{line.strong}</span>
                {line.rest && <span className="text-gray-600"> {line.rest}</span>}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-6 sm:pt-7 text-center">
          <p className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em] mb-2">Today's price</p>
          <div className="flex items-baseline justify-center gap-2 mb-1">
            <span className="text-5xl sm:text-7xl font-black text-gray-900 tracking-tight">{PRICE}</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-7">One-time payment · No subscription</p>

          {/* CTA */}
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 sm:py-5 text-[15px] sm:text-lg font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full transition-all shadow-xl shadow-amber-300/40 hover:-translate-y-0.5 mb-5"
          >
            Get instant access
            <ArrowRight className="w-5 h-5" />
          </a>

          {/* Trust line */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2 text-[10px] sm:text-xs text-gray-500 font-semibold">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              Secure checkout
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              30-day refund
            </div>
            <span className="text-gray-300">·</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Instant access
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pre-purchase contact — email only */}
      <motion.a
        href={`mailto:${CONTACT_EMAIL}`}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-5 sm:mt-6 flex items-start gap-4 p-5 bg-gray-900/60 border border-gray-800 rounded-2xl hover:border-amber-500/40 transition-colors group"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-700 rounded-xl flex items-center justify-center flex-shrink-0">
          <MessageCircle className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-white mb-1">Questions before you buy?</p>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            Email Kristina directly — <span className="text-amber-400 font-semibold break-all">{CONTACT_EMAIL}</span>.
            Once you're in, you'll get her WhatsApp for the rest of the course.
          </p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-1" />
      </motion.a>
    </div>
  </section>
);

/* ─────────── FAQ ─────────── */
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "Is this right for me?",
      a: "If sugar or sweet food feels like something you can't reliably stop — whether every day or on bad weeks — yes. If you're looking for a calorie plan, meal prep templates, or a workout routine, no. This is about how sugar and food addiction actually work, and how to build a new relationship with both.",
    },
    {
      q: "What does the 'guided journey' actually mean?",
      a: "Every module ends with a specific task — not optional, not busywork — designed to move you toward the solution. Two of those tasks (your kitchen audit and your grocery receipt) you'll send Kristina directly on WhatsApp, and she'll write back personally with what she notices. And throughout the course, you can message her any time with questions or realizations. So you're never doing the work alone.",
    },
    {
      q: "How long does it take?",
      a: "Nine modules of in-depth video plus two intermissions. About two to three hours of core content depending on pace, plus the homework tasks. You can spread it however you like — one evening, one week, two weeks. Access is permanent, so you can revisit any module whenever you need it.",
    },
    {
      q: "How is this different from other things I've tried?",
      a: "Most programs address one layer — the food, or the mindset, or the behavior. Sugar and food addiction sit at the intersection of all three, which is why partial approaches stop working. This workshop walks through every layer in sequence, with tasks and personal feedback at the key moments, so the pieces actually fit together.",
    },
    {
      q: "What if it doesn't help?",
      a: "Email within 30 days and I'll refund you. No forms, no questions, no awkward exit survey. I'd rather you leave whole than stay annoyed.",
    },
    {
      q: `Why only ${PRICE}?`,
      a: "Because I want it to be accessible. This is a focused, complete roadmap on this specific topic — and I don't want price to be the reason someone stays stuck. If it's useful and you want to go deeper later, there's more. If it's all you ever need, that's great too.",
    },
    {
      q: "What's not in here?",
      a: "There's no meal plan, no tracker app, no group coaching, no live calls. It's a self-paced workshop — videos and guides you go through on your own schedule, plus the personal task review and ongoing WhatsApp support from Kristina. If you need a more hands-on program, this isn't it.",
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gray-300" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              FAQ
            </p>
            <div className="h-px w-8 bg-gray-300" />
          </div>
          <h2 className="text-[1.7rem] sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Honest answers<br />
            to fair questions.
          </h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:bg-gray-100/70 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left gap-3"
              >
                <span className="font-semibold text-gray-900 text-[14.5px] sm:text-base leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 sm:px-5 pb-5 text-gray-600 leading-relaxed text-[13.5px] sm:text-[15px]">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─────────── FINAL CTA ─────────── */
const FinalCTA = () => (
  <section className="py-20 sm:py-32 bg-amber-50/30 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
      <h2 className="text-[1.85rem] sm:text-5xl font-black text-gray-900 leading-[1.08] tracking-tight mb-5 sm:mb-6">
        You can keep fighting it.<br />
        <span className="text-amber-700">Or you can finally understand it.</span>
      </h2>
      <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto px-2 sm:px-0">
        Nine guided modules. Two tasks Kristina reviews personally. WhatsApp support throughout. {PRICE}. Yours forever.
      </p>
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-12 py-4 sm:py-5 text-[15px] sm:text-lg font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full shadow-xl shadow-amber-300/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center max-w-sm"
      >
        Get instant access — {PRICE}
        <ArrowRight className="w-5 h-5" />
      </a>
      <p className="mt-5 text-[11px] sm:text-xs text-gray-500">
        30-day refund · instant access · WhatsApp access included
      </p>
    </div>
  </section>
);

/* ─────────── FOOTER ─────────── */
const Footer = () => (
  <footer className="py-8 sm:py-10 bg-white border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-700 rounded flex items-center justify-center">
            <Flame className="text-white w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-gray-900">
            The Unhooked Method
          </span>
        </div>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm text-gray-500 hover:text-amber-700 transition-colors break-all"
        >
          {CONTACT_EMAIL}
        </a>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-100 text-xs text-gray-400 text-center">
        Made with <span className="text-red-500">♥</span> in the Netherlands
      </div>
    </div>
  </footer>
);

/* ───────────────────────── APP ───────────────────────── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-0">
      <Navbar />
      <main>
        <Hero />
        <Mechanism />
        <Journey />
        <Curriculum />
        <Benefits />
        <About />
        <Credentials />
        <OfferStack />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[55]">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-[14.5px] rounded-full flex items-center justify-center gap-2 shadow-lg shadow-amber-300/40 active:scale-95 transition-transform"
        >
          Get instant access — {PRICE}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
