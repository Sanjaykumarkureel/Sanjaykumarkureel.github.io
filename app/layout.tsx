import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { person } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: `${person.name}, ${person.honorific}`,
    template: `%s · ${person.monogram}`,
  },
  description: person.statement,
  authors: [{ name: person.name }],
  openGraph: {
    title: `${person.name}, ${person.honorific}`,
    description: `${person.title} — ${person.disciplines.join(" · ")}`,
    type: "profile",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[var(--ink)] text-[var(--ivory)]">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
