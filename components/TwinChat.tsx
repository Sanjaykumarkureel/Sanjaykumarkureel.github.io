"use client";

import { useEffect, useRef, useState } from "react";
import { person } from "@/lib/content";
import { twinStarters, type TwinTurn } from "@/lib/twin";

function TwinThread({
  messages,
  pending,
  error,
}: {
  messages: TwinTurn[];
  pending: boolean;
  error: string;
}) {
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, pending]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-1">
      {messages.length === 0 ? (
        <p className="text-sm leading-relaxed text-[var(--ivory-dim)]">
          Ask about roles, papers, training, or mechanical memory. I answer from
          the public record — CV, Scholar, and this site.
        </p>
      ) : null}
      {messages.map((turn, i) => (
        <div
          key={`${turn.role}-${i}`}
          className={
            turn.role === "user"
              ? "ml-8 border border-[var(--line-strong)] bg-[var(--ink-3)] px-4 py-3 text-sm leading-relaxed"
              : "mr-4 text-sm leading-relaxed text-[var(--ivory-dim)]"
          }
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
            {turn.role === "user" ? "You" : `${person.shortName} · twin`}
          </p>
          <p className="whitespace-pre-wrap text-[var(--ivory)]">{turn.content}</p>
        </div>
      ))}
      {pending ? (
        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
          Thinking…
        </p>
      ) : null}
      {error ? (
        <p className="text-sm text-[var(--ember)]">{error}</p>
      ) : null}
      <div ref={end} />
    </div>
  );
}

function useTwin() {
  const [messages, setMessages] = useState<TwinTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const next = [...messages, { role: "user" as const, content }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setError("");
    try {
      const res = await fetch("/api/twin/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      if (!res.ok || !data.reply) {
        throw new Error(data.error || "The twin is unavailable.");
      }
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The twin is unavailable.");
    } finally {
      setPending(false);
    }
  }

  return { messages, draft, setDraft, pending, error, send };
}

export function TwinPanel() {
  const { messages, draft, setDraft, pending, error, send } = useTwin();

  return (
    <div className="flex h-full min-h-0 flex-col">
      {messages.length === 0 ? (
        <div className="mb-6 flex flex-wrap gap-2">
          {twinStarters.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="border border-[var(--line-strong)] px-3 py-2 text-left text-[11px] uppercase tracking-[0.18em] text-[var(--ivory-dim)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}
      <TwinThread messages={messages} pending={pending} error={error} />
      <form
        className="mt-6 flex gap-2 border-t border-[var(--line)] pt-4"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <label className="sr-only" htmlFor="twin-input">
          Ask the digital twin
        </label>
        <input
          id="twin-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask about the career…"
          maxLength={2000}
          className="min-w-0 flex-1 border border-[var(--line-strong)] bg-transparent px-3 py-2.5 text-sm text-[var(--ivory)] outline-none placeholder:text-[var(--mute)] focus:border-[var(--gold)]"
        />
        <button
          type="submit"
          disabled={pending || !draft.trim()}
          className="border border-[var(--gold)] bg-[var(--gold)] px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[var(--ink)] disabled:opacity-40"
        >
          Ask
        </button>
      </form>
    </div>
  );
}

export function TwinDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8">
      {open ? (
        <div className="mb-3 flex h-[min(28rem,calc(100vh-8rem))] w-[min(26rem,calc(100vw-2.5rem))] flex-col border border-[var(--gold)] bg-[var(--ink)] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--gold)]">
                Digital twin
              </p>
              <p className="mt-1 text-sm text-[var(--ivory)]">{person.shortName}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-[10px] uppercase tracking-[0.2em] text-[var(--mute)] hover:text-[var(--ivory)]"
            >
              Close
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-4">
            <TwinPanel />
          </div>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex items-center gap-2 border border-[var(--gold)] bg-[var(--ink)] px-4 py-2.5 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
        aria-expanded={open}
      >
        {open ? "Hide twin" : "Ask the twin"}
      </button>
    </div>
  );
}
