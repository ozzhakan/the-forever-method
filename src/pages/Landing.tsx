import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Menu,
  X,
  Flame,
  ChevronDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const CHECKOUT_URL = "https://www.paypal.com/ncp/payment/DQDESNZ9DVQ7G";
const PRICE = "$8"; // Update PayPal payment link when price changes

/* ───────────────────────── NAVBAR ───────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-200">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-[15px] tracking-tight text-gray-900">
              The Forever Method
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#what-you-get" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors">What you get</a>
            <a href="#inside" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors">Inside</a>
            <a href="#about" className="text-sm font-semibold text-gray-600 hover:text-emerald-700 transition-colors">About Kristina</a>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-100"
            >
              Get it — {PRICE}
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X /> : <Menu />}
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
            <a href="#what-you-get" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900">What you get</a>
            <a href="#inside" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900">Inside</a>
            <a href="#about" onClick={() => setIsOpen(false)} className="block text-base font-semibold text-gray-900">About Kristina</a>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-base font-bold text-white bg-emerald-600 rounded-xl mt-2"
            >
              Get the workshop — {PRICE}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ───────────────────────── HERO ───────────────────────── */
const Hero = () => (
  <section className="pt-32 sm:pt-40 pb-24 sm:pb-32 bg-gray-950 relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(16,185,129,0.12),transparent)]" />
    <div className="absolute top-40 left-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-[120px]" />
    <div className="absolute top-60 right-1/4 w-80 h-80 bg-emerald-700/10 rounded-full blur-[120px]" />
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Eyebrow with decorative rules */}
        <div className="flex items-center justify-center gap-3 mb-8 sm:mb-10">
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-[0.3em]">
            The Sugar Freedom Workshop
          </span>
          <div className="h-px w-8 bg-emerald-500/60" />
        </div>

        {/* Headline */}
        <h1 className="text-[2.5rem] leading-[1.02] sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-8 sm:mb-10">
          Your complete roadmap<br className="hidden sm:block" />{" "}
          to ending{" "}
          <span className="italic text-emerald-400">sugar addiction.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 max-w-2xl mx-auto">
          Seven in-depth videos that walk you through the full picture —
          <span className="text-white font-semibold"> nutrition, psychology, behavior, and the food industry</span> — plus
          four bonus guides. Ten years of work with sugar and food addiction,
          in one place, in the right order.
        </p>

        {/* Topic chips — subtle badge row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12">
          {["Neuroscience", "Nutrition", "Emotional Eating", "Behavior Change", "Food Industry"].map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 text-[10px] sm:text-[11px] font-bold text-gray-400 bg-gray-900/80 border border-gray-800 rounded-full tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-3 mb-3">
          <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
            {PRICE}
          </span>
          <span className="text-gray-500 text-sm">one-time</span>
        </div>

        <p className="text-xs text-gray-500 mb-10 sm:mb-12 tracking-wide">
          Instant access · Yours forever
        </p>

        {/* CTA */}
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-10 sm:px-12 py-5 text-base sm:text-lg font-bold text-white bg-emerald-500 hover:bg-emerald-400 rounded-full shadow-2xl shadow-emerald-500/25 hover:-translate-y-0.5 transition-all"
        >
          Get the workshop
          <ArrowRight className="w-5 h-5" />
        </a>

        <p className="mt-6 text-[10px] sm:text-[11px] text-gray-500 font-semibold uppercase tracking-[0.2em]">
          7 videos · 15–20 min each · 4 bonus guides · yours forever
        </p>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── OPENING NOTE ───────────────────────── */
