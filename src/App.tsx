import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Landing from "./pages/Landing";

/* Lazy-loaded routes — keep Landing eager (entry point), defer the rest
   so visitors hitting `/` don't pay for every page in the initial bundle.
   Each route splits into its own chunk Vite fetches on navigation. */
const FreePdf = lazy(() => import("./pages/FreePdf"));
const Learn = lazy(() => import("./pages/Learn"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));

/* Minimal full-screen fallback — shown only for the split-second
   between route click and chunk load. Matches the dark hero so the
   transition isn't jarring. */
const RouteFallback = () => (
  <div className="min-h-screen bg-gray-950" />
);

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/adhd-meal-plan" element={<FreePdf />} />
          {/* /course points at the existing sales page until the re-skinned
              ADHD-brand course page lands (keeps the nav link live). */}
          <Route path="/course" element={<Landing />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/preview" element={<Learn previewMode />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
