# SRQL Syntax Specification

**Version:** `v1alpha`

The Semantic Runtime Query Language (SRQL) is the formal query language for interacting with the Semantic OS. It replaces fuzzy natural language intent with deterministic Graph Traversal constraints.

## 1. Core Grammar (BNF)

```bnf
<query> ::= <action> <target> [ <modifiers> ]

<action> ::= "GET governance FOR" | "TRAVERSE" <edge_type> "FROM"
<edge_type> ::= "owns" | "depends_on" | "enforces" | "contextualizes"

<target> ::= <canonical_id>
<canonical_id> ::= [a-z0-9.]+ 

<modifiers> ::= <modifier> [ <modifiers> ]
<modifier> ::= <budget_modifier> | <depth_modifier> | <constraint_modifier>

<budget_modifier> ::= "BUDGET" <integer>
<depth_modifier> ::= "MAX_DEPTH" <integer>
<constraint_modifier> ::= "WITH strict constraints" | "WITH all constraints"
```

## 2. Examples

**Basic Intent Canonicalization:**
```sql
GET governance FOR system.auth.login
```

**Bounded Traversal:**
```sql
GET governance FOR system.auth
WITH strict constraints
MAX_DEPTH 2
BUDGET 50
```

**Targeted Edge Exploration:**
```sql
TRAVERSE owns FROM frontend.components BUDGET 100
```

## 3. Abstract Syntax Tree (AST) Model

When SRQL is eventually parsed by the engine, it will generate an `ASTNode` that is passed directly to the `CapabilityGate` before hitting the `QueryEngine`:

```typescript
interface SRQLQuery {
  action: 'GET' | 'TRAVERSE';
  targetNode: string; // CanonicalID
  edgeType?: 'owns' | 'depends_on' | 'enforces';
  modifiers: {
    maxDepth?: number;
    budget?: number;
    strictOnly: boolean;
  }
}
```
