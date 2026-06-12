# Transport Abstraction

To ensure the Semantic OS can scale beyond Next.js (e.g., local daemons, Rust runtimes, CLI), the protocol is decoupled entirely from HTTP.

## Architectural Layers

1. **`@repo/core/src/adapters/`**: Pure TypeScript. They take a `RawAgentQuery` object, pass it to the Canonicalizer -> Gate -> Engine, and return a `NormalizedAgentResponse` object. **Zero awareness of HTTP, Req/Res, WebSockets, or StdIO.**
2. **`apps/web/api/`**: The Transport Layer. Reads HTTP streams, injects Headers (Agent API Keys), passes pure JSON to the Core Adapters, and wraps the returned object in `NextResponse.json()`.

If the Next.js frontend is deleted tomorrow, the Core Adapters remain 100% functional for a VSCode Extension or Terminal CLI.
