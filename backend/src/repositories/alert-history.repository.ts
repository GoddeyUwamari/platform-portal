import { Pool, QueryResult } from 'pg';

export interface Alert {
  id: string;
  alertName: string;
  serviceId?: string;
  severity: 'critical' | 'warning';
  status: 'firing' | 'acknowledged' | 'resolved';
  description: string;
  labels: Record<string, any>;
  annotations: Record<string, any>;
  startedAt: Date;
  acknowledgedAt?: Date;
  acknowledgedBy?: string;
  resolvedAt?: Date;
  durationMinutes?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AlertFilters {
  dateRange?: '7d' | '30d' | '90d';
  serviceId?: string;
  severity?: 'critical' | 'warning';
  status?: 'firing' | 'acknowledged' | 'resolved';
  page?: number;
  limit?: number;
}

export interface AlertStats {
  total: number;
  active: number;
  acknowledged: number;
  resolved: number;
  criticalCount: number;
  warningCount: number;
  avgResolutionTime: number;
}

export class AlertHistoryRepository {
  constructor(private pool: Pool) {}

  async findAll(filters: AlertFilters): Promise<{ alerts: Alert[]; total: number }> {
    const conditions: string[] = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Date range filter
    if (filters.dateRange) {
      const days = parseInt(filters.dateRange);
      conditions.push(`started_at >= NOW() - INTERVAL '${days} days'`);
    }

    // Service filter
    if (filters.serviceId) {
      conditions.push(`service_id = $${paramIndex}`);
      params.push(filters.serviceId);
      paramIndex++;
    }

    // Severity filter
    if (filters.severity) {
      conditions.push(`severity = $${paramIndex}`);
      params.push(filters.severity);
      paramIndex++;
    }

    // Status filter
    if (filters.status) {
      conditions.push(`status = $${paramIndex}`);
      params.push(filters.status);
      paramIndex++;
    }

    const whereClause = conditions.join(' AND ');

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as count
      FROM alert_history
      WHERE ${whereClause}
    `;
    const countResult = await this.pool.query(countQuery, params);
    const total = parseInt(countResult.rows[0].count);

    // Get paginated results
    const page = filters.page || 1;
    const limit = filters.limit || 50;
    const offset = (page - 1) * limit;

    const query = `
      SELECT *
      FROM alert_history
      WHERE ${whereClause}
      ORDER BY started_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    params.push(limit, offset);

    const result = await this.pool.query(query, params);
    const alerts = result.rows.map(this.mapRowToAlert);

    return { alerts, total };
  }

  async findById(id: string): Promise<Alert | null> {
    const query = 'SELECT * FROM alert_history WHERE id = $1';
    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToAlert(result.rows[0]);
  }

  async findByAlertName(alertName: string, status: string = 'firing'): Promise<Alert | null> {
    const query = 'SELECT * FROM alert_history WHERE alert_name = $1 AND status = $2 ORDER BY started_at DESC LIMIT 1';
    const result = await this.pool.query(query, [alertName, status]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToAlert(result.rows[0]);
  }

  async create(alert: Partial<Alert>): Promise<Alert> {
    const query = `
      INSERT INTO alert_history (
        alert_name, service_id, severity, status, description,
        labels, annotations, started_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;

    const params = [
      alert.alertName,
      alert.serviceId || null,
      alert.severity,
      alert.status || 'firing',
      alert.description || '',
      JSON.stringify(alert.labels || {}),
      JSON.stringify(alert.annotations || {}),
      alert.startedAt,
    ];

    const result = await this.pool.query(query, params);
    return this.mapRowToAlert(result.rows[0]);
  }

  async update(id: string, data: Partial<Alert>): Promise<Alert | null> {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (data.status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      params.push(data.status);
      paramIndex++;
    }

    if (data.acknowledgedAt !== undefined) {
      updates.push(`acknowledged_at = $${paramIndex}`);
      params.push(data.acknowledgedAt);
      paramIndex++;
    }

    if (data.acknowledgedBy !== undefined) {
      updates.push(`acknowledged_by = $${paramIndex}`);
      params.push(data.acknowledgedBy);
      paramIndex++;
    }

    if (data.resolvedAt !== undefined) {
      updates.push(`resolved_at = $${paramIndex}`);
      params.push(data.resolvedAt);
      paramIndex++;
    }

    if (updates.length === 0) {
      return this.findById(id);
    }

    const query = `
      UPDATE alert_history
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex}
      RETURNING *
    `;
    params.push(id);

    const result = await this.pool.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToAlert(result.rows[0]);
  }

  async acknowledge(id: string, user: string): Promise<Alert | null> {
    const query = `
      UPDATE alert_history
      SET status = 'acknowledged',
          acknowledged_at = NOW(),
          acknowledged_by = $1
      WHERE id = $2
      RETURNING *
    `;

    const result = await this.pool.query(query, [user, id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToAlert(result.rows[0]);
  }

  async resolve(id: string): Promise<Alert | null> {
    const query = `
      UPDATE alert_history
      SET status = 'resolved',
          resolved_at = NOW()
      WHERE id = $1
      RETURNING *
    `;

    const result = await this.pool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToAlert(result.rows[0]);
  }

  async delete(id: string): Promise<boolean> {
    const query = 'DELETE FROM alert_history WHERE id = $1';
    const result = await this.pool.query(query, [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getStats(filters: Omit<AlertFilters, 'page' | 'limit'>): Promise<AlertStats> {
    const conditions: string[] = ['1=1'];
    const params: any[] = [];
    let paramIndex = 1;

    // Date range filter
    if (filters.dateRange) {
      const days = parseInt(filters.dateRange);
      conditions.push(`started_at >= NOW() - INTERVAL '${days} days'`);
    }

    // Service filter
    if (filters.serviceId) {
      conditions.push(`service_id = $${paramIndex}`);
      params.push(filters.serviceId);
      paramIndex++;
    }

    const whereClause = conditions.join(' AND ');

    const query = `
      SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'firing') as active,
        COUNT(*) FILTER (WHERE status = 'acknowledged') as acknowledged,
        COUNT(*) FILTER (WHERE status = 'resolved') as resolved,
        COUNT(*) FILTER (WHERE severity = 'critical') as critical_count,
        COUNT(*) FILTER (WHERE severity = 'warning') as warning_count,
        COALESCE(AVG(duration_minutes) FILTER (WHERE status = 'resolved'), 0) as avg_resolution_time
      FROM alert_history
      WHERE ${whereClause}
    `;

    const result = await this.pool.query(query, params);
    const row = result.rows[0];

    return {
      total: parseInt(row.total),
      active: parseInt(row.active),
      acknowledged: parseInt(row.acknowledged),
      resolved: parseInt(row.resolved),
      criticalCount: parseInt(row.critical_count),
      warningCount: parseInt(row.warning_count),
      avgResolutionTime: parseFloat(row.avg_resolution_time),
    };
  }

  private mapRowToAlert(row: any): Alert {
    return {
      id: row.id,
      alertName: row.alert_name,
      serviceId: row.service_id,
      severity: row.severity,
      status: row.status,
      description: row.description,
      labels: row.labels,
      annotations: row.annotations,
      startedAt: row.started_at,
      acknowledgedAt: row.acknowledged_at,
      acknowledgedBy: row.acknowledged_by,
      resolvedAt: row.resolved_at,
      durationMinutes: row.duration_minutes,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}
