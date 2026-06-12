# Edge Types

In the Runtime-Oriented Semantic Graph, edges are not mere hyperlinks. They are directional semantic contracts that define the relationship and authority between two nodes. 

The Semantic Compiler uses these edge types to perform integrity validation and context assembly.

## The Edge Registry

| Edge Type | Semantic Meaning | Authority Level | Example |
| :--- | :--- | :--- | :--- |
| `owns` | Strict architectural authority. | **Absolute** | Runtime Ownership `owns` Hydration |
| `enforces` | A rule or constraint applied to a system. | **High** | Mock-First Architecture `enforces` Canonical Contracts |
| `prevents` | Mitigation of an operational risk. | **High** | Hydration Governance `prevents` Hydration Duplication |
| `depends_on` | A required architectural prerequisite. | **High** | Semantic Graph `depends_on` Canonical IDs |
| `extends` | Inheritance of governance rules. | **Medium** | Dexie Orchestration `extends` Offline Architecture |
| `contextualizes` | Context expansion for clarity. | **Medium** | MatchDay Case Study `contextualizes` Polling vs WebSockets |
| `contradicts` | An explicit conflict warning. | **Critical** | Feature-First `contradicts` Runtime-First |
| `supersedes` | Replacement of a deprecated pattern. | **High** | Architecture Freeze `supersedes` Feature Iteration |

## Validation Rules
The `/core/validation` pipeline enforces directional logic on these edges. For example, a `Governance` node cannot `depend_on` a `Case Study`. If an invalid edge direction is detected, the Semantic Compiler halts the build.
