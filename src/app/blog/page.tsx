import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Placeholder blog index — will be replaced with MDX-powered blog
const posts = [
  {
    slug: "what-is-defi",
    title: "What is DeFi? A Complete Guide for 2026",
    excerpt:
      "Everything you need to know about decentralized finance: how it works, the key protocols, and why it matters.",
    date: "2026-04-14",
    readTime: "12 min",
  },
  {
    slug: "crypto-fear-greed-index",
    title: "Understanding the Crypto Fear & Greed Index",
    excerpt:
      "How the Fear & Greed Index works, what it measures, and how to use it in your crypto strategy.",
    date: "2026-04-16",
    readTime: "8 min",
  },
  {
    slug: "best-stablecoin-yields",
    title: "How to Find the Best Stablecoin Yields in 2026",
    excerpt:
      "A practical guide to finding safe, high-yield stablecoin opportunities across DeFi protocols.",
    date: "2026-04-21",
    readTime: "10 min",
  },
  {
    slug: "defi-dashboard-guide",
    title: "How to Use a DeFi Dashboard to Track Your Investments",
    excerpt:
      "Step-by-step guide to using DeFi Radar to monitor yields, protocols, and market trends.",
    date: "2026-04-23",
    readTime: "7 min",
  },
  {
    slug: "yield-farming-strategies",
    title: "Top 10 DeFi Yield Farming Strategies",
    excerpt:
      "From stablecoin farming to leveraged positions: the most effective yield strategies for 2026.",
    date: "2026-04-28",
    readTime: "15 min",
  },
  {
    slug: "aave-vs-compound",
    title: "DeFi Protocol Comparison: Aave vs Compound vs MakerDAO",
    excerpt:
      "An in-depth comparison of the three largest lending protocols in DeFi.",
    date: "2026-04-30",
    readTime: "11 min",
  },
  {
    slug: "polymarket-prediction-markets",
    title: "Prediction Markets: How Polymarket Changes DeFi",
    excerpt:
      "How prediction markets work, why they matter, and how to use DeFi Radar to track them.",
    date: "2026-05-05",
    readTime: "9 min",
  },
  {
    slug: "ai-token-scoring",
    title: "AI Token Scoring: How DeFi Radar's Scout Works",
    excerpt:
      "Behind the scenes of our AI scoring engine: fundamentals, momentum, risk, and social signals.",
    date: "2026-05-07",
    readTime: "8 min",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-muted text-lg">
              DeFi insights, yield opportunities, and market analysis.
            </p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block rounded-xl border border-border bg-surface p-6 card-hover"
              >
                <div className="flex items-center gap-3 text-xs text-muted mb-3">
                  <time>{post.date}</time>
                  <span className="w-1 h-1 rounded-full bg-border" />
                  <span>{post.readTime} read</span>
                </div>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-muted leading-relaxed">
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
