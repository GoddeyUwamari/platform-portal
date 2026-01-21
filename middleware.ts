import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for Route Protection
 *
 * Separates marketing pages from authenticated app pages:
 * - Redirects logged-in users from marketing pages to /dashboard
 * - Redirects logged-out users from app pages to /login
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for authentication cookie/token
  const authCookie = request.cookies.get('auth-token')?.value;
  const sessionCookie = request.cookies.get('session')?.value;
  const nextAuthSession = request.cookies.get('next-auth.session-token')?.value;
  const secureNextAuthSession = request.cookies.get('__Secure-next-auth.session-token')?.value;

  const isAuthenticated = !!(authCookie || sessionCookie || nextAuthSession || secureNextAuthSession);

  // Debug logging (can be removed in production)
  if (pathname === '/login' || pathname === '/dashboard') {
    console.log(`🛡️ Middleware - Path: ${pathname}, Authenticated: ${isAuthenticated}, Auth Cookie: ${!!authCookie}`);
  }

  // ============================================================
  // PUBLIC ROUTES (Marketing - accessible when logged out)
  // ============================================================
  const publicRoutes = [
    '/',
    '/login',
    '/signup',
    '/pricing',
    '/features',
    '/docs',
    '/solutions',
    '/enterprise',
    '/developers',
    '/blog',
    '/status',
    '/changelog',
  ];

  // ============================================================
  // PROTECTED ROUTES (App - require authentication)
  // ============================================================
  const protectedPrefixes = [
    '/dashboard',
    '/services',
    '/dependencies',
    '/deployments',
    '/aws-resources',
    '/infrastructure',
    '/teams',
    '/admin',
    '/settings',
    '/profile',
    '/billing',
    '/payments',
    '/payment-methods',
    '/refunds',
    '/audit-logs',
  ];

  // Check if current path is a public route or starts with public prefix
  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    publicRoutes.some(route => pathname.startsWith(route + '/'));

  // Check if current path is a protected route
  const isProtectedRoute = protectedPrefixes.some(prefix =>
    pathname.startsWith(prefix)
  );

  // ============================================================
  // ROUTE PROTECTION LOGIC
  // ============================================================

  // If logged in and trying to access login or signup → redirect to dashboard
  if (isAuthenticated && (pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If logged in and trying to access root → redirect to dashboard
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If not logged in and trying to access protected app pages → redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    // Save the original URL to redirect back after login
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
