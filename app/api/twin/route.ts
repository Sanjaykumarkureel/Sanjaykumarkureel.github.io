import {
  TWIN_MODEL,
  extractResponseText,
  parseTwinTurns,
  twinInstructions,
} from "@/lib/twin";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders() });
}

export async function POST(request: Request) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return Response.json(
      { error: "The twin is not configured. Add OPENAI_API_KEY to .env." },
      { status: 503, headers: corsHeaders() },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Send a JSON body." }, { status: 400, headers: corsHeaders() });
  }

  const messages = parseTwinTurns(
    body && typeof body === "object" && "messages" in body
      ? body.messages
      : null,
  );
  const last = messages.at(-1);
  if (!last || last.role !== "user") {
    return Response.json(
      { error: "Ask a question about the career." },
      { status: 400, headers: corsHeaders() },
    );
  }

  const payload = {
    model: TWIN_MODEL,
    store: false,
    instructions: twinInstructions(),
    input: messages.map((turn) => ({
      role: turn.role,
      content: turn.content,
    })),
  };

  const upstream = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: unknown = await upstream.json().catch(() => null);
  if (!upstream.ok) {
    return Response.json(
      { error: "The twin could not reach the model. Try again in a moment." },
      { status: 502, headers: corsHeaders() },
    );
  }

  const reply = extractResponseText(data);
  if (!reply) {
    return Response.json(
      { error: "The twin returned an empty answer." },
      { status: 502, headers: corsHeaders() },
    );
  }

  return Response.json({ reply, model: TWIN_MODEL }, { headers: corsHeaders() });
}
