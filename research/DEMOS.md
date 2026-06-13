# Public Demonstrations

To achieve true ecosystem penetration, text-based documentation is insufficient. The SRP (formerly SRP) requires visceral, interactive, and adversarial public demonstrations.

## Planned Demonstrations

### Demo 1: The Prompt Drift Benchmark (Live)
- **Scenario:** A side-by-side execution. Screen A uses Claude via standard MCP (full repository context). Screen B uses Claude via SRP `mcp-claude` adapter.
- **Action:** Ask both to refactor a component while injecting a stale, contradictory instruction into a nearby file.
- **Result:** Screen A hallucinates and breaks the constraint. Screen B respects the constraint.

### Demo 2: The Cursor Daemon Coprocessor
- **Scenario:** Developer opens `src/auth.ts` in Cursor IDE.
- **Action:** The daemon instantly generates the `.cursorrules` file in the background. The user hits Cmd+K and types "add a new role".
- **Result:** Cursor reads the strict `.cursorrules` constraints injected by the SRP and warns the user: *"Cannot add role without updating infrastructure.security.auth"*.

### Demo 3: Adversarial Payload Attack (The Playground)
- **Scenario:** A malicious agent attempts a Prompt Injection via the API: `target=server.auth; DROP TABLE users`.
- **Action:** Execute the query in the Next.js `ADVERSARIAL` playground.
- **Result:** The `IntentCanonicalizer` instantly throws `QUERY_REJECTED`. The UI flashes red. The engine refuses to allocate memory for the BFS queue.
