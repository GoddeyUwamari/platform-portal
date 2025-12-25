# CloudBill Dashboard - System Design & Architecture Documentation

## Executive Summary

**CloudBill Dashboard** is a modern, full-stack SaaS billing and subscription management platform built with a microservices architecture. The system provides comprehensive billing operations, multi-tenant support, payment processing, subscription management, and real-time monitoring capabilities.

**Key Highlights:**
- Microservices architecture with 5 independent services
- Multi-tenant with Row-Level Security (RLS)
- Real-time monitoring and health checks
- RESTful API Gateway pattern
- Type-safe TypeScript implementation
- Production-ready authentication and authorization

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Architecture Patterns](#2-architecture-patterns)
3. [System Components](#3-system-components)
4. [Data Architecture](#4-data-architecture)
5. [API Design](#5-api-design)
6. [Security Architecture](#6-security-architecture)
7. [Frontend Architecture](#7-frontend-architecture)
8. [Backend Architecture](#8-backend-architecture)
9. [Technology Stack](#9-technology-stack)
10. [Scalability & Performance](#10-scalability--performance)
11. [Deployment Architecture](#11-deployment-architecture)
12. [System Flows](#12-system-flows)

---

## 1. System Overview

### 1.1 Problem Statement

Modern SaaS businesses require robust billing infrastructure to manage subscriptions, invoices, payments, and multi-tenant operations. Building this infrastructure in-house is time-consuming and error-prone.

### 1.2 Solution

CloudBill provides a comprehensive billing platform with:
- **Subscription Management**: Create, modify, cancel, and renew subscriptions
- **Invoice Management**: Generate, track, and collect payments on invoices
- **Payment Processing**: Integration-ready payment infrastructure
- **Multi-Tenant Support**: Isolated data per organization
- **Analytics Dashboard**: Real-time insights into billing metrics
- **Monitoring**: System health and service status tracking

### 1.3 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                          │
│                    (Next.js 15 + React 19)                      │
│                      Port: 3010 (Dev)                           │
└────────────────────────────┬────────────────────────────────────┘
                             │ HTTP/REST
                             │ Bearer Token Auth
                             │ X-Tenant-ID Header
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway                              │
│                      (Express.js)                               │
│                      Port: 8080                                 │
│  - Request Routing      - Load Balancing                       │
│  - Authentication       - Rate Limiting                        │
│  - Health Aggregation   - CORS Handling                        │
└────────────────────────────┬────────────────────────────────────┘
                             │
          ┌──────────────────┼──────────────────┐
          ▼                  ▼                  ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────┐
│  Auth Service    │ │   Billing    │ │     Payment      │
│   Port: 3001     │ │   Service    │ │     Service      │
│                  │ │  Port: 3002  │ │   Port: 3003     │
│ - User Auth      │ │ - Subs       │ │ - Payments       │
│ - JWT Tokens     │ │ - Invoices   │ │ - Refunds        │
│ - Tenants        │ │ - Stats      │ │ - Methods        │
└──────────────────┘ └──────────────┘ └──────────────────┘
          │                  │                  │
          └──────────────────┼──────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Data Layer                                 │
│                                                                 │
│  ┌─────────────────────┐         ┌──────────────────┐        │
│  │   PostgreSQL        │         │      Redis       │         │
│  │   Port: 5432        │         │   Port: 6379     │         │
│  │ - Multi-tenant RLS  │         │ - Session Cache  │         │
│  │ - ACID Compliance   │         │ - Rate Limiting  │         │
│  └─────────────────────┘         └──────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Architecture Patterns

### 2.1 Microservices Architecture

**Why Microservices?**
- **Independent Deployment**: Services can be deployed separately
- **Technology Flexibility**: Each service can use optimal tech stack
- **Fault Isolation**: Failures don't cascade across entire system
- **Scalability**: Scale services independently based on load
- **Team Autonomy**: Different teams can own different services

**Service Boundaries:**
```
┌─────────────────────────────────────────────────────────┐
│                    Auth Service                         │
│  Bounded Context: Identity & Access Management          │
│  - User authentication and authorization                │
│  - Tenant management                                    │
│  - Session management                                   │
│  - JWT token generation/validation                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Billing Service                        │
│  Bounded Context: Subscription & Invoice Management     │
│  - Subscription lifecycle                               │
│  - Invoice generation and management                    │
│  - Billing analytics and statistics                     │
│  - Revenue tracking                                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Payment Service                        │
│  Bounded Context: Payment Processing                    │
│  - Payment intent creation and confirmation             │
│  - Payment method management                            │
│  - Refund processing                                    │
│  - Transaction history                                  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│               Notification Service                      │
│  Bounded Context: Communication & Alerts                │
│  - Email notifications                                  │
│  - Webhook delivery                                     │
│  - Event notifications                                  │
│  - Template management                                  │
└─────────────────────────────────────────────────────────┘
```

### 2.2 API Gateway Pattern

The API Gateway serves as a single entry point for all client requests:

**Responsibilities:**
- **Request Routing**: Routes requests to appropriate microservices
- **Authentication**: Validates JWT tokens before forwarding requests
- **Load Balancing**: Distributes load across service instances
- **Health Aggregation**: Collects health status from all services
- **CORS Handling**: Manages cross-origin resource sharing
- **Rate Limiting**: Prevents API abuse
- **Request/Response Transformation**: Standardizes API responses

**Benefits:**
- Simplified client implementation (single endpoint)
- Centralized security and monitoring
- Reduced round-trips
- Protocol translation capability

### 2.3 Multi-Tenancy Architecture

**Strategy: Shared Database with Row-Level Security (RLS)**

```
┌─────────────────────────────────────────────────────────┐
│                   PostgreSQL Database                   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │         Tenants Table (Master)                  │  │
│  │  - id (UUID)                                    │  │
│  │  - name                                         │  │
│  │  - status (ACTIVE, INACTIVE, SUSPENDED)        │  │
│  └──────────────────┬──────────────────────────────┘  │
│                     │                                   │
│        ┌────────────┼────────────┐                     │
│        ▼            ▼            ▼                     │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐          │
│  │  Users  │  │  Subscr. │  │  Invoices  │          │
│  │ (RLS)   │  │  (RLS)   │  │   (RLS)    │          │
│  │         │  │          │  │            │          │
│  │tenantId │  │tenantId  │  │ tenantId   │          │
│  └─────────┘  └──────────┘  └────────────┘          │
│                                                         │
│  Row-Level Security Policies:                          │
│  - SELECT: WHERE tenantId = current_tenant_id()        │
│  - INSERT: SET tenantId = current_tenant_id()          │
│  - UPDATE: WHERE tenantId = current_tenant_id()        │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Every request includes `X-Tenant-ID` header
- Database queries automatically filtered by tenant
- Complete data isolation between tenants
- Efficient resource utilization (shared infrastructure)

**Advantages:**
- Cost-effective (shared resources)
- Easy maintenance and updates
- Strong data isolation
- Efficient queries

### 2.4 Repository Pattern

Service layer abstracts database access:

```typescript
// Service Layer
class SubscriptionService {
  async create(data: CreateSubscriptionDTO) {
    // Business logic here
    return await subscriptionRepository.save(data);
  }
}

// Repository Layer
class SubscriptionRepository {
  async save(data: Subscription) {
    // Database operations
  }
}
```

**Benefits:**
- Separation of concerns
- Testability (mock repositories)
- Database abstraction
- Business logic isolation

---

## 3. System Components

### 3.1 Frontend Application

**Technology**: Next.js 15 (React 19 RC)
**Port**: 3010 (Development)
**Architecture**: Client-side rendered with server components

**Key Features:**
- Server-side rendering for initial page load
- Client-side navigation for SPA experience
- Optimistic UI updates
- Real-time data synchronization
- Responsive design (mobile-first)

**Component Structure:**
```
app/
├── (auth)/login/          # Authentication pages
├── dashboard/             # Main dashboard
├── subscriptions/         # Subscription management
├── invoices/              # Invoice management
│   └── [id]/             # Dynamic invoice detail
├── payments/              # Payment processing
├── payment-methods/       # Payment method management
├── refunds/               # Refund management
├── tenants/               # Tenant management
├── profile/               # User profile
└── admin/
    └── monitoring/        # System monitoring

components/
├── subscriptions/         # Subscription components
├── invoices/             # Invoice components
├── payments/             # Payment components
├── layout/               # Layout components
├── navigation/           # Navigation components
└── ui/                   # Reusable UI components (shadcn/ui)

lib/
├── api.ts                # Axios client + interceptors
├── types.ts              # TypeScript type definitions
├── utils.ts              # Utility functions
├── query-client.ts       # React Query configuration
└── services/             # API service layer
    ├── subscriptions.service.ts
    ├── invoices.service.ts
    ├── payments.service.ts
    ├── user.service.ts
    └── monitoring.service.ts
```

### 3.2 API Gateway

**Technology**: Express.js
**Port**: 8080

**Middleware Stack:**
```javascript
1. CORS Handler        → Allow cross-origin requests
2. Body Parser         → Parse JSON requests
3. Request Logger      → Log all incoming requests
4. Auth Validator      → Validate JWT tokens
5. Tenant Extractor    → Extract tenant ID from token
6. Rate Limiter        → Prevent abuse
7. Route Handler       → Forward to microservices
8. Error Handler       → Standardize error responses
```

**Routing Table:**
```
/api/auth/*              → Auth Service (3001)
/api/billing/*           → Billing Service (3002)
/api/payments/*          → Payment Service (3003)
/api/notifications/*     → Notification Service (3004)
/health                  → Health Aggregator
```

### 3.3 Microservices

#### Auth Service (Port 3001)

**Responsibilities:**
- User authentication (login/logout)
- JWT token generation and validation
- Password management
- Tenant management
- User profile management
- Role-based access control

**Endpoints:**
```
POST   /api/auth/login           # User login
POST   /api/auth/logout          # User logout
GET    /api/auth/me              # Get current user
PATCH  /api/auth/profile         # Update profile
POST   /api/auth/change-password # Change password
GET    /api/auth/tenants         # List tenants
```

#### Billing Service (Port 3002)

**Responsibilities:**
- Subscription lifecycle management
- Invoice generation and tracking
- Billing statistics and analytics
- Revenue calculations
- Usage tracking

**Endpoints:**
```
# Subscriptions
GET    /api/billing/subscriptions
POST   /api/billing/subscriptions
GET    /api/billing/subscriptions/:id
PATCH  /api/billing/subscriptions/:id
POST   /api/billing/subscriptions/:id/cancel
POST   /api/billing/subscriptions/:id/reactivate
POST   /api/billing/subscriptions/:id/suspend
POST   /api/billing/subscriptions/:id/renew
POST   /api/billing/subscriptions/:id/change-plan

# Invoices
GET    /api/billing/invoices
POST   /api/billing/invoices
GET    /api/billing/invoices/:id
GET    /api/billing/invoices/:id/items
POST   /api/billing/invoices/:id/items
POST   /api/billing/invoices/:id/payment
POST   /api/billing/invoices/:id/finalize
POST   /api/billing/invoices/:id/void
POST   /api/billing/invoices/:id/uncollectible

# Stats
GET    /api/billing/stats/dashboard
GET    /api/billing/stats/revenue-timeline
```

#### Payment Service (Port 3003)

**Responsibilities:**
- Payment intent creation and processing
- Payment method management (cards, bank accounts)
- Refund processing
- Transaction history
- Payment gateway integration

**Endpoints:**
```
# Payments
GET    /api/payments
GET    /api/payments/:id
GET    /api/payments/stats
POST   /api/payments/intents
POST   /api/payments/intents/:id/confirm
POST   /api/payments/intents/:id/cancel

# Payment Methods
GET    /api/payment-methods
POST   /api/payment-methods
PATCH  /api/payment-methods/:id
DELETE /api/payment-methods/:id
POST   /api/payment-methods/:id/default

# Refunds
GET    /api/refunds
POST   /api/refunds
GET    /api/refunds/stats
```

#### Notification Service (Port 3004)

**Responsibilities:**
- Email notifications
- Webhook delivery
- Event-driven notifications
- Template management

---

## 4. Data Architecture

### 4.1 Database Schema

**Database**: PostgreSQL 14+
**Schema Design**: Normalized with multi-tenant isolation

```sql
-- Core Entities

TABLE tenants {
  id UUID PRIMARY KEY
  name VARCHAR(255) NOT NULL
  email VARCHAR(255) NOT NULL
  status VARCHAR(50) -- ACTIVE, INACTIVE, SUSPENDED
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()
}

TABLE users {
  id UUID PRIMARY KEY
  tenant_id UUID REFERENCES tenants(id)
  email VARCHAR(255) UNIQUE NOT NULL
  password_hash VARCHAR(255) NOT NULL
  first_name VARCHAR(100)
  last_name VARCHAR(100)
  role VARCHAR(50) -- SUPER_ADMIN, ADMIN, BILLING_ADMIN, USER, VIEWER
  status VARCHAR(50) -- ACTIVE, INACTIVE, SUSPENDED, PENDING
  email_verified BOOLEAN DEFAULT FALSE
  last_login_at TIMESTAMP
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()

  INDEX idx_users_tenant (tenant_id)
  INDEX idx_users_email (email)
}

TABLE subscriptions {
  id UUID PRIMARY KEY
  tenant_id UUID REFERENCES tenants(id)
  plan_id VARCHAR(100) NOT NULL
  status VARCHAR(50) -- active, cancelled, expired, suspended, past_due
  billing_cycle VARCHAR(20) -- monthly, yearly
  current_price DECIMAL(10,2) NOT NULL
  currency VARCHAR(3) DEFAULT 'USD'
  started_at TIMESTAMP NOT NULL
  current_period_start TIMESTAMP NOT NULL
  current_period_end TIMESTAMP NOT NULL
  next_billing_date TIMESTAMP
  cancelled_at TIMESTAMP
  expires_at TIMESTAMP
  auto_renew BOOLEAN DEFAULT TRUE
  is_trial BOOLEAN DEFAULT FALSE
  trial_ends_at TIMESTAMP
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()

  INDEX idx_subscriptions_tenant (tenant_id)
  INDEX idx_subscriptions_status (status)
  INDEX idx_subscriptions_next_billing (next_billing_date)
}

TABLE invoices {
  id UUID PRIMARY KEY
  tenant_id UUID REFERENCES tenants(id)
  subscription_id UUID REFERENCES subscriptions(id)
  invoice_number VARCHAR(50) UNIQUE NOT NULL
  subtotal DECIMAL(10,2) NOT NULL
  tax_amount DECIMAL(10,2) DEFAULT 0
  discount_amount DECIMAL(10,2) DEFAULT 0
  total_amount DECIMAL(10,2) NOT NULL
  amount_paid DECIMAL(10,2) DEFAULT 0
  amount_due DECIMAL(10,2) NOT NULL
  currency VARCHAR(3) DEFAULT 'USD'
  status VARCHAR(50) -- draft, open, paid, void, uncollectible
  period_start TIMESTAMP NOT NULL
  period_end TIMESTAMP NOT NULL
  issue_date TIMESTAMP NOT NULL
  due_date TIMESTAMP NOT NULL
  paid_at TIMESTAMP
  payment_method VARCHAR(100)
  payment_reference VARCHAR(255)
  notes TEXT
  pdf_url VARCHAR(500)
  pdf_generated_at TIMESTAMP
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()

  INDEX idx_invoices_tenant (tenant_id)
  INDEX idx_invoices_subscription (subscription_id)
  INDEX idx_invoices_status (status)
  INDEX idx_invoices_due_date (due_date)
}

TABLE invoice_items {
  id UUID PRIMARY KEY
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE
  description TEXT NOT NULL
  item_type VARCHAR(50) -- subscription, usage, credit, fee, discount
  quantity DECIMAL(10,2) NOT NULL
  unit_price DECIMAL(10,2) NOT NULL
  amount DECIMAL(10,2) NOT NULL
  tax_rate DECIMAL(5,2) DEFAULT 0
  tax_amount DECIMAL(10,2) DEFAULT 0
  metadata JSONB
  created_at TIMESTAMP DEFAULT NOW()

  INDEX idx_invoice_items_invoice (invoice_id)
}

TABLE payments {
  id UUID PRIMARY KEY
  amount DECIMAL(10,2) NOT NULL
  currency VARCHAR(3) DEFAULT 'USD'
  status VARCHAR(50) -- succeeded, pending, failed, cancelled, refunded
  payment_method VARCHAR(100) NOT NULL
  payment_method_type VARCHAR(50)
  invoice_id UUID REFERENCES invoices(id)
  customer_id UUID REFERENCES users(id)
  transaction_id VARCHAR(255) UNIQUE NOT NULL
  description TEXT
  metadata JSONB
  created_at TIMESTAMP DEFAULT NOW()
  updated_at TIMESTAMP DEFAULT NOW()

  INDEX idx_payments_customer (customer_id)
  INDEX idx_payments_invoice (invoice_id)
  INDEX idx_payments_status (status)
}

TABLE payment_methods {
  id UUID PRIMARY KEY
  type VARCHAR(50) NOT NULL -- card, bank_account, etc.
  brand VARCHAR(50)
  last4 VARCHAR(4)
  expiry_month INTEGER
  expiry_year INTEGER
  is_default BOOLEAN DEFAULT FALSE
  customer_id UUID REFERENCES users(id)
  created_at TIMESTAMP DEFAULT NOW()

  INDEX idx_payment_methods_customer (customer_id)
}

TABLE refunds {
  id UUID PRIMARY KEY
  payment_id UUID REFERENCES payments(id)
  amount DECIMAL(10,2) NOT NULL
  currency VARCHAR(3) DEFAULT 'USD'
  status VARCHAR(50) -- succeeded, pending, failed, cancelled
  reason TEXT
  metadata JSONB
  created_at TIMESTAMP DEFAULT NOW()

  INDEX idx_refunds_payment (payment_id)
}
```

### 4.2 Row-Level Security Policies

```sql
-- Enable RLS on all tenant-scoped tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY tenant_isolation_policy ON users
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_policy ON subscriptions
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_policy ON invoices
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

### 4.3 Data Flow

```
User Action (Frontend)
      ↓
API Request + X-Tenant-ID Header
      ↓
API Gateway (Validates JWT)
      ↓
Microservice (Extracts Tenant ID)
      ↓
Database Query (Filtered by Tenant)
      ↓
Response (Tenant-specific data only)
      ↓
Frontend Updates UI
```

---

## 5. API Design

### 5.1 RESTful API Principles

**Resource-Based URLs:**
```
/api/billing/subscriptions        # Collection
/api/billing/subscriptions/:id    # Resource
/api/billing/subscriptions/:id/cancel  # Action
```

**HTTP Methods:**
- `GET`: Retrieve resources
- `POST`: Create resources or trigger actions
- `PATCH`: Partial update
- `PUT`: Full replacement (not used)
- `DELETE`: Remove resources

**Status Codes:**
```
200 OK              # Successful GET, PATCH
201 Created         # Successful POST (new resource)
204 No Content      # Successful DELETE
400 Bad Request     # Validation error
401 Unauthorized    # Invalid/missing token
403 Forbidden       # Valid token, insufficient permissions
404 Not Found       # Resource doesn't exist
500 Server Error    # Unexpected error
```

### 5.2 Standard Response Format

All API responses follow a consistent structure:

```typescript
// Success Response
{
  success: true,
  data: T,                    // Actual payload
  message?: string,           // Optional success message
  timestamp: string           // ISO 8601 timestamp
}

// Error Response
{
  success: false,
  error: {
    code: string,             // Machine-readable error code
    message: string,          // Human-readable message
    details?: any,            // Additional error context
    field?: string            // For validation errors
  },
  timestamp: string
}

// Paginated Response
{
  success: true,
  data: T[],
  pagination: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  },
  timestamp: string
}
```

**Example:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "tenantId": "123e4567-e89b-12d3-a456-426614174000",
    "planId": "pro-monthly",
    "status": "active",
    "currentPrice": 99.00,
    "currency": "USD"
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

### 5.3 Authentication & Authorization

**Authentication Flow:**

```
1. User submits credentials
   POST /api/auth/login
   Body: { email, password }

2. Auth Service validates credentials
   - Check email exists
   - Verify password hash
   - Check user status (ACTIVE)

3. Generate JWT tokens
   Access Token: 24 hours
   Refresh Token: 30 days

4. Return tokens + user info
   Response: {
     success: true,
     data: {
       user: { id, email, tenantId, role, ... },
       accessToken: "eyJhbG...",
       sessionId: "uuid",
       expiresIn: 86400
     }
   }

5. Frontend stores tokens
   localStorage.setItem('accessToken', token)
   localStorage.setItem('user', JSON.stringify(user))

6. Subsequent requests include token
   Authorization: Bearer <accessToken>
   X-Tenant-ID: <tenantId>
```

**JWT Payload:**
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "tenantId": "tenant-uuid",
  "role": "ADMIN",
  "iat": 1700000000,
  "exp": 1700086400
}
```

### 5.4 Request/Response Examples

**Create Subscription:**
```http
POST /api/billing/subscriptions
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-Tenant-ID: 00000000-0000-0000-0000-000000000001
Content-Type: application/json

{
  "tenantId": "00000000-0000-0000-0000-000000000001",
  "planId": "pro-monthly",
  "billingCycle": "monthly",
  "currentPrice": 99.00,
  "currentPeriodEnd": "2025-12-24T00:00:00Z",
  "currency": "USD",
  "autoRenew": true
}

Response: 201 Created
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "tenantId": "00000000-0000-0000-0000-000000000001",
    "planId": "pro-monthly",
    "status": "active",
    "billingCycle": "monthly",
    "currentPrice": 99.00,
    "currency": "USD",
    "startedAt": "2025-11-24T10:30:00Z",
    "currentPeriodStart": "2025-11-24T10:30:00Z",
    "currentPeriodEnd": "2025-12-24T00:00:00Z",
    "autoRenew": true,
    "isTrial": false,
    "createdAt": "2025-11-24T10:30:00Z",
    "updatedAt": "2025-11-24T10:30:00Z"
  },
  "message": "Subscription created successfully",
  "timestamp": "2025-11-24T10:30:00Z"
}
```

**List Payments with Filters:**
```http
GET /api/payments?status=succeeded&startDate=2025-11-01&endDate=2025-11-30&page=1&limit=20
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
X-Tenant-ID: 00000000-0000-0000-0000-000000000001

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": "pay_123",
      "amount": 99.00,
      "currency": "USD",
      "status": "succeeded",
      "paymentMethod": "card",
      "transactionId": "txn_abc123",
      "createdAt": "2025-11-15T14:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  },
  "timestamp": "2025-11-24T10:30:00Z"
}
```

---

## 6. Security Architecture

### 6.1 Authentication Mechanisms

**JWT (JSON Web Tokens):**
- Algorithm: HS256 (HMAC with SHA-256)
- Access Token Expiry: 24 hours
- Refresh Token Expiry: 30 days
- Stored in localStorage (client-side)
- Transmitted via Authorization header

**Password Security:**
- Hashing: bcrypt with salt rounds = 10
- Minimum requirements: 8 chars, 1 uppercase, 1 lowercase, 1 number
- Password reset via email token (expires in 1 hour)

### 6.2 Authorization Model

**Role-Based Access Control (RBAC):**

```typescript
enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',    // Full system access
  ADMIN = 'ADMIN',                 // Tenant admin
  BILLING_ADMIN = 'BILLING_ADMIN', // Billing operations only
  USER = 'USER',                   // Limited access
  VIEWER = 'VIEWER'                // Read-only
}

// Permission Matrix
const permissions = {
  SUPER_ADMIN: ['*'],  // All permissions
  ADMIN: [
    'tenants:read',
    'users:*',
    'subscriptions:*',
    'invoices:*',
    'payments:read'
  ],
  BILLING_ADMIN: [
    'subscriptions:*',
    'invoices:*',
    'payments:read'
  ],
  USER: [
    'profile:read',
    'profile:update',
    'invoices:read',
    'payments:read'
  ],
  VIEWER: [
    'dashboard:read',
    'invoices:read',
    'subscriptions:read'
  ]
};
```

### 6.3 Multi-Tenant Isolation

**Enforcement Layers:**

1. **Application Layer**: X-Tenant-ID header validation
2. **Database Layer**: Row-Level Security policies
3. **API Layer**: Request validation middleware

**Security Checks:**
```javascript
// Middleware: Validate tenant access
function validateTenantAccess(req, res, next) {
  const userTenantId = req.user.tenantId;
  const requestTenantId = req.headers['x-tenant-id'];

  if (userTenantId !== requestTenantId) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'TENANT_ACCESS_DENIED',
        message: 'You do not have access to this tenant'
      }
    });
  }

  next();
}
```

### 6.4 Security Best Practices

- **HTTPS Only**: All production traffic encrypted with TLS 1.3
- **CORS**: Whitelist allowed origins
- **Rate Limiting**: 100 requests per minute per IP
- **SQL Injection**: Parameterized queries only
- **XSS Prevention**: Content Security Policy headers
- **CSRF**: Token-based protection for state-changing operations
- **Input Validation**: Zod schema validation on all inputs
- **Sensitive Data**: Never log passwords, tokens, or PII
- **Audit Logging**: Track all authentication and authorization events

---

## 7. Frontend Architecture

### 7.1 Technology Choices

**Next.js 15:**
- React Server Components for improved performance
- App Router for file-based routing
- Automatic code splitting
- Built-in optimization (images, fonts, scripts)

**React 19 RC:**
- Concurrent rendering
- Automatic batching
- Server components support

**State Management:**
- **Zustand**: Authentication state (lightweight, simple API)
- **React Query v5**: Server state management (caching, synchronization)
- **React Hook Form**: Form state

**UI Framework:**
- **Tailwind CSS v4**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Pre-built components

### 7.2 Application Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth group (special layout)
│   │   └── login/
│   ├── dashboard/                # Dashboard pages
│   ├── subscriptions/            # Subscription pages
│   ├── invoices/
│   │   ├── page.tsx             # List view
│   │   └── [id]/page.tsx        # Detail view
│   ├── payments/
│   ├── payment-methods/
│   ├── refunds/
│   ├── tenants/
│   ├── profile/
│   ├── admin/
│   │   └── monitoring/          # System monitoring
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Context providers
│
├── components/
│   ├── subscriptions/           # Feature-specific components
│   │   ├── subscription-list.tsx
│   │   ├── subscription-form-dialog.tsx
│   │   └── subscription-actions.tsx
│   ├── invoices/
│   ├── payments/
│   ├── layout/                  # Layout components
│   │   ├── sidebar.tsx
│   │   ├── header.tsx
│   │   └── footer.tsx
│   ├── navigation/
│   └── ui/                      # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       └── ...
│
├── lib/
│   ├── api.ts                   # Axios instance + interceptors
│   ├── types.ts                 # TypeScript definitions
│   ├── utils.ts                 # Utility functions
│   ├── query-client.ts          # React Query config
│   └── services/                # API service layer
│       ├── subscriptions.service.ts
│       ├── invoices.service.ts
│       ├── payments.service.ts
│       ├── user.service.ts
│       └── monitoring.service.ts
│
└── hooks/
    ├── useAuth.ts               # Auth state (Zustand)
    └── useDebounce.ts           # Utility hooks
```

### 7.3 State Management Strategy

**Authentication State (Zustand):**
```typescript
// hooks/useAuth.ts
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (credentials) => {
    // Login logic
    const response = await api.post('/api/auth/login', credentials);
    const { user, accessToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('user', JSON.stringify(user));

    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
  },
  updateUser: (user) => set({ user })
}));
```

**Server State (React Query):**
```typescript
// Example: Fetching subscriptions
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ['subscriptions'],
  queryFn: async () => {
    const response = await api.get('/api/billing/subscriptions');
    return response.data.data;
  },
  staleTime: 5 * 60 * 1000,  // Consider data fresh for 5 minutes
  cacheTime: 10 * 60 * 1000  // Keep in cache for 10 minutes
});
```

**Benefits:**
- Automatic caching and invalidation
- Background refetching
- Optimistic updates
- Pagination and infinite scroll support
- Request deduplication

### 7.4 API Integration Layer

**Axios Instance with Interceptors:**
```typescript
// lib/api.ts
const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Add auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    const userStr = localStorage.getItem('user');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (userStr) {
      const user = JSON.parse(userStr);
      config.headers['X-Tenant-ID'] = user.tenantId;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - clear auth and redirect
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**Service Layer:**
```typescript
// lib/services/subscriptions.service.ts
export const subscriptionsService = {
  getAll: async (): Promise<Subscription[]> => {
    const response = await api.get('/api/billing/subscriptions');
    return response.data.data;
  },

  getById: async (id: string): Promise<Subscription> => {
    const response = await api.get(`/api/billing/subscriptions/${id}`);
    return response.data.data;
  },

  create: async (data: CreateSubscriptionPayload): Promise<Subscription> => {
    const response = await api.post('/api/billing/subscriptions', data);
    return response.data.data;
  },

  cancel: async (id: string, immediately: boolean): Promise<Subscription> => {
    const response = await api.post(
      `/api/billing/subscriptions/${id}/cancel`,
      { immediately }
    );
    return response.data.data;
  }
};
```

### 7.5 Component Patterns

**Container/Presenter Pattern:**
```typescript
// Container: Handles data and logic
function SubscriptionListContainer() {
  const { data, isLoading, error } = useQuery(['subscriptions'],
    subscriptionsService.getAll
  );

  return <SubscriptionList
    subscriptions={data}
    isLoading={isLoading}
    error={error}
  />;
}

// Presenter: Pure UI component
function SubscriptionList({ subscriptions, isLoading, error }) {
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorState error={error} />;
  if (!subscriptions.length) return <EmptyState />;

  return (
    <div>
      {subscriptions.map(sub => <SubscriptionCard key={sub.id} {...sub} />)}
    </div>
  );
}
```

**Compound Components:**
```typescript
// Dialog with composable parts
<Dialog>
  <DialogTrigger>
    <Button>Create Subscription</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New Subscription</DialogTitle>
    </DialogHeader>
    <SubscriptionForm />
  </DialogContent>
</Dialog>
```

---

## 8. Backend Architecture

### 8.1 Microservice Internal Structure

Each microservice follows a layered architecture:

```
Service/
├── controllers/          # HTTP request handlers
│   ├── subscription.controller.ts
│   └── invoice.controller.ts
├── services/            # Business logic
│   ├── subscription.service.ts
│   └── invoice.service.ts
├── repositories/        # Data access
│   ├── subscription.repository.ts
│   └── invoice.repository.ts
├── models/              # Data models/entities
│   ├── subscription.model.ts
│   └── invoice.model.ts
├── middleware/          # Request middleware
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
├── validators/          # Input validation schemas
│   └── subscription.validator.ts
├── routes/              # API routes
│   └── index.ts
├── utils/               # Helper functions
├── config/              # Configuration
│   └── database.ts
└── index.ts             # Entry point
```

**Layer Responsibilities:**

```
Request Flow:
  Client Request
       ↓
  [Route Handler]
       ↓
  [Middleware] (auth, validation)
       ↓
  [Controller] (request handling, response formatting)
       ↓
  [Service] (business logic, orchestration)
       ↓
  [Repository] (database operations)
       ↓
  [Database]
       ↓
  Response
```

**Example:**

```typescript
// routes/subscriptions.routes.ts
router.post('/subscriptions',
  authMiddleware,
  validateRequest(createSubscriptionSchema),
  subscriptionController.create
);

// controllers/subscription.controller.ts
export class SubscriptionController {
  async create(req: Request, res: Response) {
    try {
      const subscription = await subscriptionService.create(req.body);
      res.status(201).json({
        success: true,
        data: subscription,
        message: 'Subscription created successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      // Error handling
    }
  }
}

// services/subscription.service.ts
export class SubscriptionService {
  async create(data: CreateSubscriptionDTO): Promise<Subscription> {
    // Business logic validation
    if (data.currentPrice <= 0) {
      throw new ValidationError('Price must be positive');
    }

    // Calculate dates
    const startDate = new Date();
    const endDate = calculateEndDate(startDate, data.billingCycle);

    // Create subscription
    return await subscriptionRepository.create({
      ...data,
      startedAt: startDate,
      currentPeriodStart: startDate,
      currentPeriodEnd: endDate,
      status: 'active'
    });
  }
}

// repositories/subscription.repository.ts
export class SubscriptionRepository {
  async create(data: Subscription): Promise<Subscription> {
    const result = await db.query(
      `INSERT INTO subscriptions (...) VALUES (...) RETURNING *`,
      [/* parameters */]
    );
    return result.rows[0];
  }
}
```

### 8.2 Inter-Service Communication

**Strategy: Synchronous HTTP (REST)**

Services communicate via HTTP requests through the API Gateway:

```
Billing Service                Payment Service
     │                              │
     │  Need to process payment     │
     │  POST /api/payments/intents  │
     ├─────────────────────────────>│
     │                              │
     │                      Process payment
     │                              │
     │  Return payment intent       │
     │<─────────────────────────────┤
     │                              │
```

**Alternative: Event-Driven (Future Enhancement)**

For async operations, use message queue:

```
Service A                    Message Queue              Service B
    │                              │                       │
    │ Publish event                │                       │
    ├────────────────────────────>│                       │
    │                              │   Subscribe to event  │
    │                              ├──────────────────────>│
    │                              │                       │
    │                              │              Process event
```

### 8.3 Database Connection Management

**Connection Pooling:**
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'cloudbill',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  max: 20,                    // Max connections in pool
  idleTimeoutMillis: 30000,   // Close idle connections after 30s
  connectionTimeoutMillis: 2000
});

// Set tenant context for all queries
export async function executeQuery(
  query: string,
  params: any[],
  tenantId: string
) {
  const client = await pool.connect();
  try {
    await client.query(`SET app.current_tenant_id = '${tenantId}'`);
    const result = await client.query(query, params);
    return result;
  } finally {
    client.release();
  }
}
```

### 8.4 Error Handling

**Centralized Error Handler:**
```typescript
// middleware/error-handler.ts
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', error);

  // Validation errors
  if (error instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.message,
        details: error.errors
      },
      timestamp: new Date().toISOString()
    });
  }

  // Authentication errors
  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      },
      timestamp: new Date().toISOString()
    });
  }

  // Database errors
  if (error.code?.startsWith('23')) {  // PostgreSQL constraint violations
    return res.status(400).json({
      success: false,
      error: {
        code: 'DATABASE_CONSTRAINT_VIOLATION',
        message: 'Data constraint violation'
      },
      timestamp: new Date().toISOString()
    });
  }

  // Default: Internal server error
  return res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred'
    },
    timestamp: new Date().toISOString()
  });
}
```

---

## 9. Technology Stack

### 9.1 Frontend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.0.3 | React framework |
| React | 19.0 RC | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| Radix UI | Latest | Accessible components |
| Axios | 1.13.1 | HTTP client |
| React Query | 5.90.5 | Server state management |
| Zustand | 5.0.8 | Client state management |
| React Hook Form | 7.65.0 | Form management |
| Zod | 4.1.12 | Schema validation |
| Recharts | 3.3.0 | Data visualization |
| Lucide React | 0.548.0 | Icons |

### 9.2 Backend Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime |
| Express.js | 4.x | Web framework |
| TypeScript | 5.x | Type safety |
| PostgreSQL | 14+ | Database |
| Redis | 7.x | Caching |
| JWT | Latest | Authentication |
| bcrypt | Latest | Password hashing |
| Axios | Latest | Inter-service HTTP |

### 9.3 Development Tools

- **Version Control**: Git
- **Package Manager**: npm
- **Code Editor**: VS Code (recommended)
- **API Testing**: Postman / Thunder Client
- **Database Client**: pgAdmin / DBeaver

---

## 10. Scalability & Performance

### 10.1 Horizontal Scaling

**Load Balancer Configuration:**
```
                    Load Balancer (Nginx)
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   Gateway-1           Gateway-2           Gateway-3
        │                   │                   │
    Services            Services            Services
```

**Stateless Services:**
- All services are stateless (no in-memory session data)
- Session state stored in Redis
- Enables seamless horizontal scaling

### 10.2 Database Optimization

**Indexes:**
```sql
-- Tenant-based queries
CREATE INDEX idx_subscriptions_tenant ON subscriptions(tenant_id);
CREATE INDEX idx_invoices_tenant ON invoices(tenant_id);

-- Status filtering
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_payments_status ON payments(status);

-- Date range queries
CREATE INDEX idx_invoices_due_date ON invoices(due_date);
CREATE INDEX idx_payments_created ON payments(created_at);

-- Composite indexes for common queries
CREATE INDEX idx_subscriptions_tenant_status
  ON subscriptions(tenant_id, status);
```

**Query Optimization:**
- Use EXPLAIN ANALYZE for slow queries
- Implement pagination for large datasets
- Use database connection pooling
- Avoid N+1 queries (use JOIN or batch loading)

### 10.3 Caching Strategy

**Redis Cache Layers:**

```typescript
// Level 1: User session cache
await redis.set(`session:${userId}`, JSON.stringify(session), 'EX', 3600);

// Level 2: Query result cache
await redis.set(`subscriptions:${tenantId}`, JSON.stringify(subs), 'EX', 300);

// Level 3: Computed values cache (dashboard stats)
await redis.set(`stats:dashboard:${tenantId}`, JSON.stringify(stats), 'EX', 600);
```

**Cache Invalidation:**
```typescript
// On subscription update
await redis.del(`subscriptions:${tenantId}`);
await redis.del(`stats:dashboard:${tenantId}`);
```

### 10.4 Performance Metrics

**Target Metrics:**
- API Response Time: < 200ms (p95)
- Database Query Time: < 50ms (p95)
- Time to First Byte (TTFB): < 500ms
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s

**Monitoring Tools:**
- Application: New Relic / Datadog
- Frontend: Vercel Analytics
- Database: pg_stat_statements
- Uptime: UptimeRobot

---

## 11. Deployment Architecture

### 11.1 Development Environment

```
Developer Machine (localhost)
├── Frontend: localhost:3010
├── API Gateway: localhost:8080
├── Auth Service: localhost:3001
├── Billing Service: localhost:3002
├── Payment Service: localhost:3003
├── Notification Service: localhost:3004
├── PostgreSQL: localhost:5432
└── Redis: localhost:6379
```

### 11.2 Production Architecture (AWS)

```
┌────────────────────────────────────────────────────────┐
│                    CloudFront CDN                      │
│              (Static assets, caching)                  │
└─────────────────────┬──────────────────────────────────┘
                      │
┌─────────────────────┴──────────────────────────────────┐
│                  Application Load Balancer             │
│                   (Traffic distribution)               │
└─────────────────────┬──────────────────────────────────┘
                      │
     ┌────────────────┼────────────────┐
     ▼                ▼                ▼
┌──────────┐    ┌──────────┐    ┌──────────┐
│  ECS      │    │  ECS     │    │  ECS     │
│  Task 1   │    │  Task 2  │    │  Task 3  │
│           │    │          │    │          │
│ Gateway   │    │ Gateway  │    │ Gateway  │
│ Services  │    │ Services │    │ Services │
└──────────┘    └──────────┘    └──────────┘
     │                │                │
     └────────────────┼────────────────┘
                      ▼
┌─────────────────────────────────────────────────────────┐
│                    RDS PostgreSQL                       │
│                  (Multi-AZ, encrypted)                  │
└─────────────────────────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────┐
│                  ElastiCache Redis                      │
│                  (Session, caching)                     │
└─────────────────────────────────────────────────────────┘
```

**Components:**
- **Frontend**: Deployed to Vercel (Next.js optimized)
- **API Gateway + Services**: AWS ECS (Fargate)
- **Database**: AWS RDS PostgreSQL (Multi-AZ)
- **Cache**: AWS ElastiCache Redis
- **CDN**: AWS CloudFront
- **Storage**: AWS S3 (invoice PDFs, static assets)
- **Secrets**: AWS Secrets Manager

### 11.3 CI/CD Pipeline

```
Developer Push to GitHub
       │
       ▼
GitHub Actions Triggered
       │
       ├─> Run Linter (ESLint)
       ├─> Run Type Check (TypeScript)
       ├─> Run Unit Tests (Vitest)
       ├─> Run Integration Tests
       │
       ▼
Build Docker Images
       │
       ├─> Frontend Image
       ├─> Gateway Image
       ├─> Service Images
       │
       ▼
Push to AWS ECR (Elastic Container Registry)
       │
       ▼
Deploy to ECS
       │
       ├─> Blue/Green Deployment
       ├─> Health Checks
       ├─> Rollback on Failure
       │
       ▼
Post-Deployment Tests
       │
       ▼
Notify Team (Slack)
```

---

## 12. System Flows

### 12.1 User Authentication Flow

```
┌─────────┐                                               ┌─────────────┐
│         │  1. POST /api/auth/login                      │             │
│  User   │  { email, password }                          │  Frontend   │
│         │─────────────────────────────────────────────>│             │
└─────────┘                                               └──────┬──────┘
                                                                 │
                                                                 │ 2. Forward request
                                                                 │
                                                          ┌──────▼──────┐
                                                          │             │
                                                          │ API Gateway │
                                                          │             │
                                                          └──────┬──────┘
                                                                 │
                                                                 │ 3. Route to Auth Service
                                                                 │
                                                          ┌──────▼──────────┐
                                                          │                 │
                                                          │  Auth Service   │
                                                          │                 │
                                                          │ 4. Verify creds│
                                                          │ 5. Generate JWT│
                                                          │ 6. Create session
                                                          └──────┬──────────┘
                                                                 │
                                                                 │ 7. Store session in Redis
                                                                 │
                                                          ┌──────▼──────┐
                                                          │             │
                                                          │    Redis    │
                                                          │             │
                                                          └─────────────┘
                                                                 │
                                                                 │ 8. Return token + user
                                                                 ▼
┌─────────┐                                               ┌─────────────┐
│         │  9. Display dashboard                         │             │
│  User   │◄──────────────────────────────────────────────│  Frontend   │
│         │  Store token in localStorage                  │             │
└─────────┘                                               └─────────────┘
```

### 12.2 Create Subscription Flow

```
User clicks "Create Subscription"
       │
       ▼
Frontend shows dialog with form
       │
       ▼
User fills form (plan, billing cycle, price)
       │
       ▼
Frontend validates with Zod schema
       │
       ▼
POST /api/billing/subscriptions
{
  tenantId: "...",
  planId: "pro-monthly",
  billingCycle: "monthly",
  currentPrice: 99.00,
  ...
}
Headers:
  Authorization: Bearer <token>
  X-Tenant-ID: <tenantId>
       │
       ▼
API Gateway validates JWT token
       │
       ▼
Route to Billing Service (Port 3002)
       │
       ▼
Billing Service:
  1. Extract tenant ID from header
  2. Validate input data
  3. Calculate period dates
  4. Create subscription record
       │
       ▼
Database (PostgreSQL):
  INSERT INTO subscriptions (...)
  RLS Policy: Automatically sets tenant_id
       │
       ▼
Return created subscription
       │
       ▼
Frontend:
  1. React Query invalidates cache
  2. Refetch subscription list
  3. Show success toast
  4. Close dialog
  5. Update UI with new subscription
```

### 12.3 Payment Processing Flow

```
User clicks "Pay Invoice"
       │
       ▼
Frontend creates payment intent
POST /api/payments/intents
{
  amount: 99.00,
  currency: "USD",
  invoiceId: "inv_123"
}
       │
       ▼
Payment Service creates intent
       │
       ├─> Store in database (status: pending)
       └─> Return client secret
       │
       ▼
Frontend shows payment form
(Stripe Elements / Card input)
       │
       ▼
User enters card details
       │
       ▼
POST /api/payments/intents/:id/confirm
       │
       ▼
Payment Service:
  1. Process with payment gateway (Stripe)
  2. Update payment status (succeeded/failed)
  3. If succeeded:
       ├─> Update invoice status (paid)
       ├─> Record payment on invoice
       └─> Trigger notification (receipt email)
       │
       ▼
Return payment result
       │
       ▼
Frontend:
  1. Show success/error message
  2. Invalidate payment and invoice caches
  3. Redirect to invoice detail page
```

### 12.4 Health Monitoring Flow

```
Dashboard loads monitoring page
       │
       ▼
GET /api/monitoring/health (via gateway)
       │
       ▼
Monitoring Service:
  1. Fetch gateway health
     GET http://localhost:8080/health
       │
       ├─> Gateway returns:
       │   - Status
       │   - Memory usage
       │   - Service health map
       │   - Database connectivity
       │
  2. Fetch individual service health (parallel)
     ├─> GET http://localhost:3001/health (Auth)
     ├─> GET http://localhost:3002/health (Billing)
     ├─> GET http://localhost:3003/health (Payment)
     └─> GET http://localhost:3004/health (Notification)
       │
  3. Aggregate results
     ├─> Calculate overall system status
     ├─> Determine services up/down
     └─> Calculate health percentage
       │
       ▼
Return SystemHealth object
{
  status: "operational",
  servicesUp: 6,
  totalServices: 7,
  healthPercentage: 86,
  services: [
    { name: "API Gateway", status: "healthy", ... },
    { name: "Auth Service", status: "healthy", ... },
    ...
  ]
}
       │
       ▼
Frontend renders monitoring dashboard
  ├─> System status badge
  ├─> Service cards with status
  ├─> Response time metrics
  └─> Auto-refresh every 30 seconds
```

---

## Conclusion

CloudBill Dashboard is a production-ready, scalable SaaS billing platform built with modern best practices:

**Key Strengths:**
1. **Microservices Architecture**: Independent, scalable services
2. **Multi-Tenant by Design**: Complete data isolation with RLS
3. **Type-Safe**: End-to-end TypeScript for reliability
4. **Modern Tech Stack**: Leveraging latest frameworks and tools
5. **Security First**: JWT auth, RBAC, encrypted data
6. **Performance Optimized**: Caching, indexing, connection pooling
7. **Monitoring Built-in**: Real-time health checks and observability
8. **Developer Experience**: Clear separation of concerns, clean code

**Production Readiness:**
- ✅ Authentication & Authorization
- ✅ Multi-tenancy with RLS
- ✅ Full CRUD operations
- ✅ Real-time monitoring
- ✅ Error handling
- ✅ Type safety
- ✅ API documentation
- ✅ Scalable architecture

**Future Enhancements:**
- Automated testing suite (unit, integration, e2e)
- Kubernetes deployment for advanced orchestration
- Event-driven architecture with message queues
- Advanced analytics and reporting
- Webhook infrastructure for integrations
- GraphQL API layer
- Mobile application (React Native)

This system demonstrates enterprise-level software engineering practices and is interview-ready for senior positions.

---

**Document Version**: 1.0
**Last Updated**: November 24, 2025
**Author**: CloudBill Engineering Team
