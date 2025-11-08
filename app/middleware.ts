import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporarily disabled for development
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: []
}
