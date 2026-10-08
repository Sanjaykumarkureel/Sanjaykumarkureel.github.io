"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
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

  if (messages.length === 0 && !pending) {
    return (
      <div className="flex min-h-0 flex-1 flex-col justify-end">
        <p className="text-[13px] leading-relaxed text-[var(--ivory-dim)]">
          Hello — I am a working copy of {person.shortName}. Ask about roles,
          papers, training, or mechanical memory.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-0.5">
      {messages.map((turn, i) =>
        turn.role === "user" ? (
          <div key={`user-${i}`} className="flex justify-end">
            <p className="max-w-[85%] rounded-2xl rounded-br-md bg-[linear-gradient(180deg,rgba(201,165,106,0.28),rgba(201,165,106,0.12))] px-3.5 py-2.5 text-[13px] leading-relaxed text-[var(--ivory)]">
              {turn.content}
            </p>
          </div>
        ) : (
          <div key={`twin-${i}`} className="flex items-end gap-2">
            <span className="relative mb-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[var(--gold)]">
              <Image
                src={person.photo}
                alt=""
                fill
                sizes="28px"
                className="object-cover object-[center_18%]"
              />
            </span>
            <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-[var(--ink-3)] px-3.5 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap text-[var(--ivory)]">
              {turn.content}
            </p>
          </div>
        ),
      )}
      {pending ? (
        <div className="flex items-end gap-2">
          <span className="relative mb-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-[var(--gold)]">
            <Image
              src={person.photo}
              alt=""
              fill
              sizes="28px"
              className="object-cover object-[center_18%]"
            />
          </span>
          <div className="twin-dots flex items-center gap-1 rounded-2xl rounded-bl-md bg-[var(--ink-3)] px-3.5 py-3">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}
      {error ? <p className="text-[13px] text-[var(--ember)]">{error}</p> : null}
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
      const endpoint =
        process.env.NEXT_PUBLIC_TWIN_API?.replace(/\/?$/, "/") || "/api/twin/";
      const res = await fetch(endpoint, {
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
  const inputId = useId();
  const area = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [draft]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {messages.length === 0 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {twinStarters.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => send(prompt)}
              className="rounded-full border border-[var(--line-strong)] bg-[rgba(255,255,255,0.03)] px-3 py-1.5 text-left text-[12px] text-[var(--ivory-dim)] transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              {prompt}
            </button>
          ))}
        </div>
      ) : null}
      <TwinThread messages={messages} pending={pending} error={error} />
      <form
        className="mt-4 flex items-end gap-2 rounded-full border border-[var(--line-strong)] bg-[rgba(7,7,8,0.65)] p-1.5 pl-4 backdrop-blur-md"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <label className="sr-only" htmlFor={inputId}>
          Ask the digital twin
        </label>
        <textarea
          id={inputId}
          ref={area}
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send(draft);
            }
          }}
          placeholder="Ask about the career…"
          maxLength={2000}
          className="max-h-[7.5rem] min-h-9 min-w-0 flex-1 resize-none bg-transparent py-2 text-[13px] leading-relaxed text-[var(--ivory)] outline-none placeholder:text-[var(--mute)]"
        />
        <button
          type="submit"
          disabled={pending || !draft.trim()}
          aria-label="Send"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] transition-opacity disabled:opacity-35"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M3.2 16.7 17.4 10.4c.8-.36.8-1.47 0-1.83L3.2 2.3c-.86-.4-1.78.48-1.47 1.36L4.4 9.1H9.2a.9.9 0 0 1 0 1.8H4.4L1.73 15.3c-.31.88.61 1.76 1.47 1.4Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export function TwinDock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {open ? (
        <div className="twin-panel flex h-[min(34rem,calc(100vh-7.5rem))] w-[min(24.5rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[1.75rem] border border-[rgba(201,165,106,0.35)] bg-[rgba(16,17,20,0.82)] shadow-[0_28px_80px_rgba(0,0,0,0.55),0_0_0_1px_rgba(246,241,230,0.04)_inset] backdrop-blur-2xl">
          <div className="flex items-center gap-3 border-b border-[var(--line)] px-4 py-3.5">
            <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[var(--gold)]">
              <Image
                src={person.photo}
                alt=""
                fill
                sizes="40px"
                className="object-cover object-[center_18%]"
              />
              <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--ink-2)] bg-[#7dba74]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-[var(--ivory)]">{person.shortName}</p>
              <p className="text-[11px] tracking-wide text-[var(--mute)]">
                Digital twin · online
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-[var(--mute)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--ivory)]"
              aria-label="Close chat"
            >
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                <path
                  d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="flex min-h-0 flex-1 flex-col px-4 pt-4 pb-3">
            <TwinPanel />
          </div>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="twin-fab relative h-14 w-14 overflow-hidden rounded-full border border-[var(--gold)]"
        aria-expanded={open}
        aria-label={open ? "Hide the digital twin" : "Ask the digital twin"}
      >
        {open ? (
          <span className="grid h-full w-full place-items-center bg-[var(--ink)] text-[var(--gold)]">
            <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden>
              <path
                d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
        ) : (
          <>
            <Image
              src={person.photo}
              alt=""
              fill
              sizes="56px"
              className="object-cover object-[center_18%]"
            />
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,transparent_40%,rgba(7,7,8,0.28))]" />
          </>
        )}
      </button>
    </div>
  );
}
