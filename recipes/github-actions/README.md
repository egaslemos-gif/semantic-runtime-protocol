# CI Governance Bot Recipe

This recipe enforces the Semantic OS operational truth at the CI/CD boundary.

## How it Works
The CI bot hooks into GitHub Actions on `pull_request`. It reads the files changed in the PR, maps them to their `CanonicalIds`, and queries the Semantic OS to ensure no `Strict` constraints are violated by the code diff.

## Setup
Add the following to `.github/workflows/semantic-audit.yml`:

```yaml
name: Semantic Governance Audit

on: [pull_request]

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Semantic OS Assertion
        run: |
          # The CLI uses the ci-governance adapter
          npx semantic-os validate-diff --pr=${{ github.event.number }}
```

If the PR modifies `auth.ts` but the PR description or diff does not satisfy the `enforces: infrastructure.db.encryption` rule found in the graph, the pipeline fails and blocks merging.
