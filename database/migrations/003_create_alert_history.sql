-- Migration: Create alert_history table
-- Description: Track Prometheus alerts with acknowledgment and resolution workflow
-- Created: 2025-12-28

CREATE TABLE alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_name VARCHAR(255) NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  severity VARCHAR(50) NOT NULL CHECK (severity IN ('critical', 'warning')),
  status VARCHAR(50) NOT NULL DEFAULT 'firing' CHECK (status IN ('firing', 'acknowledged', 'resolved')),
  description TEXT,
  labels JSONB DEFAULT '{}'::jsonb,
  annotations JSONB DEFAULT '{}'::jsonb,
  started_at TIMESTAMP NOT NULL,
  acknowledged_at TIMESTAMP,
  acknowledged_by VARCHAR(255),
  resolved_at TIMESTAMP,
  duration_minutes INTEGER GENERATED ALWAYS AS (
    CASE
      WHEN resolved_at IS NOT NULL THEN EXTRACT(EPOCH FROM (resolved_at - started_at)) / 60
      ELSE NULL
    END
  ) STORED,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_alert_history_started_at ON alert_history(started_at DESC);
CREATE INDEX idx_alert_history_service_id ON alert_history(service_id) WHERE service_id IS NOT NULL;
CREATE INDEX idx_alert_history_severity ON alert_history(severity);
CREATE INDEX idx_alert_history_status ON alert_history(status);
CREATE INDEX idx_alert_history_alert_name ON alert_history(alert_name);

-- Composite index for common queries
CREATE INDEX idx_alert_history_status_severity_started ON alert_history(status, severity, started_at DESC);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_alert_history_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER alert_history_updated_at
  BEFORE UPDATE ON alert_history
  FOR EACH ROW
  EXECUTE FUNCTION update_alert_history_updated_at();

-- Comments
COMMENT ON TABLE alert_history IS 'Historical record of Prometheus alerts with acknowledgment workflow';
COMMENT ON COLUMN alert_history.alert_name IS 'Name of the alert rule from Prometheus';
COMMENT ON COLUMN alert_history.service_id IS 'Optional link to service if alert is service-specific';
COMMENT ON COLUMN alert_history.severity IS 'Alert severity: critical or warning';
COMMENT ON COLUMN alert_history.status IS 'Current status: firing, acknowledged, or resolved';
COMMENT ON COLUMN alert_history.labels IS 'Prometheus alert labels (JSON)';
COMMENT ON COLUMN alert_history.annotations IS 'Prometheus alert annotations (JSON)';
COMMENT ON COLUMN alert_history.duration_minutes IS 'Auto-calculated duration from started_at to resolved_at';
