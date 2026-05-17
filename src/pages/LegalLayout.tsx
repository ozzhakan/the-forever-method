import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Flame, ArrowLeft } from "lucide-react";
import { useEffect, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════════
   LEGAL LAYOUT — shared shell for Privacy / Terms / Refund.
   Sets a friendly title, prints cleanly, and links back to the
   homepage so visitors never feel stranded.
   ═══════════════════════════════════════════════════════════════ */
export const LegalLayout = ({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) => {
  useEffect(() => {
    const prev = document.title;
    document.title = `${title} · The Unhooked Method™`;
    return () => { document.title = prev; };
  }, [title]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 bg-gradient-to-br from-amber-500 to-amber-700 rounded-lg flex items-center justify-center shadow-sm shadow-amber-200/50">
              <Flame className="text-white w-4 h-4" />
            </div>
            <span className="font-black text-sm tracking-tight text-gray-900 group-hover:text-amber-700 transition-colors">
              The Unhooked Method<sup className="text-[8px] font-bold text-amber-700 ml-0.5 align-super">™</sup>
            </span>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-500 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to site</span>
          </Link>
        </div>
      </header>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-10"
        >
          <p className="text-[10px] sm:text-[11px] font-black text-amber-700 uppercase tracking-[0.3em] mb-3">
            Legal
          </p>
          <h1 className="text-[1.7rem] sm:text-4xl font-black text-gray-900 tracking-tight leading-[1.1] mb-2">
            {title}
          </h1>
          <p className="text-[12px] sm:text-sm text-gray-400 font-semibold mb-8 sm:mb-10">
            Last updated · {lastUpdated}
          </p>

          <div className="legal-body space-y-7 text-gray-700 text-[14.5px] sm:text-[15.5px] leading-[1.7]">
            {children}
          </div>

          <div className="mt-12 pt-7 border-t border-gray-100">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-amber-700 hover:text-amber-900 hover:bg-amber-50 rounded-full transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to The Unhooked Method
            </Link>
          </div>
        </motion.article>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-gray-400">
          <Link to="/privacy" className="hover:text-amber-700 transition-colors">Privacy Policy</Link>
          <span className="text-gray-300">·</span>
          <Link to="/terms" className="hover:text-amber-700 transition-colors">Terms of Service</Link>
          <span className="text-gray-300">·</span>
          <Link to="/refund" className="hover:text-amber-700 transition-colors">Refund Policy</Link>
        </div>
      </main>
    </div>
  );
};

/* Tiny in-page typography helpers — used by all three legal pages
   so they keep a consistent visual hierarchy. */
export const LegalH2 = ({ children, id }: { children: ReactNode; id?: string }) => (
  <h2 id={id} className="text-lg sm:text-xl font-black text-gray-900 tracking-tight mt-8 mb-3 first:mt-0">
    {children}
  </h2>
);

export const LegalH3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-base sm:text-[17px] font-bold text-gray-900 mt-5 mb-2">
    {children}
  </h3>
);

export const LegalP = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-700 leading-[1.7]">{children}</p>
);

export const LegalUL = ({ items }: { items: ReactNode[] }) => (
  <ul className="space-y-2.5 mt-3">
    {items.map((item, i) => (
      <li key={i} className="flex gap-3 items-start">
        <span className="text-amber-500 mt-2 w-1 h-1 rounded-full bg-amber-500 flex-shrink-0" />
        <span className="flex-1">{item}</span>
      </li>
    ))}
  </ul>
);
