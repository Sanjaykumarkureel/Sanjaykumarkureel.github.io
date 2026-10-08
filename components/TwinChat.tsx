"use client";

import Image from "next/image";
import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type RefObject,
} from "react";
import { person } from "@/lib/content";
import { twinStarters, type TwinTurn } from "@/lib/twin";

type ChatTurn = TwinTurn & { id: string };

const CLIENT_TIMEOUT_MS = 30_000;
const FALLBACK_ERROR = `The twin is unavailable right now. You can email ${person.email} instead.`;

let turnSeq = 0;
function nextTurnId() {
  turnSeq += 1;
  return `turn-${turnSeq}`;
}

function TwinAvatar({ size, className = "" }: { size: number; className?: string }) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full ring-1 ring-[var(--gold)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={person.photo}
        alt=""
        fill
        sizes={`${size}px`}
        className="object-cover object-[center_18%]"
      />
    </span>
  );
}

function TwinThread({
  messages,
  pending,
  error,
}: {
  messages: ChatTurn[];
  pending: boolean;
  error: string;
}) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending, error]);

  return (
    <div
      ref={scroller}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-1 py-1"
    >
      {messages.map((turn) =>
        turn.role === "user" ? (
          <div key={turn.id} className="flex justify-end">
            <p className="max-w-[85%] rounded-[1.15rem] rounded-br-sm bg-[var(--gold)] px-3.5 py-2 text-[14px] leading-relaxed text-[var(--ink)]">
              {turn.content}
            </p>
          </div>
        ) : (
          <div key={turn.id} className="flex items-start gap-2">
            <TwinAvatar size={24} className="mt-1 ring-[var(--gold)]/50" />
            <p className="max-w-[85%] rounded-[1.15rem] rounded-bl-sm bg-white/6 px-3.5 py-2 text-[14px] leading-relaxed whitespace-pre-wrap text-[var(--ivory)]">
              {turn.content}
            </p>
          </div>
        ),
      )}
      {pending ? (
        <div className="flex items-center gap-2" aria-label="The twin is typing">
          <TwinAvatar size={24} className="ring-[var(--gold)]/50" />
          <div className="twin-dots flex items-center gap-1 rounded-[1.15rem] bg-white/6 px-3 py-2.5">
            <span />
            <span />
            <span />
          </div>
        </div>
      ) : null}
      {error ? (
        <p role="alert" className="px-1 text-[13px] text-[var(--ember)]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function twinEndpoint() {
  const configured = process.env.NEXT_PUBLIC_TWIN_API?.trim();
  return configured ? configured.replace(/\/?$/, "/") : "/api/twin/";
}

function useTwin() {
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function send(text: string) {
    const content = text.trim();
    if (!content || pending) return;
    const next: ChatTurn[] = [...messages, { id: nextTurnId(), role: "user", content }];
    setMessages(next);
    setDraft("");
    setPending(true);
    setError("");
    try {
      const res = await fetch(twinEndpoint(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
        }),
        signal: AbortSignal.timeout(CLIENT_TIMEOUT_MS),
      });
      let data: { reply?: string; error?: string } = {};
      try {
        data = JSON.parse(await res.text()) as { reply?: string; error?: string };
      } catch {
        throw new Error(FALLBACK_ERROR);
      }
      if (!res.ok || !data.reply) {
        throw new Error(data.error || FALLBACK_ERROR);
      }
      setMessages([...next, { id: nextTurnId(), role: "assistant", content: data.reply }]);
    } catch (err) {
      if (err instanceof DOMException && err.name === "TimeoutError") {
        setError("The twin took too long to answer. Try again.");
      } else {
        setError(err instanceof Error && err.message ? err.message : FALLBACK_ERROR);
      }
    } finally {
      setPending(false);
    }
  }

  return { messages, draft, setDraft, pending, error, send };
}

type Twin = ReturnType<typeof useTwin>;

