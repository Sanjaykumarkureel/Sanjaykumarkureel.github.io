import type { Metadata } from "next";
import { PageIntro } from "@/components/Section";
import { person, portfolio } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default function PortfolioPage() {
  return (
    <div>
      <PageIntro
        index="04"
        kicker="Selected work"
        title="A studio for studies still taking form."
        lede="Featured investigations sit here now. Visual studies, methods, and collaborative briefs will occupy the reserved slots as they become public."
      />

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {portfolio.map((item) => {
            const inner = (
              <>
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.24em]">
                  <span className="text-[var(--gold)]">{item.index}</span>
                  <span
                    className={
                      item.status === "Reserved"
                        ? "text-[var(--mute)]"
                        : "text-[var(--ember)]"
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-16">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--mute)]">
                    {item.field}
                  </p>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--ivory-dim)]">
                    {item.blurb}
                  </p>
                </div>
                <p className="mt-10 text-[11px] uppercase tracking-[0.22em] text-[var(--gold)]">
                  {item.cta} {item.href ? "→" : ""}
                </p>
              </>
            );

            const className =
              "card-shine group flex min-h-[340px] flex-col justify-between border border-[var(--line)] bg-[var(--ink-2)] p-7 transition-colors hover:border-[var(--gold)]";

            if (item.href) {
              return (
                <a
                  key={item.index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <article key={item.index} className={`${className} opacity-80`}>
                {inner}
              </article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-dashed border-[var(--line-strong)] px-6 py-8 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
              Commission this wall
            </p>
            <p className="mt-2 max-w-xl text-sm text-[var(--ivory-dim)]">
              This grid is built to grow. Send a project, a figure series, or a
              collaboration — it will slot in without redesigning the house.
            </p>
          </div>
          <a
            href={`mailto:${person.email}?subject=Portfolio%20inquiry`}
            className="border border-[var(--gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]"
          >
            Inquire
          </a>
        </div>
      </section>
    </div>
  );
}
