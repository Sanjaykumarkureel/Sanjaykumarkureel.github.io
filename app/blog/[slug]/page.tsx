import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Note" };
  return { title: post.title };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <Link
        href="/blog/"
        className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)] hover-line"
      >
        ← Blog
      </Link>
      <p className="mt-8 text-[10px] uppercase tracking-[0.24em] text-[var(--mute)]">
        {post.topic} · {post.date}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-[0.95] tracking-tight sm:text-6xl">
        {post.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-[var(--ivory-dim)]">
        {post.lede}
      </p>
      <div className="gold-rule mt-10 max-w-xs" />
      <div className="mt-10 space-y-6 text-base leading-[1.8] text-[var(--ivory-dim)] sm:text-lg">
        {post.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
