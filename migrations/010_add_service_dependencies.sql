-- Migration: Add service_dependencies table
-- Description: Create table to track dependencies between services

-- Create service_dependencies table
CREATE TABLE IF NOT EXISTS service_dependencies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL,
  source_service_id UUID NOT NULL,
  target_service_id UUID NOT NULL,
  dependency_type VARCHAR(50) NOT NULL,
  description TEXT,
  is_critical BOOLEAN NOT NULL DEFAULT false,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Foreign key constraints
  CONSTRAINT fk_service_dependencies_organization
    FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
  CONSTRAINT fk_service_dependencies_source
    FOREIGN KEY (source_service_id) REFERENCES services(id) ON DELETE CASCADE,
  CONSTRAINT fk_service_dependencies_target
    FOREIGN KEY (target_service_id) REFERENCES services(id) ON DELETE CASCADE,

  -- Prevent self-dependencies
  CONSTRAINT chk_no_self_dependency
    CHECK (source_service_id != target_service_id),

  -- Validate dependency type
  CONSTRAINT chk_dependency_type
    CHECK (dependency_type IN ('runtime', 'data', 'deployment', 'shared-lib'))
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_service_dependencies_org
  ON service_dependencies(organization_id);

CREATE INDEX IF NOT EXISTS idx_service_dependencies_source
  ON service_dependencies(source_service_id);

CREATE INDEX IF NOT EXISTS idx_service_dependencies_target
  ON service_dependencies(target_service_id);

CREATE INDEX IF NOT EXISTS idx_service_dependencies_type
  ON service_dependencies(dependency_type);

CREATE INDEX IF NOT EXISTS idx_service_dependencies_critical
  ON service_dependencies(is_critical) WHERE is_critical = true;

-- Create a unique constraint to prevent duplicate dependencies
CREATE UNIQUE INDEX IF NOT EXISTS idx_service_dependencies_unique
  ON service_dependencies(source_service_id, target_service_id, dependency_type);

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_service_dependencies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_service_dependencies_updated_at
  BEFORE UPDATE ON service_dependencies
  FOR EACH ROW
  EXECUTE FUNCTION update_service_dependencies_updated_at();

-- Add Row Level Security (RLS)
ALTER TABLE service_dependencies ENABLE ROW LEVEL SECURITY;

-- Policy for SELECT: Users can see dependencies for their organization
CREATE POLICY service_dependencies_select_policy ON service_dependencies
  FOR SELECT
  USING (
    organization_id IN (
      SELECT organization_id
      FROM users
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- Policy for INSERT: Users can create dependencies for their organization
CREATE POLICY service_dependencies_insert_policy ON service_dependencies
  FOR INSERT
  WITH CHECK (
    organization_id IN (
      SELECT organization_id
      FROM users
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- Policy for UPDATE: Users can update dependencies in their organization
CREATE POLICY service_dependencies_update_policy ON service_dependencies
  FOR UPDATE
  USING (
    organization_id IN (
      SELECT organization_id
      FROM users
      WHERE email = current_setting('app.current_user_email', true)
    )
  )
  WITH CHECK (
    organization_id IN (
      SELECT organization_id
      FROM users
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- Policy for DELETE: Users can delete dependencies in their organization
CREATE POLICY service_dependencies_delete_policy ON service_dependencies
  FOR DELETE
  USING (
    organization_id IN (
      SELECT organization_id
      FROM users
      WHERE email = current_setting('app.current_user_email', true)
    )
  );

-- Comments for documentation
COMMENT ON TABLE service_dependencies IS 'Tracks dependencies between services for impact analysis and dependency graphs';
COMMENT ON COLUMN service_dependencies.dependency_type IS 'Type of dependency: runtime, data, deployment, or shared-lib';
COMMENT ON COLUMN service_dependencies.is_critical IS 'Whether this dependency is on the critical path';
COMMENT ON COLUMN service_dependencies.metadata IS 'Additional metadata about the dependency (version requirements, etc.)';
