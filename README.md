# Platform Portal - Internal Developer Platform

A comprehensive internal developer portal for managing platform engineering infrastructure, services, and deployments.

## Architecture

This is a **monorepo** containing:
- **Frontend**: Next.js 15 application (port 3010)
- **Backend**: Express.js REST API (port 8080)
- **Database**: PostgreSQL running in Docker

## Project Structure

```
platform-portal/
├── backend/                    # Express.js API
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Express middleware
│   │   ├── repositories/      # Data access layer
│   │   ├── routes/            # API routes
│   │   ├── types/             # TypeScript types
│   │   └── server.ts          # Main entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── app/                       # Next.js frontend
├── components/                # React components
├── lib/                       # Frontend utilities
├── database/                  # Database migrations & seeds
├── public/                    # Static assets
└── package.json              # Root workspace config
```

## Features

- 📊 **Service Catalog** - View all deployed services
- 🚀 **Deployment History** - Track all deployments
- 💰 **Cost Dashboard** - Monitor AWS spending
- 👥 **Team Ownership** - See who owns what
- 📈 **Real-time Monitoring** - Service health status
- 🏗️ **Infrastructure Management** - Track AWS resources
- 📡 **REST API** - Full-featured backend API

## Tech Stack

### Frontend
- Next.js 15 + React 19
- TypeScript
- TailwindCSS v4
- Radix UI
- React Query + Zustand

### Backend
- Express.js + TypeScript
- PostgreSQL
- Helmet (security)
- Morgan (logging)
- CORS

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PostgreSQL (via Docker)

## Quick Start

### 1. Clone and Install

```bash
cd platform-portal
npm install
```

### 2. Start PostgreSQL Database

```bash
docker run -d \
  --name platform-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=platform_portal \
  -p 5432:5432 \
  postgres:16
```

### 3. Verify Database Schema

```bash
docker exec -it platform-postgres psql -U postgres -d platform_portal -c "\dt"
```

You should see: `teams`, `services`, `deployments`, `infrastructure_resources`

### 4. Start Development Servers

```bash
# Start both frontend and backend concurrently
npm run dev
```

Or start them separately:

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 5. Verify Setup

- Frontend: http://localhost:3010
- Backend API: http://localhost:8080/api
- Health check: http://localhost:8080/health

## API Endpoints

### Services (`/api/services`)

```bash
# Get all services
GET /api/services?status=active&team_id=uuid&limit=50&offset=0

# Get service by ID
GET /api/services/:id

# Create service
POST /api/services
{
  "name": "my-api",
  "template": "api",
  "owner": "GoddeyUwamari",
  "team_id": "uuid",
  "github_url": "https://github.com/user/my-api",
  "description": "My awesome API"
}

# Update service
PUT /api/services/:id
{
  "status": "inactive",
  "description": "Updated description"
}

# Delete service
DELETE /api/services/:id
```

### Deployments (`/api/deployments`)

```bash
# Get all deployments
GET /api/deployments?service_id=uuid&environment=development&status=running

# Get deployment by ID
GET /api/deployments/:id

# Create deployment
POST /api/deployments
{
  "service_id": "uuid",
  "environment": "development",
  "aws_region": "us-east-1",
  "status": "running",
  "cost_estimate": 0.00,
  "deployed_by": "GoddeyUwamari",
  "resources": {
    "ec2_instance_id": "i-1234567890",
    "rds_instance_id": "mydb.us-east-1.rds.amazonaws.com"
  }
}

# Delete deployment
DELETE /api/deployments/:id
```

### Infrastructure (`/api/infrastructure`)

```bash
# Get all infrastructure resources
GET /api/infrastructure?service_id=uuid&resource_type=ec2&status=running

# Get resource by ID
GET /api/infrastructure/:id

# Get cost breakdown
GET /api/infrastructure/costs

# Create infrastructure resource
POST /api/infrastructure
{
  "service_id": "uuid",
  "resource_type": "ec2",
  "aws_id": "i-1234567890",
  "aws_region": "us-east-1",
  "status": "running",
  "cost_per_month": 8.50,
  "metadata": {
    "instance_type": "t2.micro"
  }
}

# Delete resource
DELETE /api/infrastructure/:id
```