const OpeningNote = () => (
  <section className="py-24 sm:py-32 bg-white">
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="h-px w-8 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            Why this exists
          </p>
        </div>
        <div className="space-y-6 text-gray-700 text-[17px] sm:text-lg leading-relaxed">
          <p>
            Most advice on sugar is partial. <span className="text-gray-900 font-semibold">"Use willpower." "Cut it cold turkey." "Try intermittent fasting."</span> Each
            works for some people, but most miss that sugar addiction has three
            layers — what you eat, how you feel, and what you do — and all three
            need to be addressed at once.
          </p>
          <p>
            I've spent the last ten years on this. First as someone who couldn't
            stop. Then as a nutritionist, working with clients on the same
            problem from every angle.
          </p>
          <p className="text-gray-900 font-semibold">
            This workshop is everything I wish someone had handed me on day
            one. A complete roadmap — not a teaser, not a taste. The whole
            picture, in sequence.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── WHAT YOU'LL WALK AWAY WITH ───────────────────────── */
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
    <section id="what-you-get" className="py-24 sm:py-36 bg-gray-50 relative overflow-hidden">
      {/* Soft accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-emerald-200 rounded-full mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 uppercase tracking-[0.2em]">
              What you'll walk away with
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 leading-[1.1] tracking-tight max-w-2xl mx-auto">
            Five things that{" "}
            <span className="text-emerald-600">won't leave you</span> when
            the workshop ends.
          </h2>
        </div>

        {/* Benefit cards */}
        <div className="space-y-5 sm:space-y-6">
          {items.map((item, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-emerald-200 transition-all"
            >
              <div className="flex gap-5 sm:gap-7">
                <span className="text-emerald-600 font-black text-2xl sm:text-3xl tabular-nums leading-none pt-1 flex-shrink-0">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="text-gray-900 font-bold text-lg sm:text-xl leading-snug mb-2 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[15px] sm:text-base leading-relaxed">
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

/* ───────────────────────── WHAT'S INSIDE ───────────────────────── */
const WhatsInside = () => {
  const videos = [
    {
      num: "01",
      title: "Why this workshop exists",
      desc: "What's in it, how to use it, and what to expect. The map before the territory.",
    },
    {
      num: "02",
      title: "How sugar hijacks your brain",
      desc: "The part of this that's neurochemical — dopamine, the reward loop, and why 'just stop' has never been realistic advice.",
    },
    {
      num: "03",
      title: "The bliss point",
      desc: "How modern food is deliberately engineered to be hard to put down — and why understanding this changes every supermarket trip you take after.",
    },
    {
      num: "04",
      title: "What excess sugar actually does",
      desc: "To your energy, skin, sleep, hormones, and weight. The mechanism behind each — not just the outcome.",
    },
    {
      num: "05",
      title: "The nutritional piece",
      desc: "What to eat instead, why it works, and how to build plates that make cravings quieter over weeks, not days.",
    },
    {
      num: "06",
      title: "The psychological piece",
      desc: "Emotional eating, the craving loop, shame spirals — and the specific tools that interrupt each.",
    },
    {
      num: "07",
      title: "Making it stick",
      desc: "Why motivation fails and what replaces it. Identity, environment, and the quiet work of rebuilding self-trust.",
    },
  ];

  return (
    <section id="inside" className="py-24 sm:py-32 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-emerald-500/60" />
            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em]">
              Inside the workshop
            </p>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
            Seven videos.<br />
            <span className="text-emerald-400">In the right order.</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-lg">
            Each video is 15–20 minutes. You can do the whole thing in an evening,
            or space it out over a week. Yours forever — revisit any section
            whenever you need it.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800 bg-gray-900/30 backdrop-blur">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="flex gap-5 sm:gap-7 p-5 sm:p-6 hover:bg-gray-800/40 transition-colors group"
            >
              <span className="text-emerald-500 font-bold text-xs tabular-nums pt-1 flex-shrink-0 w-6 group-hover:text-emerald-400 transition-colors">
                {v.num}
              </span>
              <div>
                <h3 className="text-white font-semibold text-sm sm:text-base mb-1.5 leading-snug">
                  {v.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── BONUSES ───────────────────────── */
const Bonuses = () => {
  const items = [
    {
      title: "Eating through your cycle",
      desc: "Foods and nutrients matched to each phase of your menstrual cycle. Your body's needs change every week — almost no one talks about this.",
    },
    {
      title: "The hidden names of sugar",
      desc: "The fifty-plus names sugar goes by on food labels. A reference you'll actually use at the supermarket.",
    },
    {
      title: "The truth about fructose",
      desc: "Why fruit sugar and added fructose behave completely differently in the body — and why the distinction matters.",
    },
    {
      title: "A curated listening list",
      desc: "Huberman on dopamine, Lustig on sugar, and the one documentary worth an hour of your time. The best of what's out there, already sorted.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            Also included
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
          Four bonus guides.
        </h2>
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-10 sm:mb-12">
          Short, practical, and made to live alongside the videos.
        </p>

        <div>
          {items.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 py-5 border-b border-gray-100 last:border-0"
            >
              <div className="flex-shrink-0 pt-1">
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug mb-1.5">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── ABOUT KRISTINA ───────────────────────── */
const About = () => (
  <section id="about" className="py-24 sm:py-32 bg-gray-50 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div className="flex-shrink-0 w-full md:w-auto md:max-w-[260px] relative">
          <img
            src="/kristina.jpg"
            alt="Kristina Oz"
            className="w-full aspect-[4/5] rounded-3xl object-cover shadow-xl"
          />
          <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">Based in</div>
            <div className="text-sm font-black">The Netherlands</div>
          </div>
        </div>

        <div className="flex-1 pt-2">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gray-300" />
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
              About the teacher
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-5 tracking-tight leading-tight">
            Kristina Oz
          </h2>
          <p className="text-emerald-700 font-semibold text-sm sm:text-base mb-6">
            Nutritionist · 10 years with sugar and food addiction
          </p>
          <div className="space-y-5 text-gray-700 text-[15px] sm:text-base leading-relaxed">
            <p>
              I didn't come to this work as an academic. I came to it as someone
              who couldn't stop eating sugar — who had tried every approach the
              internet offered and quietly concluded that something was wrong
              with me.
            </p>
            <p>
              The turning point wasn't a single diet or a lucky week. It was
              understanding the mechanism. What sugar does to the brain, why
              every meal either helps or hurts, and why behavior is downstream
              of biology.
            </p>
            <p>
              Ten years of reading, studying, coaching clients, and rebuilding
              my own relationship with food later, I've got a clear picture of
              what actually helps. This workshop is that picture, condensed
              into seven videos.
            </p>
            <div className="mt-7 pl-5 border-l-2 border-emerald-500">
              <p className="text-gray-600 italic text-[15px] sm:text-base leading-relaxed">
                "I priced it this way on purpose. I don't want money to be the
                reason someone stays stuck in a fight they never needed to be in
                alone."
              </p>
              <p className="mt-3 text-[10px] font-bold text-emerald-700 uppercase tracking-[0.2em]">
                — Kristina
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── PRICE + CTA ───────────────────────── */
const PriceBlock = () => (
  <section className="py-24 sm:py-32 bg-gray-950 text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(16,185,129,0.1),transparent)]" />
    <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-700/10 rounded-full blur-[120px] -translate-y-1/2" />
    <div className="absolute top-1/2 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -translate-y-1/2" />

    <div className="max-w-md mx-auto px-4 sm:px-6 relative z-10">
      <div className="bg-white rounded-3xl p-8 sm:p-10 text-center shadow-2xl shadow-emerald-500/10 border border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-px w-6 bg-emerald-500/60" />
          <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-[0.3em]">
            The Sugar Freedom Workshop
          </p>
          <div className="h-px w-6 bg-emerald-500/60" />
        </div>

        {/* What's bundled */}
        <ul className="text-left space-y-2.5 mb-8 pb-8 border-b border-gray-100">
          {[
            "7 in-depth videos (15–20 min each)",
            "4 bonus guides",
            "Instant access · yours forever",
            "Watch at your own pace, revisit anytime",
          ].map((line, i) => (
            <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>{line}</span>
            </li>
          ))}
        </ul>

        {/* Price */}
        <div className="flex items-baseline justify-center gap-2 mb-2">
          <span className="text-6xl sm:text-7xl font-black text-gray-900 tracking-tight">
            {PRICE}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-8 tracking-wide">
          One-time payment · No subscription
        </p>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all shadow-lg shadow-emerald-200 hover:-translate-y-0.5 mb-5"
        >
          Get the workshop
          <ArrowRight className="w-4 h-4" />
        </a>

        <p className="text-xs text-gray-500 leading-relaxed">
          30-day refund if it's not useful to you. No forms, no hoops.
          Just email.
        </p>
      </div>
    </div>
  </section>
);

/* ───────────────────────── FAQ ───────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    {
      q: "Is this right for me?",
      a: "If sugar or sweet food feels like something you can't reliably stop — whether every day or on bad weeks — yes. If you're looking for a calorie plan, meal prep templates, or a workout routine, no. This is about how sugar and food addiction actually work, and how to build a new relationship with both.",
    },
    {
      q: "How long does it take?",
      a: "Seven videos, 15–20 minutes each. About two hours of core content, plus the bonus guides. You can do the whole workshop in an evening or space it out over a week. Access is permanent, so you can revisit any section whenever you need it.",
    },
    {
      q: "How is this different from other things I've tried?",
      a: "Most programs address one layer — the food, or the mindset, or the behavior. Sugar and food addiction sit at the intersection of all three, which is why partial approaches stop working. This workshop walks through every layer in sequence, so the pieces actually fit together.",
    },
    {
      q: "What if it doesn't help?",
      a: "Email within 30 days and I'll refund you. No forms, no questions, no awkward exit survey. I'd rather you leave whole than stay annoyed.",
    },
    {
      q: `Why only ${PRICE}?`,
      a: "Because I want it to be accessible. This is the condensed, focused version of what I teach — not the whole of my work, but a genuinely complete roadmap on this specific topic. If it's useful and you want to go deeper later, there's more. If it's all you ever need, that's great too.",
    },
    {
      q: "What's not in here?",
      a: "There's no meal plan, no tracker app, no group coaching, no live calls. It's a self-paced workshop — videos and guides you go through on your own schedule. If you need a more hands-on program, this isn't it.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px w-8 bg-gray-300" />
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">
            FAQ
          </p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-10 sm:mb-12">
          Honest answers<br />
          to fair questions.
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden hover:bg-gray-100/70 transition-colors"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-gray-900 pr-4 text-[15px] sm:text-base">
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
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed text-[14px] sm:text-[15px]">
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

/* ───────────────────────── FOOTER ───────────────────────── */
const Footer = () => (
  <footer className="py-10 bg-gray-50 border-t border-gray-100">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
            <Flame className="text-white w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-sm text-gray-900">
            The Forever Method
          </span>
        </div>
        <a
          href="mailto:krudstina@gmail.com"
          className="text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
          krudstina@gmail.com
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
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-16 sm:pb-0">
      <Navbar />
      <main>
        <Hero />
        <OpeningNote />
        <Benefits />
        <WhatsInside />
        <Bonuses />
        <About />
        <PriceBlock />
        <FAQ />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 p-3 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[55]">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-emerald-600 text-white font-bold text-[15px] rounded-full flex items-center justify-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-transform"
        >
          Get the workshop — {PRICE}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
