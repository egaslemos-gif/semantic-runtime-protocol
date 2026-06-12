# Context Assembly

Context Assembly is the runtime process by which the Next.js engine aggregates semantic nodes into coherent views for both humans and AI agents.

Because the knowledge base is a graph, assembling a "page" requires querying the Relationship Engine.

## Human Assembly (Docs Rendering)
When Next.js renders `app/docs/[slug]/page.tsx`:
1. It parses the core MDX file (e.g., `hydration.mdx`).
2. It reads the frontmatter array `related_primitives: ["runtime_ownership"]`.
3. It queries the graph for the `runtime_ownership` node.
4. It extracts the `runtime_impact` and `title` from that primitive.
5. It injects this contextual data into the `KnowledgeGraphFooter` component.

*Result:* The user reads about Hydration, and at the bottom of the page, they are explicitly told that it is governed by Runtime Ownership, complete with a summary of the impact.

## Machine Assembly (AI Retrieval)
When an agent queries the MCP server for "How do I handle offline data?":
1. The engine searches the Semantic Index for nodes related to "offline".
2. It retrieves the `Offline Architecture` System Node.
3. It traverses the edges to find the associated `required_contexts` and `forbidden_patterns` from the frontmatter.
4. It assembles these into a lightweight JSON Context Protocol payload.

*Result:* The agent receives exactly the operational constraints it needs to generate compliant code, without having to parse human-readable case study narratives.
