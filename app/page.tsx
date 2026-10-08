import Link from "next/link";
import { Eyebrow } from "@/components/Section";
import {
  expertise,
  interests,
  person,
  stats,
} from "@/lib/content";

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="site-grid pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(201,165,106,0.18),transparent_62%)]" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(216,90,58,0.14),transparent_65%)]" />
        <svg
          className="pointer-events-none absolute right-[-4rem] top-24 hidden h-[420px] w-[420px] text-[var(--gold)] opacity-40 lg:block"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden
        >
          <circle cx="200" cy="200" r="158" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="112" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="200" cy="200" r="58" stroke="currentColor" strokeWidth="0.8" />
          <circle cx="200" cy="200" r="18" fill="currentColor" opacity="0.35" />
          <path d="M200 42v316M42 200h316" stroke="currentColor" strokeWidth="0.4" />
          <path
            d="M86 118c46 28 92-40 148-12s86 8 80 78"
            stroke="currentColor"
            strokeWidth="0.7"
          />
        </svg>

        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pt-20">
          <div className="flex items-center justify-between gap-4">
            <Eyebrow index="01">Independent research</Eyebrow>
            <p className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--mute)] sm:block">
              {person.location}
            </p>
          </div>

          <h1 className="mt-8 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(3.4rem,11vw,7.2rem)] leading-[0.86] tracking-[-0.035em] text-[var(--ivory)]">
            Sanjay
            <br />
            Kumar
            <br />
            <span className="italic text-[var(--gold)]">Kureel</span>
            <sup className="ml-3 align-super font-sans text-[0.16em] tracking-[0.28em] text-[var(--ivory-dim)] not-italic">
              {person.honorific}
            </sup>
          </h1>

          <div className="mt-10 flex max-w-3xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-[var(--ivory-dim)]">
              {person.title}. Working at the intersection of{" "}
              <span className="text-[var(--ivory)]">
                {person.disciplines.join(" · ")}
              </span>
              .
            </p>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/career"
                className="inline-flex items-center justify-center border border-[var(--gold)] bg-[var(--gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--ink)] transition-opacity hover:opacity-90"
              >
                Career journey
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center border border-[var(--line-strong)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--ivory)] hover:border-[var(--gold)] hover:text-[var(--gold)]"
              >
                Portfolio
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-y border-[var(--line)] bg-[var(--ink-2)]">
          <div className="overflow-hidden py-3">
            <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-[11px] uppercase tracking-[0.34em] text-[var(--mute)]">
              {[...person.disciplines, ...person.disciplines, ...person.disciplines, ...person.disciplines].map(
                (d, i) => (
                  <span key={`${d}-${i}`} className="flex items-center gap-10">
                    {d}
                    <span className="text-[var(--gold)]">◆</span>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow index="02">Thesis</Eyebrow>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-5xl">
              Force, time, and the aging cell.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg leading-[1.75] text-[var(--ivory-dim)]">
              {person.statement}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-px bg-[var(--line)] sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-[var(--ink)] px-4 py-6">
                  <p className="font-[family-name:var(--font-display)] text-4xl text-[var(--gold)]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[var(--mute)]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--ink-2)]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <Eyebrow index="03">Focus</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
            Four lines of inquiry.
          </h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {interests.map((item, i) => (
              <article
                key={item.title}
                className="card-shine border border-[var(--line)] bg-[var(--ink)] p-7 transition-colors hover:border-[var(--gold)]"
              >
                <p className="font-mono text-[11px] text-[var(--gold)]">
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ivory-dim)]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Eyebrow index="04">Bench</Eyebrow>
        <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl sm:text-5xl">
          Experimental range.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {(
            [
              ["Translational", expertise.translational],
              ["Molecular", expertise.molecular],
              ["Computational", expertise.computational],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
                {label}
              </p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[var(--ivory-dim)]">
                {items.map((item) => (
                  <li key={item} className="border-l border-[var(--line-strong)] pl-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-5 py-16 sm:flex-row sm:items-center sm:px-8">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--mute)]">
              Next
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl">
              Walk the trajectory — then the record.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/career"
              className="border border-[var(--gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
            >
              Career
            </Link>
            <Link
              href="/research"
              className="border border-[var(--line-strong)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] hover:border-[var(--ivory)]"
            >
              Research
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
