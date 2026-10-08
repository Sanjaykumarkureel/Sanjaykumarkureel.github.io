# Sanjay Kumar Kureel, PhD — personal site

Research portfolio for an independent research scholar in cell biology, aging, mechanobiology, and neurodegeneration, with an AI “digital twin” that answers questions about the career.

- **Live site:** https://sanjaykumarkureel.github.io/
- **Twin API:** https://site-liart-three-18.vercel.app/api/twin/

Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. The twin uses the OpenAI Responses API.

## Run locally

```bash
npm install
echo "OPENAI_API_KEY=sk-..." > .env   # never commit this file
npm run dev
```

Open http://localhost:3000. Locally, the chat posts to `/api/twin/` on the same server.

Checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | All CV and site copy. Pages and the twin's dossier both read from here. |
| `lib/blog.ts` | Blog posts. |
| `lib/twin.ts` | Twin instructions, starter questions, request and response parsing. |
| `app/api/twin/route.ts` | The twin API: origin allowlist, rate limit, OpenAI call. |
| `components/TwinChat.tsx` | The chat island and the `/twin/` panel. |
| `components/SiteChrome.tsx` | Header, footer, and where the chat dock is mounted. |

## How it is deployed

The site runs on two hosts, because GitHub Pages can only serve static files and cannot keep the OpenAI key secret.

- **GitHub Pages** serves the pages. `.github/workflows/pages.yml` runs on every push to `main`: it lints, typechecks, deletes `app/api` (a static export cannot contain route handlers), and builds with `GITHUB_PAGES=true`, which turns on `output: "export"`.
- **Vercel** serves only `/api/twin/`, with `OPENAI_API_KEY` stored as a Vercel environment variable. Deploy it with `npx vercel deploy --prod` after changing the route or `lib/twin.ts`.

Running `GITHUB_PAGES=true npm run build` locally fails unless `app/api` is removed first. That is expected.

### Configuration

| Name | Where | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | `.env` locally, Vercel env | Server-only OpenAI key. |
| `TWIN_MODEL` | Vercel env (optional) | Overrides the model. Defaults to `chat-latest`. |
| `TWIN_ALLOWED_ORIGINS` | Vercel env (optional) | Comma-separated origins allowed to call the API. Defaults to `https://sanjaykumarkureel.github.io`; localhost is allowed outside production. |
| `TWIN_API_URL` | GitHub Actions variable | Becomes `NEXT_PUBLIC_TWIN_API`: the API URL the static site calls. |
| `SITE_URL` | GitHub Actions variable | Becomes `NEXT_PUBLIC_SITE_URL`: the base for social preview images. |

The API rate limit is per server instance, so it only slows abuse down. Keep a monthly budget limit set on the OpenAI project as the hard cap.
