const APP_URL = "https://radar-blond-zeta.vercel.app";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid" />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#0C0C0D_70%)]" />

      {/* Green glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium text-muted">
            Live data from 13+ APIs
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          Real-time DeFi intelligence.
          <br />
          <span className="text-accent">Every protocol. Every chain.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Track yields, protocols, predictions, and market trends across 200+
          DeFi protocols. Free. Open. No wallet required.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-accent text-black font-semibold text-base hover:bg-accent-dim transition-colors glow-green"
          >
            Launch Radar
            <svg
              width="16"
              height="16"
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
          <a
            href="#features"
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg border border-border text-muted font-medium text-base hover:text-foreground hover:border-foreground/20 transition-colors"
          >
            See Features
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>

        {/* Screenshot preview placeholder */}
        <div className="mt-16 relative">
          <div className="relative mx-auto max-w-3xl rounded-xl border border-border bg-surface overflow-hidden glow-green">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-elevated">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background rounded-md px-3 py-1.5 text-xs text-muted font-mono text-center">
                  radar-blond-zeta.vercel.app
                </div>
              </div>
            </div>
            {/* Screenshot placeholder - replace with actual screenshot */}
            <div className="aspect-[16/9] bg-gradient-to-br from-surface to-background flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-accent"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                  </svg>
                </div>
                <p className="text-sm text-muted">
                  Dashboard screenshot — replace with actual image
                </p>
              </div>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>
      </div>
    </section>
  );
}
