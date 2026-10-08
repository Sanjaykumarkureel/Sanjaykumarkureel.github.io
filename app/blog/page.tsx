import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/Section";
import { blogIntro, blogTopics, posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div>
      <PageIntro
        index="05"
        kicker={blogIntro.kicker}
        title={blogIntro.title}
        lede={blogIntro.lede}
      />

      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <p className="text-[10px] uppercase tracking-[0.28em] text-[var(--gold)]">
          Terrain
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {blogTopics.map((topic) => (
            <span
              key={topic}
              className="border border-[var(--line)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[var(--ivory-dim)]"
            >
              {topic}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex items-end justify-between border-b border-[var(--line)] pb-6">
          <h2 className="font-[family-name:var(--font-display)] text-3xl">
            Notes
          </h2>
          <p className="font-mono text-[11px] text-[var(--mute)]">
            {String(posts.length).padStart(2, "0")}
          </p>
        </div>
        <ol>
          {posts.map((post, i) => (
            <li key={post.slug} className="border-b border-[var(--line)]">
              <Link
                href={`/blog/${post.slug}/`}
                className="group grid gap-3 py-10 md:grid-cols-12"
              >
                <p className="font-mono text-[11px] text-[var(--gold)] md:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                  <span className="mt-1 block text-[var(--mute)]">{post.date}</span>
                </p>
                <div className="md:col-span-8">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--mute)]">
                    {post.topic}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-display)] text-3xl leading-tight group-hover:text-[var(--gold)]">
                    {post.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--ivory-dim)]">
                    {post.lede}
                  </p>
                </div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[var(--gold)] md:col-span-2 md:text-right">
                  Read
                </p>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
