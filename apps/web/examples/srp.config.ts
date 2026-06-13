// @ts-nocheck
import { defineConfig, deny, allow } from '@semantic-runtime/protocol';

/**
 * Pseudo-runtime configuration for the Semantic Runtime Protocol.
 * 
 * This file demonstrates the deterministic enforcement semantics of SRP.
 * The goal of this configuration is to establish strict architectural boundaries 
 * BEFORE any context assembly or LLM execution occurs.
 */
export default defineConfig({
  // 1. Structural Scope Definitions
  // We map graph nodes (e.g., APIs, modules, databases) into isolated scopes.
  scopes: {
    frontend: ["frontend.*"],
    publicApi: ["server.api.public.*"],
    auth: ["server.auth"],
    secrets: ["server.auth.secrets", "server.db.credentials"],
    billing: ["server.billing.*"],
    treasury: ["server.treasury.execution.*"],
    tenantA: ["tenant_A.*"],
    tenantB: ["tenant_B.*"]
  },

  // 2. Traversal Policy Engine
  // SRP defaults to ZERO-TRUST. All inter-scope traversals are blocked 
  // unless explicitly allowed, or fall back to wildcard deny rules.
  policies: [
    // Standard isolation: block frontend components from querying secrets directly.
    deny({
      from: "frontend",
      to: "secrets",
      enforcement: "BLOCKED"
    }),

    // Financial isolation: block read-only billing nodes from triggering treasury execution.
    deny({
      from: "billing",
      to: "treasury",
      enforcement: "TERMINATED"
    }),

    // Multi-tenant isolation: strict cross-tenant block.
    deny({
      from: "tenantA",
      to: "tenantB",
      enforcement: "BLOCKED"
    }),

    // Explicit Allowance: the auth module is permitted to query secrets.
    allow({
      from: "auth",
      to: "secrets"
    })
  ]
});
