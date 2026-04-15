"use client";

export function Newsletter() {
  return (
    <section className="py-24 px-6 bg-surface/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Stay ahead of the curve
        </h2>
        <p className="text-muted text-lg mb-8">
          Get weekly DeFi insights, yield opportunities, and market analysis
          delivered to your inbox.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-accent text-black font-medium text-sm hover:bg-accent-dim transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs text-muted mt-4">
          No spam. Unsubscribe anytime. We respect your inbox.
        </p>
      </div>
    </section>
  );
}
