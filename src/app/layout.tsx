import type { Metadata, Viewport } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import {
  Preloader,
  PageCurtain,
  motionBootScript,
} from "@/components/preloader";
import { siteUrl, facebook } from "@/lib/content";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "CCDI — Skills for life. Possibility for all.",
    template: "%s | CCDI",
  },
  description:
    "Creative Craft Development Initiative empowers people in Nigeria through practical skills, social enterprise, child welfare, and family and community development.",
  openGraph: {
    type: "website",
    siteName: "Creative Craft Development Initiative",
    locale: "en_NG",
    images: [
      {
        url: "/social-card.png",
        width: 1200,
        height: 630,
        alt: "CCDI — Skills for life. Possibility for all.",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Creative Craft Development Initiative",
              alternateName: "CCDI",
              url: siteUrl,
              logo: `${siteUrl}/images/ccdi-logo.jpg`,
              sameAs: [facebook],
              description:
                "Skills development, social enterprise, child welfare, and family and community empowerment in Nigeria.",
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
