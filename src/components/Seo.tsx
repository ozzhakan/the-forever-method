import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   SEO head manager — dependency-free.
   Sets per-route <title>, meta description, canonical, Open Graph /
   Twitter tags, robots, and an optional per-page JSON-LD block, then
   restores/cleans up on unmount. Keeps every page machine-readable for
   Google + social scrapers without SSR.
   ═══════════════════════════════════════════════════════════════ */

export const SITE = "https://theunhookedmethod.com";
const DEFAULT_OG = `${SITE}/brand/free-cover.jpg`;

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface SeoProps {
  title: string;
  description: string;
  /** path beginning with "/" — becomes the canonical + og:url */
  path: string;
  image?: string;
  /** "website" | "article" */
  type?: string;
  /** set true on app/utility pages that shouldn't be indexed */
  noindex?: boolean;
  /** schema.org object(s) injected as JSON-LD for this page */
  jsonLd?: object | object[];
}

export default function Seo({
  title,
  description,
  path,
  image = DEFAULT_OG,
  type = "website",
  noindex = false,
  jsonLd,
}: SeoProps) {
  useEffect(() => {
    const url = SITE + (path === "/" ? "" : path);
    document.title = title;

    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-jsonld", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      // restore indexability default; page-specific JSON-LD is removed
      upsertMeta("name", "robots", "index, follow");
      if (script) script.remove();
    };
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}
