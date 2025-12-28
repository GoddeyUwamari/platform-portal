import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Authentication Middleware
 *
 * NOTE: Currently disabled because we use localStorage for token storage.
 * Middleware runs on the server and cannot access localStorage.
 *
 * Route protection is handled by:
 * 1. ProtectedRoute component (client-side)
 * 2. Auth context (client-side)
 *
 * To enable server-side protection:
 * - Store JWT in httpOnly cookies instead of localStorage
 * - Update auth service to set cookies on login
 * - Update this middleware to check for cookie
 */
export function middleware(request: NextRequest) {
  // Disabled for now - using client-side protection
  return NextResponse.next()
}

export const config = {
  // Currently matching nothing (middleware disabled)
  matcher: []
}
