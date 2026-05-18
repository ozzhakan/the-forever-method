import { useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   LAUNCH OFFER — shared constants + countdown hook
   Imported by both Landing.tsx and Learn.tsx (preview banner) so
   the discount messaging + live timer stay in sync everywhere.
   ═══════════════════════════════════════════════════════════════ */

export const PRICE = "$29";
export const ORIGINAL_PRICE = "$138";
export const SAVINGS_AMOUNT = "$109";
export const DISCOUNT_PCT = 79;
export const COUNTDOWN_HOURS = 4;

/* Evergreen countdown — each visitor gets a 4-hour window stored in
   localStorage. If they revisit within the window the timer continues.
   When it expires a fresh 4-hour window starts automatically so
   urgency stays live on every visit. */
export const useCountdown = (hours: number = COUNTDOWN_HOURS) => {
  const totalMs = hours * 60 * 60 * 1000;
  const [remaining, setRemaining] = useState<number>(() => {
    try {
      const stored = localStorage.getItem("um-launch-end");
      if (stored) {
        const endTime = parseInt(stored, 10);
        const left = endTime - Date.now();
        if (left > 0 && left <= totalMs) return left;
      }
      const newEnd = Date.now() + totalMs;
      localStorage.setItem("um-launch-end", newEnd.toString());
      return totalMs;
    } catch {
      return totalMs;
    }
  });

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining((prev) => {
        const next = prev - 1000;
        if (next <= 0) {
          const newEnd = Date.now() + totalMs;
          try { localStorage.setItem("um-launch-end", newEnd.toString()); } catch { /* no-op */ }
          return totalMs;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [totalMs]);

  return remaining;
};

export const formatCountdown = (ms: number): string => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
};
