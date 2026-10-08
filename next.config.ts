import type { NextConfig } from "next";

const githubRepo = process.env.GITHUB_REPOSITORY ?? "";
const [githubOwner = "", githubName = ""] = githubRepo.split("/");
const isUserSite = Boolean(githubOwner) && githubName === `${githubOwner}.github.io`;
const basePath =
  process.env.GITHUB_PAGES === "true" && githubName && !isUserSite
    ? `/${githubName}`
    : "";

const nextConfig: NextConfig = {
  ...(process.env.GITHUB_PAGES === "true" ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  outputFileTracingExcludes: {
    "/*": [".env", ".env*", ".env.local"],
  },
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_TWIN_ENABLED:
      process.env.GITHUB_PAGES === "true" && !process.env.NEXT_PUBLIC_TWIN_API
        ? "0"
        : "1",
    NEXT_PUBLIC_TWIN_API: process.env.NEXT_PUBLIC_TWIN_API ?? "",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
