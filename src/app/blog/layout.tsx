import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | DeFi Radar Blog",
    default: "Blog | DeFi Radar",
  },
  description:
    "DeFi insights, yield farming strategies, protocol comparisons, and market analysis. Learn to navigate decentralized finance with data-driven guides.",
  openGraph: {
    title: "DeFi Radar Blog",
    description:
      "DeFi insights, yield farming strategies, protocol comparisons, and market analysis.",
    url: "https://defiradar.app/blog",
    siteName: "DeFi Radar",
    type: "website",
    locale: "en_US",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
