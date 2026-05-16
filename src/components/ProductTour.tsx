import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  PlayCircle,
  CheckCircle2,
  PenLine,
  BookOpen,
  MessageCircle,
  Lock,
  Flame,
  Camera,
  Receipt,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   PRODUCT TOUR — first-time activation flow

   Shows automatically on the very first visit (gated by
   localStorage flag). Can be re-triggered any time via the
   `openTour()` helper exported from this file, or by clearing the
   flag from the WelcomeScreen "Replay tour" button.

   Each step pairs a short text body with a per-step "visual" — a
   mini mock of the actual UI being described, so the tour feels
   like a journey instead of a wall of text.
   ═══════════════════════════════════════════════════════════════ */

const TOUR_FLAG = "unhooked-tour-done";

export const isTourComplete = (): boolean => {
  try {
    return localStorage.getItem(TOUR_FLAG) === "1";
  } catch {
    return false;
  }
};

export const markTourDone = () => {
  try {
    localStorage.setItem(TOUR_FLAG, "1");
  } catch { /* ignore */ }
};

export const resetTour = () => {
  try {
    localStorage.removeItem(TOUR_FLAG);
  } catch { /* ignore */ }
};

/* ─────────── PER-STEP VISUAL MOCKS ─────────── */

const WelcomeJourneyVisual = () => {
  const dots = [
    { label: "9 Modules", icon: PlayCircle },
    { label: "2 Tasks", icon: PenLine },
    { label: "20 PDFs", icon: BookOpen },
  ];
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="grid grid-cols-3 relative">
        {/* connecting line — sits behind icons, only between first and last */}
        <div className="absolute left-[16.66%] right-[16.66%] top-5 sm:top-6 h-[2px] bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200" />
        {dots.map((d, i) => {
          const I = d.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12 }}
              className="relative flex flex-col items-center gap-2 min-w-0"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 shadow-lg shadow-amber-300/50 flex items-center justify-center ring-4 ring-white">
                <I className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-[10px] sm:text-[11px] font-black text-amber-800 leading-tight text-center whitespace-nowrap">
                {d.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

const SidebarVisual = () => {
  const items = [
    { label: "Welcome", state: "active" as const },
    { label: "Module 0", state: "next" as const },
    { label: "Module 1", state: "locked" as const },
    { label: "Module 2", state: "locked" as const },
  ];
  return (
    <div className="w-full max-w-xs mx-auto rounded-xl bg-white shadow-lg border border-amber-100 overflow-hidden">
      <div className="px-3 py-2.5 border-b border-amber-100 bg-amber-50/60 flex items-center gap-2">
        <div className="w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-700 rounded flex items-center justify-center">
          <Flame className="w-2.5 h-2.5 text-white" />
        </div>
        <span className="text-[10px] font-black text-amber-900 tracking-tight">The Unhooked Method</span>
      </div>
      <div className="p-1.5 space-y-1">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-bold ${
              it.state === "active"
                ? "bg-amber-100 text-amber-900"
                : it.state === "locked"
                ? "text-gray-300"
                : "text-gray-700"
            }`}
          >
            {it.state === "active" ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            ) : it.state === "locked" ? (
              <Lock className="w-3 h-3 flex-shrink-0" />
            ) : (
              <PlayCircle className="w-3.5 h-3.5 flex-shrink-0" />
            )}
            <span>{it.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MarkWatchedVisual = () => (
  <div className="w-full max-w-sm mx-auto space-y-3">
    {/* Mini video frame */}
    <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-lg">
      <div className="w-9 h-9 bg-white/90 rounded-full flex items-center justify-center">
        <PlayCircle className="w-5 h-5 text-amber-700" />
      </div>
    </div>
    {/* The actual amber CTA */}
    <motion.button
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.25, type: "spring", stiffness: 220, damping: 18 }}
      className="w-full py-2.5 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-black text-[12px] flex items-center justify-center gap-2 shadow-lg shadow-amber-300/40 ring-4 ring-amber-200/60"
      type="button"
    >
      <CheckCircle2 className="w-4 h-4" />
      I've watched this
    </motion.button>
  </div>
);

const IntermissionVisual = () => (
  <div className="w-full max-w-sm mx-auto space-y-2.5">
    <div className="flex items-center gap-2 mb-1">
      <Camera className="w-3.5 h-3.5 text-amber-700" />
      <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest">
        WhatsApp · Intermission
      </span>
    </div>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="ml-auto max-w-[78%] bg-amber-100 px-3 py-2 rounded-2xl rounded-br-md text-[11.5px] text-amber-900 font-medium flex items-center gap-2"
    >
      <Camera className="w-3 h-3 flex-shrink-0" />
      <span>Sent — kitchen + pantry + stash</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="ml-auto max-w-[78%] bg-amber-100 px-3 py-2 rounded-2xl rounded-br-md text-[11.5px] text-amber-900 font-medium flex items-center gap-2"
    >
      <Receipt className="w-3 h-3 flex-shrink-0" />
      <span>Sent — weekly grocery receipt</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="max-w-[82%] bg-white border border-amber-100 px-3 py-2 rounded-2xl rounded-bl-md text-[11.5px] text-gray-800 leading-snug shadow-sm"
    >
      <span className="font-bold text-amber-700">Kristina:</span> Got them. Two specific swaps coming in the morning — quick wins for your pantry shelf.
    </motion.div>
  </div>
);

const ResourceLibraryVisual = () => {
  const tiles = [
    "If-Then Protocols",
    "Kitchen Audit",
    "Habit Tracker",
    "Female Labs",
  ];
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-2 gap-2">
        {tiles.map((label, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-white border border-amber-100 rounded-xl px-2.5 py-3 shadow-sm flex items-center gap-1.5 min-w-0"
          >
            <FileText className="w-3 h-3 text-amber-700 flex-shrink-0" />
            <span className="text-[10.5px] font-bold text-gray-800 leading-tight min-w-0">{label}</span>
          </motion.div>
        ))}
      </div>
      <p className="mt-3 text-center text-[10px] font-black text-amber-800 uppercase tracking-wider">
        20 PDFs · search + filter
      </p>
    </div>
  );
};

const WhatsAppVisual = () => (
  <div className="w-full max-w-sm mx-auto space-y-2.5">
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="ml-auto max-w-[80%] bg-amber-100 px-3 py-2 rounded-2xl rounded-br-md text-[11.5px] text-amber-900 font-medium"
    >
      Module 3 just clicked. The Pringles thing — that's me.
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="max-w-[82%] bg-white border border-amber-100 px-3 py-2 rounded-2xl rounded-bl-md text-[11.5px] text-gray-800 leading-snug shadow-sm"
    >
      <span className="font-bold text-amber-700">Kristina:</span> Yes — that's the bliss point doing its job. Try the if-then from the library for your 4 PM window this week and tell me what shifts.
    </motion.div>
    <motion.a
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      href="#"
      onClick={(e) => e.preventDefault()}
      className="mt-2 mx-auto flex items-center justify-center gap-1.5 w-fit px-3 py-1.5 bg-gradient-to-br from-amber-600 to-amber-800 text-white rounded-full text-[10.5px] font-bold shadow-sm"
    >
      <MessageCircle className="w-3 h-3" />
      Open WhatsApp
    </motion.a>
  </div>
);

interface Step {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
  visual: ReactNode;
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    eyebrow: "Welcome",
    title: "A 30-second tour of how this works.",
    body: "I'm Kristina. The platform is intentionally simple — 9 modules + 2 intermissions, plus a Resource Library you can pull from any time. Quick walkthrough so you don't miss anything.",
    visual: <WelcomeJourneyVisual />,
  },
  {
    icon: PlayCircle,
    eyebrow: "Step 1 of 5",
    title: "The lessons live in the left sidebar.",
    body: "Work through them in order — each one unlocks the next. Every module is a short video (15–25 minutes) plus a written summary and a homework task underneath.",
    bullets: [
      "Watch the video at the top of the lesson.",
      "Read the Key Takeaways and any Deep Dive cards.",
      "Do the homework on your own — that's where the change happens.",
    ],
    visual: <SidebarVisual />,
  },
  {
    icon: CheckCircle2,
    eyebrow: "Step 2 of 5",
    title: "After each video — Mark as watched.",
    body: "A big amber 'I've watched this' button sits right under the video. Hit it to mark the lesson complete and unlock the next module. If you scroll past it, the locked Next button at the bottom will scroll you back up.",
    visual: <MarkWatchedVisual />,
  },
  {
    icon: PenLine,
    eyebrow: "Step 3 of 5",
    title: "The intermissions are personal.",
    body: "Twice during the course (Intermission 1 and 2), you'll be asked to send photos directly on WhatsApp: your kitchen, then a grocery receipt. Every one gets read personally and you'll get back two or three specific things we notice.",
    visual: <IntermissionVisual />,
  },
  {
    icon: BookOpen,
    eyebrow: "Step 4 of 5",
    title: "The Resource Library is at the bottom of the sidebar.",
    body: "20 cheat sheets, templates and PDFs — including the If-Then Protocols Library, the 30-Day Habit Tracker, the Female Lab Panel, and the Truth About Fructose guide. Every one is downloadable as a real PDF or printable.",
    bullets: [
      "Search by topic, module or category.",
      "Each lesson also shows you the resources related to it, automatically.",
    ],
    visual: <ResourceLibraryVisual />,
  },
  {
    icon: MessageCircle,
    eyebrow: "Step 5 of 5",
    title: "WhatsApp support throughout the course.",
    body: "Bottom-left of the sidebar. If you've got a question, a realization, or you just want to share what came up — write any time. Every message gets read personally. You're not doing this alone.",
    visual: <WhatsAppVisual />,
  },
];

export const ProductTour = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(0);

  // Reset step when the tour reopens
  useEffect(() => {
    if (open) setStep(0);
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight" && step < STEPS.length - 1) setStep((s) => s + 1);
      if (e.key === "ArrowLeft" && step > 0) setStep((s) => s - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  const handleClose = () => {
    markTourDone();
    onClose();
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const current = STEPS[step];
  const Icon = current?.icon ?? Sparkles;
  const isLast = step === STEPS.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <button
            aria-label="Close tour"
            onClick={handleClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
          />

          {/* Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[92vh] overflow-y-auto"
          >
            {/* Close (top right) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors shadow-sm"
              aria-label="Skip tour"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual header */}
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/60 to-amber-50 px-5 sm:px-7 pt-9 sm:pt-10 pb-6 sm:pb-7">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
              <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

              {/* Progress dots */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all ${
                      i === step ? "w-6 bg-amber-700" : i < step ? "w-3 bg-amber-400" : "w-3 bg-amber-200"
                    }`}
                  />
                ))}
              </div>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-300/40 mb-3">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.28em] mb-2">
                  {current.eyebrow}
                </p>
                <h2 className="text-[1.15rem] sm:text-[1.35rem] font-black text-gray-900 leading-[1.2] tracking-tight">
                  {current.title}
                </h2>
              </div>
            </div>

            {/* Per-step interactive visual */}
            <div className="px-5 sm:px-7 pt-6 sm:pt-7">
              <motion.div
                key={`viz-${step}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
                className="rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-amber-50/40 border border-amber-100 px-4 sm:px-5 py-5 sm:py-6"
              >
                {current.visual}
              </motion.div>
            </div>

            {/* Body */}
            <div className="px-5 sm:px-7 py-5 sm:py-6">
              <p className="text-gray-700 text-[14px] sm:text-[15px] leading-[1.6]">
                {current.body}
              </p>
              {current.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {current.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[13px] sm:text-[13.5px] text-gray-700">
                      <span className="text-amber-600 font-black mt-0.5">·</span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action bar */}
            <div className="px-5 sm:px-7 pb-6 sm:pb-7 flex items-center justify-between gap-3 border-t border-gray-100 pt-4 sm:pt-5">
              <button
                onClick={handleClose}
                className="text-xs sm:text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
              >
                Skip tour
              </button>
              <div className="flex items-center gap-2">
                {step > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-bold text-gray-600 hover:text-amber-700 hover:bg-amber-50 rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full shadow-md shadow-amber-300/40 transition-all"
                >
                  {isLast ? "Start the course" : "Next"}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
