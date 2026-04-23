import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  ChevronRight,
  PlayCircle,
  Star,
  Users,
  Zap,
  ShieldCheck,
  Clock,
  ArrowRight,
  Menu,
  X,
  Lock,
  Heart,
  Brain,
  Activity,
  Flame,
  Award,
  Search,
  RefreshCcw,
  Target,
  Calendar,
  Send,
  TrendingDown,
  AlertTriangle,
  ChevronDown,
  Eye,
  BadgeCheck,
  CircleDot,
  Sparkles,
} from "lucide-react";
import { useState, useRef, useEffect, type ReactNode } from "react";

const CHECKOUT_URL = "https://www.paypal.com/ncp/payment/DQDESNZ9DVQ7G";
const PRICE = "$8"; // Update PayPal payment link when price changes

/* ───────────────────────── URGENCY BAR ───────────────────────── */
const UrgencyBar = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const [spots, setSpots] = useState(19);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((p) => {
        if (p.seconds > 0) return { ...p, seconds: p.seconds - 1 };
        if (p.minutes > 0) return { ...p, minutes: p.minutes - 1, seconds: 59 };
        if (p.hours > 0) return { hours: p.hours - 1, minutes: 59, seconds: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.6) setSpots((s) => Math.max(3, s - 1));
    }, 45000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-red-600 text-white py-2 px-4 text-center text-[10px] sm:text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
      <span className="animate-pulse flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" /> PRE-LAUNCH PRICE EXPIRES IN:
      </span>
      <span className="font-mono bg-black/30 px-2.5 py-0.5 rounded text-sm">
        {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
        {String(timeLeft.seconds).padStart(2, "0")}
      </span>
      <span className="hidden sm:inline">| ONLY {spots} SPOTS LEFT AT THIS PRICE</span>
    </div>
  );
};

/* ───────────────────────── NAVBAR ───────────────────────── */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <UrgencyBar />
      <nav className="bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
                <Flame className="text-white w-5 h-5" />
              </div>
              <span className="font-black text-lg tracking-tighter text-gray-900 italic uppercase">
                THE FOREVER<span className="text-emerald-600">METHOD</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a href="#results" className="text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">Results</a>
              <a href="#method" className="text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">The Method</a>
              <a href="#pricing" className="text-sm font-bold text-gray-600 hover:text-emerald-600 transition-colors">Reserve Spot</a>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Calendar className="w-4 h-4" />
                Reserve Now — {PRICE}
              </a>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-900 p-2">
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
              className="md:hidden bg-white border-b border-gray-100 px-4 py-6 space-y-4 shadow-2xl overflow-hidden"
            >
              <a href="#results" onClick={() => setIsOpen(false)} className="block text-lg font-black text-gray-900">Results</a>
              <a href="#method" onClick={() => setIsOpen(false)} className="block text-lg font-black text-gray-900">The Method</a>
              <a
                href={CHECKOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 text-lg font-black text-white bg-emerald-600 rounded-2xl"
              >
                Reserve My Spot — {PRICE}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

/* ───────────────────────── METABOLIC TIMELINE ───────────────────────── */
const MetabolicTimeline = () => {
  const steps = [
    { time: "Days 1–7", text: "Something shifts. You can't quite explain it yet — but it feels different." },
    { time: "Day 7–14", text: "The craving hits — and passes. For the first time, you feel in control." },
    { time: "Day 14–30", text: "Your clothes fit differently. Your energy is steady. People start noticing." },
    { time: "Day 30–60", text: "Weight moves without effort. Old patterns feel foreign now." },
    { time: "Day 60+", text: "You realize: this is just how you live now. No dieting. No counting. Just freedom." },
  ];

  return (
    <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
      <div className="bg-gray-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-600/5 rounded-full blur-3xl" />

        <div className="flex items-center justify-between mb-5 sm:mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <span className="text-[10px] sm:text-xs font-black text-emerald-400 uppercase tracking-[0.15em] sm:tracking-[0.2em]">
              Your Transformation Timeline
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-emerald-500/10 rounded-full">
            <CircleDot className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
            <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Science-Backed</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
              className="flex items-start gap-3 sm:gap-4 py-2 sm:py-3 relative"
            >
              <div
                className={`w-[14px] h-[14px] rounded-full flex-shrink-0 mt-0.5 z-10 shadow-lg ${
                  i === steps.length - 1
                    ? "bg-emerald-400 shadow-emerald-400/40 ring-2 ring-emerald-400/30 ring-offset-1 ring-offset-gray-950"
                    : "bg-emerald-500/80 shadow-emerald-500/20"
                }`}
              />
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-3">
                <span className="text-emerald-400 font-black text-[11px] sm:text-xs whitespace-nowrap min-w-[65px]">
                  {step.time}
                </span>
                <span className="text-gray-300 text-xs sm:text-sm font-medium leading-snug">{step.text}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800/50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            ))}
            <span className="text-xs font-bold text-gray-500 ml-1">4.9/5</span>
          </div>
          <span className="text-[10px] sm:text-xs text-gray-500 font-bold">Based on 3,000+ students</span>
        </div>
      </div>
    </div>
  );
};

