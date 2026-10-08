import type { Metadata } from "next";
import { TwinPanel } from "@/components/TwinChat";
import { Eyebrow } from "@/components/Section";
import { person } from "@/lib/content";

export const metadata: Metadata = {
  title: "Digital twin",
};

export default function TwinPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12">
      <header className="lg:col-span-4">
        <Eyebrow index="06">Digital twin</Eyebrow>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[var(--ivory)] sm:text-6xl">
          Ask a working copy of the career.
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--ivory-dim)]">
          This voice is grounded in {person.shortName}&apos;s public record — roles,
          papers, patents, and the lines of inquiry on this site. It is not a
          substitute for writing to him.
        </p>
        <div className="gold-rule mt-10 max-w-xs" />
      </header>
      <section className="min-h-[28rem] border border-[var(--line)] bg-[var(--ink-2)] p-6 sm:p-8 lg:col-span-8">
        <TwinPanel />
      </section>
    </div>
  );
}
