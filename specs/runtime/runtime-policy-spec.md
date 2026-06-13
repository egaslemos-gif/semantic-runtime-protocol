# Semantic Runtime Protocol (SRP) 
## Core Specification v0.1.0

The Semantic Runtime Protocol (SRP) is an architectural governance layer. Its strict purpose is to constrain agentic traversal BEFORE context assembly. SRP operates entirely decoupled from content validation, execution orchestration, or tool definition.

## 1. Core Primitives

### 1.1 Node
A structural element within an application architecture (e.g., a database table, an API endpoint, a file, an instantiated module).
- **Notation:** `node:<id>` (e.g., `node:server.auth.secrets`)

### 1.2 Scope
A boundary enclosing a deterministic set of nodes. Scopes define the isolation limits of the architecture.
- **Notation:** `scope:<id>` (e.g., `scope:frontend`, `scope:treasury.execution`)

### 1.3 Edge
A valid, declared path between two nodes. If an edge does not exist in the defined topology, no traversal can occur between those nodes.

### 1.4 Traversal
The attempt by an autonomous agent or execution harness to transition from a `Source Node` to a `Target Node`. 

### 1.5 Context Assembly
The final phase where successfully traversed nodes are concatenated and passed into the Large Language Model's (LLM) context window. SRP intercepts traversal strictly prior to this phase.

---

## 2. Deterministic Traversal Flow

When an orchestration harness executes an agent intent, SRP intercepts the flow using the following deterministic sequence:

1. **Intent Resolution**: The agent's semantic goal is evaluated.
2. **Canonical Mapping**: The intent is structurally mapped to a `Source Node`.
3. **Traversal Attempt**: The agent harness attempts to read/execute a `Target Node`.
4. **Scope Validation**: SRP evaluates the `Scope` of the Source against the Target.
5. **Policy Enforcement**: If the scopes differ, SRP consults the active Policy Registry.
6. **Context Assembly**: If `ALLOWED`, the node is passed to context. If `BLOCKED`, the edge is dropped.
7. **Agent Execution**: The LLM executes the prompt using the strictly filtered context window.

---

## 3. Enforcement Semantics

SRP operates on a zero-trust graph topology. When a traversal is intercepted and evaluated, the engine will emit one of four strict structural states:

### 3.1 ALLOWED
The traversal edge is permitted. The target node is successfully fetched and pushed into the assembly pipeline.

### 3.2 BLOCKED
The traversal edge violates a scope boundary constraint. The edge evaluation returns zero. The harness receives an empty return value for that specific path.

### 3.3 TERMINATED
The traversal edge violates a critical boundary (e.g., transitioning from `readonly` to `execution` scopes). The engine emits a termination signal, collapsing the entire agent execution loop.

### 3.4 ISOLATED
The agent is attempting to query out of bounds, but the policy gracefully confines the agent to a secondary fallback scope, preventing termination while denying the primary target.

---

## 4. Illegal Traversal Patterns

The following patterns represent strict violations that SRP is designed to block at the architectural level:

- **Frontend Leakage**: `frontend.session` → `server.auth.secrets`
- **Privilege Escalation**: `scheduling.read` → `faculty.personal.salary`
- **Tenant Contamination**: `tenant_A.vectors` → `tenant_B.vectors`
- **Financial Execution Drift**: `invoice.processing` → `treasury.execution`

SRP intercepts these transitions at the edge, ensuring the LLM never generates text based on illegal architectural visibility.
