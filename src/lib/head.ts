/* Server-side <head> collector used during prerendering.
   The Seo component writes here while rendering on the server (no window);
   scripts/prerender.mjs reads it after each route renders and injects the
   tags into that route's static HTML. On the client this store is unused
   (Seo manages the head via useEffect instead). */

export interface HeadData {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  og: Record<string, string>;
  twitter: Record<string, string>;
  jsonLd: object[];
}

export const IS_SERVER = typeof window === "undefined";

export const headStore: HeadData = { og: {}, twitter: {}, jsonLd: [] };

export function resetHead() {
  headStore.title = undefined;
  headStore.description = undefined;
  headStore.canonical = undefined;
  headStore.robots = undefined;
  headStore.og = {};
  headStore.twitter = {};
  headStore.jsonLd = [];
}
