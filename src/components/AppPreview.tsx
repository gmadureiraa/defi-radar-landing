"use client";

import { useState } from "react";

const tabs = [
  {
    id: "dashboard",
    label: "Dashboard",
    description:
      "Full market overview: top coins, Fear & Greed, gas prices, trending tokens, bridges, and global stats.",
  },
  {
    id: "yields",
    label: "Yield Scanner",
    description:
      "Browse 500+ yield pools across every chain. Sort by APY, filter by TVL, chain, or stablecoin-only pools.",
  },
  {
    id: "scout",
    label: "AI Scout",
    description:
      "Get an AI-powered 0-100 score for any token. Fundamentals, momentum, risk, and social signals — broken down.",
  },
];

export function AppPreview() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            See it in action
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            A Bloomberg-grade dashboard, designed for DeFi. Dark, fast, and
            information-dense.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-accent text-black"
                  : "bg-surface border border-border text-muted hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <p className="text-center text-muted text-sm mb-8 max-w-lg mx-auto">
          {active.description}
        </p>

        {/* Screenshot placeholder */}
        <div className="relative max-w-4xl mx-auto">
          <div className="rounded-xl border border-border bg-surface overflow-hidden glow-green-sm">
            <div className="aspect-[16/9] bg-gradient-to-br from-surface to-background flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="text-xs text-muted">
                  {active.label} screenshot — replace with{" "}
                  <code className="font-mono text-accent/80">
                    /screenshots/{active.id}.png
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
