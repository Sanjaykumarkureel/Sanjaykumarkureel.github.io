import {
  agentic,
  career,
  chapters,
  education,
  editorial,
  expertise,
  honors,
  interests,
  journals,
  manuscripts,
  memberships,
  mentoring,
  otherInterests,
  patents,
  person,
  principles,
  publications,
  scholar,
  stats,
  talks,
} from "@/lib/content";

export const TWIN_MODEL = "chat-latest";

export const twinStarters = [
  "What is your current role?",
  "Walk me through your career.",
  "What is mechanical memory?",
  "Which papers should I read first?",
] as const;

export type TwinTurn = {
  role: "user" | "assistant";
  content: string;
};

function dossier(): string {
  return [
    `Name: ${person.name}, ${person.honorific}`,
    `Title: ${person.title}`,
    `Location: ${person.location}`,
    `Disciplines: ${person.disciplines.join(", ")}`,
    `Email: ${person.email}`,
    `Phone: ${person.phone}`,
    `Google Scholar: ${scholar.href} (${scholar.metrics.map((m) => `${m.value} ${m.label}`).join("; ")})`,
    `ORCID: ${person.links.orcid}`,
    `LinkedIn: ${person.links.linkedin}`,
    `ResearchGate: ${person.links.researchgate}`,
    `Statement: ${person.statement}`,
    `Headline stats: ${stats.map((s) => `${s.value} ${s.label}`).join("; ")}`,
    "",
    "Principles:",
    ...principles.map((p) => `- ${p.title} ${p.body}`),
    "",
    "Lines of inquiry:",
    ...interests.map((i) => `- ${i.title}: ${i.body}`),
    "",
    "Other interests:",
    ...otherInterests.map((i) => `- ${i.title}: ${i.body}`),
    "",
    `${agentic.status}: ${agentic.title}. ${agentic.statement}`,
    ...agentic.tracks.flatMap((t) => [`- ${t.title}: ${t.items.join(", ")}`]),
    "",
    "Career:",
    ...career.map((c) => `- ${c.period} — ${c.role}, ${c.org}. ${c.detail}`),
    "",
    "Education:",
    ...education.map((e) => `- ${e.period} — ${e.degree}, ${e.org}${e.extra ? `. ${e.extra}` : ""}`),
    "",
    "Honors:",
    ...honors.map((h) => `- ${h}`),
    "",
    "Talks:",
    ...talks.map((t) => `- ${t.year}: ${t.title}. ${t.venue}.`),
    "",
    "Mentoring:",
    ...mentoring.map((m) => `- ${m}`),
    "",
    "Memberships:",
    ...memberships.map((m) => `- ${m}`),
    "",
    "Editorial:",
    ...editorial.map((e) => `- ${e}`),
    `Journals reviewed: ${journals.join("; ")}`,
    "",
    "Selected publications:",
    ...publications.map(
      (p) =>
        `- ${p.authors} (${p.year}). ${p.title} ${p.venue}${p.extra ? ` ${p.extra}` : ""}${p.href ? ` ${p.href}` : ""}`,
    ),
    "",
    "Book chapters:",
    ...chapters.map(
      (c) =>
        `- ${c.authors} (${c.year}). ${c.title} ${c.venue}${c.extra ? `. ${c.extra}` : ""}${c.href ? ` ${c.href}` : ""}`,
    ),
    "",
    "Manuscripts in flight:",
    ...manuscripts.map((m) => `- ${m.authors} ${m.title} [${m.status}]`),
    "",
    "Patents:",
    ...patents.map((p) => `- ${p.title}. ${p.inventors}. ${p.number}.`),
    "",
    "Methods:",
    `Translational: ${expertise.translational.join("; ")}`,
    `Molecular: ${expertise.molecular.join("; ")}`,
    `Computational: ${expertise.computational.join("; ")}`,
  ].join("\n");
}

export function twinInstructions(): string {
  return `You are the digital twin of Sanjay Kumar Kureel, PhD — a first-person voice that can answer questions about his career, research, writing, and training.

Speak as Sanjay: calm, precise, unhurried. Prefer short paragraphs. Plain text only — no markdown, bold, or emoji. Do not sound like a customer-support bot. Do not invent appointments, grants, salaries, unlisted coauthors, or unpublished results. If a fact is not in the dossier, say you do not have it on file and point to ${person.email} or Google Scholar.

Stay inside professional bounds. Decline medical advice, legal advice, and anything that would impersonate Sanjay in a negotiation or application. For collaborations, invite email rather than committing.

Ground every career answer in this dossier:

${dossier()}`;
}

export function parseTwinTurns(input: unknown): TwinTurn[] {
  if (!Array.isArray(input)) return [];
  const turns: TwinTurn[] = [];
  for (const item of input.slice(-16)) {
    if (!item || typeof item !== "object") continue;
    const role = "role" in item ? item.role : null;
    const content = "content" in item ? item.content : null;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      continue;
    }
    const text = content.trim().slice(0, 2000);
    if (!text) continue;
    turns.push({ role, content: text });
  }
  return turns;
}

export function extractResponseText(payload: unknown): string {
  if (!payload || typeof payload !== "object") return "";
  const data = payload as {
    output_text?: unknown;
    output?: Array<{
      content?: Array<{ text?: unknown }>;
    }>;
  };
  if (typeof data.output_text === "string" && data.output_text.trim()) {
    return data.output_text.trim();
  }
  const chunks: string[] = [];
  for (const item of data.output ?? []) {
    for (const part of item.content ?? []) {
      if (typeof part.text === "string" && part.text.trim()) {
        chunks.push(part.text.trim());
      }
    }
  }
  return chunks.join("\n\n");
}
