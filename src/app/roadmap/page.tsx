import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Roadmap | DeFi Radar",
  description:
    "See what's coming next for DeFi Radar. Our product roadmap from Q2 2026 through Q1 2027.",
  openGraph: {
    title: "Roadmap | DeFi Radar",
    description:
      "See what's coming next for DeFi Radar. Our product roadmap from Q2 2026 through Q1 2027.",
    url: "https://defiradar.app/roadmap",
    siteName: "DeFi Radar",
    type: "website",
  },
};

interface RoadmapItem {
  label: string;
  done: boolean;
}

interface Quarter {
  title: string;
  tag: string;
  items: RoadmapItem[];
}

const roadmap: Quarter[] = [
  {
    title: "Q2 2026",
    tag: "Now",
    items: [
      { label: "Market Dashboard (200+ coins)", done: true },
      { label: "Yield Scanner (500+ pools)", done: true },
      { label: "AI Scout token scoring", done: true },
      { label: "Predictions (Polymarket)", done: true },
      { label: "News feed (CryptoPanic)", done: true },
      { label: "Portfolio tracking (ETH + SOL)", done: true },
      { label: "Pro tier with payments", done: false },
    ],
  },
  {
    title: "Q3 2026",
    tag: "Next",
    items: [
      { label: "Telegram bot alerts", done: false },
      { label: "Advanced webhook alerts", done: false },
      { label: "Custom dashboard layouts", done: false },
      { label: "Folio integration (portfolio sync)", done: false },
    ],
  },
  {
    title: "Q4 2026",
    tag: "Planned",
    items: [
      { label: "Mobile PWA", done: false },
      { label: "API documentation", done: false },
      { label: "Chrome extension", done: false },
      { label: "Tax report export", done: false },
    ],
  },
  {
    title: "Q1 2027",
    tag: "Future",
    items: [
      { label: "Institutional tier", done: false },
      { label: "Multi-user dashboards", done: false },
      { label: "Advanced backtesting", done: false },
      { label: "DEX aggregator", done: false },
    ],
  },
];

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-green"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CircleIcon() {
  return (
    <div className="w-4 h-4 rounded-full border-2 border-white/20" />
  );
}

export default function RoadmapPage() {
  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
            </svg>
            <span className="font-semibold text-white text-lg tracking-tight">
              DeFi Radar
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/roadmap"
              className="text-sm text-white transition-colors"
            >
              Roadmap
            </Link>
          </div>

          <a
            href="https://radar-blond-zeta.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-medium text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Launch Radar
          </a>
        </div>
      </nav>

      <main className="pt-28 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Roadmap
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Where DeFi Radar is headed. Shipping fast, staying focused.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.07] hidden md:block" />

            <div className="space-y-12">
              {roadmap.map((quarter, qi) => {
                const isActive = qi === 0;
                return (
                  <div key={quarter.title} className="relative md:pl-16">
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-4 top-1.5 w-5 h-5 rounded-full border-2 hidden md:flex items-center justify-center ${
                        isActive
                          ? "border-green bg-green/20"
                          : "border-white/20 bg-bg"
                      }`}
                    >
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-green" />
                      )}
                    </div>

                    {/* Quarter header */}
                    <div className="flex items-center gap-3 mb-5">
                      <h2 className="text-2xl font-bold text-white">
                        {quarter.title}
                      </h2>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isActive
                            ? "bg-green/20 text-green"
                            : "bg-white/[0.06] text-muted"
                        }`}
                      >
                        {quarter.tag}
                      </span>
                    </div>

                    {/* Items */}
                    <div
                      className={`rounded-xl border p-6 ${
                        isActive
                          ? "border-green/20 bg-green/[0.03]"
                          : "border-white/[0.07] bg-card"
                      }`}
                    >
                      <ul className="space-y-3">
                        {quarter.items.map((item) => (
                          <li
                            key={item.label}
                            className="flex items-center gap-3"
                          >
                            {item.done ? <CheckIcon /> : <CircleIcon />}
                            <span
                              className={`text-sm ${
                                item.done ? "text-white" : "text-muted"
                              }`}
                            >
                              {item.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="text-muted mb-6">
              Want to influence what we build next?
            </p>
            <a
              href="https://x.com/defiradar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/[0.05] text-sm text-white hover:bg-white/[0.08] transition-all border border-white/[0.07]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow us on X
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
            </svg>
            <span className="font-semibold text-white tracking-tight">
              DeFi Radar
            </span>
          </div>
          <p className="text-xs text-muted/60">
            &copy; 2026 DeFi Radar. Built for DeFi natives.
          </p>
        </div>
      </footer>
    </>
  );
}
