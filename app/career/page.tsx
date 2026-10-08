import type { Metadata } from "next";
import { PageIntro } from "@/components/Section";
import {
  career,
  education,
  editorial,
  honors,
  journals,
  memberships,
  mentoring,
  talks,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Career",
};

export default function CareerPage() {
  return (
    <div>
      <PageIntro
        index="02"
        kicker="Trajectory"
        title="A career built at the cell–force interface."
        lede="From chemical engineering at IIT to aging biology in Texas — a path through mechanobiology, senescence, and translational physiology."
      />

      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ol className="relative border-l border-[var(--line-strong)] pl-8">
              {career.map((item) => (
                <li key={item.period} className="relative pb-12 last:pb-0">
                  <span className="absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--gold)]" />
                  <p className="font-mono text-[11px] tracking-[0.14em] text-[var(--gold)]">
                    {item.period}
                  </p>
                  <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl">
                    {item.role}
                  </h2>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--ivory-dim)]">
                    {item.org}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--mute)]">
                    {item.detail}
                  </p>
                  {"current" in item && item.current ? (
                    <p className="mt-4 inline-block border border-[var(--ember)] px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[var(--ember)]">
                      Current
                    </p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <aside className="lg:col-span-4">
            <div className="border border-[var(--line)] bg-[var(--ink-2)] p-6">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
                Education
              </p>
              <ul className="mt-6 space-y-6">
                {education.map((ed) => (
                  <li key={ed.degree}>
                    <p className="font-mono text-[11px] text-[var(--mute)]">{ed.period}</p>
                    <p className="mt-1 font-[family-name:var(--font-display)] text-xl">
                      {ed.degree}
                    </p>
                    <p className="mt-1 text-sm text-[var(--ivory-dim)]">{ed.org}</p>
                    {ed.extra ? (
                      <p className="mt-1 text-xs text-[var(--mute)]">{ed.extra}</p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="mx-auto grid max-w-6xl gap-16 px-5 py-20 sm:px-8 lg:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Honors
            </p>
            <ul className="mt-6 space-y-4">
              {honors.map((h) => (
                <li
                  key={h}
                  className="border-b border-[var(--line)] pb-4 text-sm leading-relaxed text-[var(--ivory-dim)]"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Invited talks
            </p>
            <ul className="mt-6 space-y-6">
              {talks.map((t) => (
                <li key={t.title}>
                  <p className="font-mono text-[11px] text-[var(--mute)]">{t.year}</p>
                  <p className="mt-1 font-[family-name:var(--font-display)] text-2xl leading-snug">
                    {t.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--ivory-dim)]">{t.venue}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Mentoring
          </p>
          <ul className="mt-5 space-y-4 text-sm leading-relaxed text-[var(--ivory-dim)]">
            {mentoring.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Memberships
          </p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--ivory-dim)]">
            {memberships.map((m) => (
              <li key={m} className="border-l border-[var(--line-strong)] pl-4">
                {m}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
            Editorial & review
          </p>
          <ul className="mt-5 space-y-3 text-sm text-[var(--ivory-dim)]">
            {editorial.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
          <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-[var(--mute)]">
            Journals reviewed
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[var(--ivory-dim)]">
            {journals.join(" · ")}
          </p>
        </div>
      </section>
    </div>
  );
}
