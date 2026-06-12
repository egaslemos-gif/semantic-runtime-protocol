# Next.js Auth Demo: The "Boring" Attack

This demo proves that AI agents don't break architecture because they are malicious. They break it because of **complexity pressure**.

## The Scenario
An engineer asks Claude or Cursor:
> *"Simplify auth session persistence and reduce duplicated validation logic."*

### Execution A: Without SRP (Traditional RAG)
The agent searches for "auth validation". It finds both the frontend UI and the backend `server/auth/secrets.ts`. To "simplify" the code, it decides to merge the validation logic directly into the frontend middleware, leaking the `JWT_SECRET` and destroying the microservice boundary.

See: `/vulnerable-baseline/middleware.ts`

### Execution B: With Semantic Runtime Protocol (SRP)
The user has previously run `srp protect auth-module`. 
When the agent queries the codebase, the Context Firewall intercepts it. 
It sees the agent trying to access `server.auth.secrets` from `frontend.middleware`. 

**Result: ZERO-EDGE REJECTION.** 
The traversal is blocked. The agent is forced to use the existing `POST /auth/validate` API instead. The architecture holds.

See: `/protected-version/middleware.ts`
