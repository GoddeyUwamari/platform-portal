# Multi-Tenancy Setup Guide

This guide walks you through setting up and using the multi-tenancy feature in DevControl.

## 🎯 Overview

DevControl now supports **multi-tenancy** (workspaces/organizations), allowing multiple teams or clients to use the same instance with complete data isolation.

### Key Features

- ✅ **Complete Data Isolation**: Each organization has its own services, deployments, infrastructure, and teams
- ✅ **Row-Level Security (RLS)**: PostgreSQL RLS ensures queries automatically filter by organization
- ✅ **Role-Based Access Control**: Owner, Admin, Member, and Viewer roles with granular permissions
- ✅ **JWT Authentication**: Secure, stateless authentication with 7-day access tokens
- ✅ **Encrypted AWS Credentials**: Each organization can have its own AWS credentials (AES-256 encryption)
- ✅ **Audit Logging**: Track all actions performed in the system
- ✅ **Session Management**: Track active sessions with automatic expiry

## 📋 Prerequisites

- PostgreSQL 12+ (for Row-Level Security support)
- Node.js 18+
- Existing DevControl installation

## 🚀 Installation Steps

### Step 1: Install Dependencies

```bash
cd backend
npm install bcrypt jsonwebtoken @types/bcrypt @types/jsonwebtoken
```

### Step 2: Configure Environment Variables

Update `backend/.env` with the following:

```bash
# Authentication & Security (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
ENCRYPTION_KEY=your-encryption-key-for-aws-credentials-min-32-characters-long
```

**⚠️ IMPORTANT**:
- Generate strong random secrets for production
- Keep these secrets secure and never commit them to version control
- Use at least 32 characters for both secrets

Generate secure secrets:
```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate ENCRYPTION_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 3: Run Database Migrations

```bash
# Run the multi-tenancy migration
node scripts/run-migrations.js
```

This will:
1. Create the `organizations`, `users`, and `organization_memberships` tables
2. Add `organization_id` to all existing tables
3. Enable Row-Level Security (RLS) on all tables
4. Create RLS policies for data isolation
5. Create audit logging and session management tables
6. Seed role permissions

### Step 4: Migrate Existing Data

```bash
# This migration assigns all existing data to a default organization
# and creates a default admin user
psql -U postgres -d platform_portal -f database/migrations/005_migrate_existing_data.sql
```

**Default Admin Credentials:**
- Email: `admin@devcontrol.local`
- Password: `ChangeMe123!`

**⚠️ CRITICAL**: Change the admin password immediately after first login!

### Step 5: Start the Backend

```bash
cd backend
npm run dev
```

The API should now be running on `http://localhost:8080` with multi-tenancy support.

## 🔐 Authentication Flow

### 1. Register a New User

```bash
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "fullName": "John Doe",
      "isEmailVerified": false
    },
    "message": "User registered successfully"
  }
}
```

### 2. Login

```bash
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@devcontrol.local",
  "password": "ChangeMe123!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "uuid",
      "email": "admin@devcontrol.local",
      "fullName": "DevControl Admin"
    },
    "organization": {
      "id": "uuid",
      "slug": "default",
      "name": "Default Organization",
      "role": "owner"
    }
  }
}
```

### 3. Use the Access Token

Include the access token in all subsequent requests:

```bash
GET http://localhost:8080/api/services
Authorization: Bearer <accessToken>
```

## 🏢 Organization Management

### Create a New Organization

```bash
POST http://localhost:8080/api/organizations
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "name": "Acme Corp",
  "slug": "acme-corp",
  "displayName": "Acme Corporation",
  "description": "Our main organization"
}
```

### Get User's Organizations

```bash
GET http://localhost:8080/api/organizations
Authorization: Bearer <accessToken>
```

### Invite User to Organization

```bash
POST http://localhost:8080/api/organizations/{organizationId}/invite
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "role": "member"
}
```

**Roles:**
- `owner` - Full access including org deletion
- `admin` - Full access except org deletion
- `member` - Can create and manage own resources
- `viewer` - Read-only access

### Set AWS Credentials for Organization

```bash
POST http://localhost:8080/api/organizations/{organizationId}/aws-credentials
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "accessKeyId": "AKIA...",
  "secretAccessKey": "...",
  "region": "us-east-1"
}
```

**Note:** AWS credentials are encrypted using AES-256 before storage.

## 🔒 Security Features

### Row-Level Security (RLS)

All database queries automatically filter by the user's current organization. This is enforced at the PostgreSQL level, ensuring data isolation even if application logic has bugs.

**How it works:**
1. User authenticates and gets a JWT token containing their `organizationId`
2. Middleware validates the token and sets a PostgreSQL session variable
3. RLS policies use this session variable to filter all queries
4. Users can only see data belonging to their organization

### JWT Token Structure

```json
{
  "userId": "uuid",
  "email": "user@example.com",
  "organizationId": "uuid",
  "role": "member",
  "type": "access",
  "iat": 1234567890,
  "exp": 1235172690
}
```

### Session Management

- Access tokens expire after **7 days**
- Refresh tokens expire after **30 days**
- All sessions are tracked in the `sessions` table
- Sessions are revoked on logout or password change
- Failed login attempts are tracked (max 5 attempts, 30-minute lockout)

## 🧪 Testing Multi-Tenancy

### Test Scenario 1: Create Two Organizations

1. **Login as admin:**
   ```bash
   POST /api/auth/login
   { "email": "admin@devcontrol.local", "password": "ChangeMe123!" }
   ```

