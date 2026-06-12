# Platform Structure

To operationalize the methodology, the repository and routing structure of the platform must reflect its semantic taxonomy. 

The structure is designed to support Human-readable documentation, Agent-readable context (MCPs), and operational systems within a unified `Next.js 15` monorepo structure.

## Repository Organization

```text
/
├── /docs                 # Human-readable methodology & systems docs
├── /ai-context           # Machine-consumable specifications (.md, .json)
├── /agents               # Agent initialization scripts & bootstrap protocols
├── /playbooks            # Actionable implementation guides for specific runtimes
├── /governance           # Architecture freeze rules, contribution guidelines
├── /runtime              # Core Next.js platform code (the site itself)
├── /systems              # Deep-dives into specific infrastructure (e.g. Offline)
├── /case-studies         # Real-world applications (e.g. MatchDay)
└── /methodology          # The foundational text (this directory)
```

## Routing Conventions

The Next.js `app/` router will map directly to this semantic taxonomy to provide predictable, RESTful-style navigation for both humans and web-crawling agents.

- `/docs/systems/hydration`
- `/docs/governance/growth`
- `/playbooks/offline-dexie`
- `/ai/context/bootstrap`

## Extensibility for AI

The `/ai-context` directory acts as the entry point for MCP (Model Context Protocol) servers. When an AI agent connects to a repository built using this methodology, it first reads `/ai-context/manifest.json` to load the operational boundaries and feature governance rules before proposing any code.
