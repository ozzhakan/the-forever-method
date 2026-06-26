import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath, pathToFileURL } from "url";

/* Post-build static prerender.
   Reads the SSR bundle (built to .prerender-ssr) + the client index.html
   template, renders each SEO route to HTML, injects the page's head, and
   writes dist/<route>/index.html. Non-fatal by design: any failure logs
   and the route simply falls back to the SPA shell already in dist, so a
   prerender hiccup can never break the deploy. */

const root = resolve(fileURLToPath(import.meta.url), "../..");
const dist = join(root, "dist");
const ssrEntry = join(root, ".prerender-ssr", "entry-server.js");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function setOrAppend(html, regex, tag) {
  return regex.test(html) ? html.replace(regex, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function injectHead(html, head) {
  if (head.title) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(head.title)}</title>`);
  }
  if (head.description) {
    html = setOrAppend(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(head.description)}" />`);
  }
  if (head.canonical) {
    html = setOrAppend(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(head.canonical)}" />`);
  }
  if (head.robots) {
    html = setOrAppend(html, /<meta name="robots"[^>]*>/, `<meta name="robots" content="${esc(head.robots)}" />`);
  }
  for (const [k, v] of Object.entries(head.og || {})) {
    html = setOrAppend(html, new RegExp(`<meta property="${k}"[^>]*>`), `<meta property="${k}" content="${esc(v)}" />`);
  }
  for (const [k, v] of Object.entries(head.twitter || {})) {
    html = setOrAppend(html, new RegExp(`<meta name="${k}"[^>]*>`), `<meta name="${k}" content="${esc(v)}" />`);
  }
  for (const obj of head.jsonLd || []) {
    const json = JSON.stringify(obj).replace(/</g, "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json">${json}</script>\n  </head>`);
  }
  return html;
}

async function main() {
  if (!existsSync(ssrEntry)) {
    console.warn("[prerender] SSR bundle not found, skipping — site ships as SPA.");
    return;
  }
  const template = readFileSync(join(dist, "index.html"), "utf8");
  const { render, ROUTES } = await import(pathToFileURL(ssrEntry).href);

  let ok = 0;
  for (const route of ROUTES) {
    try {
      const { html, head } = await render(route);
      let page = injectHead(template, head);
      page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
      const outPath = route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");
      mkdirSync(dirname(outPath), { recursive: true });
      writeFileSync(outPath, page);
      ok++;
    } catch (err) {
      console.warn(`[prerender] ${route} failed (falls back to SPA):`, err?.message || err);
    }
  }
  console.log(`[prerender] wrote ${ok}/${ROUTES.length} static pages`);
}

main().catch((err) => {
  console.warn("[prerender] skipped due to error (site ships as SPA):", err?.message || err);
  // never fail the build
  process.exit(0);
});
