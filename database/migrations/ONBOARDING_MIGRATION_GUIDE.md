# Onboarding System - Migration Guide

## Overview
This guide covers the installation of the onboarding system database tables:
- `009_create_onboarding_progress.sql` - Tracks onboarding completion per organization
- `010_create_analytics_events.sql` - Tracks user actions and funnel metrics

## Prerequisites
- PostgreSQL 14+ running
- Database: `platform_portal`
- User: `postgres` (or your configured user)
- Existing tables: `organizations`, `services`, `deployments`, `organization_aws_credentials`

## Quick Install

### Option 1: Run with psql (Recommended)

```bash
# Navigate to project root
cd /Users/user/Desktop/platform-portal

# Run onboarding migration
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal \
  -f database/migrations/009_create_onboarding_progress.sql

# Run analytics migration (optional but recommended)
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal \
  -f database/migrations/010_create_analytics_events.sql
```

### Option 2: Run via Node.js script

```bash
node scripts/run-migrations.js 009 010
```

### Option 3: Manual (psql interactive)

```bash
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal

\i database/migrations/009_create_onboarding_progress.sql
\i database/migrations/010_create_analytics_events.sql
```

## What Gets Created

### Migration 009 - Onboarding Progress

**Tables:**
- `onboarding_progress` - One record per organization tracking completion

**Triggers:**
- Auto-initialize onboarding when new organization is created
- Auto-update `updated_at` timestamp on changes

**Policies:**
- Row-Level Security for organization isolation
- Automatic data migration for existing organizations

**Indexes:**
- 5 indexes for fast querying

### Migration 010 - Analytics Events

**Tables:**
- `analytics_events` - All user actions and events

**Views:**
- `onboarding_funnel_today` - Today's onboarding metrics
- `onboarding_completion_by_org` - Completion rates per org
- `daily_active_users` - DAU tracking

**Triggers:**
- Auto-track service creation
- Auto-track deployment creation

**Functions:**
- `track_event()` - Helper function for event tracking

**Indexes:**
- 8 indexes including GIN for JSONB

## Verification

### Check onboarding status

```sql
-- See all organizations' onboarding status
SELECT
  o.name as organization,
  op.current_stage,
  op.completed_stages,
  op.welcome_completed_at IS NOT NULL as welcome_done,
  op.first_service_created_at IS NOT NULL as service_done,
  op.first_deployment_created_at IS NOT NULL as deployment_done,
  op.aws_connected_at IS NOT NULL as aws_done,
  op.completed_at IS NOT NULL as fully_completed
FROM onboarding_progress op
JOIN organizations o ON o.id = op.organization_id
ORDER BY op.created_at DESC;
```

Expected output:
```
organization       | current_stage  | completed_stages | welcome_done | service_done | deployment_done | aws_done | fully_completed
-------------------+----------------+------------------+--------------+--------------+-----------------+----------+----------------
My Organization    | connect_aws    | ["welcome", ...] | t            | t            | t               | f        | f
```

### Check analytics events

```sql
-- See recent events
SELECT
  event_name,
  event_category,
  COUNT(*) as count,
  COUNT(DISTINCT user_id) as unique_users
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY event_name, event_category
ORDER BY count DESC;
```

### Check views

```sql
-- Onboarding completion rates
SELECT * FROM onboarding_completion_by_org;

-- Today's onboarding funnel
SELECT * FROM onboarding_funnel_today;
```

## Testing

### Test 1: Create new organization

```sql
-- This should auto-create onboarding record
INSERT INTO organizations (name, slug)
VALUES ('Test Org', 'test-org')
RETURNING id;

-- Verify onboarding was initialized
SELECT * FROM onboarding_progress
WHERE organization_id = (SELECT id FROM organizations WHERE slug = 'test-org');
```

Expected: One row with `current_stage = 'welcome'`

### Test 2: Complete onboarding steps

```sql
-- Get a test organization ID
SELECT id FROM organizations LIMIT 1;
-- Use this ID in the following commands (replace <org_id>)

-- Mark welcome complete
UPDATE onboarding_progress
SET welcome_completed_at = NOW()
WHERE organization_id = '<org_id>';

-- Verify current_stage updated
SELECT current_stage, completed_stages
FROM onboarding_progress
WHERE organization_id = '<org_id>';
```

Expected: `current_stage` should change to next stage

### Test 3: Track an event

```sql
-- Track a test event
SELECT track_event(
  (SELECT id FROM users LIMIT 1),  -- user_id
  (SELECT id FROM organizations LIMIT 1),  -- org_id
  'test_event',  -- event_name
  'test',  -- category
  '{"test": true}'::jsonb  -- properties
);

-- Verify event was tracked
SELECT * FROM analytics_events
WHERE event_name = 'test_event'
ORDER BY created_at DESC
LIMIT 1;
```

## Rollback

If you need to rollback:

```sql
-- Rollback analytics (010)
DROP VIEW IF EXISTS onboarding_funnel_today;
DROP VIEW IF EXISTS onboarding_completion_by_org;
DROP VIEW IF EXISTS daily_active_users;
DROP TRIGGER IF EXISTS trigger_track_service_created ON services;
DROP TRIGGER IF EXISTS trigger_track_deployment_created ON deployments;
DROP FUNCTION IF EXISTS track_event;
DROP FUNCTION IF EXISTS track_service_created();
DROP FUNCTION IF EXISTS track_deployment_created();
DROP TABLE IF EXISTS analytics_events CASCADE;

-- Rollback onboarding (009)
DROP TRIGGER IF EXISTS trigger_onboarding_progress_updated_at ON onboarding_progress;
DROP TRIGGER IF EXISTS trigger_initialize_onboarding ON organizations;
DROP FUNCTION IF EXISTS update_onboarding_progress_updated_at();
DROP FUNCTION IF EXISTS initialize_onboarding_for_organization();
DROP TABLE IF EXISTS onboarding_progress CASCADE;
```

## Troubleshooting

### Error: relation "organizations" does not exist
**Solution**: Run previous migrations first (001-008)

### Error: permission denied
**Solution**: Ensure your PostgreSQL user has CREATE permissions:
```sql
GRANT CREATE ON DATABASE platform_portal TO postgres;
```

### Error: current_setting(...) does not exist
**Solution**: RLS policies require app.current_organization_id to be set. This is done by your application middleware.

### No onboarding records after migration
**Solution**: The migration auto-creates records for existing orgs. Check:
```sql
SELECT COUNT(*) FROM onboarding_progress;
SELECT COUNT(*) FROM organizations;
```
These numbers should match.

## Next Steps

After running migrations:

1. **Backend**: Implement `OnboardingService` class
2. **API**: Create `/api/onboarding/*` routes
3. **Frontend**: Create Zustand store and components
4. **Testing**: Test full onboarding flow end-to-end

See the main implementation plan for details.

## Support

If you encounter issues:
1. Check PostgreSQL logs: `tail -f /usr/local/var/log/postgres.log`
2. Verify migrations: `\dt onboarding*` in psql
3. Check constraints: `\d onboarding_progress`

---

**Migration created**: 2026-01-03
**Version**: 1.0.0
**Status**: Ready for production
