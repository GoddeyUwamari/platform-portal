-- Migration: 001_create_platform_tables.sql
-- Description: Platform Engineering Portal schema
-- Date: 2025-12-25

-- =====================================================
-- TEAMS TABLE (create first - no dependencies)
-- =====================================================
CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  members TEXT[],
  slack_channel VARCHAR(255),
  owner VARCHAR(255) NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teams_name ON teams(name);
CREATE INDEX IF NOT EXISTS idx_teams_owner ON teams(owner);

-- =====================================================
-- SERVICES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  template VARCHAR(50) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  team_id UUID REFERENCES teams(id),
  github_url TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_services_team_id ON services(team_id);
CREATE INDEX IF NOT EXISTS idx_services_status ON services(status);
CREATE INDEX IF NOT EXISTS idx_services_owner ON services(owner);

-- =====================================================
-- DEPLOYMENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS deployments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  environment VARCHAR(50) NOT NULL,
  aws_region VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'deploying',
  cost_estimate DECIMAL(10,2) DEFAULT 0.00,
  deployed_by VARCHAR(255) NOT NULL,
  deployed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resources JSONB DEFAULT '{}',
  logs TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_deployments_service_id ON deployments(service_id);
CREATE INDEX IF NOT EXISTS idx_deployments_environment ON deployments(environment);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON deployments(status);

-- =====================================================
-- INFRASTRUCTURE_RESOURCES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS infrastructure_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  resource_type VARCHAR(50) NOT NULL,
  aws_id VARCHAR(255) NOT NULL,
  aws_region VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'running',
  cost_per_month DECIMAL(10,2) DEFAULT 0.00,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_infrastructure_service_id ON infrastructure_resources(service_id);
CREATE INDEX IF NOT EXISTS idx_infrastructure_resource_type ON infrastructure_resources(resource_type);
CREATE INDEX IF NOT EXISTS idx_infrastructure_status ON infrastructure_resources(status);
