import { StaticRouter } from "react-router";
import { prerender } from "react-dom/static";
import AppRoutes from "./AppRoutes";
import { resetHead, headStore, type HeadData } from "./lib/head";
import { POSTS } from "./content/blog";

/* Routes to prerender to static HTML. App/utility pages (/learn,
   /preview, /thank-you) are intentionally excluded — they stay
   client-only and fall back to the SPA shell. */
export const ROUTES: string[] = [
  "/",
  "/adhd-meal-plan",
  "/course",
  "/watch",
  "/blog",
  "/privacy",
  "/terms",
  "/refund",
  ...POSTS.map((p) => `/blog/${p.slug}`),
];

async function streamToString(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value, { stream: true });
  }
  out += decoder.decode();
  return out;
}

export async function render(url: string): Promise<{ html: string; head: HeadData }> {
  resetHead();
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );
  const html = await streamToString(prelude as ReadableStream<Uint8Array>);
  return { html, head: JSON.parse(JSON.stringify(headStore)) as HeadData };
}
