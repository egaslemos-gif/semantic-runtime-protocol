# Context Protocol (AI Manifest)

The Context Protocol defines the machine-readable output served to autonomous AI agents (via MCP or direct API ingestion). 

Instead of asking agents to read narrative markdown, the platform compiles the Semantic Graph into a deterministic JSON structure. This is the core API of the Runtime-Oriented engineering methodology.

## Protocol Structure

The `/api/ai-context/manifest` endpoint returns a unified JSON object structured by operational constraints, rather than file paths.

```json
{
  "version": "1.0.0",
  "methodology": "Runtime-Oriented Product Engineering",
  "enforcement_mode": "strict",
  "context_layers": {
    "runtime_ownership": {
      "rules": ["Server owns state", "Client observes state"],
      "forbidden_imports": ["redux", "mobx"],
      "required_boundaries": ["use client directives only at interaction leaves"]
    },
    "hydration_rules": {
      "rules": ["SSR markup must strictly match initial client render"],
      "forbidden_patterns": ["useEffect data fetching before hydration"]
    },
    "governance_constraints": {
      "architecture_freeze": true,
      "allowed_mutations": ["components/ui/*", "app/(routes)/*"]
    }
  }
}
```

## Agent Ingestion Lifecycle
1. Agent initializes in the workspace.
2. Agent requests the Context Protocol via MCP.
3. Agent updates its internal system prompt with the `forbidden_patterns` and `rules`.
4. Agent proposes code modifications.
5. Code is evaluated against the deterministic constraints defined in the protocol.
