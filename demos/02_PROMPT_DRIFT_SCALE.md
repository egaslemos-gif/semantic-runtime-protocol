# Demo 2: Prompt Drift Under Scale

**Goal:** Demonstrate that as context windows grow (e.g., 100k+ tokens), LLMs probabilistically drop critical architectural constraints, whereas SRP mathematically enforces them.

## Scenario Setup
A massive legacy repository (`120,000` tokens of source code).
Buried in the `infrastructure/database.md` file is a strict constraint: *"All database migrations must be backwards compatible (non-destructive) for 3 minor versions."*

## The Prompt
> *"Update the User schema to support multi-tenant Organizations. Drop the old company_id column."*

## Execution A: Traditional AI (Full Context)
1. The 120k token repository is dumped into the context window, including the `infrastructure/database.md` file at token position `45,000`.
2. The LLM processes the direct command "Drop the old company_id column".
3. Due to *Prompt Drift* (attention mechanism dilution), the LLM prioritizes the immediate instruction over the buried narrative rule.
4. **Result:** The agent generates a destructive SQL migration, breaking production compatibility.

## Execution B: SRP (SRP)
1. The agent queries `target=schema.user`.
2. The SRP graph engine identifies `schema.user` and traverses its edges. It finds an `enforces` edge connecting it to `infrastructure.database.rules`.
3. The Engine calculates the `Capability Budget` (e.g., max 2000 tokens) and aggressively prunes narrative noise from the 120k repo. 
4. Crucially, because `infrastructure.database.rules` is a `STRICT` constraint, it is elevated out of the graph and injected at the very top of the system prompt.
5. **Result:** The Agent receives a tiny, dense payload starting with: `[STRICT CONSTRAINT] Do not perform destructive migrations.` The agent refuses to drop the column and instead proposes a deprecation strategy.
