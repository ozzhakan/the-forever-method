import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "./pages/Home";

/* Routes shared by the client (BrowserRouter in main.tsx) and the
   prerenderer (StaticRouter in entry-server.tsx). Home stays eager;
   the rest are split into their own chunks. */
const FreePdf = lazy(() => import("./pages/FreePdf"));
const CoursePage = lazy(() => import("./pages/CoursePage"));
const Watch = lazy(() => import("./pages/Watch"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Learn = lazy(() => import("./pages/Learn"));
const ThankYou = lazy(() => import("./pages/ThankYou"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Refund = lazy(() => import("./pages/Refund"));

const RouteFallback = () => <div className="min-h-screen bg-cream" />;

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adhd-meal-plan" element={<FreePdf />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/watch" element={<Watch />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/preview" element={<Learn previewMode />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
      </Routes>
    </Suspense>
  );
}
