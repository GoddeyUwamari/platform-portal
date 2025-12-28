/**
 * Role-Based Access Control (RBAC) Middleware
 * Restricts access based on user roles
 */

import { Request, Response, NextFunction } from 'express';

type Role = 'owner' | 'admin' | 'member' | 'viewer';

/**
 * Middleware to require specific roles
 * @param allowedRoles - Array of roles that are allowed to access the endpoint
 */
export const requireRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user is authenticated
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    // Check if user has required role
    if (!allowedRoles.includes(req.user.role as Role)) {
      res.status(403).json({
        success: false,
        error: 'Insufficient permissions',
        required: allowedRoles,
        current: req.user.role,
      });
      return;
    }

    next();
  };
};

/**
 * Middleware to require owner role
 */
export const requireOwner = requireRole(['owner']);

/**
 * Middleware to require owner or admin role
 */
export const requireAdmin = requireRole(['owner', 'admin']);

/**
 * Middleware to require at least member role (excludes viewers)
 */
export const requireMember = requireRole(['owner', 'admin', 'member']);

/**
 * Permission checker utility
 */
export class PermissionChecker {
  /**
   * Check if user can perform action on resource
   */
  static canPerform(
    userRole: Role,
    resource: string,
    action: 'create' | 'read' | 'update' | 'delete'
  ): boolean {
    // Define permission matrix
    const permissions: Record<
      Role,
      Record<string, ('create' | 'read' | 'update' | 'delete')[]>
    > = {
      owner: {
        services: ['create', 'read', 'update', 'delete'],
        deployments: ['create', 'read', 'update', 'delete'],
        teams: ['create', 'read', 'update', 'delete'],
        users: ['create', 'read', 'update', 'delete'],
        organization: ['read', 'update', 'delete'],
        infrastructure: ['create', 'read', 'update', 'delete'],
        costs: ['read'],
        alerts: ['read', 'update', 'delete'],
      },
      admin: {
        services: ['create', 'read', 'update', 'delete'],
        deployments: ['create', 'read', 'update', 'delete'],
        teams: ['create', 'read', 'update', 'delete'],
        users: ['create', 'read', 'update', 'delete'],
        organization: ['read', 'update'],
        infrastructure: ['create', 'read', 'update', 'delete'],
        costs: ['read'],
        alerts: ['read', 'update', 'delete'],
      },
      member: {
        services: ['create', 'read', 'update'],
        deployments: ['create', 'read', 'update'],
        teams: ['read'],
        users: ['read'],
        organization: ['read'],
        infrastructure: ['create', 'read'],
        costs: ['read'],
        alerts: ['read'],
      },
      viewer: {
        services: ['read'],
        deployments: ['read'],
        teams: ['read'],
        users: ['read'],
        organization: ['read'],
        infrastructure: ['read'],
        costs: ['read'],
        alerts: ['read'],
      },
    };

    const rolePermissions = permissions[userRole];
    if (!rolePermissions || !rolePermissions[resource]) {
      return false;
    }

    return rolePermissions[resource].includes(action);
  }
}

/**
 * Middleware to require specific permission
 */
export const requirePermission = (
  resource: string,
  action: 'create' | 'read' | 'update' | 'delete'
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: 'Authentication required',
      });
      return;
    }

    const hasPermission = PermissionChecker.canPerform(
      req.user.role as Role,
      resource,
      action
    );

    if (!hasPermission) {
      res.status(403).json({
        success: false,
        error: `You do not have permission to ${action} ${resource}`,
      });
      return;
    }

    next();
  };
};
