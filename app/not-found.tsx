import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col px-5 py-32 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.28em] text-[var(--gold)]">404</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-6xl">
        Off the map.
      </h1>
      <p className="mt-4 max-w-md text-[var(--ivory-dim)]">
        That route does not exist yet. Return to the main sequence.
      </p>
      <Link
        href="/"
        className="mt-10 w-fit border border-[var(--gold)] px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-[var(--gold)]"
      >
        Back to Me
      </Link>
    </div>
  );
}
