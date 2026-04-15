const stats = [
  { value: "200+", label: "Protocols" },
  { value: "500+", label: "Yield Pools" },
  { value: "50+", label: "Chains" },
  { value: "13+", label: "Data Sources" },
];

export function StatsBar() {
  return (
    <section className="relative py-8 border-y border-border bg-surface/50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-3xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
