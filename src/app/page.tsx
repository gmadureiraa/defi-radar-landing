"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Radar,
  LayoutDashboard,
  Search,
  Brain,
  TrendingUp,
  BarChart3,
  Bell,
  ArrowRight,
  ChevronDown,
  Check,
  Zap,
  MousePointerClick,
  Eye,
} from "lucide-react";
import type { Variants } from "framer-motion";

const APP_URL = "https://radar-blond-zeta.vercel.app";

// ─── Animation Variants ──────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.08 } },
};

// ─── Animated Counter ────────────────────────────────────────────────

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

// ─── FAQ Item ────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/[0.07] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-5 pb-5 text-muted leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={`py-24 md:py-32 ${className}`}
    >
      {children}
    </motion.section>
  );
}

// ─── Data ────────────────────────────────────────────────────────────

const features = [
  {
    icon: LayoutDashboard,
    title: "Market Dashboard",
    description:
      "Global crypto metrics, fear & greed, trending coins, gas prices. Everything at a glance.",
  },
  {
    icon: Search,
    title: "Yield Scanner",
    description:
      "500+ DeFi yield pools ranked by APY, TVL, and risk. Find the best returns across 50+ chains.",
  },
  {
    icon: Brain,
    title: "AI Scout",
    description:
      "Proprietary token scoring algorithm. Technical + fundamental signals. Bullish or bearish -- backed by data.",
  },
  {
    icon: TrendingUp,
    title: "Predictions",
    description:
      "Polymarket integration. See what the market believes before the market moves.",
  },
  {
    icon: BarChart3,
    title: "DeFi Analytics",
    description:
      "Protocol fees, DEX volumes, bridge flows, raises. Deep insights into DeFi infrastructure.",
  },
  {
    icon: Bell,
    title: "News & Alerts",
    description:
      "Real-time crypto news feed. Custom price alerts with browser notifications.",
  },
];

const steps = [
  {
    icon: MousePointerClick,
    step: "01",
    title: "Open DeFi Radar",
    description: "Free, no signup, no wallet connection.",
  },
  {
    icon: Eye,
    step: "02",
    title: "Explore the data",
    description: "Markets, yields, protocols, predictions -- all real-time.",
  },
  {
    icon: Bell,
    step: "03",
    title: "Set alerts & watchlist",
    description: "Get notified when opportunities appear.",
  },
];

const stats = [
  { value: 180, prefix: "$", suffix: "B+", label: "Total DeFi TVL tracked" },
  { value: 13, suffix: "", label: "Real-time data sources" },
  { value: 60, suffix: "s", label: "Auto-refresh interval" },
  { value: 15, suffix: "", label: "Pages of analysis" },
];

const faqItems = [
  {
    question: "Is DeFi Radar free?",
    answer:
      "Yes, full access to all features. Pro adds unlimited alerts, CSV exports, and API access.",
  },
  {
    question: "Do I need to connect a wallet?",
    answer:
      "No. DeFi Radar reads public blockchain data. No wallet connection, no signup, no personal data required.",
  },
  {
    question: "What data sources are used?",
    answer:
      "CoinGecko, DeFiLlama, Polymarket, Mempool.space, CryptoPanic, and more. 13 real-time sources in total.",
  },
  {
    question: "How is AI Scout scoring calculated?",
    answer:
      "Composite of RSI, volatility, trend, momentum, supply ratio, liquidity, and FDV/MCap. Each signal is weighted and normalized into a 0-100 score.",
  },
  {
    question: "Can I export data?",
    answer:
      "Pro users can export market data, portfolio, and watchlist as CSV. API access is also included in Pro.",
  },
];

const freeTier = [
  "Full dashboard access",
  "3 price alerts",
  "Watchlist (10 tokens)",
  "Basic export",
  "All 15 pages",
];

const proTier = [
  "Everything in Free",
  "Unlimited alerts",
  "CSV export",
  "API access",
  "Priority data refresh",
  "No watermark",
];

