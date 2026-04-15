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
  Activity,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";
import type { Variants } from "framer-motion";

const APP_URL = "https://radar-blond-zeta.vercel.app";

// ─── Red Theme Colors ────────────────────────────────────────────────
const RED = "#EF4444";
const RED_DIM = "#DC2626";
const RED_GLOW = "rgba(239, 68, 68, 0.15)";
const DARK_BG = "#0A0A0B";
const DARK_CARD = "#0F0F12";

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

// ─── FAQ Item (Red) ──────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border rounded-xl overflow-hidden" style={{ borderColor: "rgba(239,68,68,0.1)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left transition-colors"
        style={{ background: open ? "rgba(239,68,68,0.03)" : "transparent" }}
      >
        <span className="text-white font-medium pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
          style={{ color: "#8C8C96" }}
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
            <p className="px-5 pb-5 leading-relaxed" style={{ color: "#8C8C96" }}>{answer}</p>
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

// ─── 3D Grid Canvas ─────────────────────────────────────────────────

function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Perspective grid lines
      const gridLines = 20;
      const spacing = 80;

      ctx.strokeStyle = `rgba(239, 68, 68, ${0.06 + Math.sin(time) * 0.02})`;
      ctx.lineWidth = 1;

      // Horizontal lines with perspective
      for (let i = -gridLines; i <= gridLines; i++) {
        const y = cy + i * spacing * 0.5;
        const perspective = 1 - Math.abs(i) / (gridLines * 2);
        ctx.globalAlpha = perspective * 0.4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let i = -gridLines; i <= gridLines; i++) {
        const x = cx + i * spacing;
        const perspective = 1 - Math.abs(i) / (gridLines * 2);
        ctx.globalAlpha = perspective * 0.3;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Pulsing circles
      for (let r = 1; r <= 4; r++) {
        const radius = r * 120 + Math.sin(time * 2 + r) * 20;
        const alpha = (0.08 - r * 0.015) * (1 + Math.sin(time + r) * 0.3);
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.strokeStyle = RED;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Floating particles
      for (let i = 0; i < 30; i++) {
        const px = cx + Math.cos(time * 0.5 + i * 0.7) * (200 + i * 15);
        const py = cy + Math.sin(time * 0.3 + i * 0.5) * (150 + i * 10);
        const size = 1.5 + Math.sin(time + i) * 0.5;
        ctx.globalAlpha = 0.3 + Math.sin(time + i * 0.3) * 0.2;
        ctx.fillStyle = RED;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
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

// ─── Page ────────────────────────────────────────────────────────────

export default function V4Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: DARK_BG }}>
      {/* ─── NAV ─────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl"
            : "bg-transparent"
        }`}
        style={scrolled ? {
          background: `${DARK_BG}cc`,
          borderBottom: "1px solid rgba(239,68,68,0.1)",
        } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <Activity className="w-6 h-6" style={{ color: RED }} />
            <span className="font-semibold text-white text-lg tracking-tight">
              DeFi Radar
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm hover:text-white transition-colors" style={{ color: "#8C8C96" }}>
              Features
            </a>
            <a href="#pricing" className="text-sm hover:text-white transition-colors" style={{ color: "#8C8C96" }}>
              Pricing
            </a>
            <a href="#faq" className="text-sm hover:text-white transition-colors" style={{ color: "#8C8C96" }}>
              FAQ
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-white font-medium text-sm px-4 py-2 rounded-lg transition-all hover:scale-[1.02]"
              style={{
                background: RED,
                boxShadow: `0 0 30px ${RED_GLOW}`,
              }}
            >
              Enter Radar
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 transition-colors"
              style={{ color: "#8C8C96" }}
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
              className="md:hidden backdrop-blur-xl"
              style={{
                background: `${DARK_BG}f0`,
                borderTop: "1px solid rgba(239,68,68,0.1)",
              }}
            >
              <div className="px-4 py-4 flex flex-col gap-3">
                <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 transition-colors" style={{ color: "#8C8C96" }}>Features</a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 transition-colors" style={{ color: "#8C8C96" }}>Pricing</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-sm py-2 transition-colors" style={{ color: "#8C8C96" }}>FAQ</a>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-white font-medium text-sm px-4 py-2.5 rounded-lg transition-colors mt-1"
                  style={{ background: RED }}
                >
                  Enter DeFi Radar
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>
        {/* ─── HERO (V4: 3D Red aesthetic) ─────────────────────── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* 3D Canvas background */}
          <GridCanvas />

          {/* Radial gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, transparent 0%, ${DARK_BG} 75%)`,
            }}
          />

          {/* Top/bottom fade */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, ${DARK_BG} 0%, transparent 20%, transparent 80%, ${DARK_BG} 100%)`,
            }}
          />

          {/* Scan line effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.015) 2px, rgba(239,68,68,0.015) 4px)",
            }}
          />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center pt-24 pb-16">
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono mb-8"
              style={{
                border: `1px solid rgba(239,68,68,0.3)`,
                background: "rgba(239,68,68,0.05)",
                color: RED,
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: RED }} />
              SYSTEM ONLINE -- 13 DATA FEEDS ACTIVE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
            >
              <span className="text-white">DEFI</span>
              <br />
              <span style={{ color: RED }}>RADAR</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg sm:text-xl font-medium mb-3"
              style={{ color: "#8C8C96" }}
            >
              Real-time DeFi intelligence terminal
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm max-w-2xl mx-auto mb-12 leading-relaxed font-mono"
              style={{ color: "rgba(140,140,150,0.7)" }}
            >
              Tracking $180B+ TVL across 200+ protocols and 50+ chains.
              <br />
              Yield scanning. AI scoring. Prediction markets. Zero noise.
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
                className="inline-flex items-center gap-3 text-white font-bold text-lg px-10 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: `linear-gradient(135deg, ${RED}, ${RED_DIM})`,
                  boxShadow: `0 0 50px ${RED_GLOW}, 0 0 100px rgba(239,68,68,0.05)`,
                }}
              >
                Enter DeFi Radar
                <ArrowRight className="w-5 h-5" />
              </a>

              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
                style={{ color: "#8C8C96" }}
              >
                View standard site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </motion.div>

            {/* Terminal-style stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="inline-flex items-center gap-4 sm:gap-8 font-mono text-xs"
              style={{ color: "rgba(239,68,68,0.5)" }}
            >
              <span>200+ PROTOCOLS</span>
              <span style={{ color: "rgba(239,68,68,0.2)" }}>|</span>
              <span>500+ POOLS</span>
              <span style={{ color: "rgba(239,68,68,0.2)" }}>|</span>
              <span>50+ CHAINS</span>
              <span style={{ color: "rgba(239,68,68,0.2)" }}>|</span>
              <span>REAL-TIME</span>
            </motion.div>
          </div>
        </section>

        {/* ─── FEATURES ────────────────────────────────────────── */}
        <Section id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                Six modules.{" "}
                <span style={{ color: RED }}>Zero noise.</span>
              </h2>
              <p style={{ color: "#8C8C96" }} className="max-w-2xl mx-auto">
                Every tool you need to navigate DeFi, unified in one terminal.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="rounded-xl p-6 transition-all duration-250 hover:-translate-y-0.5"
                  style={{
                    background: DARK_CARD,
                    border: "1px solid rgba(239,68,68,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.25)";
                    (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px rgba(239,68,68,0.06)`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.08)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: "rgba(239,68,68,0.1)" }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: RED }} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8C8C96" }}>
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── STATS ───────────────────────────────────────────── */}
        <Section>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold mb-2 font-mono" style={{ color: RED }}>
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                    />
                  </div>
                  <p className="text-sm" style={{ color: "#8C8C96" }}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── PRICING ─────────────────────────────────────────── */}
        <Section id="pricing">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                Simple pricing. <span style={{ color: RED }}>No surprises.</span>
              </h2>
              <p style={{ color: "#8C8C96" }}>
                Start free. Upgrade when you need more power.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Free */}
              <motion.div
                variants={fadeUp}
                className="rounded-xl p-8"
                style={{
                  background: DARK_CARD,
                  border: "1px solid rgba(239,68,68,0.08)",
                }}
              >
                <h3 className="text-xl font-bold text-white mb-1">Free</h3>
                <p className="text-sm mb-6" style={{ color: "#8C8C96" }}>For explorers</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white font-mono">$0</span>
                  <span className="text-sm ml-1" style={{ color: "#8C8C96" }}>/forever</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {freeTier.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#8C8C96" }}>
                      <Check className="w-4 h-4 shrink-0" style={{ color: RED }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-3 rounded-lg text-white font-medium text-sm transition-colors"
                  style={{ border: "1px solid rgba(239,68,68,0.15)" }}
                >
                  Get started
                </a>
              </motion.div>

              {/* Pro */}
              <motion.div
                variants={fadeUp}
                className="relative rounded-xl p-8"
                style={{
                  background: DARK_CARD,
                  border: `1px solid rgba(239,68,68,0.3)`,
                  boxShadow: `0 0 40px ${RED_GLOW}, 0 0 80px rgba(239,68,68,0.05)`,
                }}
              >
                <div
                  className="absolute -top-3 right-6 px-3 py-1 text-white text-xs font-bold rounded-full"
                  style={{ background: RED }}
                >
                  POPULAR
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
                <p className="text-sm mb-6" style={{ color: "#8C8C96" }}>For power users</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-white font-mono">$1.99</span>
                  <span className="text-sm ml-1" style={{ color: "#8C8C96" }}>/month</span>
                </div>
                <p className="text-xs mb-6 -mt-4" style={{ color: "rgba(140,140,150,0.5)" }}>
                  Paid in USDT/USDC
                </p>
                <ul className="space-y-3 mb-8">
                  {proTier.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "#8C8C96" }}>
                      <Check className="w-4 h-4 shrink-0" style={{ color: RED }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="/upgrade"
                  className="block w-full text-center py-3 rounded-lg text-white font-semibold text-sm transition-all hover:scale-[1.01]"
                  style={{
                    background: `linear-gradient(135deg, ${RED}, ${RED_DIM})`,
                  }}
                >
                  Upgrade to Pro
                </a>
              </motion.div>
            </div>
          </div>
        </Section>

        {/* ─── FAQ ─────────────────────────────────────────────── */}
        <Section id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                Frequently asked <span style={{ color: RED }}>questions</span>
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
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at center, rgba(239,68,68,0.04) 0%, transparent 60%)`,
              }}
            />

            <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center py-8">
              <motion.h2
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-4 text-white"
              >
                STOP GUESSING.
                <br />
                <span style={{ color: RED }}>START SCANNING.</span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-lg mb-10 max-w-xl mx-auto"
                style={{ color: "#8C8C96" }}
              >
                The DeFi landscape moves fast. DeFi Radar moves faster.
              </motion.p>

              <motion.div variants={fadeUp}>
                <a
                  href={APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-white font-bold px-10 py-4 rounded-xl transition-all hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(135deg, ${RED}, ${RED_DIM})`,
                    boxShadow: `0 0 50px ${RED_GLOW}`,
                  }}
                >
                  Enter DeFi Radar
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </Section>
      </main>

      {/* ─── FOOTER ──────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid rgba(239,68,68,0.1)" }} className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5" style={{ color: RED }} />
              <span className="font-semibold text-white tracking-tight">
                DeFi Radar
              </span>
            </div>

            <div className="flex items-center gap-6">
              <a
                href="https://x.com/defiradar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#8C8C96" }}
              >
                Twitter
              </a>
              <a
                href="https://github.com/gmadureiraa/defi-radar-landing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#8C8C96" }}
              >
                GitHub
              </a>
              <a
                href="/"
                className="text-sm hover:text-white transition-colors"
                style={{ color: "#8C8C96" }}
              >
                Standard site
              </a>
            </div>

            <p className="text-xs" style={{ color: "rgba(140,140,150,0.5)" }}>
              &copy; 2026 DeFi Radar. Built for DeFi natives.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
