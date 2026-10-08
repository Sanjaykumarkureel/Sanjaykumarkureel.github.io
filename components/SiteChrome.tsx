"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TwinDock } from "@/components/TwinChat";
import { nav, person } from "@/lib/content";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const twinOn = process.env.NEXT_PUBLIC_TWIN_ENABLED !== "0";
  const links = twinOn ? nav : nav.filter((item) => item.href !== "/twin/");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(7,7,8,0.78)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative h-9 w-9 overflow-hidden border border-[var(--gold)]">
              <Image
                src={person.photo}
                alt=""
                fill
                sizes="36px"
                className="object-cover object-[center_18%]"
              />
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.28em] text-[var(--ivory-dim)] sm:block">
              {person.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[11px] uppercase tracking-[0.28em] transition-colors ${
                    active
                      ? "text-[var(--gold)]"
                      : "text-[var(--ivory-dim)] hover:text-[var(--ivory)]"
                  }`}
                >
                  <span className="mr-2 text-[var(--mute)]">{item.index}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={person.links.scholar}
              target="_blank"
              rel="noreferrer"
              className="hidden text-[10px] uppercase tracking-[0.24em] text-[var(--ivory-dim)] hover:text-[var(--gold)] sm:inline-block"
            >
              Scholar
            </a>
            <a
              href={person.cvHref}
              className="hidden border border-[var(--gold)] px-3 py-1.5 text-[10px] uppercase tracking-[0.24em] text-[var(--gold)] transition-colors hover:bg-[var(--gold)] hover:text-[var(--ink)] sm:inline-block"
            >
              CV
            </a>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center border border-[var(--line-strong)] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <span className="flex w-4 flex-col gap-1">
                <span className="block h-px bg-[var(--ivory)]" />
                <span className="block h-px bg-[var(--ivory)]" />
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div className="border-t border-[var(--line)] bg-[var(--ink)] px-5 py-6 lg:hidden">
            <div className="flex flex-col gap-4">
              {links.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm uppercase tracking-[0.22em] text-[var(--ivory)]"
                >
                  {item.index} — {item.label}
                </Link>
              ))}
              <a
                href={person.links.scholar}
                target="_blank"
                rel="noreferrer"
                className="text-sm uppercase tracking-[0.22em] text-[var(--ivory)]"
              >
                Google Scholar
              </a>
              <a
                href={person.cvHref}
                className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]"
              >
                Download CV
              </a>
              {twinOn ? (
                <Link
                  href="/twin/"
                  className="text-sm uppercase tracking-[0.22em] text-[var(--gold)]"
                >
                  Digital twin
                </Link>
              ) : null}
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative flex-1">{children}</main>

      <footer className="border-t border-[var(--line)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-12">
          <div className="flex gap-4 md:col-span-5">
            <span className="relative mt-1 h-16 w-16 shrink-0 overflow-hidden border border-[var(--gold)]">
              <Image
                src={person.photo}
                alt={`${person.name}, ${person.honorific}`}
                fill
                sizes="64px"
                className="object-cover object-[center_18%]"
              />
            </span>
            <div>
              <p className="font-[family-name:var(--font-display)] text-3xl text-[var(--ivory)]">
                {person.name}
              </p>
              <p className="mt-2 text-sm text-[var(--ivory-dim)]">
                {person.title} · {person.location}
              </p>
            </div>
          </div>
          <div className="md:col-span-3">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--mute)]">
              Contact
            </p>
            <a
              href={`mailto:${person.email}`}
              className="mt-3 block text-sm text-[var(--ivory)] hover-line w-fit"
            >
              {person.email}
            </a>
            <a
              href={person.phoneHref}
              className="mt-2 block text-sm text-[var(--ivory-dim)]"
            >
              {person.phone}
            </a>
          </div>
          <div className="md:col-span-4">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--mute)]">
              Profiles
            </p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--ivory-dim)]">
              <a href={person.links.scholar} className="hover-line" target="_blank" rel="noreferrer">
                Scholar
              </a>
              <a href={person.links.orcid} className="hover-line" target="_blank" rel="noreferrer">
                ORCID
              </a>
              <a href={person.links.linkedin} className="hover-line" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={person.links.researchgate} className="hover-line" target="_blank" rel="noreferrer">
                ResearchGate
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--line)]">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-[10px] uppercase tracking-[0.22em] text-[var(--mute)] sm:px-8">
            <span>Enterprise · Edgy · Experimental</span>
            <span>© 2026 SKK</span>
          </div>
        </div>
      </footer>
      {twinOn && !pathname.startsWith("/twin") ? <TwinDock /> : null}
    </>
  );
}