/* ───────────────────────── HERO ───────────────────────── */
const Hero = () => (
  <section className="pt-28 sm:pt-36 pb-20 sm:pb-28 bg-gray-950 overflow-hidden relative">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(16,185,129,0.09),transparent)]" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/60 to-transparent" />

    <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>

        {/* Headline */}
        <h1 className="text-[2.6rem] leading-[1] sm:text-6xl md:text-7xl lg:text-[6rem] lg:leading-[0.95] font-black text-white tracking-tight mb-8 sm:mb-10">
          It Was Never<br className="hidden sm:block" />{" "}
          About <span className="italic text-emerald-400">Willpower</span>.
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 max-w-2xl mx-auto">
          A <span className="text-white font-semibold">7-video workshop</span> that shows you exactly why you keep failing — and gives you the complete system to finally stop. Nutrition, psychology, behavior, and the food industry exposed. Just the system you were never given.
        </p>

        {/* Price */}
        <div className="mb-4 sm:mb-5">
          <span className="text-5xl sm:text-6xl font-black text-white tracking-tight">{PRICE}</span>
        </div>

        {/* Tagline */}
        <p className="text-[10px] sm:text-[11px] text-gray-500 font-bold uppercase tracking-[0.15em] mb-10 sm:mb-12 max-w-xl mx-auto leading-relaxed">
          7 videos · 15–20 min each · bonus resources + guides · One-time payment · Instant access · Yours forever
        </p>

        {/* CTA */}
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 sm:px-14 py-5 text-base sm:text-lg font-black text-white bg-emerald-500 hover:bg-emerald-400 rounded-2xl shadow-2xl shadow-emerald-500/25 hover:-translate-y-1 transition-all active:scale-95"
        >
          Yes — I'm ready to break free
          <ArrowRight className="w-5 h-5" />
        </a>

        {/* Below CTA */}
        <p className="mt-5 sm:mt-6 text-gray-500 text-xs sm:text-sm">
          No subscriptions. No recurring charges. Just the workshop — and everything in it.
        </p>

      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── PAIN / PROBLEM ───────────────────────── */