2. **Create Organization A:**
   ```bash
   POST /api/organizations
   { "name": "Org A", "slug": "org-a", "displayName": "Organization A" }
   ```

3. **Create Organization B:**
   ```bash
   POST /api/organizations
   { "name": "Org B", "slug": "org-b", "displayName": "Organization B" }
   ```

### Test Scenario 2: Verify Data Isolation

1. **Create a service in Org A** (use Org A's JWT token)
2. **Switch to Org B** (use Org B's JWT token)
3. **List services** - should not see Org A's services
4. **Verify in database:**
   ```sql
   SELECT id, name, organization_id FROM services;
   ```

### Test Scenario 3: Role Permissions

1. **Invite a user as "viewer"**
2. **Login as the viewer**
3. **Try to create a service** - should get 403 Forbidden
4. **Try to read services** - should succeed

## 📊 Database Schema

### Core Multi-Tenancy Tables

```
organizations
├── id (UUID, PK)
├── name (VARCHAR, UNIQUE)
├── slug (VARCHAR, UNIQUE)
├── display_name (VARCHAR)
├── subscription_tier (VARCHAR)
├── aws_credentials_encrypted (TEXT)
└── ...

users
├── id (UUID, PK)
├── email (VARCHAR, UNIQUE)
├── password_hash (TEXT)
├── full_name (VARCHAR)
└── ...

organization_memberships
├── id (UUID, PK)
├── organization_id (UUID, FK → organizations)
├── user_id (UUID, FK → users)
├── role (VARCHAR: owner|admin|member|viewer)
└── ...
```

### Updated Existing Tables

All existing tables now have:
- `organization_id` (UUID, FK → organizations, NOT NULL)
- Index on `organization_id`
- RLS policies enabled

## 🎨 Frontend Integration (To Be Implemented)

The following frontend components still need to be created:

1. **Authentication Pages**
   - Login page (`/auth/login`)
   - Register page (`/auth/register`)
   - Password reset pages

2. **Organization Switcher**
   - Dropdown in navigation bar
   - Shows current organization
   - Allows switching between organizations

3. **Organization Settings**
   - General settings
   - Member management
   - AWS credentials configuration
   - Billing/subscription info

4. **Protected Routes**
   - Middleware to redirect unauthenticated users
   - Check user permissions before rendering pages

## 🔧 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/me` | Get current user info |
| POST | `/api/auth/change-password` | Change password |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset password with token |
| POST | `/api/auth/verify-email` | Verify email with token |

### Organizations

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| POST | `/api/organizations` | Create organization | Authenticated |
| GET | `/api/organizations` | Get user's organizations | Authenticated |
| GET | `/api/organizations/:id` | Get organization details | Member |
| PATCH | `/api/organizations/:id` | Update organization | Admin |
| DELETE | `/api/organizations/:id` | Delete organization | Owner |
| GET | `/api/organizations/:id/members` | Get members | Member |
| POST | `/api/organizations/:id/invite` | Invite user | Admin |
| DELETE | `/api/organizations/:id/members/:userId` | Remove user | Admin |
| PATCH | `/api/organizations/:id/members/:userId/role` | Update user role | Admin |
| POST | `/api/organizations/:id/aws-credentials` | Set AWS credentials | Owner |
| GET | `/api/organizations/:id/aws-credentials` | Check if credentials exist | Admin |
| DELETE | `/api/organizations/:id/aws-credentials` | Delete AWS credentials | Owner |

## 🐛 Troubleshooting

### Issue: "ENCRYPTION_KEY environment variable is required"

**Solution:** Ensure `ENCRYPTION_KEY` is set in `backend/.env`:
```bash
ENCRYPTION_KEY=your-32-character-encryption-key-here
```

### Issue: "JWT_SECRET not set. Using default key"

**Solution:** Set `JWT_SECRET` in `backend/.env`:
```bash
JWT_SECRET=your-secure-jwt-secret-key-here
```

### Issue: RLS policies not working

**Solution:** Verify PostgreSQL version (must be 12+) and check that RLS is enabled:
```sql
SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
```

### Issue: Cannot see data after switching organizations

**Solution:** This is expected! Each organization has isolated data. Create new resources for the new organization.

### Issue: "Account is locked due to too many failed login attempts"

**Solution:** Wait 30 minutes or reset the user's `locked_until` field:
```sql
UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE email = 'user@example.com';
```

## 📚 Next Steps

1. **Frontend Implementation**: Build the UI components listed above
2. **Email Service**: Integrate email service for:
   - Email verification
   - Password reset emails
   - Invitation emails
3. **Subscription Management**: Implement billing and subscription tiers
4. **Audit Dashboard**: Build UI to view audit logs
5. **Advanced Permissions**: Implement resource-level permissions (e.g., user can only edit their own services)

## 🎉 Success!

You now have a fully functional multi-tenant DevControl platform! Users can:
- ✅ Register and login with email/password
- ✅ Create multiple organizations
- ✅ Invite team members with different roles
- ✅ Set organization-specific AWS credentials
- ✅ Manage services, deployments, and infrastructure per organization
- ✅ Switch between organizations seamlessly
- ✅ Have complete data isolation and security

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the PostgreSQL logs: `tail -f /var/log/postgresql/postgresql-*.log`
3. Check the backend logs for error messages
4. Open an issue on GitHub: https://github.com/GoddeyUwamari/devcontrol/issues

---

**Built with ❤️ by the DevControl Team**
