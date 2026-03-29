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
                href="#pricing"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-full hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Calendar className="w-4 h-4" />
                Reserve Now — $37
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
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center py-3 text-lg font-black text-white bg-emerald-600 rounded-2xl"
              >
                Reserve My Spot — $37
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

/* ───────────────────────── HERO ───────────────────────── */
const Hero = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="pt-36 sm:pt-40 pb-16 sm:pb-24 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            {/* Badges */}
            <div className="flex flex-col items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 text-[10px] font-black tracking-[0.2em] text-emerald-700 uppercase bg-emerald-100 rounded-full border border-emerald-200">
                <Zap className="w-3.5 h-3.5 fill-emerald-600" />
                The #1 Metabolic Weight Loss System
              </span>
              <div className="flex items-center gap-2 bg-gray-900 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                <Calendar className="w-3 h-3" />
                Pre-Launch Offer — Course Starts April 14th
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-6 uppercase">
              The <span className="text-emerald-600 italic">Metabolic Switch</span> That Makes Your Body{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Burn Fat 24/7</span>
                <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-300/50 -z-0" />
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 leading-snug max-w-3xl mx-auto font-medium">
              Discover the <span className="text-gray-900 font-bold">Insulin-First Protocol</span> used by 3,000+ people to lose 20–50 lbs —{" "}
              <span className="underline decoration-emerald-300 decoration-2 underline-offset-4">without calorie counting, cardio, or willpower.</span>
            </p>

            {/* VSL Placeholder */}
            <div className="max-w-3xl mx-auto mb-12">
              <div
                onClick={() => setPlaying(true)}
                className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden cursor-pointer group shadow-2xl shadow-gray-300 border-4 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=675&fit=crop"
                  alt="Healthy food"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-600/50 mb-4"
                  >
                    <PlayCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white fill-white" />
                  </motion.div>
                  <span className="text-white font-black text-sm sm:text-lg uppercase tracking-wider">
                    Watch: Why Diets Don't Work (3 min)
                  </span>
                  <span className="text-emerald-300 text-xs font-bold mt-1 uppercase tracking-widest">
                    The science they don't teach you
                  </span>
                </div>
                {/* Fake progress bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
                  <div className="w-0 h-full bg-emerald-500" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-400 font-bold">
                <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> 47,382 views</span>
                <span>|</span>
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                  4.9/5
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-center gap-6 mb-14">
              <a
                href="#pricing"
                className="w-full sm:w-auto px-10 py-5 sm:py-6 text-xl sm:text-2xl font-black text-white bg-emerald-600 rounded-2xl shadow-2xl shadow-emerald-300/50 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 uppercase"
              >
                RESERVE MY SPOT — ONLY $37
                <ArrowRight className="w-6 h-6" />
              </a>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> 30-Day Money-Back Guarantee • Secure Checkout
              </p>
            </div>

            {/* Social Proof Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i + 10}`}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                    alt="Student"
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white">
                  +3k
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="flex items-center gap-1 justify-center sm:justify-start">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                  <span className="text-sm font-bold text-gray-900 ml-1">4.9</span>
                </div>
                <p className="text-xs text-gray-500 font-bold">3,000+ students enrolled</p>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
              {[
                { label: "NO EXERCISE", sub: "Required", icon: <Activity className="w-5 h-5" />, color: "text-blue-600" },
                { label: "EAT REAL FOOD", sub: "No Restrictions", icon: <Heart className="w-5 h-5" />, color: "text-red-500" },
                { label: "SEE RESULTS", sub: "In 7 Days", icon: <Zap className="w-5 h-5" />, color: "text-amber-500" },
                { label: "LIFETIME ACCESS", sub: "One Payment", icon: <Lock className="w-5 h-5" />, color: "text-purple-600" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className={`${item.color} mb-2`}>{item.icon}</div>
                  <span className="block text-xs sm:text-sm font-black tracking-tight text-gray-900 leading-none mb-0.5">
                    {item.label}
                  </span>
                  <span className="block text-[9px] font-bold uppercase tracking-widest text-gray-400">{item.sub}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── PAIN / PROBLEM ───────────────────────── */
const PainSection = () => (
  <section className="py-20 bg-gray-950 text-white overflow-hidden relative">
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2dyaWQpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-14">
        <span className="text-red-500 font-black text-xs uppercase tracking-[0.3em] block mb-4">The Uncomfortable Truth</span>
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
          Your Diet Is <span className="text-red-500 italic">Designed</span> To Fail
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          It's not your fault. The $72 billion diet industry profits when you fail and come back.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-px bg-gray-800 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
        <div className="bg-gray-900 p-8 sm:p-12">
          <h3 className="text-xl font-black mb-8 text-red-500 uppercase tracking-widest flex items-center gap-3">
            <X className="w-7 h-7" />
            What You've Been Told
          </h3>
          <ul className="space-y-5">
            {[
              "\"Just eat less and move more\"",
              "\"Count every calorie\"",
              "\"Do 60 min cardio daily\"",
              "\"Avoid all fats\"",
              "\"Use willpower to resist cravings\"",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-400">
                <X className="w-5 h-5 text-red-500/70 flex-shrink-0 mt-0.5" />
                <span className="text-base font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-red-500/10 rounded-2xl border border-red-500/20">
            <p className="text-red-400 text-sm font-bold">
              Result: 95% of dieters regain all weight within 2 years. Many gain back even more.
            </p>
          </div>
        </div>
        <div className="bg-emerald-950 p-8 sm:p-12 relative">
          <div className="absolute top-4 right-4">
            <div className="bg-emerald-500 text-white text-[9px] font-black px-3 py-1 rounded-full animate-pulse uppercase tracking-widest">
              Science-Based
            </div>
          </div>
          <h3 className="text-xl font-black mb-8 text-emerald-400 uppercase tracking-widest flex items-center gap-3">
            <CheckCircle2 className="w-7 h-7" />
            The Metabolic Truth
          </h3>
          <ul className="space-y-5">
            {[
              "Fix your insulin — fat burns automatically",
              "Eat until full (your hormones regulate it)",
              "Zero mandatory exercise",
              "Cravings disappear in 7–14 days",
              "Weight stays off because the ROOT CAUSE is fixed",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-emerald-50">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-base font-bold">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <p className="text-emerald-300 text-sm font-bold">
              Result: Address the biological cause. Lose weight and keep it off — permanently.
            </p>
          </div>
        </div>
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
      <section className="py-20 bg-emerald-600 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="text-emerald-200 font-black text-xs uppercase tracking-[0.3em] block mb-4">
              Assessment Complete
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 uppercase tracking-tighter italic">
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
              href="#pricing"
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
    <section className="py-20 bg-emerald-50 border-y border-emerald-100">
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

/* ───────────────────────── RESULTS / BEFORE-AFTER ───────────────────────── */
const Results = () => {
  const transformations = [
    { name: "Sarah J.", age: 34, lost: "47 lbs", time: "90 days", quote: "I finally understand WHY I was overweight. It had nothing to do with willpower." },
    { name: "Michael R.", age: 42, lost: "38 lbs", time: "60 days", quote: "My doctor took me off blood sugar medication. I haven't felt this good in 20 years." },
    { name: "Claire T.", age: 29, lost: "32 lbs", time: "75 days", quote: "As a mom of 3, I needed something that doesn't require hours at the gym. This was it." },
    { name: "David K.", age: 51, lost: "55 lbs", time: "120 days", quote: "I was skeptical. 4 months later, my wife says I look like I did when we married." },
  ];

  return (
    <section id="results" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">
            Real People. Real Results.
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4 uppercase italic">
            What Happens When You Fix The Root Cause
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            These students didn't just "go on a diet." They reprogrammed their metabolism.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-14">
          {[
            { num: "3,000+", label: "Students Enrolled" },
            { num: "37 lbs", label: "Avg. Weight Lost" },
            { num: "94%", label: "Keep It Off 1yr+" },
          ].map((s, i) => (
            <div key={i} className="text-center p-4 bg-emerald-50 rounded-2xl">
              <div className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tighter">{s.num}</div>
              <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Transformation Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow"
            >
              {/* Placeholder for before/after image */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 relative flex items-center justify-center">
                <div className="absolute inset-0 flex">
                  <div className="w-1/2 bg-gray-300 flex items-center justify-center border-r-2 border-white">
                    <span className="text-gray-500 font-black text-xs uppercase tracking-widest">Before</span>
                  </div>
                  <div className="w-1/2 bg-emerald-100 flex items-center justify-center">
                    <span className="text-emerald-600 font-black text-xs uppercase tracking-widest">After</span>
                  </div>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full">
                  -{t.lost}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-black text-gray-900">{t.name}, {t.age}</span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{t.time}</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed">"{t.quote}"</p>
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

/* ───────────────────────── HOW IT WORKS ───────────────────────── */
const HowItWorks = () => {
  const steps = [
    {
      title: "The Metabolic Audit",
      desc: "Understand exactly why your body is stuck in fat-storage mode. Identify your insulin resistance level, leptin sensitivity, and metabolic age.",
      icon: <Search className="w-7 h-7" />,
      color: "bg-blue-500",
    },
    {
      title: "The Insulin Reset",
      desc: "Implement the 'Insulin-First Protocol' — lower blood sugar spikes so your body is FORCED to burn stored fat as fuel. No starvation required.",
      icon: <Zap className="w-7 h-7" />,
      color: "bg-emerald-500",
    },
    {
      title: "Dopamine Rewiring",
      desc: "Break the addiction to processed food by resetting your brain's reward system. Cravings vanish within 7–14 days.",
      icon: <Brain className="w-7 h-7" />,
      color: "bg-purple-500",
    },
    {
      title: "The Forever Lock-In",
      desc: "Lock in your new metabolic baseline so your body maintains the weight loss permanently — even when you travel, eat out, or indulge.",
      icon: <RefreshCcw className="w-7 h-7" />,
      color: "bg-orange-500",
    },
  ];

  return (
    <section id="method" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">The 4-Step Protocol</span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 mt-4 mb-4 tracking-tighter uppercase italic">
            How The Forever Method Works
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            This isn't a diet. It's a biological system upgrade.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
          <div className="grid lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <div
                  className={`w-20 h-20 ${step.color} text-white rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300 relative`}
                >
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-xs font-black border-3 border-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3 uppercase tracking-tight">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 p-8 sm:p-10 bg-gray-900 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
          <h4 className="text-xl font-black text-white mb-3 uppercase italic">The End Result?</h4>
          <p className="text-emerald-400 text-2xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase">
            A Body That Burns Fat By Default
          </p>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            No more yo-yo dieting. No more guilt. Just a body that works the way it was designed to.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── CURRICULUM ───────────────────────── */
const Curriculum = () => {
  const modules = [
    { title: "The Metabolic Reset", description: "Why your metabolism is broken and the exact steps to fix it.", lessons: 12, icon: <Activity className="w-5 h-5" /> },
    { title: "The Insulin Protocol", description: "The science of insulin resistance and how to reverse it with food.", lessons: 10, icon: <Zap className="w-5 h-5" /> },
    { title: "The Hunger Hormone Hack", description: "Master Leptin and Ghrelin so you never feel 'starving' again.", lessons: 8, icon: <Brain className="w-5 h-5" /> },
    { title: "Emotional Eating Mastery", description: "Break the psychological link between stress and snacking.", lessons: 15, icon: <Heart className="w-5 h-5" /> },
    { title: "The Forever Lifestyle", description: "Eat out, travel, and enjoy life — without gaining weight back.", lessons: 10, icon: <Sparkles className="w-5 h-5" /> },
    { title: "Advanced Protocols", description: "Plateau-breaking strategies and metabolic optimization.", lessons: 8, icon: <Target className="w-5 h-5" /> },
  ];

  return (
    <section id="curriculum" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">What's Inside</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3 tracking-tighter uppercase">
            The Complete System
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            63+ video lessons. Science-backed. Step-by-step.
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
                <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  Module {i + 1}
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{m.description}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest">
                <PlayCircle className="w-4 h-4" />
                {m.lessons} Lessons
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ───────────────────────── BIO ───────────────────────── */
const Bio = () => (
  <section className="py-20 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full md:w-5/12">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=750&fit=crop&crop=face"
              alt="Dr. Elena Mirova"
              className="relative rounded-3xl shadow-2xl z-10 border-4 border-white w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 bg-emerald-600 text-white p-4 rounded-2xl z-20 shadow-xl">
              <div className="text-lg font-black italic leading-tight">MSc Nutritional<br/>Biochemistry</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-7/12">
          <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs">Your Instructor</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-3 mb-6 tracking-tighter leading-none uppercase italic">
            Dr. Elena Mirova, MSc
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              <span className="text-gray-900 font-bold">Nutritional Biochemist</span> and former university research associate specializing in metabolic health, insulin signaling, and the neuroscience of eating behavior.
            </p>
            <p>
              After years of watching patients fail on traditional diets, Elena developed The Forever Method — a protocol based on{" "}
              <span className="text-gray-900 font-bold">fixing the metabolic root cause of weight gain</span>, not treating the symptoms.
            </p>
            <p>
              Her approach synthesizes research from endocrinology, neuroscience, and behavioral psychology into a practical, step-by-step system that anyone can follow.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { num: "3,000+", label: "Students" },
              { num: "12+", label: "Years Research" },
              { num: "4.9/5", label: "Avg. Rating" },
            ].map((s, i) => (
              <div key={i} className="text-center p-3 bg-emerald-50 rounded-xl">
                <div className="text-xl font-black text-emerald-600">{s.num}</div>
                <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-gray-500 italic">
                "I don't do social media or public speaking. I do research, and I teach. This course is 12 years of metabolic research distilled into something anyone can understand and apply."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ───────────────────────── TESTIMONIALS ───────────────────────── */
const Testimonials = () => (
  <section id="testimonials" className="py-20 bg-gray-50">
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
            name: "Sarah Jenkins",
            role: "Lost 45 lbs — Kept it off 3 years",
            text: "I tried every diet under the sun. This was the first time I understood WHY I was eating the way I was. Once you understand the insulin connection, everything clicks. I haven't 'dieted' since.",
            img: 15,
          },
          {
            name: "Michael Chen",
            role: "Reversed pre-diabetes in 4 months",
            text: "My doctor was shocked. My blood sugar is normal for the first time in 8 years. I have more energy than I did in my 20s. The science in this course should be taught in schools.",
            img: 33,
          },
          {
            name: "Jessica Williams",
            role: "Mother of 3 — Lost 30 lbs",
            text: "No meal prep. No gym. No counting anything. I just learned how food actually works in my body and made simple switches. My husband started doing it too — he's down 25 lbs.",
            img: 23,
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
  <section className="py-20 bg-emerald-50">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="text-emerald-600 font-black uppercase tracking-[0.3em] text-xs block mb-3">Included Free</span>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter uppercase">
          3 Bonuses When You Reserve Today
        </h2>
      </div>

      <div className="space-y-4">
        {[
          {
            title: "The 7-Day Metabolic Kickstart",
            value: "$197",
            desc: "A done-for-you first-week plan to flush out excess glucose and reset your insulin sensitivity fast.",
            icon: <Zap className="w-6 h-6" />,
          },
          {
            title: "The 'Eating Out' Survival Guide",
            value: "$97",
            desc: "How to navigate any restaurant menu without derailing your progress. Includes 50+ chain restaurant hacks.",
            icon: <CheckCircle2 className="w-6 h-6" />,
          },
          {
            title: "Private Community Access",
            value: "$497",
            desc: "Join our private Telegram group with 3,000+ members. Get support, accountability, and answers from the team.",
            icon: <Send className="w-6 h-6" />,
          },
        ].map((b, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-emerald-100 flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-200">
              {b.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                <h3 className="text-lg font-bold text-gray-900">{b.title}</h3>
                <span className="text-emerald-600 font-bold text-sm shrink-0">Value: {b.value}</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ───────────────────────── WHAT IF YOU DO NOTHING ───────────────────────── */
const FearSection = () => (
  <section className="py-20 bg-gray-900 text-white">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="text-red-400 font-black text-xs uppercase tracking-[0.3em] block mb-4">A Moment of Honesty</span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-8 uppercase">
        What Happens If You <span className="text-red-500 italic">Do Nothing?</span>
      </h2>
      <div className="grid sm:grid-cols-3 gap-6 mb-12">
        {[
          { icon: <TrendingDown className="w-8 h-8" />, text: "Your metabolism slows another 2–5% each year" },
          { icon: <RefreshCcw className="w-8 h-8" />, text: "You try another diet, lose 10 lbs, gain 15 back" },
          { icon: <Clock className="w-8 h-8" />, text: "Another year passes with the same frustration" },
        ].map((item, i) => (
          <div key={i} className="p-6 bg-gray-800 rounded-2xl border border-gray-700">
            <div className="text-red-400 mb-4 flex justify-center">{item.icon}</div>
            <p className="text-gray-300 font-medium text-sm">{item.text}</p>
          </div>
        ))}
      </div>
      <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
        Or you can spend <span className="text-white font-bold">$37</span> today, understand the actual science, and{" "}
        <span className="text-emerald-400 font-bold">never diet again</span>.
      </p>
      <a
        href="#pricing"
        className="inline-flex items-center gap-3 px-10 py-5 bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-2xl shadow-emerald-600/30 hover:bg-emerald-700 transition-all uppercase"
      >
        Reserve My Spot Now <ArrowRight className="w-5 h-5" />
      </a>
    </div>
  </section>
);

/* ───────────────────────── PRICING ───────────────────────── */
const Pricing = () => {
  const [viewCount] = useState(Math.floor(Math.random() * 30) + 45);

  return (
    <section id="pricing" className="py-20 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/15 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-800/15 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em] block mb-3">Pre-Launch Pricing</span>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 tracking-tighter italic uppercase">
            Reserve Your Spot
          </h2>
          <p className="text-lg text-gray-400">
            Course launches <span className="text-white font-bold">April 14th</span>. Lock in the pre-launch price today.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 text-yellow-400 text-sm font-bold">
            <Eye className="w-4 h-4" />
            {viewCount} people are viewing this page right now
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-14 text-gray-900 shadow-[0_0_80px_rgba(16,185,129,0.2)] border-4 border-emerald-500/20 relative">
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
                { name: "Private Community (Telegram Group)", val: "$497" },
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
                <span className="text-3xl sm:text-4xl font-black text-red-500">$2,085</span>
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
                  Course launches April 14th — Instant access to community
                </span>
              </div>
              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <span className="text-3xl sm:text-4xl text-gray-300 line-through font-black">$2,085</span>
                <span className="text-7xl sm:text-8xl font-black text-emerald-600 tracking-tighter">$37</span>
              </div>
              <p className="text-gray-500 mt-4 text-xs font-bold uppercase tracking-widest">
                One-time payment • Lifetime access • 30-day guarantee
              </p>
            </div>

            <button className="w-full py-6 sm:py-7 text-xl sm:text-2xl font-black text-white bg-emerald-600 rounded-2xl shadow-2xl shadow-emerald-200 hover:bg-emerald-700 hover:scale-[1.02] active:scale-95 transition-all mb-6 flex items-center justify-center gap-3">
              RESERVE MY SPOT — $37
              <ArrowRight className="w-7 h-7" />
            </button>

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
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">VISA</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">MC</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">AMEX</span>
              <span className="px-3 py-1.5 border border-gray-200 rounded-md">PayPal</span>
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
      q: "When does the course start?",
      a: "The course officially launches on April 14th. When you reserve your spot today, you'll get immediate access to the private community and will be first in line when the course goes live.",
    },
    {
      q: "Is this another diet plan?",
      a: "No. This is a biological education system. We don't give you a meal plan to follow blindly — we teach you how your metabolism, hormones, and brain work together so you can make informed decisions for life.",
    },
    {
      q: "How is this different from other weight loss programs?",
      a: "Most programs treat the SYMPTOM (excess weight) by restricting calories. We treat the CAUSE (insulin resistance, metabolic damage, dopamine-driven cravings). Fix the cause, and the weight takes care of itself.",
    },
    {
      q: "Do I need to exercise?",
      a: "No mandatory exercise. This program is 100% focused on metabolic optimization through nutrition science. Exercise is great for health, but it's not required for the weight loss this method produces.",
    },
    {
      q: "How long do I have access?",
      a: "Lifetime. You pay once, you get access forever — including all future updates and new modules we add.",
    },
    {
      q: "What if it doesn't work for me?",
      a: "You're protected by our 30-day money-back guarantee. If you don't see results or feel the course isn't for you, just email us and we'll refund every penny. No questions asked.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
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

/* ───────────────────────── FINAL CTA / PS ───────────────────────── */
const FinalCTA = () => (
  <section className="py-20 bg-emerald-600 text-white">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-6 uppercase italic">
        Your Metabolism Won't Fix Itself
      </h2>
      <p className="text-xl text-emerald-100 mb-4 max-w-2xl mx-auto">
        Every day you wait, your body stores more fat and your metabolism slows further.
      </p>
      <p className="text-lg text-emerald-200 mb-10 max-w-xl mx-auto">
        For <span className="text-white font-black">$37</span>, you get the complete system that 3,000+ people have used to lose weight permanently. Plus a 30-day guarantee.
      </p>
      <a
        href="#pricing"
        className="inline-flex items-center gap-3 px-10 py-6 bg-white text-emerald-700 font-black text-xl rounded-2xl shadow-2xl hover:scale-105 transition-all uppercase"
      >
        RESERVE MY SPOT — $37
        <ArrowRight className="w-6 h-6" />
      </a>
      <p className="mt-6 text-emerald-200 text-sm font-bold">
        Secure checkout • 30-day money-back guarantee • Lifetime access
      </p>
    </div>
  </section>
);

const PS = () => (
  <section className="py-16 bg-white border-t border-gray-100">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
        <h3 className="text-lg font-black text-gray-900 mb-4">P.S. — If you scrolled straight to the bottom:</h3>
        <p className="text-gray-600 leading-relaxed mb-4 text-sm">
          Here's the short version: The Forever Method is a science-based mini-course that teaches you why diets fail (hint: it's your hormones, not your willpower) and how to fix it permanently. It launches April 14th.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
          Right now you can reserve your spot for <span className="font-bold text-gray-900">$37</span> instead of the regular price. You also get immediate access to our private community. And if you don't love it, you get every penny back within 30 days.
        </p>
        <a
          href="#pricing"
          className="block w-full py-4 text-center text-lg font-black text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all"
        >
          Reserve My Spot — $37
        </a>
      </div>
    </div>
  </section>
);

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
          <a href="#" className="hover:text-emerald-600 transition-colors">Support</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
        </div>
        <p className="text-xs text-gray-400">
          This site is not a part of Facebook or Meta. Results vary. Consult your physician.
        </p>
      </div>
    </div>
  </footer>
);

/* ───────────────────────── LIVE NOTIFICATIONS ───────────────────────── */
const LiveNotifications = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({ name: "Sarah J.", action: "just reserved a spot" });

  useEffect(() => {
    const pool = [
      { name: "Michael C.", action: "just reserved a spot" },
      { name: "Emma W.", action: "just joined the community" },
      { name: "David R.", action: "reserved a spot 2 min ago" },
      { name: "Jessica K.", action: "just reserved a spot" },
      { name: "John D.", action: "just joined the community" },
      { name: "Rachel M.", action: "reserved a spot 5 min ago" },
      { name: "Chris P.", action: "just reserved a spot" },
    ];
    const interval = setInterval(() => {
      setCurrent(pool[Math.floor(Math.random() * pool.length)]);
      setVisible(true);
      setTimeout(() => setVisible(false), 4000);
    }, 18000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          className="fixed bottom-20 sm:bottom-8 left-4 z-40 bg-white p-3.5 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3 max-w-[260px]"
        >
          <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Verified</div>
            <div className="text-sm font-bold text-gray-900">{current.name}</div>
            <div className="text-[10px] text-gray-400">{current.action}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ───────────────────────── EXIT INTENT POPUP ───────────────────────── */
const ExitIntentPopup = () => {
  const [show, setShow] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY < 10 && !triggered.current) {
        triggered.current = true;
        setShow(true);
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShow(false)} />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-white rounded-3xl p-8 sm:p-10 max-w-lg w-full shadow-2xl text-center z-10"
      >
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <div className="text-5xl mb-4">&#x1F6D1;</div>
        <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3 tracking-tighter uppercase">
          Wait — Don't Leave Yet!
        </h3>
        <p className="text-gray-600 mb-6">
          The pre-launch price of <span className="font-bold text-gray-900">$37</span> won't last. After April 14th, the price goes up to $97. Reserve now and lock in your discount.
        </p>
        <a
          href="#pricing"
          onClick={() => setShow(false)}
          className="block w-full py-4 text-lg font-black text-white bg-emerald-600 rounded-2xl hover:bg-emerald-700 transition-all mb-4"
        >
          RESERVE FOR $37
        </a>
        <p className="text-xs text-gray-400">30-day money-back guarantee. Zero risk.</p>
      </motion.div>
    </div>
  );
};

/* ───────────────────────── APP ───────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <MetabolicQuiz />
        <Results />
        <HowItWorks />
        <Curriculum />
        <Bio />
        <Testimonials />
        <Bonuses />
        <FearSection />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <PS />
      </main>
      <LiveNotifications />
      <ExitIntentPopup />
      <Footer />

      {/* Sticky Mobile CTA */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md border-t border-gray-100 z-[55]">
        <a
          href="#pricing"
          className="w-full py-3.5 bg-emerald-600 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-emerald-100 active:scale-95 transition-transform"
        >
          RESERVE MY SPOT — $37
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
