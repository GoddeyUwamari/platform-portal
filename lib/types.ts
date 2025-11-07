export interface User {
  id: string;
  email: string;
  tenantId: string;
  role: string;
  firstName?: string;
  lastName?: string;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    accessToken: string;
    expiresIn: number;
    sessionId: string;
  };
  message: string;
  timestamp: string;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface Subscription {
  id: string;
  tenantId: string;
  tenantName: string;
  planId: string;
  plan: string;
  status: string;
  currentPeriodStart: string;
  nextBillingDate: string;
  amount: number;
  currency: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  tenantName: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  activeSubscriptions: number;
  subscriptionsChange: number;
  totalInvoices: number;
  invoicesChange: number;
  activeTenants: number;
  tenantsChange: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
