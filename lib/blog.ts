export type Post = {
  slug: string;
  title: string;
  date: string;
  topic: string;
  lede: string;
  paragraphs: string[];
};

export const blogTopics = [
  "Biology",
  "Health",
  "Aging",
  "Disease",
  "Longevity",
  "Human behaviour",
  "Writing",
] as const;

export const blogIntro = {
  kicker: "Notebook",
  title: "What I think I understand.",
  lede:
    "A personal blog for working out ideas in public — my own thoughts and understanding of biology, health, aging, disease, longevity, human behaviour, and writing. Not a publication list. Not a finished argument. Notes toward clarity.",
};

export const posts: Post[] = [
  {
    slug: "a-notebook-for-understanding",
    title: "A notebook for understanding",
    date: "7 October 2026",
    topic: "Writing",
    lede:
      "This is where I will write what I think I understand — and where that understanding is still incomplete.",
    paragraphs: [
      "Scientific papers are a record of what can be defended. This notebook is something else. I will use it to write through biology, health, aging, disease, longevity, human behaviour, and the act of writing itself — not as a second CV, but as a place to test what I think I know.",
      "The aim is clarity. Better questions. Honest reflection. Ideas that need time. If a note is useful, it will stay. If it is wrong, I will say so later.",
      "New essays will appear here as they are written.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
