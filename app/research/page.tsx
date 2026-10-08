import type { Metadata } from "next";
import { PageIntro } from "@/components/Section";
import { chapters, manuscripts, patents, person, publications } from "@/lib/content";

export const metadata: Metadata = {
  title: "Research",
};

export default function ResearchPage() {
  return (
    <div>
      <PageIntro
        index="03"
        kicker="The record"
        title="Papers, patents, and work in motion."
        lede="A selected bibliography spanning senescence, mechanical memory, ultrasound rejuvenation, and translational aging biology."
      />

      <section className="mx-auto max-w-6xl px-5 pb-8 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--line)] pb-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            In preparation / under review
          </h2>
          <a
            href={person.links.scholar}
            target="_blank"
            rel="noreferrer"
            className="border border-[var(--gold)] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
          >
            Google Scholar profile
          </a>
        </div>
        <ol className="divide-y divide-[var(--line)]">
          {manuscripts.map((m, i) => (
            <li key={m.title} className="grid gap-4 py-8 md:grid-cols-12">
              <p className="font-mono text-sm text-[var(--gold)] md:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </p>
              <div className="md:col-span-8">
                <p className="text-sm text-[var(--mute)]">{m.authors}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug">
                  {m.title}
                </p>
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--ember)] md:col-span-3 md:text-right">
                {m.status}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <h2 className="border-b border-[var(--line)] pb-6 font-[family-name:var(--font-display)] text-3xl">
          Peer-reviewed
        </h2>
        <ol className="divide-y divide-[var(--line)]">
          {publications.map((p, i) => (
            <li key={p.title} className="grid gap-4 py-8 md:grid-cols-12">
              <p className="font-mono text-sm text-[var(--gold)] md:col-span-1">
                {String(i + manuscripts.length + 1).padStart(2, "0")}
              </p>
              <div className="md:col-span-8">
                <p className="text-sm text-[var(--mute)]">{p.authors}</p>
                <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug">
                  {p.title}
                </p>
                <p className="mt-3 text-sm text-[var(--ivory-dim)]">
                  <span className="italic">{p.venue}</span>
                  {p.extra ? ` · ${p.extra}` : ""} · {p.year}
                </p>
              </div>
              <div className="md:col-span-3 md:text-right">
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] hover-line"
                >
                  View
                </a>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl">Book chapters</h2>
            <ul className="mt-8 space-y-8">
              {chapters.map((c) => (
                <li key={c.title}>
                  <p className="font-mono text-[11px] text-[var(--gold)]">
                    {c.extra || c.year}
                  </p>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-2xl leading-snug">
                    {c.title}
                  </p>
                  <p className="mt-2 text-sm text-[var(--ivory-dim)]">
                    {c.authors} · {c.venue}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] hover-line"
                    >
                      Read the chapter
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl">Patents</h2>
            <ul className="mt-8 space-y-8">
              {patents.map((p) => (
                <li key={p.number} className="border border-[var(--line)] bg-[var(--ink)] p-6">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--ember)]">
                    {p.number}
                  </p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-2xl leading-snug">
                    {p.title}
                  </p>
                  <p className="mt-3 text-sm text-[var(--ivory-dim)]">{p.inventors}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
