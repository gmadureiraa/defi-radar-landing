const rows = [
  { feature: "Free to use", radar: true, llama: true, terminal: false, dune: true },
  { feature: "Real-time prices", radar: true, llama: false, terminal: true, dune: false },
  { feature: "Yield scanner", radar: true, llama: true, terminal: false, dune: false },
  { feature: "AI token scoring", radar: true, llama: false, terminal: false, dune: false },
  { feature: "Prediction markets", radar: true, llama: false, terminal: false, dune: false },
  { feature: "No SQL required", radar: true, llama: true, terminal: true, dune: false },
  { feature: "No wallet needed", radar: true, llama: true, terminal: true, dune: true },
  { feature: "Mobile friendly", radar: true, llama: "partial", terminal: true, dune: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent mx-auto">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    );
  }
  if (value === "partial") {
    return <span className="text-muted text-sm">~</span>;
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B] mx-auto">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function ComparisonTable() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why DeFi Radar?
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            One dashboard that replaces five tabs. Compare us to the
            alternatives.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface-elevated">
                  <th className="text-left text-sm font-medium text-muted px-6 py-4 w-[200px]">
                    Feature
                  </th>
                  <th className="text-center text-sm font-semibold text-accent px-4 py-4">
                    DeFi Radar
                  </th>
                  <th className="text-center text-sm font-medium text-muted px-4 py-4">
                    DeFiLlama
                  </th>
                  <th className="text-center text-sm font-medium text-muted px-4 py-4">
                    Token Terminal
                  </th>
                  <th className="text-center text-sm font-medium text-muted px-4 py-4">
                    Dune
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={
                      i < rows.length - 1 ? "border-b border-border" : ""
                    }
                  >
                    <td className="text-sm text-foreground px-6 py-3.5">
                      {row.feature}
                    </td>
                    <td className="text-center px-4 py-3.5 bg-accent/[0.03]">
                      <Cell value={row.radar} />
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.llama} />
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.terminal} />
                    </td>
                    <td className="text-center px-4 py-3.5">
                      <Cell value={row.dune} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
