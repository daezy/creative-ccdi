import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import { ServiceWorker } from "@/components/service-worker";
import {
  Preloader,
  PageCurtain,
  motionBootScript,
} from "@/components/preloader";
import { siteUrl } from "@/lib/content";
import {
  pageMetadata,
  siteStructuredData,
  organisationName,
  indexingEnabled,
} from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import "lenis/dist/lenis.css";
import "./globals.css";
export const metadata: Metadata = {
  ...pageMetadata("/"),
  metadataBase: new URL(siteUrl),
  applicationName: "CCDI",
  creator: organisationName,
  publisher: organisationName,
  category: "Community development and skills training",
  referrer: "strict-origin-when-cross-origin",
  robots: {
    index: indexingEnabled,
    follow: true,
    googleBot: {
      index: indexingEnabled,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico?v=ccdi-logo",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      { url: "/icons/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=ccdi-logo",
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
};
export const viewport: Viewport = {
  themeColor: "#075b37",
  width: "device-width",
  initialScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootScript }} />
      </head>
      <body>
        <Preloader />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <PageCurtain />
        <Motion />
        <StructuredData data={siteStructuredData} />
        <ServiceWorker />
      </body>
    </html>
  );
}
