"use client";

import { useState, useEffect } from "react";

const APP_URL = "https://radar-blond-zeta.vercel.app";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0C0C0D]/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 radar-pulse">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
              <line x1="12" y1="2" x2="12" y2="6" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-foreground">
            DeFi Radar
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            Pricing
          </a>
          <a
            href="#faq"
            className="text-sm text-muted hover:text-foreground transition-colors"
          >
            FAQ
          </a>
        </div>

        {/* CTA */}
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent text-black text-sm font-medium hover:bg-accent-dim transition-colors"
        >
          Launch Radar
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
