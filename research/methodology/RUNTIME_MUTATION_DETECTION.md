# Runtime Mutation Detection

The Graph must remain utterly immutable in RAM. To guarantee this against stealthy mutations caused by third-party packages or buggy query loops, we apply continuous deep assertions.

## Mutation Traps

1. **Object.isExtensible Validation:** The runtime boot must recursively verify that `Object.isExtensible(node) === false`.
2. **Object.isFrozen Validation:** Ensure `Object.isFrozen(node) === true` for every edge string and property.
3. **Write Trap Testing:** The `stress-tester` will explicitly attempt to execute `node.test_flag = true` and `delete node.id`. If the Node.js V8 engine does not immediately throw a `TypeError`, the mutation barrier has failed and the build is aborted.
