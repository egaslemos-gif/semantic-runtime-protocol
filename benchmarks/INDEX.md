# Semantic Runtime Benchmarks

This directory contains empirical, objective comparisons between Traditional AI architectures (RAG, Static Context) and the Semantic Runtime Protocol (SRP).

The metrics are based on deterministic execution environments, not probabilistic approximations.

## Core Metrics Matrix

| Problem | Traditional AI (RAG / Full-Context) | Semantic OS (SRP) |
| :--- | :--- | :--- |
| **Prompt Drift** | High (Context window dilution) | Bounded (O(1) Intent Canonicalization) |
| **Scope Leakage** | Frequent (Vector proximity errors) | Blocked (Capability Gates & BFS Pruning) |
| **Token Explosion** | Massive (Unbounded file concatenation) | Deterministic (Hard Budget limits) |
| **Governance Retention** | Probabilistic (Agent chooses to obey) | Enforced (Strict Constraints prepend payload) |
| **Cross-Agent Consistency** | Poor (IDE vs CI see different states) | Deterministic (Shared Immutable Graph) |

## Benchmark Details

1. [Prompt Drift Analysis](PROMPT_DRIFT_ANALYSIS.md)
2. [Scope Leakage Tests](SCOPE_LEAKAGE_TESTS.md)
3. [Token Efficiency](TOKEN_EFFICIENCY.md)
