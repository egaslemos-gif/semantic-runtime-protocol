# Semantic Entropy Metrics

As the SRP (formerly SRP) grows, so does its inherent chaos. The `pnpm compile` step must calculate and track Entropy KPIs.

## System Health Metrics

1. **Average Edge Density:** The ratio of Total Edges / Total Nodes. If this ratio exceeds a governed threshold (e.g., >5.0), the system warns of "Spaghetti Governance".
2. **Orphan Rate:** Number of nodes with zero inbound or outbound edges. High orphan rates indicate unused documentation.
3. **Governance Complexity:** The ratio of `enforces` edges vs `depends_on` edges. Too high means the system is overly strict. Too low means the system lacks architectural laws.
4. **Ownership Overlap:** Tracking if certain nodes require multiple jumps to find their root owner, signaling structural fragmentation.
