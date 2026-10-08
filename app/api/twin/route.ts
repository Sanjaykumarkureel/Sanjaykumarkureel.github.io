import {
  DEFAULT_TWIN_MODEL,
  extractResponseText,
  parseTwinTurns,
  twinInstructions,
} from "@/lib/twin";

export const maxDuration = 30;

const UPSTREAM_TIMEOUT_MS = 25_000;
const MAX_OUTPUT_TOKENS = 700;

const DEFAULT_ORIGINS = ["https://sanjaykumarkureel.github.io"];
const DEV_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"];

const allowedOrigins = new Set([
  ...(process.env.TWIN_ALLOWED_ORIGINS?.split(",")
    .map((o) => o.trim())
    .filter(Boolean) ?? DEFAULT_ORIGINS),
  ...(process.env.NODE_ENV === "production" ? [] : DEV_ORIGINS),
]);

// Per-instance only: serverless instances do not share this map, so treat it as
// a speed bump. The OpenAI project budget cap is the hard backstop.
const LIMITS = [
  { windowMs: 60_000, max: 8 },
  { windowMs: 86_400_000, max: 60 },
];
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const longest = Math.max(...LIMITS.map((l) => l.windowMs));
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < longest);
  const blocked = LIMITS.some(
    (l) => recent.filter((t) => now - t < l.windowMs).length >= l.max,
  );
  if (!blocked) recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= longest)) hits.delete(key);
    }
  }
  return blocked;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function corsHeaders(origin: string | null): HeadersInit {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
  if (origin && allowedOrigins.has(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  }
  return headers;
}

function reply(origin: string | null, body: object, status = 200) {
  return Response.json(body, { status, headers: corsHeaders(origin) });
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin");
  const ok = !origin || allowedOrigins.has(origin);
  return new Response(null, { status: ok ? 204 : 403, headers: corsHeaders(origin) });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const sameOrigin = origin === new URL(request.url).origin;
  if (origin && !sameOrigin && !allowedOrigins.has(origin)) {
    return reply(origin, { error: "This origin may not use the twin." }, 403);
  }

  if (rateLimited(clientIp(request))) {
    return reply(origin, { error: "Too many questions at once. Try again in a minute." }, 429);
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return reply(origin, { error: "The twin is not configured. Add OPENAI_API_KEY to .env." }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return reply(origin, { error: "Send a JSON body." }, 400);
  }

  const messages = parseTwinTurns(
    body && typeof body === "object" && "messages" in body ? body.messages : null,
  );
  const last = messages.at(-1);
  if (!last || last.role !== "user") {
    return reply(origin, { error: "Ask a question about the career." }, 400);
  }

  const model = process.env.TWIN_MODEL?.trim() || DEFAULT_TWIN_MODEL;
  const payload = {
    model,
    store: false,
    max_output_tokens: MAX_OUTPUT_TOKENS,
    instructions: twinInstructions(),
    input: messages.map((turn) => ({ role: turn.role, content: turn.content })),
  };

  let upstream: Response;
  try {
    upstream = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch (err) {
    const timedOut = err instanceof DOMException && err.name === "TimeoutError";
    console.error("twin: upstream request failed", timedOut ? "timeout" : err);
    return reply(
      origin,
      { error: timedOut ? "The twin took too long to answer. Try again." : "The twin could not reach the model. Try again in a moment." },
      timedOut ? 504 : 502,
    );
  }

  const data: unknown = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    console.error("twin: upstream error", upstream.status, JSON.stringify(data)?.slice(0, 500));
    return reply(origin, { error: "The twin could not reach the model. Try again in a moment." }, 502);
  }

  const text = extractResponseText(data);
  if (!text) {
    console.error("twin: empty answer", JSON.stringify(data)?.slice(0, 500));
    return reply(origin, { error: "The twin returned an empty answer." }, 502);
  }

  return reply(origin, { reply: text, model });
}