const PainSection = () => (
  <section className="py-16 sm:py-28 bg-white">
    <div className="max-w-2xl mx-auto px-4 sm:px-6">

      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border-l-[3px] border-emerald-500 pl-6 mb-16 sm:mb-20"
      >
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 italic leading-snug">
          "You're not lazy. You're not broken. You're fighting a system that was built to make you fail."
        </p>
      </motion.blockquote>

      {/* Intro */}
      <div className="space-y-5 text-gray-600 text-base sm:text-lg leading-relaxed mb-14 sm:mb-16">
        <p>
          You wake up and the first thing you think about is what you shouldn't eat today. You've told yourself it starts Monday, it starts after the weekend, it starts after this last one.
        </p>
        <p className="text-gray-900 font-semibold">
          But here's what no one talks about — the part that actually hurts:
        </p>
      </div>

      {/* Pain chapters */}
      {[
        {
          title: "THE MIRROR",
          body: "You avoid full-length mirrors. You've stopped wearing the jeans that used to make you feel like yourself. There's a dress — or a top, or a swimsuit — hanging in your wardrobe that you keep telling yourself you'll fit back into \"when you sort it out.\" It's been there two years. Three years. You stopped counting.",
        },
        {
          title: "THE PHOTOS",
          body: "Someone takes a photo and you feel your stomach drop. You ask to see it before they post it. You untag yourself. You smile through events and then look at the pictures afterward and feel like a stranger in your own body. You look tired. You look older than you feel inside. And sugar is part of why.",
        },
        {
          title: "THE SKIN",
          body: "You've noticed it. The dullness. The breakouts that shouldn't still be happening at your age. The puffiness in the morning. You spend money on skincare that barely keeps up — not knowing that what you're eating is quietly undoing everything you put on your face. Sugar inflames. Sugar ages. No serum can outrun a daily sugar habit.",
        },
        {
          title: "THE SELF-TRUST",
          body: "This one is the hardest. Every time you promised yourself you'd stop and didn't — a small part of you started to believe you couldn't. That you were the problem. You've started making promises to yourself you don't believe you'll keep. That quiet voice that says \"you'll probably fail this time too\" — you've started agreeing with it.",
        },
      ].map((chapter, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="mb-10 sm:mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px bg-gray-200 flex-1" />
            <span className="text-[10px] font-black tracking-[0.25em] text-gray-400 uppercase whitespace-nowrap">
              {chapter.title}
            </span>
            <div className="h-px bg-gray-200 flex-1" />
          </div>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed">{chapter.body}</p>
        </motion.div>
      ))}

      {/* Closer */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-gray-900 font-bold text-base sm:text-lg text-center mt-6 pt-6 border-t border-gray-100"
      >
        That voice is wrong. And this is where it stops.
      </motion.p>
    </div>
  </section>
);

/* ───────────────────────── REAL COST SECTION ───────────────────────── */
const RealCostSection = () => (
  <section className="py-16 sm:py-24 bg-gray-950 text-white">
    <div className="max-w-2xl mx-auto px-4 sm:px-6">

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-gray-400 text-xs sm:text-sm font-black uppercase tracking-[0.25em] mb-6 sm:mb-8"
      >
        Before we talk about price
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-4xl font-black text-white leading-tight mb-10 sm:mb-12"
      >
        Let's talk about what staying exactly where you are is actually costing you.
      </motion.h2>

      {/* Cost grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-12 sm:mb-14">
        {[
          { label: "YOUR WARDROBE", status: "Locked", desc: "Clothes you love, hanging unworn. Money spent on things you buy \"for when.\"" },
          { label: "YOUR SKIN", status: "Inflamed", desc: "Skincare bills growing while the root cause stays untouched." },
          { label: "YOUR ENERGY", status: "Hijacked", desc: "Sugar spikes and crashes running your mood, focus, and afternoons." },
          { label: "YOUR CONFIDENCE", status: "Shrinking", desc: "Every failed attempt quietly chips away at what you believe about yourself." },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{item.label}</span>
              <span className="text-[9px] font-black uppercase tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full whitespace-nowrap">{item.status}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Emotional cost paragraph */}
      <div className="space-y-5 text-gray-400 text-base sm:text-lg leading-relaxed mb-12 sm:mb-14">
        <p>
          And the emotional cost — the rollercoaster of bingeing, guilt, shame, promising yourself again, failing again — that's not abstract. That is hours of your life, weeks of your mental energy, years of not fully showing up as yourself because a part of you is always distracted by this.
        </p>
        <p className="text-white font-semibold">
          What is it worth to you to get off that rollercoaster? Not someday. Now.
        </p>
        <p>
          You've probably spent more than {PRICE} this month on skincare trying to fix from the outside what's broken on the inside. More than {PRICE} on food that's feeding the addiction. More than {PRICE} on clothes that don't fit the way you want them to.
        </p>
        <p>
          This workshop costs <span className="text-white font-bold">{PRICE}.</span> One time. And it addresses the actual problem — not the symptoms.
        </p>
      </div>

      {/* Mid-page CTA */}
      <div className="border border-gray-800 rounded-2xl p-6 sm:p-8 text-center">
        <p className="text-gray-400 text-sm mb-5 italic">Ready now? You don't have to keep reading.</p>
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-black rounded-xl transition-all hover:-translate-y-0.5 text-sm sm:text-base"
        >
          Get instant access — {PRICE}
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  </section>
);

/* ───────────────────────── QUIZ ───────────────────────── */
const MetabolicQuiz = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  const questions = [
    { q: "Do you feel tired or sluggish after meals?", weight: 20 },
    { q: "Do you struggle to lose weight even when eating less?", weight: 30 },
    { q: "Do you experience afternoon brain fog or energy crashes?", weight: 25 },
    { q: "Do you have intense cravings for sugar, bread, or carbs?", weight: 25 },
  ];

  if (step >= questions.length) {
    return (
      <section className="py-12 sm:py-20 bg-emerald-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="text-emerald-200 font-black text-xs uppercase tracking-[0.3em] block mb-3 sm:mb-4">
              Assessment Complete
            </span>
            <h2 className="text-2xl sm:text-4xl font-black mb-4 uppercase tracking-tighter italic">
              Your Metabolic Damage Score: {score}%
            </h2>
            <div className="w-full bg-emerald-800 h-4 rounded-full mb-6 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${score}%` }} transition={{ duration: 1.5 }} className="h-full bg-yellow-400 rounded-full" />
            </div>
            <p className="text-xl sm:text-2xl font-bold mb-4 leading-tight">
              Your metabolism is likely stuck in <span className="text-yellow-300 underline">"Fat Storage Mode."</span>
            </p>
            <p className="text-emerald-100 mb-10 text-lg">
              This means your body is burning up to <span className="font-black text-white">400 fewer calories per day</span> than it should — and storing the rest as fat. But it's fixable.
            </p>
            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-700 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all uppercase"
            >
              Fix My Metabolism — Reserve Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-emerald-50 border-y border-emerald-100">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-emerald-600 font-black text-xs uppercase tracking-[0.3em] mb-3 block">
          Free Metabolic Assessment
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-10 tracking-tight">
          Is Your "Metabolic Switch" Turned OFF?
        </h2>
        <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-emerald-100">
          <div className="flex items-center justify-center gap-2 mb-8">
            {questions.map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-full ${i <= step ? "bg-emerald-500" : "bg-gray-200"} transition-colors`} />
            ))}
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-800 mb-10">{questions[step].q}</p>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => { setScore((s) => s + questions[step].weight); setStep((s) => s + 1); }}
              className="py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 text-lg"
            >
              YES
            </button>
            <button
              onClick={() => setStep((s) => s + 1)}
              className="py-4 bg-gray-100 text-gray-600 font-black rounded-2xl hover:bg-gray-200 transition-all text-lg"
            >
              NO
            </button>
          </div>
          <div className="mt-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Question {step + 1} of {questions.length}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── RESULTS ───────────────────────── */
const Results = () => {
  const reviews = [
    {
      name: "Sarah J.",
      age: 34,
      result: "Lost 23 lbs, no more bloating",
      time: "60 days",
      quote: "The cravings stopped on Day 9. I literally cried. I'd been trying to quit sugar for 4 years and couldn't last a week. Now I don't even think about it.",
      highlight: "Sugar cravings: gone",
    },
    {
      name: "Elena V.",
      age: 37,
      result: "Hormones balanced, skin glowing",
      time: "90 days",
      quote: "My periods are regular for the first time in 6 years. My skin cleared up. I have energy that lasts all day. I feel like I got an entirely different body.",
      highlight: "Energy all day, every day",
    },
    {
      name: "Claire T.",
      age: 29,
      result: "Lost 18 lbs as a mom of 3",
      time: "75 days",
      quote: "I needed something that didn't require the gym or meal prepping for hours. This was it. My bloating is gone, I wear clothes I haven't touched in years.",
      highlight: "Fits in real life",
    },
    {
      name: "Michael R.",
      age: 42,
      result: "Reversed pre-diabetes",
      time: "4 months",
      quote: "My doctor took me off blood sugar medication. I haven't felt this good in 20 years. The science in this course should be taught in schools.",
      highlight: "Doctor confirmed results",
    },
  ];

  return (
    <section id="results" className="py-12 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">
            Real People. Real Results.
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic">
            What Happens When You Fix The Root Cause
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            These students didn't "go on a diet." They fixed the actual problem.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
          {[
            { num: "3,000+", label: "Students Enrolled" },
            { num: "7–14 days", label: "Cravings Gone" },
            { num: "94%", label: "Keep It Off 1yr+" },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 bg-emerald-50 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tighter">{s.num}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Review Cards — text only, no fake images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-3xl p-6 border border-gray-100 hover:shadow-xl hover:border-emerald-100 transition-all flex flex-col"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed mb-5 flex-1">"{r.quote}"</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full mb-4 w-fit">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                <span className="text-[10px] font-black text-emerald-700 uppercase tracking-wider">{r.highlight}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <span className="font-black text-gray-900 text-sm">{r.name}, {r.age}</span>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{r.result}</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full uppercase tracking-widest">{r.time}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all"
          >
            I Want These Results Too <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── THE SHIFT ───────────────────────── */
const TheShiftSection = () => (
  <section className="py-16 sm:py-28 bg-white">
    <div className="max-w-2xl mx-auto px-4 sm:px-6">

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-emerald-600 text-xs font-black uppercase tracking-[0.25em] mb-8 sm:mb-10"
      >
        The truth they never told you
      </motion.p>

      <div className="space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed mb-12 sm:mb-14">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          Sugar addiction is not a character flaw. It is a biological and psychological response — one that was deliberately engineered by a trillion-dollar food industry that profits from you staying hooked.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          Your brain on sugar behaves like your brain on certain drugs. Dopamine floods in. Your body screams "again." The more you eat, the louder the signal gets. And when you try to stop — the withdrawal is real. The cravings are real. The mood crashes are real.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
          You were not fighting a bad habit. You were fighting a chemical dependency designed by people with billion-dollar R&D budgets. Of course you struggled.
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="text-gray-900 font-semibold">
          The question was never "do you have enough willpower." The question was always "do you have the right roadmap."
        </motion.p>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }} className="text-gray-500">
          You didn't.
        </motion.p>
      </div>

      {/* "Until now." — isolated, lands like a door closing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="border-t border-b border-gray-900 py-8 sm:py-10 text-center"
      >
        <span className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight italic">Until now.</span>
      </motion.div>

    </div>
  </section>
);

/* ───────────────────────── SIMPLE TESTIMONIAL ───────────────────────── */
const SimpleTestimonial = () => (
  <section className="py-14 sm:py-20 bg-gray-950">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center gap-0.5 mb-6">
          {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
        </div>
        <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-medium italic leading-relaxed mb-6">
          "I cried on day 9. I walked past a bakery and felt absolutely nothing. After 4 years of trying, I finally understood why I kept failing — and it had nothing to do with me."
        </blockquote>
        <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">— Sarah J., 34</p>
      </motion.div>
    </div>
  </section>
);

/* ───────────────────────── CURRICULUM ───────────────────────── */
const Curriculum = () => {
  const modules = [
    {
      title: "Why Sugar Controls You",
      description: "Sugar isn't just a food — it's a neurobiological addiction that hijacks your dopamine the same way nicotine and alcohol do. Understand why you can't 'just stop' — and why it's not your fault.",
      tag: "The Root Cause",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      title: "What Sugar Does To Your Body",
      description: "From insulin spikes to hormonal chaos, skin glycation, bloating, and mood crashes — this lesson shows the full systemic damage of refined sugar and exactly how your body can heal.",
      tag: "The Hidden Damage",
      icon: <Activity className="w-5 h-5" />,
    },
    {
      title: "Breaking the Biochemical Cycle",
      description: "No detox, no '30 days of suffering.' Learn how to shift out of sugar dependency by working with your biology — so cravings dissolve in 7–14 days without white-knuckling through them.",
      tag: "The Exit Route",
      icon: <RefreshCcw className="w-5 h-5" />,
    },
    {
      title: "Building Your Food Foundation",
      description: "Protein and healthy fats are the antidotes to sugar — they stabilize blood sugar, satisfy your brain's dopamine system, and eliminate cravings at the biological level. Learn the exact formula.",
      tag: "The Nutritional Base",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "The 80/20 Freedom Method",
      description: "This isn't a diet — it's a system. 80% nourishing whole foods. 20% real life. Learn how to eat at restaurants, enjoy desserts, travel, and celebrate — without guilt, setbacks, or losing progress.",
      tag: "Permanent Flexibility",
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: "The New You: Mind & Resilience",
      description: "Address emotional eating, break the shame cycle, and build the inner stability that makes results permanent. This is where knowledge becomes identity — and lasting change becomes inevitable.",
      tag: "Lifelong Freedom",
      icon: <Heart className="w-5 h-5" />,
    },
  ];

  return (
    <section id="curriculum" className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">What's Inside</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tighter uppercase">
            6 Lessons That Change Everything
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Science-backed. Practical. Designed for real life — not a laboratory.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  {m.icon}
                </div>
                <div>
                  <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lesson {i + 1}</div>
                  <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{m.tag}</div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── WHAT'S INSIDE ───────────────────────── */
const CourseInsideSection = () => {
  const videos = [
    {
      num: "01",
      title: "Introduction: why this is different",
      desc: "Why every approach you've tried before was missing something. What this roadmap covers and how to use it to get results.",
    },
    {
      num: "02",
      title: "Dopamine hooked: how sugar hijacks your brain",
      desc: "The neuroscience of cravings explained simply. Why your brain was wired to want more — and how that wiring gets exploited by the food you eat every day.",
    },
    {
      num: "03",
      title: "The bliss point: what the food industry did to you",
      desc: "The deliberate science of addictive food formulas. The exact sugar, fat, and salt ratio engineered to make stopping impossible. Once you see this, you can't unsee it.",
    },
    {
      num: "04",
      title: "The real consequences: what excess sugar costs your body",
      desc: "Inflammation, skin aging, energy crashes, weight fluctuation, hormonal disruption. Why it shows up on your face and in your clothes.",
    },
    {
      num: "05",
      title: "The nutritional solution: what to eat instead (and why it works)",
      desc: "Practical, non-restrictive guidance. The 80/20 approach — no perfection required. How to stop feeling deprived within days, not weeks.",
    },
    {
      num: "06",
      title: "The psychological solution: rewiring the craving loop",
      desc: "How emotional eating forms and what replaces it. The tools that interrupt the cycle. What to do when you slip — because you will, and that's okay.",
    },
    {
      num: "07",
      title: "The behavioral solution: making change permanent",
      desc: "Why motivation always fails and what replaces it. How to rebuild trust with yourself — one kept promise at a time.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] block mb-5">
            What's Inside
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
            Most programs give you one thing. This workshop gives you all seven layers of the problem — in sequence, because that's the only way it actually sticks.
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            7 videos · 15–20 min each · instant access · yours forever
          </p>
        </div>

        {/* Video list */}
        <div className="rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
          {videos.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="flex gap-5 sm:gap-7 p-5 sm:p-6 hover:bg-gray-800/40 transition-colors group"
            >
              <span className="text-emerald-500 font-black text-sm tabular-nums pt-0.5 flex-shrink-0 w-6 group-hover:text-emerald-400 transition-colors">
                {v.num}
              </span>
              <div>
                <h3 className="text-white font-bold text-sm sm:text-base mb-1.5 leading-snug">{v.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

/* ───────────────────────── BIO / KRISTINA OZ ───────────────────────── */
const Bio = () => (
  <section className="py-12 sm:py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 sm:gap-12 lg:gap-16">
        {/* Photo */}
        <div className="w-full md:w-5/12">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <img
              src="/kristina.jpg"
              alt="Kristina Oz — Nutrition Coach"
              className="relative rounded-3xl shadow-2xl z-10 border-4 border-white w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-2xl z-20 shadow-xl">
              <div className="text-sm font-black italic leading-tight">From Ukraine<br/>To The World</div>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="w-full md:w-7/12">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Who made this — Kristina Oz</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3 mb-6 leading-tight">
            I didn't create this workshop as an expert. I created it as someone who was desperate.
          </h2>
          <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              For years I was stuck in the same cycle you're in — bingeing, restricting, promising myself it would be different this time, failing, and quietly losing faith in myself. I thought I lacked discipline. I thought everyone else just had something I didn't.
            </p>
            <p>
              Then I started studying — not to become a nutritionist, but because I needed to understand why I couldn't stop. What I found changed everything. The food I was eating was literally{" "}
              <span className="text-gray-900 font-semibold">engineered to override my biology.</span> My dopamine was being hijacked. My insulin was overwhelmed. I wasn't failing — I was fighting a system designed by billion-dollar companies to make sure I kept coming back.
            </p>
            <p>
              Once I understood the mechanism, I stopped struggling. The weight came off. The cravings faded. My skin cleared. And the version of me that had been buried under years of guilt and self-blame started to come back.
            </p>
            <p>
              I built this workshop because the information that freed me is scattered across books, studies, and documentaries most people will never find.{" "}
              <span className="text-gray-900 font-semibold">I put it in one place, in the right order, at a price that makes saying no feel ridiculous.</span> Because I know what it feels like to stay stuck when you didn't have to.
            </p>
          </div>

          {/* Quote */}
          <div className="mt-7 p-5 bg-gray-50 rounded-2xl border border-gray-100">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "I priced it this way on purpose — so that price is never the reason you stayed where you are."
            </p>
            <div className="mt-3 text-xs font-black text-emerald-600 not-italic uppercase tracking-widest">— Kristina Oz</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
const Testimonials = () => (
  <section id="testimonials" className="py-12 sm:py-20 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">Student Stories</span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tighter uppercase">
          They Fixed Their Metabolism. You Can Too.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          {
            name: "Anna K.",
            role: "Lost 21 lbs — Kept it off 2 years",
            text: "I'd tried every diet for 10 years. This was the first time someone explained WHY I kept failing — it was neurobiology, not weakness. The cravings stopped on Day 11. I haven't 'dieted' since.",
            img: 47,
          },
          {
            name: "Mark T.",
            role: "Pre-diabetes reversed in 3 months",
            text: "My doctor was shocked. Blood sugar normal for the first time in 7 years. I have more energy than I did in my 20s. The science Kristina teaches should be in every school.",
            img: 33,
          },
          {
            name: "Lisa M.",
            role: "Mother of 2 — Lost 26 lbs",
            text: "No meal prep marathon. No gym. No calorie apps. I learned how food actually works in my body — and made simple shifts. My skin is clearer, my mood is stable, and I wear a size I haven't seen in 5 years.",
            img: 54,
          },
        ].map((t, i) => (
          <div key={i} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
            <div className="flex gap-0.5 mb-4">
              {[...Array(5)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed text-sm">"{t.text}"</p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <img src={`https://i.pravatar.cc/100?img=${t.img}`} alt={t.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-bold text-gray-900 text-sm">{t.name}</div>
                <div className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{t.role}</div>
              </div>
              <div className="ml-auto">
                <BadgeCheck className="w-5 h-5 text-emerald-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────── BONUSES ───────────────────────── */
const Bonuses = () => (
  <section className="py-16 sm:py-24 bg-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="mb-10 sm:mb-12">
        <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-5">And then there's everything else included</span>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">Bonus resources</h2>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "Eating through your cycle",
            desc: "Foods and nutrients matched to each phase of your menstrual cycle. Your needs change every week — and almost no one talks about this.",
          },
          {
            title: "Hidden names of sugar",
            desc: "The 50+ names sugar hides behind on food labels. You'll never be fooled at the supermarket again.",
          },
          {
            title: "The truth about fructose",
            desc: "Why fruit sugar and added fructose behave completely differently in your body.",
          },
          {
            title: "Curated listening",
            desc: "Andrew Huberman on dopamine, Robert Lustig on sugar, and the documentary that exposes the food industry's own internal research.",
          },
        ].map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-4 p-5 border border-gray-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

/* ───────────────────────── VALUE VS COST ───────────────────────── */
const FearSection = () => (
  <section className="py-16 sm:py-24 bg-gray-950 text-white overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-black text-white mb-10 sm:mb-12"
        >
          The cost of staying the same → what changes with the roadmap
        </motion.h2>

        {/* Comparison rows */}
        <div className="space-y-0 rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800 mb-10 sm:mb-12">
          {[
            {
              cost: "Skincare that can't keep up with inflammation",
              gain: "Skin that clears because the cause is gone",
            },
            {
              cost: "Clothes you avoid, wardrobe you can't enjoy",
              gain: "Reaching for the jeans that used to mock you",
            },
            {
              cost: "Energy crashes and mood swings every afternoon",
              gain: "Afternoons that don't crash",
            },
            {
              cost: "Another year of promising yourself and failing",
              gain: "Finally finishing what you started",
            },
            {
              cost: "The quiet erosion of self-trust",
              gain: "A promise to yourself you actually kept",
            },
          ].map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="grid sm:grid-cols-2"
            >
              <div className="flex items-start gap-3 p-4 sm:p-5 bg-gray-900/60">
                <X className="w-3.5 h-3.5 text-red-400 flex-shrink-0 mt-1" />
                <p className="text-gray-500 text-sm leading-relaxed">{row.cost}</p>
              </div>
              <div className="flex items-start gap-3 p-4 sm:p-5 bg-emerald-950/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-1" />
                <p className="text-emerald-100 text-sm leading-relaxed font-medium">{row.gain}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={CHECKOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-base sm:text-lg rounded-2xl transition-all hover:-translate-y-0.5 uppercase"
          >
            Get instant access — {PRICE} <ArrowRight className="w-5 h-5" />
          </a>
          <p className="mt-4 text-gray-600 text-xs font-bold uppercase tracking-widest">30-Day Money-Back Guarantee · No Questions Asked</p>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── PRICING ───────────────────────── */
const Pricing = () => {
  const [viewCount] = useState(Math.floor(Math.random() * 30) + 45);

  return (
    <section id="pricing" className="py-12 sm:py-20 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-800/15 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] block mb-3">Pre-Launch Pricing</span>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter italic uppercase">
            Reserve Your Spot
          </h2>
          <p className="text-lg text-gray-400">
            Pre-launch pricing ends soon. Lock in your spot at the <span className="text-white font-bold">lowest price this will ever be</span>.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-yellow-400 text-sm font-bold">
            <Eye className="w-4 h-4" />
            {viewCount} people are viewing this page right now
          </div>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-10 md:p-14 text-gray-900 shadow-[0_0_80px_rgba(16,185,129,0.2)] border-2 sm:border-4 border-emerald-500/20 relative">
          {/* Value Stack */}
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-1" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">What You Get</span>
              <div className="h-px bg-gray-200 flex-1" />
            </div>
            <div className="space-y-4">
              {[
                { name: "The Forever Method Core System (63+ lessons)", val: "$997" },
                { name: "The 7-Day Metabolic Kickstart Guide", val: "$197" },
                { name: "The 'Eating Out' Survival Guide", val: "$97" },
                { name: "The Craving Killer Cheat Sheet", val: "$97" },
                { name: "Bonus: Future Course Updates (Free Forever)", val: "$297" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="font-semibold text-gray-700 text-sm sm:text-base">{item.name}</span>
                  </div>
                  <span className="font-bold text-gray-300 line-through text-sm sm:text-base shrink-0 ml-2">{item.val}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">Total Value</span>
                  <span className="text-xl sm:text-2xl font-black text-gray-900">Combined Value</span>
                </div>
                <span className="text-3xl sm:text-4xl font-black text-red-500">$1,685</span>
              </div>
            </div>
          </div>

          {/* Price Box */}
          <div className="text-center">
            <div className="mb-10 p-6 sm:p-8 bg-emerald-50 rounded-3xl border-2 border-dashed border-emerald-200 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">
                Pre-Launch Price
              </div>
              <div className="mb-4 mt-2">
                <span className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] block mb-1">
                  Reserve Your Spot Today
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Course launches soon — Secure your spot at the lowest price
                </span>
              </div>
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <span className="text-2xl sm:text-4xl text-gray-300 line-through font-black">$1,685</span>
                <span className="text-5xl sm:text-7xl font-black text-emerald-600 tracking-tighter">{PRICE}</span>
              </div>
              <p className="text-gray-500 mt-4 text-xs font-bold uppercase tracking-widest">
                One-time payment • Lifetime access • 30-day guarantee
              </p>
            </div>

            <a
              href={CHECKOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-6 sm:py-7 text-xl sm:text-2xl font-black text-white bg-emerald-600 rounded-2xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all mb-6 flex items-center justify-center gap-3"
            >
              RESERVE MY SPOT — {PRICE}
              <ArrowRight className="w-7 h-7" />
            </a>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">SSL Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">30-Day Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">3k+ Students</span>
              </div>
            </div>

            {/* Payment icons placeholder */}
            <div className="flex items-center justify-center gap-3 text-gray-300 text-xs font-bold">
              <span className="px-3 py-1.5 border border-gray-200 rounded-md font-black">PayPal</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">VISA</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">MC</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">AMEX</span>
            </div>
          </div>

          {/* Guarantee */}
          <div className="mt-10 p-1 bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-200 rounded-3xl shadow-xl">
            <div className="bg-white rounded-[calc(1.5rem-4px)] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 text-left relative overflow-hidden">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                  <Award className="w-10 h-10 text-yellow-900" />
                </div>
              </div>
              <div className="flex-1">
                <div className="inline-block bg-yellow-100 text-yellow-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                  30-Day Money-Back Guarantee
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight uppercase italic leading-none">
                  Zero Risk. 100% Protected.
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  If the course doesn't deliver on its promise, email us within 30 days and get a{" "}
                  <span className="font-bold text-gray-900">full refund</span>. No questions. No hoops. No hard feelings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── FAQ ───────────────────────── */
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  const faqs = [
    {
      q: "I've tried everything before.",
      a: "You've tried diets, challenges, cutting back. You haven't had a complete system that addresses nutrition, psychology, behavior, and industry manipulation all at once. This is different in structure — and structure is what changes outcomes.",
    },
    {
      q: "I don't have time for a course.",
      a: "The first video is under 20 minutes. You could be further along by tonight than you've been in years.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "At this price, the risk is essentially zero. You spend more than this on food that's part of the problem. What's the cost of staying exactly where you are for another year? And if you don't feel you got your money's worth — just email us within 30 days for a full refund.",
    },
    {
      q: "Maybe I just don't have the willpower.",
      a: "That's the lie the food industry needs you to believe. Willpower is not the answer — understanding and the right system are. This workshop gives you both.",
    },
    {
      q: `Is a ${PRICE} workshop actually worth anything?`,
      a: `What's inside would cost you hundreds to assemble separately — a nutritionist session, a therapist appointment, books, documentaries. The price is low on purpose. Not because the content is thin, but because I don't want price to be the reason you stayed stuck. Go through it. If you don't feel you got your money's worth, that says more about me than about you.`,
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tighter uppercase">
            Frequently Asked Questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
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
                    <p className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">{faq.a}</p>
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

/* ───────────────────────── CLOSING ───────────────────────── */
const FinalCTA = () => (
  <section className="py-20 sm:py-32 bg-gray-950 text-white">
    <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">

      {/* Pull quote */}
      <motion.blockquote
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl sm:text-2xl md:text-3xl font-bold italic text-white leading-snug mb-12 sm:mb-14"
      >
        "Imagine getting dressed in the morning and reaching for the thing you actually want to wear — not the thing that fits."
      </motion.blockquote>

      {/* Closing paragraphs */}
      <div className="space-y-5 text-gray-400 text-base sm:text-lg leading-relaxed mb-12 sm:mb-14 text-left">
        <p>
          Imagine looking at a photo of yourself and feeling okay. Good, even. Imagine your skin clearing, your energy steady, your sleep deeper. Imagine going a full week without a craving taking over — and realizing that the voice that used to say "you'll fail" has gone quiet.
        </p>
        <p>
          That's what happens when the biology is addressed, not just the willpower. That's what this workshop is designed to start.
        </p>
        <p className="text-white font-semibold">
          And it's {PRICE}. One time. Less than you've spent this week on food that's part of the problem.
        </p>
        <p>
          I priced it this way on purpose — so that price is never the reason you stayed where you are.
        </p>
      </div>

      {/* Urgency line */}
      <p className="text-gray-500 text-xs sm:text-sm uppercase tracking-[0.2em] font-bold mb-7">
        Every day this stays unsolved is another day of the same cycle. This is the exit.
      </p>

      {/* CTA */}
      <a
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-lg rounded-2xl shadow-2xl shadow-emerald-500/20 hover:-translate-y-1 transition-all mb-4"
      >
        Get instant access — {PRICE}
        <ArrowRight className="w-5 h-5" />
      </a>

      <p className="text-xs text-gray-600 font-bold uppercase tracking-widest flex items-center justify-center gap-2 mb-8">
        <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
        7 videos · bonus guides · one-time payment · instant access · yours forever
      </p>

      <p className="text-gray-500 text-sm italic">
        The sweets aren't going anywhere. But you don't have to keep losing to them.
      </p>

    </div>
  </section>
);

const PS = () => null;

/* ───────────────────────── FOOTER ───────────────────────── */
const Footer = () => (
  <footer className="py-10 bg-gray-50 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-600 rounded flex items-center justify-center">
            <Flame className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-base tracking-tight text-gray-900">THE FOREVER METHOD</span>
        </div>
        <div className="flex gap-8 text-sm font-medium text-gray-500">
          <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
          <a href="mailto:krudstina@gmail.com" className="hover:text-emerald-600 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-400">
          This site is not a part of Facebook or Meta. Results vary. Consult your physician.
        </p>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1.5">
          Made with{" "}
          <span className="text-red-500 text-sm">♥</span>
          {" "}in the Netherlands
        </span>
        <a
          href="mailto:krudstina@gmail.com"
          className="hover:text-emerald-600 transition-colors font-medium"
        >
          krudstina@gmail.com
        </a>
      </div>
    </div>
  </footer>
);

/* ───────────────────────── EXIT INTENT POPUP ───────────────────────── */
const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const triggered = useRef(false);
  const loadTime = useRef(Date.now());
  const maxScroll = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // Already shown this session? Don't set up listeners at all.
    if (sessionStorage.getItem("exit_popup_shown")) {
      triggered.current = true;
      return;
    }

    const MIN_TIME_MS = 30_000; // 30 seconds minimum on page
    const MIN_SCROLL_PCT = 25; // Must have scrolled 25% of page

    const isReady = () => {
      const elapsed = Date.now() - loadTime.current;
      return elapsed >= MIN_TIME_MS && maxScroll.current >= MIN_SCROLL_PCT;
    };

    const fire = () => {
      if (triggered.current) return;
      triggered.current = true;
      sessionStorage.setItem("exit_popup_shown", "1");
      setShow(true);
    };

    // Track max scroll depth
    const scrollTracker = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const pct = (scrollTop / docHeight) * 100;
        if (pct > maxScroll.current) maxScroll.current = pct;
      }
      lastScrollY.current = scrollTop;
    };

    // Desktop: mouse leaves viewport from top
    const mouseHandler = (e: MouseEvent) => {
      if (e.clientY < 10 && isReady()) fire();
    };

    // Mobile: rapid scroll-up (user pulling up to leave)
    let mobileScrollTimer: ReturnType<typeof setTimeout> | null = null;
    const mobileScrollHandler = () => {
      scrollTracker();
      // Only on touch devices
      if (!("ontouchstart" in window)) return;
      if (!isReady()) return;

      const scrollY = window.scrollY;
      // User scrolled up fast (>300px jump) while near the top of the page
      if (lastScrollY.current - scrollY > 300 && scrollY < 200) {
        if (mobileScrollTimer) clearTimeout(mobileScrollTimer);
        mobileScrollTimer = setTimeout(() => fire(), 500);
      }
    };

    // Mobile fallback: idle timer (60s on page + 25% scroll + no interaction for 15s)
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const IDLE_DELAY = 15_000;
    const IDLE_MIN_TIME = 60_000;

    const resetIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (!("ontouchstart" in window)) return;
      const elapsed = Date.now() - loadTime.current;
      if (elapsed >= IDLE_MIN_TIME && maxScroll.current >= MIN_SCROLL_PCT && !triggered.current) {
        idleTimer = setTimeout(() => fire(), IDLE_DELAY);
      }
    };

    window.addEventListener("scroll", scrollTracker, { passive: true });
    window.addEventListener("scroll", mobileScrollHandler, { passive: true });
    document.addEventListener("mouseleave", mouseHandler);
    window.addEventListener("touchstart", resetIdle, { passive: true });
    window.addEventListener("touchend", resetIdle, { passive: true });

    return () => {
      window.removeEventListener("scroll", scrollTracker);
      window.removeEventListener("scroll", mobileScrollHandler);
      document.removeEventListener("mouseleave", mouseHandler);
      window.removeEventListener("touchstart", resetIdle);
      window.removeEventListener("touchend", resetIdle);
      if (mobileScrollTimer) clearTimeout(mobileScrollTimer);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 max-w-lg w-full shadow-2xl text-center z-10"
      >
        <button onClick={() => setShow(false)} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">&#x1F6D1;</div>
        <h3 className="text-xl sm:text-3xl font-black text-gray-900 mb-2 sm:mb-3 tracking-tighter uppercase">
          Wait — Don't Leave Yet!
        </h3>
        <p className="text-sm sm:text-base text-gray-600 mb-5 sm:mb-6">
          The price of <span className="font-bold text-gray-900">{PRICE}</span> won't last. Lock in your spot now before it goes up.
        </p>
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setShow(false)}
          className="block w-full py-3.5 sm:py-4 text-base sm:text-lg font-black text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all mb-3 sm:mb-4"
        >
          RESERVE FOR {PRICE}
        </a>
        <p className="text-[10px] sm:text-xs text-gray-400">30-day money-back guarantee. Zero risk.</p>
      </motion.div>
    </div>
  );
};

/* ───────────────────────── APP ───────────────────────── */
export default function Landing() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900 pb-16 sm:pb-0">
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <RealCostSection />
        <TheShiftSection />
        <SimpleTestimonial />
        <CourseInsideSection />
        <Bonuses />
        <FearSection />
        <Bio />
        <FAQ />
        <FinalCTA />
      </main>
      <ExitIntentPopup />
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-gray-100 z-[55]">
        <a
          href={CHECKOUT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-emerald-600 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 active:scale-95 transition-transform"
        >
          RESERVE MY SPOT — {PRICE}
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
