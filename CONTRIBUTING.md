# Contributing to SRP

The Semantic Runtime Protocol (SRP) is an infrastructure-grade system. We prioritize deterministic behavior, operational safety, and brutal simplicity.

## Core Principles
1. **No Probabilistic Logic:** Do not submit PRs that introduce LLM "reasoning" into the core traversal engine. The engine must remain 100% deterministic (BFS graph traversal).
2. **Backward Compatibility:** Edges like `owns`, `depends_on`, and `enforces` are strictly defined in the `v1alpha` spec. Do not introduce new edge types without submitting a proposal to the Semantic Council.
3. **Infrastructure Focus:** Keep PRs focused on performance (O(1) lookups) and safety. 

## Workflow
1. Fork the repository.
2. Run `pnpm install` and `pnpm build`.
3. Ensure the CI passes (Typecheck, Lint).
4. Submit a descriptive Pull Request.
