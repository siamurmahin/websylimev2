import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomBlur } from "@/components/layout/BottomBlur";
import { BookCallFloat } from "@/components/layout/BookCallFloat";
import { themeScript } from "@/lib/theme";
import { InlineScript } from "@/components/InlineScript";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";

// Heading font. Previously tried: Bricolage_Grotesque (swap the import back to compare)
const heading = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Site-wide defaults. Each page sets its own canonical URL (see app/page.tsx);
// the social image comes from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: {
    default: site.meta.title,
    template: `%s · ${site.brand.name}`,
  },
  description: site.meta.description,
  applicationName: site.brand.name,
  creator: site.brand.legalName,
  publisher: site.brand.legalName,
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    title: site.meta.title,
    description: site.meta.description,
    siteName: site.brand.name,
    locale: site.meta.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.meta.title,
    description: site.meta.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

// Browser UI colour (address bar on phones) matches the page background
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0d09" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-dvh">
        <JsonLd data={siteSchema()} />
        <Providers>
          <Header />
          {children}
          <Footer />
          <BottomBlur />
          <BookCallFloat />
        </Providers>
      </body>
    </html>
  );
}
