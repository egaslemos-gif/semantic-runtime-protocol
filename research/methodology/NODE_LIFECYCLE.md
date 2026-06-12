# Node Lifecycle

Knowledge in Runtime-Oriented Product Engineering is not static. A concept may begin as a theory, mature into a formal governance rule, and eventually be superseded. 

The Node Lifecycle tracks the operational maturity of a Semantic Node.

## Lifecycle States

1. **`draft`**
   - The concept is under review or active development. The node exists in the graph but is ignored by the AI Context Assembly. It is visually marked as "Experimental" in the UI.
2. **`production`**
   - The concept is active, enforced, and battle-tested. The node carries full semantic weight. Its rules are actively injected into agent manifests.
3. **`deprecated`**
   - The concept is no longer valid, but must remain in the graph for historical context. It MUST have a `supersedes` edge pointing to the new `production` node that replaced it. The AI Context Assembly ignores deprecated nodes unless specifically querying legacy code migrations.

## Enforcement
A `production` node CANNOT `depend_on` a `draft` node. The Semantic Compiler validates this during Phase 6. If a mature system depends on an experimental concept, the build will fail.
