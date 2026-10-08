import type { Metadata } from "next";
import Image from "next/image";
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
      <section className="twin-glass flex h-[min(40rem,calc(100dvh-7rem))] min-h-[28rem] flex-col overflow-hidden rounded-[1.75rem] p-4 pt-4 lg:col-span-8">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="relative h-10 w-10 overflow-hidden rounded-full ring-1 ring-[var(--gold)]">
            <Image
              src={person.photo}
              alt=""
              fill
              sizes="40px"
              className="object-cover object-[center_18%]"
            />
          </span>
          <div>
            <p className="text-[15px] font-medium text-[var(--ivory)]">{person.shortName}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-[var(--ivory-dim)]">
              <span className="twin-pulse h-1.5 w-1.5 rounded-full bg-[#9be38a]" />
              Live twin
            </p>
          </div>
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <TwinPanel />
        </div>
      </section>
    </div>
  );
}