function TwinComposer({
  twin,
  inputRef,
}: {
  twin: Twin;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}) {
  const { draft, setDraft, pending, send } = twin;
  const inputId = useId();
  const localRef = useRef<HTMLTextAreaElement>(null);
  const area = inputRef ?? localRef;

  useEffect(() => {
    const el = area.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  }, [draft, area]);

  return (
    <form
      className="flex items-end gap-1.5 rounded-full border border-white/10 bg-black/35 p-1.5 pl-4"
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
        className="max-h-24 min-h-9 w-full resize-none bg-transparent py-2 text-[14px] leading-relaxed text-[var(--ivory)] outline-none placeholder:text-[var(--mute)]"
      />
      <button
        type="submit"
        disabled={pending || !draft.trim()}
        aria-label="Send"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--gold)] text-[var(--ink)] transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
          <path d="M3.2 16.6 17.4 10.8c.9-.4.9-1.7 0-2.1L3.2 2.9c-.9-.4-1.8.5-1.5 1.4L4 9.1h7.1v1.8H4l-2.3 4.8c-.3.9.6 1.8 1.5 1.4Z" />
        </svg>
      </button>
    </form>
  );
}

function TwinPanelView({
  twin,
  inputRef,
}: {
  twin: Twin;
  inputRef?: RefObject<HTMLTextAreaElement | null>;
}) {
  const { messages, pending, error, send } = twin;
  const empty = messages.length === 0 && !pending;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {empty ? (
        <div className="flex min-h-0 flex-1 flex-col justify-end gap-4">
          <div>
            <p className="font-[family-name:var(--font-display)] text-[1.65rem] leading-[1.1] text-[var(--ivory)]">
              Ask SKK
            </p>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-[var(--ivory-dim)]">
              Grounded in the public record — roles, papers, patents, and open
              questions.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {twinStarters.map((item) => (
              <button
                key={item.prompt}
                type="button"
                onClick={() => send(item.prompt)}
                className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-left transition-colors hover:border-[var(--gold)] hover:bg-[rgba(201,165,106,0.12)]"
              >
                <span className="text-[12px] text-[var(--ivory)]">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <TwinThread messages={messages} pending={pending} error={error} />
      )}
      <div className="mt-3">
        <TwinComposer twin={twin} inputRef={inputRef} />
      </div>
    </div>
  );
}

export function TwinPanel() {
  const twin = useTwin();
  return <TwinPanelView twin={twin} />;
}

const FOCUSABLE =
  'button:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

const subscribeNever = () => () => {};

export function TwinDock() {
  const mounted = useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false,
  );
  const twin = useTwin();
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const dialog = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLTextAreaElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) input.current?.focus();
    else if (wasOpen.current) launcher.current?.focus();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const root = dialog.current;
      if (e.key !== "Tab" || !root) return;
      const items = root.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      if (!root.contains(active)) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
      {open ? (
        <button
          type="button"
          tabIndex={-1}
          className="twin-scrim pointer-events-auto fixed inset-0 bg-black/35 backdrop-blur-[3px]"
          aria-label="Dismiss chat"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <div className="pointer-events-auto relative w-full max-w-[26.5rem]">
        {open ? (
          <div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="twin-island twin-glass flex h-[min(34rem,calc(100dvh-5.5rem))] flex-col overflow-hidden rounded-[1.75rem] p-3.5 pt-3"
          >
            <div className="mb-3 flex items-center gap-2.5 px-1">
              <TwinAvatar size={32} />
              <div className="min-w-0 flex-1">
                <p id={titleId} className="truncate text-[13px] font-medium text-[var(--ivory)]">
                  {person.shortName}
                </p>
                <p className="flex items-center gap-1.5 text-[11px] text-[var(--ivory-dim)]">
                  <span className="twin-pulse h-1.5 w-1.5 rounded-full bg-[#9be38a]" />
                  Live twin
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-[var(--ivory-dim)] hover:bg-white/8 hover:text-[var(--ivory)]"
                aria-label="Close chat"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path
                    d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            <TwinPanelView twin={twin} inputRef={input} />
          </div>
        ) : (
          <button
            ref={launcher}
            type="button"
            onClick={() => setOpen(true)}
            className="twin-launch twin-glass mx-auto flex items-center gap-3 rounded-full py-2 pr-5 pl-2"
            aria-haspopup="dialog"
            aria-label="Ask the digital twin"
          >
            <span className="relative">
              <TwinAvatar size={40} />
              <span className="twin-pulse absolute right-0.5 bottom-0.5 h-2.5 w-2.5 rounded-full bg-[#9be38a] ring-2 ring-[var(--ink)]" />
            </span>
            <span className="text-left">
              <span className="block text-[13px] font-medium tracking-[-0.01em] text-[var(--ivory)]">
                Ask SKK
              </span>
              <span className="block text-[11px] text-[var(--ivory-dim)]">
                Digital twin
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
