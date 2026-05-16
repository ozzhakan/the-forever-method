import { motion } from "motion/react";
import { CheckCircle2, ArrowRight, Flame, MessageCircle, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const WHATSAPP_URL = "https://wa.me/31618784896";
const WHATSAPP_DISPLAY = "+31 6 18784896";

/* ═══════════════════════════════════════════════════════════════
   THANK YOU PAGE — fires after successful PayPal NCP checkout.

   To wire this up on the PayPal side:
   - In your PayPal NCP dashboard, set the "Return URL" of the
     payment link to https://<your-domain>/thank-you
   - PayPal will redirect customers here after they complete payment.

   This page also fires the Meta Pixel "Purchase" event so ads
   campaigns can attribute conversions correctly.
   ═══════════════════════════════════════════════════════════════ */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export default function ThankYou() {
  // Fire Meta Pixel Purchase event on mount
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      try {
        window.fbq("track", "Purchase", { value: 8, currency: "USD" });
      } catch (err) {
        console.warn("Meta Pixel Purchase event failed:", err);
      }
    }
    // Update page title for browser tab + history
    const prev = document.title;
    document.title = "You're in — The Unhooked Method";
    return () => { document.title = prev; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-white to-amber-50/30 flex items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl"
      >
        {/* Big celebration card */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-amber-500/10 p-7 sm:p-12 text-center">
          {/* Check icon */}
          <motion.div
            initial={{ scale: 0.6, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.15 }}
            className="inline-flex w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full items-center justify-center shadow-xl shadow-amber-300/40 mb-7 sm:mb-8"
          >
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </motion.div>

          {/* Eyebrow */}
          <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.3em] mb-3">
            Payment received
          </p>

          {/* Headline */}
          <h1 className="text-[1.85rem] sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.1] mb-4">
            You're in.
          </h1>

          {/* Subhead */}
          <p className="text-gray-600 text-[15px] sm:text-lg leading-relaxed mb-8 sm:mb-10">
            Welcome to <span className="font-bold text-gray-900">The Unhooked Method</span>. Everything is unlocked and waiting for you — the videos, the resources, the WhatsApp line. Click below to open the platform.
          </p>

          {/* Primary CTA */}
          <Link
            to="/learn"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 text-[15px] sm:text-lg font-bold text-white bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 rounded-full shadow-xl shadow-amber-300/40 hover:-translate-y-0.5 transition-all"
          >
            Open The Unhooked Method
            <ArrowRight className="w-5 h-5" />
          </Link>

          {/* What's inside reminder */}
          <div className="mt-9 sm:mt-10 pt-7 sm:pt-8 border-t border-gray-100 text-left">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <p className="text-[10px] sm:text-[11px] font-black text-amber-800 uppercase tracking-[0.25em]">
                What you just unlocked
              </p>
            </div>
            <ul className="space-y-2.5 max-w-md mx-auto">
              {[
                "9 in-depth video modules + Welcome + My Story",
                "2 personally reviewed intermissions (kitchen + receipt)",
                "19 cheat sheets, templates and PDF guides",
                "Direct WhatsApp access to Kristina, throughout the course",
                "Instant access · yours forever",
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-[13.5px] sm:text-[14.5px] text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* WhatsApp support */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 sm:mt-8 flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-2xl text-[13.5px] sm:text-sm font-bold transition-colors group"
          >
            <MessageCircle className="w-4 h-4 flex-shrink-0" />
            <span>Need anything? Message Kristina on WhatsApp · {WHATSAPP_DISPLAY}</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Bookmark reminder */}
        <p className="mt-5 sm:mt-6 text-center text-[12px] sm:text-xs text-gray-500">
          Bookmark this page · The Unhooked Method is yours forever, on every device.
        </p>

        {/* Tiny footer */}
        <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
          <div className="w-5 h-5 bg-gradient-to-br from-amber-500 to-amber-700 rounded-md flex items-center justify-center">
            <Flame className="w-3 h-3 text-white" />
          </div>
          <span className="text-[11px] font-bold tracking-tight">The Unhooked Method</span>
        </div>
      </motion.div>
    </div>
  );
}
