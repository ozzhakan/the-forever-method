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
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ═══════════════════════════════════════════════════════════════
   PRODUCT TOUR — first-time activation flow

   Shows automatically on the very first visit (gated by
   localStorage flag). Can be re-triggered any time via the
   `openTour()` helper exported from this file, or by clearing the
   flag from the WelcomeScreen "Replay tour" button.
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

interface Step {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  bullets?: string[];
}

const STEPS: Step[] = [
  {
    icon: Sparkles,
    eyebrow: "Welcome",
    title: "A 30-second tour of how this works.",
    body: "I'm Kristina. The platform is intentionally simple — 9 modules + 2 intermissions, plus a Resource Library you can pull from any time. Quick walkthrough so you don't miss anything.",
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
  },
  {
    icon: CheckCircle2,
    eyebrow: "Step 2 of 5",
    title: "After each video — Mark as watched.",
    body: "A big amber 'I've watched this' button sits right under the video. Hit it to mark the lesson complete and unlock the next module. If you scroll past it, the locked Next button at the bottom will scroll you back up.",
  },
  {
    icon: PenLine,
    eyebrow: "Step 3 of 5",
    title: "The intermissions are personal — to me.",
    body: "Twice during the course (Intermission 1 and 2), you'll be asked to send me photos directly on WhatsApp: your kitchen, then a grocery receipt. I read every one personally and write back with two or three specific things I notice. This is the part that doesn't scale — and it's where the course earns its keep.",
  },
  {
    icon: BookOpen,
    eyebrow: "Step 4 of 5",
    title: "The Resource Library is at the bottom of the sidebar.",
    body: "Nineteen cheat sheets, templates and PDFs — including the If-Then Protocols Library, the 30-Day Habit Tracker, the Female Lab Panel, and the Truth About Fructose guide. Every one is downloadable as a real PDF or printable.",
    bullets: [
      "Search by topic, module or category.",
      "Each lesson also shows you the resources related to it, automatically.",
    ],
  },
  {
    icon: MessageCircle,
    eyebrow: "Step 5 of 5",
    title: "Message me on WhatsApp any time.",
    body: "Bottom-left of the sidebar. Not a chatbot — actually me. Send a realization, a question, a screenshot of something you noticed. I read every message. You're not doing this alone.",
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
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Close (top right) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
              aria-label="Skip tour"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visual header with icon */}
            <div className="relative bg-gradient-to-br from-amber-50 via-amber-100/60 to-amber-50 px-6 sm:px-8 pt-9 sm:pt-10 pb-7 sm:pb-8">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
              <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-lg shadow-amber-300/40 mb-4">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.28em] mb-2">
                  {current.eyebrow}
                </p>
                <h2 className="text-[1.35rem] sm:text-[1.6rem] font-black text-gray-900 leading-[1.15] tracking-tight">
                  {current.title}
                </h2>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 py-7 sm:py-8">
              <p className="text-gray-700 text-[14.5px] sm:text-[15.5px] leading-[1.65]">
                {current.body}
              </p>
              {current.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {current.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[13.5px] sm:text-sm text-gray-700">
                      <span className="text-amber-600 font-black mt-0.5">·</span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Action bar */}
            <div className="px-6 sm:px-8 pb-7 sm:pb-8 flex items-center justify-between gap-3 border-t border-gray-100 pt-5 sm:pt-6">
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
