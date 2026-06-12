# Token Efficiency

## Definition
Token Efficiency measures the ratio of *useful operational constraints* vs *noise* shipped to the LLM during inference.

## Test Conditions
- **Action:** Analyzing the dependency tree of `feature.checkout`.
- **Repository Size:** 1.2M tokens.

## Results

### Traditional Architecture (Codebase Indexing)
- **Payload Generation:** The agent uses tools to read 45 individual files to piece together the checkout dependencies.
- **Tokens Consumed:** ~180,000 tokens per inference loop.
- **Latency:** 14-25 seconds per request.
- **Financial Cost:** High API usage per user prompt.

### Semantic OS (SRP)
- **Payload Generation:** The Semantic OS pre-compiles the graph. The BFS engine pulls `feature.checkout`, traverses 2 levels deep (`maxDepth = 2`), and limits fanout (`budget = 100`).
- **Tokens Consumed:** ~2,500 tokens. The payload is a structured, dense JSON manifest of relationships, not raw source code.
- **Latency:** < 50ms O(1) memory lookup before shipping to the LLM.
- **Financial Cost:** 98% reduction in token consumption for architectural analysis.
