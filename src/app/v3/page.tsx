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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
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

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
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
    const duration = 2000;
    const startTime = performance.now();

    function step(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
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

// ─── Feature Carousel ────────────────────────────────────────────────

function FeatureCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* Scroll buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-white/[0.07] flex items-center justify-center text-muted hover:text-white hover:border-green/30 transition-all hidden md:flex"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-card border border-white/[0.07] flex items-center justify-center text-muted hover:text-white hover:border-green/30 transition-all hidden md:flex"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg to-transparent z-[5] pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg to-transparent z-[5] pointer-events-none" />

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide px-4 md:px-8 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex-shrink-0 w-[300px] snap-center card-hover bg-card rounded-xl border border-white/[0.07] p-6"
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
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────

export default function V3Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroInView = useInView(heroRef, { once: true, margin: "-80px" });

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
          <a href="/" className="flex items-center gap-2.5 group">
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

          <div className="flex items-center gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-medium text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Launch Radar
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-muted hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-white/[0.07] bg-bg/95 backdrop-blur-xl"
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted hover:text-white transition-colors py-2">Features</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted hover:text-white transition-colors py-2">Pricing</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm text-muted hover:text-white transition-colors py-2">FAQ</a>
                <a href="/blog" className="text-sm text-muted hover:text-white transition-colors py-2">Blog</a>
                <a href="/roadmap" className="text-sm text-muted hover:text-white transition-colors py-2">Roadmap</a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green hover:bg-green-dim text-black font-medium text-sm px-4 py-2.5 rounded-lg transition-colors mt-1"
                >
                  Launch Radar
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ─── HERO (V3: Split layout, editorial) ─────────────── */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={stagger}
          className="relative min-h-screen flex items-center overflow-hidden"
        >
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-grid opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <motion.div variants={fadeLeft}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green/20 bg-green/5 text-green text-xs font-medium mb-8">
                  <Zap className="w-3.5 h-3.5" />
                  Real-time DeFi intelligence
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">
                  The command center
                  <br />
                  for <span className="text-green">serious DeFi.</span>
                </h1>

                <p className="text-lg text-muted font-medium mb-3">
                  Every protocol. Every chain. Every opportunity.
                </p>

                <p className="text-sm text-muted/80 max-w-lg mb-10 leading-relaxed">
                  Track yields across 500+ pools, monitor 200+ protocols, spot trends
                  before they happen. Free. No wallet required.
                </p>

                <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-semibold px-8 py-3.5 rounded-lg transition-all glow-green hover:scale-[1.02]"
                  >
                    Launch Radar -- Free
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>

                <div className="flex items-center gap-6 text-xs text-muted">
                  <span>200+ Protocols</span>
                  <span className="text-white/20">|</span>
                  <span>500+ Pools</span>
                  <span className="text-white/20">|</span>
                  <span>50+ Chains</span>
                </div>
              </motion.div>

              {/* Right: Network illustration */}
              <motion.div
                variants={fadeRight}
                className="flex items-center justify-center lg:justify-end"
              >
                <div className="relative">
                  {/* Green glow behind */}
                  <div
                    className="absolute inset-0 -m-12 rounded-full"
                    style={{
                      background: "radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)",
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Floating animation */}
                  <img
                    src="/radar-element-v3.png"
                    alt="DeFi Network"
                    className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[380px] lg:h-[380px] object-contain animate-[float_6s_ease-in-out_infinite]"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ─── STATS BAR ───────────────────────────────────────── */}
        <Section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-card rounded-2xl border border-white/[0.07] p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    className="text-center"
                  >
                    <div className="text-2xl sm:text-3xl font-bold text-green mb-1">
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                      />
                    </div>
                    <p className="text-xs text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ─── FEATURES CAROUSEL ───────────────────────────────── */}
        <Section id="features">
          <div className="max-w-7xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Everything you need to
                <span className="text-green"> navigate DeFi</span>
              </h2>
              <p className="text-muted max-w-2xl mx-auto">
                Six powerful modules. One unified dashboard. Zero noise.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <FeatureCarousel />
            </motion.div>
          </div>
        </Section>

        {/* ─── PRICING TABLE ───────────────────────────────────── */}
        <Section id="pricing">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Simple pricing. <span className="text-green">No surprises.</span>
              </h2>
              <p className="text-muted">
                Start free. Upgrade when you need more power.
              </p>
            </motion.div>

            {/* Comparison Table */}
            <motion.div variants={fadeUp} className="bg-card rounded-2xl border border-white/[0.07] overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-3 border-b border-white/[0.07]">
                <div className="p-6">
                  <span className="text-sm text-muted">Feature</span>
                </div>
                <div className="p-6 text-center border-l border-white/[0.07]">
                  <span className="text-lg font-bold text-white">Free</span>
                  <p className="text-xs text-muted mt-1">$0/forever</p>
                </div>
                <div className="p-6 text-center border-l border-green/20 bg-green/[0.03]">
                  <span className="text-lg font-bold text-green">Pro</span>
                  <p className="text-xs text-muted mt-1">$1.99/mo</p>
                </div>
              </div>

              {/* Table rows */}
              {[
                { feature: "Dashboard access", free: true, pro: true },
                { feature: "All 15 pages", free: true, pro: true },
                { feature: "Price alerts", free: "3", pro: "Unlimited" },
                { feature: "Watchlist tokens", free: "10", pro: "Unlimited" },
                { feature: "CSV export", free: false, pro: true },
                { feature: "API access", free: false, pro: true },
                { feature: "Priority refresh", free: false, pro: true },
                { feature: "No watermark", free: false, pro: true },
              ].map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 ${
                    i % 2 === 0 ? "bg-white/[0.01]" : ""
                  } border-b border-white/[0.04] last:border-0`}
                >
                  <div className="p-4 px-6 flex items-center">
                    <span className="text-sm text-white">{row.feature}</span>
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-white/[0.07]">
                    {typeof row.free === "boolean" ? (
                      row.free ? (
                        <Check className="w-4 h-4 text-green" />
                      ) : (
                        <span className="text-muted/40">--</span>
                      )
                    ) : (
                      <span className="text-sm text-muted">{row.free}</span>
                    )}
                  </div>
                  <div className="p-4 flex items-center justify-center border-l border-green/10 bg-green/[0.02]">
                    {typeof row.pro === "boolean" ? (
                      row.pro ? (
                        <Check className="w-4 h-4 text-green" />
                      ) : (
                        <span className="text-muted/40">--</span>
                      )
                    ) : (
                      <span className="text-sm text-green font-medium">{row.pro}</span>
                    )}
                  </div>
                </div>
              ))}

              {/* CTA row */}
              <div className="grid grid-cols-3 border-t border-white/[0.07]">
                <div className="p-6" />
                <div className="p-6 flex items-center justify-center border-l border-white/[0.07]">
                  <a
                    href={APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white font-medium border border-white/[0.12] rounded-lg px-5 py-2.5 hover:bg-white/[0.03] transition-colors"
                  >
                    Get started
                  </a>
                </div>
                <div className="p-6 flex items-center justify-center border-l border-green/10 bg-green/[0.02]">
                  <a
                    href="/upgrade"
                    className="text-sm text-black font-semibold bg-green hover:bg-green-dim rounded-lg px-5 py-2.5 transition-colors"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              </div>
            </motion.div>

            <p className="text-center text-xs text-muted/50 mt-4">
              Pro paid in USDT/USDC
            </p>
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
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              variants={fadeUp}
              className="bg-card rounded-2xl border border-white/[0.07] p-12 md:p-16 relative overflow-hidden"
            >
              {/* Subtle glow */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(34,197,94,0.06) 0%, transparent 70%)",
                }}
              />

              <h2 className="relative text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Stop guessing.
                <br />
                <span className="text-green">Start scanning.</span>
              </h2>

              <p className="relative text-muted text-lg mb-10 max-w-xl mx-auto">
                The DeFi landscape moves fast. DeFi Radar moves faster.
              </p>

              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 bg-green hover:bg-green-dim text-black font-semibold px-8 py-3.5 rounded-lg transition-all glow-green hover:scale-[1.02]"
              >
                Launch Radar -- Free
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
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
                href="https://github.com/gmadureiraa/defi-radar-landing"
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

      {/* Float animation */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-16px);
          }
        }
      `}</style>
    </>
  );
}
