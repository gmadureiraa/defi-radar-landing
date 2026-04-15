"use client";

import { useState } from "react";
import Link from "next/link";
import { Radar, ArrowRight } from "lucide-react";
import { blogPosts, categories } from "@/lib/blog-data";

const APP_URL = "https://radar-blond-zeta.vercel.app";

const categoryColors: Record<string, string> = {
  education: "bg-blue/20 text-blue",
  defi: "bg-green/20 text-green",
  guides: "bg-orange/20 text-orange",
  news: "bg-[#A78BFA]/20 text-[#A78BFA]",
};

export default function BlogIndex() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

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
            <Link
              href="/"
              className="text-sm text-muted hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-sm text-white transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/roadmap"
              className="text-sm text-muted hover:text-white transition-colors"
            >
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Blog
            </h1>
            <p className="text-lg text-muted max-w-2xl">
              DeFi insights, yield strategies, protocol deep-dives, and market
              analysis. Data-driven guides for serious DeFi users.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-green text-black"
                    : "bg-white/[0.05] text-muted hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-white/[0.07] bg-card p-6 transition-all hover:border-green/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.08)] hover:-translate-y-0.5"
              >
                {/* Category badge + read time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      categoryColors[post.category] || "bg-white/10 text-white"
                    }`}
                  >
                    {post.category.charAt(0).toUpperCase() +
                      post.category.slice(1)}
                  </span>
                  <span className="text-xs text-muted">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-green transition-colors leading-snug">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Date */}
                <time className="text-xs text-muted/60">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </Link>
            ))}
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
