# Cursor IDE Recipe

This recipe configures Semantic OS to dynamically inject Ephemeral Rulepacks into Cursor, completely avoiding stale `.cursorrules` files.

## Concept
Instead of a static `.cursorrules` file that contains thousands of lines of irrelevant instructions, we use a local Daemon script that watches for your current active file and queries the Semantic OS for the exact boundaries of that specific module.

## Setup
1. Run the Daemon in the background: `node /recipes/cursor/daemon.js`.
2. The Daemon tracks your active editor file.
3. It hits `http://localhost:3000/api/query?target=system.auth` passing `X-Agent-Client: Cursor`.
4. It receives the dense Ephemeral Rulepack and overwrites the `.cursorrules` in your project root *instantly*.

When you Cmd+K in Cursor, Cursor reads the dynamically generated, hyper-focused `.cursorrules` tailored perfectly to the file you are looking at.
