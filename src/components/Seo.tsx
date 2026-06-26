import { useEffect } from "react";
import { headStore, IS_SERVER } from "../lib/head";

/* ═══════════════════════════════════════════════════════════════
   SEO head manager.
   - Server (prerender): writes the page's head into headStore during
     render, which scripts/prerender.mjs injects into the static HTML.
   - Client: upserts the same tags via useEffect (handles SPA navigation).
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
  path: string;
  image?: string;
  type?: string;
  noindex?: boolean;
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
  const url = SITE + (path === "/" ? "" : path);
  const robots = noindex ? "noindex, nofollow" : "index, follow";

  // server render (prerender): record into the collector
  if (IS_SERVER) {
    headStore.title = title;
    headStore.description = description;
    headStore.canonical = url;
    headStore.robots = robots;
    headStore.og = {
      "og:title": title,
      "og:description": description,
      "og:url": url,
      "og:type": type,
      "og:image": image,
    };
    headStore.twitter = {
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": image,
    };
    headStore.jsonLd = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  }

  // client: keep the live DOM head in sync (also covers SPA navigation)
  useEffect(() => {
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
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
      upsertMeta("name", "robots", "index, follow");
      if (script) script.remove();
    };
  }, [title, description, url, image, type, robots, jsonLd]);

  return null;
}
