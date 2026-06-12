# Agent Bootstrap System

Autonomous agents require an initialization sequence to align with project governance. Prompt engineering ("You are an expert Next.js developer") is insufficient and leads to framework drift. 

Agents must execute a deterministic boot sequence to load contextual constraints before reading or writing source code.

## Boot Order Protocol

When an AI agent initializes within this workspace, it MUST execute the following load sequence:

### 1. LOAD: Architecture Constraints
- **Source:** `/ai-context/architecture_rules.json`
- **Action:** Ingest globally forbidden imports, allowed network patterns, and state ownership contracts.

### 2. LOAD: Runtime Ownership
- **Source:** `/ai-context/runtime_ownership.json`
- **Action:** Map which directories are explicitly Server Components (`app/`) vs. Client Components (`components/ui/`).

### 3. LOAD: Feature Governance
- **Source:** `/ai-context/feature_flags.json`
- **Action:** Identify active architecture freezes. If the system is frozen, the agent must reject requests to generate new core infrastructure.

### 4. LOAD: Rendering Rules
- **Source:** `/ai-context/hydration_rules.md`
- **Action:** Load rules regarding SSR/Client hydration handovers to prevent layout shifts during component generation.

### 5. LOAD: Operational Boundaries
- **Source:** `/ai-context/operational_boundaries.json`
- **Action:** Set limits on network generation (e.g., block WebSocket code generation if the project is classified as Polling-Only).

## Enforcement via MCP

This boot sequence is exposed via the Model Context Protocol (MCP). The agent queries the repository's MCP server:

`call_mcp_tool: get_boot_sequence {}`

The resulting payload forcefully overrides the agent's pre-trained framework defaults, enforcing the specific, contextual engineering reality of the current Runtime-Oriented project.
