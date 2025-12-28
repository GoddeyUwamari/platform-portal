"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "owner" | "admin" | "member" | "viewer";
  fallback?: React.ReactNode;
}

/**
 * Protected Route Component
 * Wraps pages that require authentication
 * Redirects to login if not authenticated
 * Shows 403 if user doesn't have required role
 */
export function ProtectedRoute({
  children,
  requiredRole,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, organization } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the attempted URL for redirect after login
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/login?from=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      fallback || (
        <div className="flex min-h-screen items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // If not authenticated, don't render children (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  // Check role-based access (if required)
  if (requiredRole && user) {
    // TODO: Implement role checking when we have membership data
    // For now, we'll allow all authenticated users
    // In the future, check: user.role >= requiredRole

    const roleHierarchy = {
      viewer: 0,
      member: 1,
      admin: 2,
      owner: 3,
    };

    // Placeholder - in production, get user's role from organization membership
    const userRole = "member"; // This should come from user's membership in the organization

    if (
      roleHierarchy[userRole as keyof typeof roleHierarchy] <
      roleHierarchy[requiredRole]
    ) {
      return (
        <div className="flex min-h-screen items-center justify-center">
          <div className="mx-auto max-w-md text-center">
            <h1 className="mb-2 text-4xl font-bold">403</h1>
            <h2 className="mb-4 text-2xl font-semibold">Access Denied</h2>
            <p className="mb-6 text-muted-foreground">
              You don't have permission to access this page. Required role:{" "}
              {requiredRole}
            </p>
            <button
              onClick={() => router.back()}
              className="text-primary hover:underline"
            >
              Go back
            </button>
          </div>
        </div>
      );
    }
  }

  // Render children if authenticated (and authorized if role check was required)
  return <>{children}</>;
}
