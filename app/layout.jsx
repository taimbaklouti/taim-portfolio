import "./globals.css";
import "../tokens.css";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import ClientTopProgressBar from "@/components/ClientTopProgressBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import PageTransition from "@/components/PageTransition";
import FontAwesomeLoader from "@/components/FontAwesomeLoader";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import GSAPProvider from "@/components/GSAPProvider";

export const metadata = {
  manifest: "/manifest.json",
  icons: [{ rel: "icon", url: "/favicon.svg", type: "image/svg+xml" }],
  metadataBase: new URL("https://taimbaklouti.vercel.app"),
  title: {
    default: "Taim Baklouti – Full-Stack Developer & AI Education Builder",
    template: "%s – Taim Baklouti",
  },
  description:
    "Taim Baklouti — High School Senior, AI Education Builder, and National Basketball Player. Creator of EduTounes, an AI learning platform. Seeking CS scholarships in USA & Canada.",

  author: "Taim Baklouti",
  generator: "Next.js",
  applicationName: "Taim Baklouti Portfolio",
  referrer: "origin-when-cross-origin",
  keywords: [
    "taim baklouti",
    "taim",
    "baklouti",
    "edutounes",
    "tunisian student",
    "ai education",
    "computer science",
    "scholarship",
    "portfolio",
    "next.js",
    "tailwindcss",
  ],

  authors: [{ name: "Taim Baklouti", url: "https://taimbaklouti.vercel.app" }],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://taimbaklouti.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://taimbaklouti.vercel.app",
    title: "Taim Baklouti – Full-Stack Developer & AI Education Builder",
    siteName: "Taim Baklouti – Full-Stack Developer & AI Education Builder",
    description:
      "Taim Baklouti — High School Senior, AI Education Builder, and National Basketball Player. Creator of EduTounes, an AI learning platform.",
    locale: "en_US",
    images: [
      {
        url: "/og-image-rev.png",
        alt: "Taim Baklouti – Full-Stack Developer & AI Education Builder",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Taim Baklouti – Full-Stack Developer & AI Education Builder",
    description:
      "Taim Baklouti — High School Senior, AI Education Builder, and National Basketball Player. Creator of EduTounes, an AI learning platform.",
    images: ["/og-image-rev.png"],
    creator: "@taimbaklouti",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Taim Baklouti",
  url: "https://taimbaklouti.vercel.app",
  jobTitle: "High School Senior & AI Education Builder",
  worksFor: [{ "@type": "Organization", name: "EduTounes" }],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tunisian High School — Science Track",
  },
  sameAs: [
    "https://github.com/taimbaklouti",
    "https://www.linkedin.com/in/taimbaklouti/",
    "https://www.instagram.com/taimbaklouti/",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash — set dark class before any paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var e=localStorage.getItem("taim-portfolio-theme")||"light";document.documentElement.classList.toggle("dark",e==="dark")}catch(t){}})()`,
          }}
        />
      </head>
      <body>
        {/* Skip to main content link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-accent)] focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          id="json-ld-person"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FontAwesomeLoader />
        <ThemeProvider>
          <GSAPProvider>
            <SmoothScrollProvider>
              <ClientTopProgressBar />
              <Navbar />
              <PageTransition>
                <div id="main-content" tabIndex={-1}>
                  {children}
                </div>
              </PageTransition>
            </SmoothScrollProvider>
          </GSAPProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
