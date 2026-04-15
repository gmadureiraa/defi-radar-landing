"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Radar,
  ArrowRight,
  Check,
  Copy,
  CheckCircle,
  ArrowLeft,
  Crown,
} from "lucide-react";

const APP_URL = "https://radar-blond-zeta.vercel.app";
const RECEIVING_WALLET = "0x8b4db302dd064f79fd7e35dcaef41f7c536ded8a";

type Plan = "monthly" | "yearly";
type Token = "USDT" | "USDC";
type Network = "ethereum" | "polygon" | "arbitrum" | "bsc" | "base";

const PLANS: Record<Plan, { price: string; label: string; save?: string }> = {
  monthly: { price: "$1.99", label: "Monthly" },
  yearly: { price: "$19.99", label: "Yearly", save: "Save 17%" },
};

const TOKENS: Token[] = ["USDT", "USDC"];

const NETWORKS: { id: Network; label: string; color: string }[] = [
  { id: "ethereum", label: "Ethereum", color: "#627EEA" },
  { id: "polygon", label: "Polygon", color: "#8247E5" },
  { id: "arbitrum", label: "Arbitrum", color: "#28A0F0" },
  { id: "bsc", label: "BSC", color: "#F0B90B" },
  { id: "base", label: "Base", color: "#0052FF" },
];

