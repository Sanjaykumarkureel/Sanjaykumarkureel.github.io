export function Eyebrow({
  index,
  children,
}: {
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[var(--gold)]">
      {index ? <span className="text-[var(--mute)]">{index}</span> : null}
      {children}
    </p>
  );
}

export function PageIntro({
  index,
  kicker,
  title,
  lede,
}: {
  index: string;
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-16 pt-16 sm:px-8 sm:pt-24">
      <Eyebrow index={index}>{kicker}</Eyebrow>
      <h1 className="mt-5 max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-[0.95] tracking-tight text-[var(--ivory)] sm:text-7xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ivory-dim)] sm:text-lg">
        {lede}
      </p>
      <div className="gold-rule mt-10 max-w-xs" />
    </header>
  );
}
