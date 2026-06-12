# Semantic Runtime Protocol (SRP)

**Prevent AI agents from violating architectural boundaries.**

```bash
npm install -g srp
srp protect auth-module
```

**Result:**
`✓ Agent blocked from traversing server.auth.secrets`

---

## 1. The Pain
AI agents do not fail because they lack intelligence. They fail because they operate under **complexity pressure** without operational boundaries. 

*Prompt:* "Simplify session persistence and reduce duplicated auth validation logic."

*Consequence:* The traditional agent searches your repository, finds the frontend UI and the backend secrets, and "simplifies" them by merging the JWT validation into the frontend. It corrupts the architecture because it cannot distinguish between textual relevance and governance boundaries.

## 2. The Solution
**RAG resolves retrieval. SRP resolves governance.**

SRP enforces deterministic runtime boundaries for AI-assisted engineering workflows. It mathematically intercepts the agent's context window and physically drops the traversal paths that violate architecture.

## 3. Demonstration
![SRP Blocking Traversal](https://raw.githubusercontent.com/egaslemos-gif/Runtime-Oriented-Product-Engineering/main/apps/web/public/demo-placeholder.gif)

## 4. What SRP is NOT
To understand SRP, you must discard the current AI paradigm.
- **It is NOT an AI framework:** SRP is not an orchestration platform like LangChain.
- **It is NOT a Vector Database:** SRP does not use embeddings or cosine similarity. It uses strict Breadth-First Search (BFS) over explicit edges.
- **It is NOT an AGI System:** SRP does not reason. It mathematically enforces boundaries.
- **It is NOT a Chatbot Runtime:** It is a headless kernel for IDEs (Cursor) and CI bots.

---
### Quick Links
- [Deployment Guide](./DEPLOYMENT.md)
- [Example: Bounding an Agent in Next.js](./examples/nextjs-auth-demo)
- [Protocol Specifications](./specs)
- [Research & Methodology](./research)