const TOKEN_CONTRACTS: Record<Network, Record<Token, string>> = {
  ethereum: {
    USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  },
  polygon: {
    USDT: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    USDC: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
  },
  arbitrum: {
    USDT: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    USDC: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  bsc: {
    USDT: "0x55d398326f99059fF775485246999027B3197955",
    USDC: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
  },
  base: {
    USDT: "0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2",
    USDC: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
};

export default function UpgradePage() {
  const [plan, setPlan] = useState<Plan>("monthly");
  const [token, setToken] = useState<Token>("USDT");
  const [network, setNetwork] = useState<Network>("base");
  const [copied, setCopied] = useState<"wallet" | "contract" | null>(null);
  const [txHash, setTxHash] = useState("");
  const [step, setStep] = useState<"select" | "pay" | "confirm" | "success">("select");

  function copyText(text: string, type: "wallet" | "contract") {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  }

  function handleConfirm() {
    if (txHash.trim().length < 10) return;
    setStep("success");
  }

  const selectedPrice = PLANS[plan].price;
  const tokenContract = TOKEN_CONTRACTS[network][token];

  return (
    <>
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Radar className="w-6 h-6 text-green" />
            <span className="font-semibold text-white text-lg tracking-tight">
              DeFi Radar
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-muted hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/blog" className="text-sm text-muted hover:text-white transition-colors">
              Blog
            </Link>
            <Link href="/roadmap" className="text-sm text-muted hover:text-white transition-colors">
              Roadmap
            </Link>
          </div>

          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-medium text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Launch Radar
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      <main className="pt-28 pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-green transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pricing
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-xs font-medium mb-6">
              <Crown className="w-3.5 h-3.5" />
              Upgrade to Pro
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Unlock <span className="text-green">full power</span>
            </h1>
            <p className="text-muted">
              Unlimited alerts, CSV exports, API access, and more.
            </p>
          </div>

          {step === "success" ? (
            /* ─── Success ──────────────────────────────── */
            <div className="rounded-2xl border border-green/20 bg-green/[0.03] p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Payment received!</h2>
              <p className="text-muted mb-2">
                Your Pro plan will be activated shortly.
              </p>
              <p className="text-xs text-muted/60 mb-8">
                TX: {txHash.slice(0, 20)}...
              </p>
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Open Radar
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : step === "select" ? (
            /* ─── Plan Selection ──────────────────────── */
            <div className="space-y-8">
              {/* Plan toggle */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  Select plan
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(PLANS) as Plan[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`relative rounded-xl p-5 text-left transition-all ${
                        plan === p
                          ? "border-green/40 bg-green/[0.04] border"
                          : "border border-white/[0.07] bg-card hover:border-white/[0.12]"
                      }`}
                    >
                      {PLANS[p].save && (
                        <span className="absolute -top-2.5 right-4 px-2 py-0.5 bg-green text-black text-[10px] font-bold rounded-full">
                          {PLANS[p].save}
                        </span>
                      )}
                      <p className="text-sm font-medium text-white mb-1">{PLANS[p].label}</p>
                      <p className="text-2xl font-bold text-white">
                        {PLANS[p].price}
                        <span className="text-sm font-normal text-muted ml-1">
                          /{p === "monthly" ? "mo" : "yr"}
                        </span>
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Token */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  Payment token
                </p>
                <div className="flex gap-3">
                  {TOKENS.map((t) => (
                    <button
                      key={t}
                      onClick={() => setToken(t)}
                      className={`flex-1 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                        token === t
                          ? "border-green/40 bg-green/[0.04] text-white border"
                          : "border border-white/[0.07] bg-card text-muted hover:border-white/[0.12]"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Network */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  Network
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {NETWORKS.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNetwork(n.id)}
                      className={`rounded-xl px-3 py-3 text-xs font-medium transition-all flex items-center gap-2 justify-center ${
                        network === n.id
                          ? "border-green/40 bg-green/[0.04] text-white border"
                          : "border border-white/[0.07] bg-card text-muted hover:border-white/[0.12]"
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: n.color }}
                      />
                      {n.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary + Continue */}
              <div className="rounded-xl border border-white/[0.07] bg-card p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted">Plan</span>
                  <span className="text-sm font-medium text-white">
                    Pro {PLANS[plan].label} - {selectedPrice}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted">Token</span>
                  <span className="text-sm font-medium text-white">{token}</span>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-muted">Network</span>
                  <span className="text-sm font-medium text-white">
                    {NETWORKS.find((n) => n.id === network)?.label}
                  </span>
                </div>
                <button
                  onClick={() => setStep("pay")}
                  className="w-full py-3 rounded-lg bg-green hover:bg-green-dim text-black font-semibold text-sm transition-colors"
                >
                  Continue to payment
                </button>
              </div>
            </div>
          ) : (
            /* ─── Payment Details ─────────────────────── */
            <div className="space-y-6">
              <button
                onClick={() => setStep("select")}
                className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change plan
              </button>

              {/* Payment summary */}
              <div className="rounded-xl border border-green/20 bg-green/[0.03] p-5">
                <p className="text-xs text-muted/60 mb-1">Send exactly</p>
                <p className="text-3xl font-bold text-white mb-1">
                  {plan === "monthly" ? "1.99" : "19.99"}{" "}
                  <span className="text-lg text-muted">{token}</span>
                </p>
                <p className="text-xs text-muted">
                  on {NETWORKS.find((n) => n.id === network)?.label}
                </p>
              </div>

              {/* Receiving wallet */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  Receiving wallet
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-card px-4 py-3">
                  <code className="text-xs text-white font-mono flex-1 truncate">
                    {RECEIVING_WALLET}
                  </code>
                  <button
                    onClick={() => copyText(RECEIVING_WALLET, "wallet")}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-muted hover:text-white"
                  >
                    {copied === "wallet" ? (
                      <Check className="w-4 h-4 text-green" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Token contract */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  {token} contract on {NETWORKS.find((n) => n.id === network)?.label}
                </p>
                <div className="flex items-center gap-2 rounded-xl border border-white/[0.07] bg-card px-4 py-3">
                  <code className="text-xs text-muted font-mono flex-1 truncate">
                    {tokenContract}
                  </code>
                  <button
                    onClick={() => copyText(tokenContract, "contract")}
                    className="shrink-0 p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors text-muted hover:text-white"
                  >
                    {copied === "contract" ? (
                      <Check className="w-4 h-4 text-green" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* TX Hash input */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted/60 mb-3">
                  Transaction hash (after sending)
                </p>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="0x..."
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono bg-card border border-white/[0.07] text-white outline-none focus:border-green/40 transition-colors placeholder:text-muted/40"
                />
              </div>

              {/* Confirm */}
              <button
                onClick={handleConfirm}
                disabled={txHash.trim().length < 10}
                className={`w-full py-3.5 rounded-lg font-semibold text-sm transition-all ${
                  txHash.trim().length >= 10
                    ? "bg-green hover:bg-green-dim text-black"
                    : "bg-white/[0.06] text-muted/40 cursor-not-allowed"
                }`}
              >
                I&apos;ve sent the payment
              </button>

              <p className="text-[11px] text-muted/40 text-center">
                After confirmation, your Pro plan will be activated within minutes.
                Contact @defiradar on X for any issues.
              </p>
            </div>
          )}

          {/* Pro features reminder */}
          <div className="mt-12 rounded-xl border border-white/[0.07] bg-card p-6">
            <h3 className="text-sm font-semibold text-white mb-4">
              What you get with Pro
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Unlimited alerts",
                "CSV data export",
                "API access",
                "Priority data refresh",
                "No watermark on exports",
                "Early access to new features",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-green shrink-0" />
                  <span className="text-sm text-muted">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Radar className="w-5 h-5 text-green" />
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
