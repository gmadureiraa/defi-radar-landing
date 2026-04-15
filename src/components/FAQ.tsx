"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is DeFi Radar free?",
    a: "Yes, the core dashboard is completely free with full access to all 15 pages. Pro adds unlimited AI Scout scans, unlimited alerts, data export, and API access for $1.99/month.",
  },
  {
    q: "Do I need to connect my wallet?",
    a: "No. DeFi Radar is read-only analytics. No wallet connection, no sign-up, no account required. Just open the app and start exploring.",
  },
  {
    q: "Where does the data come from?",
    a: "We aggregate real-time data from CoinGecko, DeFiLlama, Polymarket, Mempool.space, Blocknative, Beaconcha.in, and 7+ other sources. All data refreshes automatically every 60 seconds (30s for Pro).",
  },
  {
    q: "What is AI Scout?",
    a: "Our AI scoring engine analyzes tokens across four dimensions: fundamentals (market cap, volume, TVL), momentum (price action, trend strength), risk (volatility, token age), and social signals. Each token gets a 0-100 composite score.",
  },
  {
    q: "How is this different from DeFiLlama?",
    a: "DeFiLlama focuses on protocol TVL. DeFi Radar combines market prices (CoinGecko), protocol analytics (DeFiLlama), prediction markets (Polymarket), Bitcoin data (Mempool), news, and AI scoring into one unified dashboard.",
  },
  {
    q: "Can I track my portfolio?",
    a: "DeFi Radar has a manual portfolio tracker built in. For full wallet-based tracking with real on-chain balances, check out Folio — our dedicated wallet tracker.",
  },
  {
    q: "Is there a mobile app?",
    a: "DeFi Radar is a Progressive Web App. Add it to your home screen on iOS or Android for a native-like experience. A dedicated mobile app is planned for Q4 2026.",
  },
  {
    q: "How do I pay for Pro?",
    a: "Send USDT or USDC on Base chain to our payment address. Your Pro access activates within minutes after on-chain confirmation. No credit card, no KYC.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Frequently asked questions
          </h2>
          <p className="text-muted text-lg">
            Everything you need to know about DeFi Radar.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-surface-elevated transition-colors"
                >
                  <span className="text-sm font-medium pr-4">{faq.q}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`text-muted shrink-0 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? "max-h-60" : "max-h-0"
                  }`}
                >
                  <p className="px-6 pb-4 text-sm text-muted leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
