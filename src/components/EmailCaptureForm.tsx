import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Download, Loader2, ArrowRight } from "lucide-react";
import { captureLead } from "../lib/supabase";

export const PDF_PATH = "/Your-60-Day-ADHD-Meal-Plan.pdf";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* Fire lead-conversion pixels (stubbed globally in index.html, so these
   queue safely even before the trackers finish loading). */
function trackLead() {
  try {
    const w = window as unknown as {
      gtag?: (...a: unknown[]) => void;
      fbq?: (...a: unknown[]) => void;
    };
    w.gtag?.("event", "generate_lead", { currency: "USD", value: 0 });
    w.fbq?.("track", "Lead", { content_name: "60-Day ADHD Meal Plan" });
  } catch {
    /* no-op */
  }
}

/* Open the PDF for the visitor. New tab keeps them on the page and
   sidesteps mobile auto-download quirks. */
function deliverPdf() {
  try {
    window.open(PDF_PATH, "_blank", "noopener,noreferrer");
  } catch {
    /* the success panel still shows a manual download button */
  }
}

/**
 * EmailCaptureForm — gate the free PDF behind an email.
 * Saves the lead (best-effort) → fires lead events → delivers the PDF.
 * Delivery is NEVER blocked on the save: the visitor always gets their PDF.
 */
export default function EmailCaptureForm({
  source = "adhd-meal-plan",
  className = "",
  variant = "light",
}: {
  source?: string;
  className?: string;
  /** light = on cream/white · dark = on forest green panels */
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("loading");

    await captureLead(value, source); // best-effort; never blocks delivery
    trackLead();
    deliverPdf();
    setStatus("done");
  }

  const dark = variant === "dark";

  if (status === "done") {
    return (
      <div className={`text-center ${className}`}>
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 ${
            dark ? "bg-cream/15" : "bg-mint"
          }`}
        >
          <CheckCircle2 className={`w-7 h-7 ${dark ? "text-cream" : "text-forest"}`} />
        </div>
        <p className={`font-display font-bold text-xl mb-1.5 ${dark ? "text-cream" : "text-forest"}`}>
          Check your new tab — it's yours!
        </p>
        <p className={`font-body text-[14px] mb-5 ${dark ? "text-cream/70" : "text-ink-soft"}`}>
          If it didn't open automatically, grab it here:
        </p>
        <a
          href={PDF_PATH}
          target="_blank"
          rel="noopener noreferrer"
          download
          className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold text-[15px] transition-all active:scale-[0.98] ${
            dark
              ? "bg-cream text-forest hover:bg-white"
              : "bg-forest text-cream hover:bg-forest-deep"
          }`}
        >
          <Download className="w-4 h-4" />
          Download the PDF
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col sm:flex-row gap-2.5">
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(null);
          }}
          placeholder="you@email.com"
          aria-label="Email address"
          className={`flex-1 rounded-full px-5 py-3.5 font-body text-[15px] outline-none transition-shadow ${
            dark
              ? "bg-cream/95 text-ink placeholder:text-ink-soft/60 focus:ring-2 focus:ring-cream"
              : "bg-white text-ink placeholder:text-ink-soft/60 border border-petal focus:border-rose focus:ring-2 focus:ring-rose/30"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold text-[15px] whitespace-nowrap transition-all active:scale-[0.98] disabled:opacity-70 ${
            dark
              ? "bg-rose text-white hover:bg-rose-deep shadow-lg shadow-black/10"
              : "bg-rose text-white hover:bg-rose-deep shadow-lg shadow-rose/30"
          }`}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send me the PDF <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 font-body text-[13px] text-rose font-medium pl-1">{error}</p>
      )}

      <p
        className={`mt-3 font-body text-[12px] leading-relaxed ${
          dark ? "text-cream/60" : "text-ink-soft/80"
        }`}
      >
        Instant download · no spam. You'll get the PDF plus the occasional
        ADHD-nutrition tip. Unsubscribe anytime. See our{" "}
        <Link to="/privacy" className="underline hover:no-underline">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
