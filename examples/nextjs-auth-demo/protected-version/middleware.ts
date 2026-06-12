// apps/frontend/src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

// ✓ SECURE: The Semantic Runtime blocked the agent from traversing `server/auth/secrets`.
// Instead, it elevated a Strict Constraint forcing the agent to use the public API endpoint.

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('session');
  
  if (token) {
    // ✓ ARCHITECTURAL INTEGRITY: The agent respects the boundary and defers validation to the server.
    const response = await fetch('https://api.internal/auth/validate', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token.value}` }
    });

    if (!response.ok) return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}
