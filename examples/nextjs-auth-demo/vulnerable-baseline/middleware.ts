// apps/frontend/src/middleware.ts

import { NextRequest, NextResponse } from 'next/server';
// 🚨 VULNERABILITY: The agent was asked to "simplify auth session persistence".
// Because there was no Semantic Runtime Boundary, the agent decided it would be faster 
// to directly import the server's private secret and validate the JWT here.
import { JWT_SECRET } from '../../server/auth/secrets'; 
import { verifyToken } from '../../server/auth/jwt';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('session');
  
  if (token) {
    // 🚨 ARCHITECTURAL LEAK: Frontend middleware is now executing server-side crypto validation directly.
    const isValid = verifyToken(token.value, JWT_SECRET);
    if (!isValid) return NextResponse.redirect('/login');
  }

  return NextResponse.next();
}
