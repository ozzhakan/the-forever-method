import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Menu,
  X,
  Flame,
  ChevronDown,
  CheckCircle2,
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
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-[15px] tracking-tight text-gray-900">
              The Forever Method
            </span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-colors"
            >
              Get the workshop — {PRICE}
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
            className="md:hidden bg-white border-b border-gray-100 px-4 py-5 overflow-hidden"
          >
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-3 text-base font-bold text-white bg-emerald-600 rounded-xl"
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
  <section className="pt-32 sm:pt-40 pb-20 sm:pb-28 bg-gray-950 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(16,185,129,0.08),transparent)]" />
    <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" />

    <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-[10px] sm:text-[11px] font-bold text-emerald-400 uppercase tracking-[0.3em] mb-8 sm:mb-10">
          A workshop by Kristina Oz
        </p>

        <h1 className="text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-8">
          How to stop<br />
          craving <span className="italic text-emerald-400">sugar.</span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg leading-relaxed mb-12 max-w-xl mx-auto">
          Seven short videos on why sugar is hard to quit — and what actually helps.
          Plus four bonus guides. About two hours total.
        </p>

        <div className="flex items-baseline justify-center gap-3 mb-3">
          <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">
            {PRICE}
          </span>
          <span className="text-gray-500 text-sm">one-time</span>
        </div>

        <p className="text-xs text-gray-500 mb-10 sm:mb-12">
          Instant access · Yours forever
        </p>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-10 py-4 text-base font-bold text-white bg-emerald-500 hover:bg-emerald-400 rounded-full transition-colors"
        >
          Get the workshop
          <ArrowRight className="w-4 h-4" />
        </a>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── OPENING NOTE ───────────────────────── */
const OpeningNote = () => (
  <section className="py-24 sm:py-36 bg-white">
    <div className="max-w-xl mx-auto px-4 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-8">
          Why this exists
        </p>
        <div className="space-y-6 text-gray-700 text-[17px] sm:text-lg leading-relaxed">
          <p>
            Sugar is harder to quit than most advice makes it sound. Not because
            of willpower — because the problem has nutritional, psychological and
            behavioral layers, and those usually get treated one at a time.
          </p>
          <p>
            I've spent the last ten years on this — first as someone who couldn't
            stop, then as a nutritionist helping others with the same thing. This
            workshop is the short, focused version of what I've found actually
            helps.
          </p>
          <p className="text-gray-900 font-semibold">
            Seven videos. About two hours total. {PRICE}.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── WHAT'S INSIDE ───────────────────────── */
const WhatsInside = () => {
  const videos = [
    {
      num: "01",
      title: "Why this workshop exists",
      desc: "What's in it, how to use it, and what to expect.",
    },
    {
      num: "02",
      title: "How sugar hijacks your brain",
      desc: "The part of this that's neurochemical — in plain language.",
    },
    {
      num: "03",
      title: "The bliss point",
      desc: "How modern food is engineered to be hard to put down, and why that matters for anyone trying to stop.",
    },
    {
      num: "04",
      title: "What excess sugar actually does",
      desc: "To your energy, skin, and weight — with the mechanism, not just the outcome.",
    },
    {
      num: "05",
      title: "The nutritional piece",
      desc: "What to eat instead, and why it makes cravings quieter.",
    },
    {
      num: "06",
      title: "The psychological piece",
      desc: "Emotional eating, the craving loop, and tools to interrupt it.",
    },
    {
      num: "07",
      title: "Making it stick",
      desc: "Why motivation fails, and what replaces it.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-950 text-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <div className="mb-12 sm:mb-14">
          <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-[0.3em] mb-5">
            What's inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.15]">
            Seven videos, in order.
          </h2>
          <p className="text-gray-500 text-sm mt-4">
            15–20 minutes each. Watch in one evening, or over a week.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex gap-5 sm:gap-7 p-5 sm:p-6"
            >
              <span className="text-emerald-500 font-bold text-xs tabular-nums pt-1 flex-shrink-0 w-6">
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
      desc: "Foods and nutrients matched to each phase of your menstrual cycle.",
    },
    {
      title: "Hidden names of sugar",
      desc: "The fifty-plus names sugar goes by on food labels.",
    },
    {
      title: "The truth about fructose",
      desc: "Why fruit sugar and added fructose behave differently in the body.",
    },
    {
      title: "A listening list",
      desc: "Huberman on dopamine, Lustig on sugar, and the documentary worth an hour of your time.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-5">
          Also included
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight mb-10 sm:mb-12">
          A few extras I put together.
        </h2>

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
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-[15px] sm:text-base leading-snug mb-1">
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
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
  <section className="py-24 sm:py-32 bg-gray-50">
    <div className="max-w-2xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 items-start">
        <img
          src="/kristina.jpg"
          alt="Kristina Oz"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover flex-shrink-0 shadow-sm"
        />
        <div className="flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3">
            About
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-5 tracking-tight leading-tight">
            Kristina Oz
          </h2>
          <div className="space-y-4 text-gray-700 text-[15px] sm:text-base leading-relaxed">
            <p>
              I'm a nutritionist based in the Netherlands. Before that, I was
              someone who couldn't stop eating sugar and assumed it was a personal
              failing.
            </p>
            <p>
              Ten years of reading, studying and working with clients on the same
              problem later, I've got a pretty clear picture of what helps and
              what doesn't. This workshop is the short version of that.
            </p>
            <p className="text-gray-500 italic pt-2">
              "I priced it this way on purpose — I don't want price to be a reason
              not to watch it."
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── PRICE + CTA ───────────────────────── */
const PriceBlock = () => (
  <section className="py-24 sm:py-32 bg-white">
    <div className="max-w-md mx-auto px-4 sm:px-6">
      <div className="border border-gray-200 rounded-3xl p-8 sm:p-10 text-center">
        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.3em] mb-5">
          The workshop
        </p>
        <div className="flex items-baseline justify-center gap-2 mb-3">
          <span className="text-6xl font-black text-gray-900 tracking-tight">
            {PRICE}
          </span>
        </div>
        <p className="text-sm text-gray-500 mb-8">
          One-time · Instant access · Yours forever
        </p>

        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-4 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-full transition-colors mb-5"
        >
          Get the workshop
          <ArrowRight className="w-4 h-4" />
        </a>

        <p className="text-xs text-gray-400 leading-relaxed">
          30-day refund if it's not useful to you. Just email.
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
      a: "If sugar feels like something you can't reliably stop — whether every day or on bad weeks — yes. If you're looking for a calorie plan, meal prep templates, or a workout routine, no. This is about how sugar works and how to make it quieter.",
    },
    {
      q: "How long does it take?",
      a: "Seven videos, 15–20 minutes each. You can watch them in an evening or space them out across a week. They're yours, so take your time.",
    },
    {
      q: "What if it's not helpful?",
      a: "Email within 30 days and I'll refund you. No forms, no questions.",
    },
    {
      q: `Why only ${PRICE}?`,
      a: "Because I want it to be accessible. This is the condensed, focused version of what I teach — not the whole of my work. If it's useful, great. If you want to go deeper after, there's more. If not, you've still got something worth keeping.",
    },
    {
      q: "What's not in here?",
      a: "There's no meal plan, no tracker, no group coaching. It's a workshop — videos and guides you go through yourself. If that's not what you're after, that's fair.",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-10 sm:mb-12 tracking-tight">
          Questions
        </h2>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
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
  <footer className="py-10 bg-white border-t border-gray-100">
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
          className="w-full py-3.5 bg-emerald-600 text-white font-bold text-[15px] rounded-full flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          Get the workshop — {PRICE}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
