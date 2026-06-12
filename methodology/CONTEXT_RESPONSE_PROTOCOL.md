# Context Response Protocol

Defines the structure of the JSON payload returned to AI Agents via the API layer.

## Response Structure

```json
{
  "query_type": "constraints",
  "target": "system.auth",
  "budget_consumed": 450,
  "context": [ ... pruned GraphNodes ... ],
  "governance_warnings": [
     "This node is deprecated.",
     "Strict ownership by Infrastructure."
  ]
}
```

## Protocol Rules
- **budget_consumed:** Must always be calculated and returned.
- **governance_warnings:** Any `ConstraintLevel === 'Strict'` encountered during traversal must be elevated to the warnings array so agents don't miss it.
