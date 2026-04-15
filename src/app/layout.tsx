import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://defi-radar-landing.vercel.app"),
  title: "DeFi Radar — Real-Time DeFi Intelligence",
  description:
    "Track yields, protocols, predictions, and market trends across 200+ DeFi protocols and 50+ chains.",
  keywords: [
    "defi",
    "defi dashboard",
    "yield farming",
    "crypto analytics",
    "defi protocols",
    "defi radar",
    "crypto dashboard",
    "tvl tracker",
    "yield scanner",
  ],
  authors: [{ name: "Gabriel Madureira", url: "https://x.com/madureira" }],
  openGraph: {
    title: "DeFi Radar — Real-Time DeFi Intelligence",
    description:
      "Track yields, protocols, predictions, and market trends across 200+ DeFi protocols and 50+ chains.",
    url: "https://defiradar.app",
    siteName: "DeFi Radar",
    type: "website",
    locale: "en_US",
    images: [{ url: "/radar-og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "DeFi Radar — Real-Time DeFi Intelligence",
    description:
      "200+ protocols. 500+ yield pools. 50+ chains. Free. No wallet required.",
    creator: "@defiradar",
    images: ["/radar-og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-text">
        {children}
      </body>
    </html>
  );
}
