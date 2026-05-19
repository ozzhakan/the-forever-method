/**
 * Meta Conversions API — server-side Purchase event.
 *
 * Why this exists: the browser pixel can be suppressed by ad-blockers,
 * iOS Safari ITP, slow loaders, or just visitors who close the tab
 * before fbevents.js finishes loading. Sending the same Purchase
 * from our server gives Meta a reliable second signal.
 *
 * Dedup: the browser pixel fires the event with the SAME `event_id`
 * we pass here, so Meta merges the two into one conversion (no
 * double-count). See:
 *   https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events
 *
 * Runtime: Vercel Edge — low latency, runs close to the user, native
 * fetch, no Node-specific deps.
 */

export const config = { runtime: "edge" };

const PIXEL_ID = "828094209949462";
const META_GRAPH_VERSION = "v18.0";

interface PurchasePayload {
  event_id: string;
  value: number;
  currency: string;
  source_url?: string;
  fbp?: string; // _fbp cookie — Facebook browser ID for attribution
  fbc?: string; // _fbc cookie — Facebook click ID for attribution
}

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) {
    return json(500, { error: "CAPI not configured" });
  }

  let body: PurchasePayload;
  try {
    body = (await request.json()) as PurchasePayload;
  } catch {
    return json(400, { error: "Invalid JSON" });
  }

  if (!body.event_id || typeof body.value !== "number" || !body.currency) {
    return json(400, { error: "Missing fields: event_id, value, currency" });
  }

  // Meta requires at least one user_data signal to attribute the event
  // to a Facebook user. IP + UA from the request is the universal
  // baseline; fbp/fbc from cookies sharpen the match when present.
  const ua = request.headers.get("user-agent") || undefined;
  const ip =
    (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    undefined;

  const eventPayload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        event_source_url: body.source_url || undefined,
        action_source: "website",
        user_data: {
          client_ip_address: ip,
          client_user_agent: ua,
          fbp: body.fbp,
          fbc: body.fbc,
        },
        custom_data: {
          currency: body.currency,
          value: body.value,
        },
      },
    ],
  };

  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(eventPayload),
    });
    const data = (await res.json()) as unknown;
    if (!res.ok) {
      console.error("Meta CAPI rejected event:", data);
      return json(502, { ok: false, error: data });
    }
    return json(200, { ok: true, meta: data });
  } catch (err) {
    console.error("Meta CAPI fetch failed:", err);
    return json(502, { ok: false, error: String(err) });
  }
}
