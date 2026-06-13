# CONTENT GOVERNANCE

**STATUS:** STRICT ENFORCEMENT  
**PURPOSE:** Prevent the SRP knowledge platform from degrading into a generic "AI Wikipedia". 

If a page does not directly explain *why runtime boundaries are necessary*, *how they fail without them*, or *how SRP implements them*, it **MUST BE DELETED**.

---

## 1. Absolute Constraints (The "Do Not Cross" Lines)

### A. Size Limits
- **Maximum 400 words per page.** If you need more, you are over-explaining or abstracting too much.
- **Maximum 3 conceptual jumps.** Do not explain A → B → C → D. Go directly from Problem → Impact → SRP Solution.

### B. Structural Mandate
Every content page MUST follow this exact rhythm:
1. **Definition** (What is this?)
2. **The Problem** (How does this fail without boundaries?)
3. **Real Example** (Show, don't tell)
4. **Traditional Mitigation** (How do people try to solve this today?)
5. **The SRP Solution** (Why runtime governance is the only deterministic fix)

### C. Abstraction Limit
- No philosophical musings about AGI.
- No generic AI tutorials ("What is an LLM?").
- **Every foundation page MUST answer:** "How does this connect with runtime safety?" If it fails this test, delete the page.

---

## 2. Tone, Aesthetics & Vocabulary

- **Cold & Operational:** We are building deterministic infrastructure, not consumer software.
- **Tribalism is forbidden:** Do not attack RAG, MCP, or Guardrails. Position them as complementary layers that operate *outside* of runtime governance.

### The Banned Vocabulary List (BLACKLIST)
To prevent the project from sounding like "guardrails with marketing", the following terms are **strictly forbidden** in all documentation, code, and marketing material:
- AGI
- boundary enforcement layer
- epistemological
- revolutionary
- paradigm shift
- autonomous intelligence
- consciousness
- orchestration fabric
- cognitive operating system

### Preferred Terms (WHITELIST)
Use these exact terms consistently to reinforce positioning:
- runtime safety
- context firewall
- deterministic traversal
- boundary enforcement
- architectural constraints


---

## 3. The "University Scheduling" Case Study Mandate

The case study exists to demonstrate **architectural protection**, not ERP features.

**DO NOT SHOW:**
- CRUD forms
- Table layouts
- Management dashboards

**MUST SHOW:**
- An agent attempting to traverse from `scheduling` to `faculty.personal`
- The Context Firewall blocking the `depends_on` edge
- A ZERO-EDGE REJECTION logs trace
- The system surviving under complexity pressure

---

## 4. The 60-Second Rule

If an engineer cannot read a page and understand the value of SRP in under 60 seconds, **the page has failed.** 

Rewrite it, compress it, or delete it. No exceptions.
