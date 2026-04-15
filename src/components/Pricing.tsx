const APP_URL = "https://radar-blond-zeta.vercel.app";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    cta: "Launch Free",
    ctaHref: APP_URL,
    highlight: false,
    features: [
      "Full dashboard access",
      "250+ coins, real-time prices",
      "500+ yield farming pools",
      "AI Scout (5 scans/day)",
      "3 price alerts",
      "Community support",
    ],
    footnote: 'Small "Powered by DeFi Radar" badge',
  },
  {
    name: "Pro",
    price: "$1.99",
    period: "/month",
    cta: "Upgrade to Pro",
    ctaHref: "#",
    highlight: true,
    features: [
      "Everything in Free",
      "Unlimited AI Scout scans",
      "Unlimited alerts + webhooks",
      "CSV data export",
      "API access (coming Q3)",
      "30s data refresh (vs 60s)",
      "No watermark / badge",
      "Priority support",
    ],
    footnote: "Pay with USDT/USDC on Base",
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Start free with full access. Upgrade to Pro for power features.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-accent bg-surface glow-green-sm"
                  : "border-border bg-surface"
              }`}
            >
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  {plan.highlight && (
                    <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium border border-accent/20">
                      Popular
                    </span>
                  )}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted text-sm">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent mt-0.5 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-lg font-medium text-sm transition-colors ${
                  plan.highlight
                    ? "bg-accent text-black hover:bg-accent-dim"
                    : "border border-border text-foreground hover:bg-surface-elevated"
                }`}
              >
                {plan.cta}
              </a>

              {/* Footnote */}
              {plan.footnote && (
                <p className="text-xs text-muted text-center mt-3">
                  {plan.footnote}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