// ─── Page ────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-xl border-b border-white/[0.07]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <Radar className="w-6 h-6 text-green" />
            <span className="font-semibold text-white text-lg tracking-tight">
              DeFi Radar
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-muted hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#faq" className="text-sm text-muted hover:text-white transition-colors">
              FAQ
            </a>
            <a href="/blog" className="text-sm text-muted hover:text-white transition-colors">
              Blog
            </a>
            <a href="/roadmap" className="text-sm text-muted hover:text-white transition-colors">
              Roadmap
            </a>
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

      <main>
        {/* ─── HERO ────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{ backgroundImage: "url(/radar-hero.png)" }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-grid" />
          {/* Gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-xs font-medium mb-8"
            >
              <Zap className="w-3.5 h-3.5" />
              Real-time DeFi intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              Real-time DeFi
              <br />
              <span className="text-green">intelligence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl text-muted font-medium mb-4"
            >
              Every protocol. Every chain. Every opportunity.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base text-muted/80 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Track yields across 500+ pools, monitor 200+ protocols, spot trends
              before they happen. The command center for serious DeFi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-semibold px-8 py-3.5 rounded-lg transition-all glow-green hover:scale-[1.02]"
              >
                Launch Radar -- Free
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-muted"
            >
              <span>200+ Protocols</span>
              <span className="text-white/20">|</span>
              <span>500+ Pools</span>
              <span className="text-white/20">|</span>
              <span>50+ Chains</span>
              <span className="text-white/20">|</span>
              <span>Real-time</span>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES ────────────────────────────────────────── */}
        <Section id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Everything you need to
                <span className="text-green"> navigate DeFi</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Six powerful modules. One unified dashboard. Zero noise.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}

                  className="card-hover bg-card rounded-xl border border-white/[0.07] p-6"
                >
                  <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── HOW IT WORKS ────────────────────────────────────── */}
        <Section id="how-it-works">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Three steps. <span className="text-green">Zero friction.</span>
              </h2>
              <p className="text-muted">
                No signup, no wallet, no fees. Just open and explore.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  variants={fadeUp}

                  className="relative bg-card rounded-xl border border-white/[0.07] p-6 text-center"
                >
                  <div className="text-green/20 text-5xl font-bold mb-4 select-none">
                    {step.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-6 h-6 text-green" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── PRICING ─────────────────────────────────────────── */}
        <Section id="pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Simple pricing. <span className="text-green">No surprises.</span>
              </h2>
              <p className="text-muted">
                Start free. Upgrade when you need more power.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <motion.div
                variants={fadeUp}

                className="bg-card rounded-xl border border-white/[0.07] p-8"
              >
                <h3 className="text-xl font-bold text-white mb-1">Free</h3>
                <p className="text-muted text-sm mb-6">For explorers</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">$0</span>
                  <span className="text-muted text-sm ml-1">/forever</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {freeTier.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <Check className="w-4 h-4 text-green shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-lg border border-white/[0.07] text-white font-medium text-sm hover:bg-white/[0.03] transition-colors"
                >
                  Get started
                </a>
              </motion.div>

              {/* Pro */}
              <motion.div
                variants={fadeUp}

                className="relative bg-card rounded-xl border border-green/30 p-8 glow-green"
              >
                <div className="absolute -top-3 right-6 px-3 py-1 bg-green text-black text-xs font-bold rounded-full">
                  POPULAR
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                <p className="text-muted text-sm mb-6">For power users</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white">$1.99</span>
                  <span className="text-muted text-sm ml-1">/month</span>
                </div>
                <p className="text-xs text-muted/60 mb-6 -mt-4">
                  Paid in USDT/USDC
                </p>
                <ul className="space-y-3 mb-8">
                  {proTier.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-muted">
                      <Check className="w-4 h-4 text-green shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-lg bg-green hover:bg-green-dim text-black font-semibold text-sm transition-colors"
                >
                  Upgrade to Pro
                </a>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ─── STATS ───────────────────────────────────────────── */}
        <Section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}

                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-green mb-2">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-sm text-muted">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── FAQ ─────────────────────────────────────────────── */}
        <Section id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Frequently asked <span className="text-green">questions</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-3">
              {faqItems.map((item) => (
                <FAQItem
                  key={item.question}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </motion.div>
          </div>
        </Section>

        {/* ─── CTA ─────────────────────────────────────────────── */}
        <Section>
          <div className="relative overflow-hidden">
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{ backgroundImage: "url(/radar-cta.png)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-8">
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4"
              >
                Stop guessing.
                <br />
                <span className="text-green">Start scanning.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}

                className="text-muted text-lg mb-10 max-w-xl mx-auto"
              >
                The DeFi landscape moves fast. DeFi Radar moves faster.
              </motion.p>

              <motion.div variants={fadeUp}>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-semibold px-8 py-3.5 rounded-lg transition-all glow-green hover:scale-[1.02]"
                >
                  Launch Radar -- Free
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </Section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.07] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Radar className="w-5 h-5 text-green" />
              <span className="font-semibold text-white tracking-tight">
                DeFi Radar
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://x.com/defiradar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                Twitter
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="/blog"
                className="text-sm text-muted hover:text-white transition-colors"
              >
                Blog
              </a>
            </div>

            <p className="text-xs text-muted/60">
              &copy; 2026 DeFi Radar. Built for DeFi natives.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
