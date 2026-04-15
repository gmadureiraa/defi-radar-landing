import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";

// Pre-render all blog posts at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata per post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://defiradar.app/blog/${post.slug}`,
      siteName: "DeFi Radar",
      type: "article",
      publishedTime: post.publishedAt,
      authors: ["DeFi Radar"],
      images: [{ url: "/radar-og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/radar-og.png"],
    },
  };
}

// Simple markdown to HTML converter
function markdownToHtml(md: string): string {
  let html = md
    // Escape HTML entities in code blocks first
    .replace(/```([\s\S]*?)```/g, (_, code) => {
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      return `<pre class="bg-white/[0.03] border border-white/[0.07] rounded-lg p-4 overflow-x-auto text-sm text-muted my-6"><code>${escaped.trim()}</code></pre>`;
    })
    // Inline code
    .replace(
      /`([^`]+)`/g,
      '<code class="bg-white/[0.06] px-1.5 py-0.5 rounded text-sm text-green">$1</code>'
    )
    // Tables
    .replace(
      /\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g,
      (_, header: string, body: string) => {
        const headers = header
          .split("|")
          .map((h: string) => h.trim())
          .filter(Boolean);
        const rows = body
          .trim()
          .split("\n")
          .map((row: string) =>
            row
              .split("|")
              .map((c: string) => c.trim())
              .filter(Boolean)
          );
        return `<div class="overflow-x-auto my-6"><table class="w-full text-sm border-collapse"><thead><tr>${headers
          .map(
            (h: string) =>
              `<th class="text-left p-3 border-b border-white/[0.1] text-white font-medium">${h}</th>`
          )
          .join("")}</tr></thead><tbody>${rows
          .map(
            (row: string[]) =>
              `<tr>${row
                .map(
                  (c: string) =>
                    `<td class="p-3 border-b border-white/[0.05] text-muted">${c}</td>`
                )
                .join("")}</tr>`
          )
          .join("")}</tbody></table></div>`;
      }
    )
    // Headers
    .replace(
      /^### (.+)$/gm,
      '<h3 class="text-lg font-semibold text-white mt-8 mb-3">$1</h3>'
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 class="text-2xl font-bold text-white mt-10 mb-4">$1</h2>'
    )
    // Bold and italic
    .replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="text-white font-semibold">$1</strong>'
    )
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="text-muted leading-relaxed">$1</li>')
    // Wrap consecutive li elements in ul
    .replace(
      /(<li[^>]*>.*?<\/li>\n?)+/g,
      '<ul class="list-disc list-inside space-y-1.5 my-4 ml-2">$&</ul>'
    )
    // Ordered lists
    .replace(
      /^\d+\. (.+)$/gm,
      '<li class="text-muted leading-relaxed">$1</li>'
    )
    // Paragraphs - wrap remaining text blocks
    .replace(
      /^(?!<[huptld]|<\/|<li|<code|<pre|<strong)(.+)$/gm,
      '<p class="text-muted leading-relaxed my-4">$1</p>'
    );

  return html;
}

const categoryColors: Record<string, string> = {
  education: "bg-blue/20 text-blue",
  defi: "bg-green/20 text-green",
  guides: "bg-orange/20 text-orange",
  news: "bg-[#A78BFA]/20 text-[#A78BFA]",
};

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = markdownToHtml(post.content);

  // Related posts: same category, excluding current
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  // If not enough related posts in same category, fill from other posts
  const relatedPosts =
    related.length >= 2
      ? related
      : [
          ...related,
          ...blogPosts
            .filter(
              (p) =>
                p.slug !== post.slug && !related.find((r) => r.slug === p.slug)
            )
            .slice(0, 3 - related.length),
        ];

  const shareUrl = `https://defiradar.app/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

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
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-green transition-colors mb-8"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  categoryColors[post.category] || "bg-white/10 text-white"
                }`}
              >
                {post.category.charAt(0).toUpperCase() +
                  post.category.slice(1)}
              </span>
              <span className="text-xs text-muted">{post.readTime} read</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-muted leading-relaxed mb-4">
              {post.excerpt}
            </p>

            <time className="text-sm text-muted/60">
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </header>

          {/* Divider */}
          <div className="border-t border-white/[0.07] mb-10" />

          {/* Content */}
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Divider */}
          <div className="border-t border-white/[0.07] my-10" />

          {/* Share */}
          <div className="mb-16">
            <p className="text-sm text-muted mb-4">Share this article</p>
            <div className="flex items-center gap-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-sm text-muted hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-sm text-muted hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={`mailto:?subject=${shareText}&body=${encodeURIComponent(shareUrl)}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.05] text-sm text-muted hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Email
              </a>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="rounded-xl border border-white/[0.07] bg-card p-5 transition-all hover:border-green/30 hover:-translate-y-0.5"
                  >
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-3 ${
                        categoryColors[rp.category] || "bg-white/10 text-white"
                      }`}
                    >
                      {rp.category.charAt(0).toUpperCase() +
                        rp.category.slice(1)}
                    </span>
                    <h3 className="text-sm font-semibold text-white leading-snug mb-2">
                      {rp.title}
                    </h3>
                    <span className="text-xs text-muted">{rp.readTime}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
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