### Teams (`/api/teams`)

```bash
# Get all teams
GET /api/teams

# Get team by ID
GET /api/teams/:id

# Get team services
GET /api/teams/:id/services

# Create team
POST /api/teams
{
  "name": "Platform Team",
  "owner": "GoddeyUwamari",
  "description": "Platform engineering team"
}
```

### Platform Stats (`/api/platform`)

```bash
# Get dashboard statistics
GET /api/platform/stats/dashboard
```

## Testing API Endpoints

### Using cURL

```bash
# Health check
curl http://localhost:8080/health

# Create a service
curl -X POST http://localhost:8080/api/services \
  -H "Content-Type: application/json" \
  -d '{
    "name": "test-api",
    "template": "api",
    "owner": "GoddeyUwamari",
    "team_id": "11111111-1111-1111-1111-111111111111",
    "description": "Test API service"
  }'

# Get all services
curl http://localhost:8080/api/services

# Get platform stats
curl http://localhost:8080/api/platform/stats/dashboard
```

## Build for Production

```bash
# Build both frontend and backend
npm run build

# Start production servers
npm start
```

## Development Scripts

```bash
# Start both services
npm run dev

# Start frontend only
npm run dev:frontend

# Start backend only
npm run dev:backend

# Build both
npm run build

# Build frontend only
npm run build:frontend

# Build backend only
npm run build:backend

# Production mode
npm start
```

## Environment Variables

### Backend (backend/.env)

```env
PORT=8080
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=platform_portal
DB_USER=postgres
DB_PASSWORD=postgres
FRONTEND_URL=http://localhost:3010
```

## Database Schema

### Teams
- `id` (UUID, primary key)
- `name` (string)
- `owner` (string)
- `description` (text)
- `created_at`, `updated_at` (timestamps)

### Services
- `id` (UUID, primary key)
- `name` (string)
- `template` (enum: api, frontend, worker, database)
- `owner` (string)
- `team_id` (UUID, foreign key)
- `github_url` (string)
- `description` (text)
- `status` (enum: active, inactive, archived)
- `created_at`, `updated_at` (timestamps)

### Deployments
- `id` (UUID, primary key)
- `service_id` (UUID, foreign key)
- `environment` (enum: development, staging, production)
- `aws_region` (string)
- `status` (enum: running, stopped, deploying, failed)
- `cost_estimate` (decimal)
- `deployed_by` (string)
- `deployed_at` (timestamp)
- `resources` (jsonb)
- `created_at`, `updated_at` (timestamps)

### Infrastructure Resources
- `id` (UUID, primary key)
- `service_id` (UUID, foreign key)
- `resource_type` (enum: ec2, rds, vpc, s3, lambda, elasticache, other)
- `aws_id` (string)
- `aws_region` (string)
- `status` (enum: running, stopped, terminated)
- `cost_per_month` (decimal)
- `metadata` (jsonb)
- `created_at`, `updated_at` (timestamps)

## API Response Format

All endpoints return a consistent response format:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "total": 10
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Architecture Patterns

### Repository Pattern
Data access logic is separated into repository classes for each entity.

### Controller Pattern
Business logic is handled in controllers, with repositories managing data access.

### Middleware Chain
- Helmet (security headers)
- CORS (cross-origin requests)
- Body parser (JSON/URL-encoded)
- Morgan & Custom logger (request logging)
- Error handler (centralized error handling)

## Troubleshooting

### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker ps | grep platform-postgres

# Check database logs
docker logs platform-postgres

# Connect to database manually
docker exec -it platform-postgres psql -U postgres -d platform_portal
```

### Port Already in Use

```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Kill process on port 3010
lsof -ti:3010 | xargs kill -9
```

## Contributing

1. Create a feature branch
2. Make changes
3. Test thoroughly
4. Submit PR

## License

MIT
