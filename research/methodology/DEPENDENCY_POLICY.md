# Dependency Policy for Semantic Engine

The `@repo/core` package is the beating heart of the Runtime-Oriented Product Engineering platform. It is a **Semantic Compiler**, not a React component library.

To ensure it remains universally consumable by Next.js, MCP Agents, CLI tools, and background workers, it must remain **100% Runtime Agnostic**.

## Strict Boundaries

| Technology | Status | Justification |
| :--- | :--- | :--- |
| **Pure TypeScript** | ✅ ALLOWED | The core language of the engine. |
| **Zod** | ✅ ALLOWED | Used for rigorous schema and governance enforcement. |
| **gray-matter** | ✅ ALLOWED | Required for parsing raw MDX frontmatter. |
| **Node `fs`/`path`** | ✅ ALLOWED | Required for discovery and build-time artifact generation. |
| **React** | ❌ FORBIDDEN | The compiler does not render UI. |
| **Next.js (`next/` imports)** | ❌ FORBIDDEN | Ties the compiler to a specific web framework. |
| **Browser APIs (`window`, `DOM`)** | ❌ FORBIDDEN | Breaks Node/Worker execution. |
| **Tailwind / UI Libs** | ❌ FORBIDDEN | Visual concerns pollute semantic constraints. |

## Enforcement
The internal build pipeline of `@repo/core` will fail if any forbidden import is detected in the AST. The Semantic Graph governs the UI; the UI does not govern the Semantic Graph.
