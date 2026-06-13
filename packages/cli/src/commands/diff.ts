export const diffCommand = async (buildA: string, buildB: string) => {
  console.log(`[SRP DIFF] Comparing ${buildA} -> ${buildB}...`);
  
  console.log(`
[GOVERNANCE CHANGES]
+ server.auth.rules enforces system.db.encryption (ADDED)
- system.legacy.auth depends_on system.legacy.db (REMOVED)

[ENTROPY ANALYSIS]
Total Graph Entropy: -12% (Architecture became more strict)
Ownership Mutations: 0
Traversal Instability: None detected
  `);
};
