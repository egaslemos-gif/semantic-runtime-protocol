# Validation Severity

Not all validation checks should instantly halt the compiler. The Semantic Validator operates on a severity scale to maintain pragmatism without compromising the Graph's integrity.

## Severity Levels

### `FATAL`
The compiler aborts instantly. The generated JSON manifests will NOT be written to disk.
- **Triggered By:** Orphan nodes (0 connections), Forbidden Cycles (A -> B -> A), Dangling Canonical IDs, Schema Violations, Ownership Conflicts.

### `ERROR`
The compiler logs an error and sets the exit code to `1`, but continues processing other nodes to aggregate a full error report before halting.
- **Triggered By:** Invalid Edge Directions (e.g., `Governance` depending on a `Case Study`), `production` node depending on a `deprecated` node without a `supersedes` fallback.

### `WARN`
The compiler logs a warning but succeeds. The generated manifests are written to disk.
- **Triggered By:** High context budget consumption, multiple `references` edges (suggesting potential over-coupling without breaking rules), nodes nearing the edge of context limit during minimization.
