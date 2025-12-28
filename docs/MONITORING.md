# DevControl Monitoring Guide

Complete guide for monitoring your DevControl platform using Prometheus and Grafana.

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Grafana Dashboard Setup](#grafana-dashboard-setup)
- [Available Dashboards](#available-dashboards)
- [Prometheus Metrics](#prometheus-metrics)
- [Alert Configuration](#alert-configuration)
- [Troubleshooting](#troubleshooting)

## Overview

DevControl uses a modern monitoring stack to track application performance, infrastructure costs, and system health:

- **Prometheus**: Time-series metrics collection and storage
- **Grafana**: Visualization and dashboards
- **Node Exporter**: System-level metrics (CPU, memory, disk)
- **PostgreSQL Exporter**: Database metrics
- **Custom Exporters**: Application-specific business metrics

## Quick Start

### 1. Start the Monitoring Stack

```bash
cd monitoring
docker-compose -f docker-compose.monitoring.yml up -d
```

### 2. Access the Services

- **Grafana**: http://localhost:3000
  - Username: `admin`
  - Password: `devcontrol2024`

- **Prometheus**: http://localhost:9090
  - Query interface for raw metrics
  - Alert rules manager

### 3. Verify Setup

1. Open Grafana: http://localhost:3000
2. Navigate to **Dashboards → Browse**
3. You should see a **"DevControl"** folder with 4 dashboards

## Grafana Dashboard Setup

### Automatic Dashboard Loading (Recommended)

Dashboards are **automatically loaded** when Grafana starts via provisioning. No manual import needed!

**How it works:**
1. Dashboard JSON files are stored in `monitoring/grafana/dashboards/`
2. Docker Compose mounts them to `/etc/grafana/provisioning/dashboards/`
3. Grafana auto-discovers and loads them into the "DevControl" folder
4. Updates to JSON files are picked up within 10 seconds

### Manual Dashboard Import (Optional)

If you want to import a dashboard manually or create a custom variation:

1. Go to **Dashboards → Import** in Grafana
2. Click **"Upload JSON file"**
3. Select a dashboard file from `monitoring/grafana/dashboards/`
4. Click **"Load"**
5. Select **Prometheus** as the data source
6. Click **"Import"**

### Restart Grafana

To reload dashboards after making changes:

```bash
docker-compose -f monitoring/docker-compose.monitoring.yml restart grafana
```

## Available Dashboards

### 1. API Performance Overview

**Purpose:** Monitor HTTP request patterns, response times, and error rates

**Location:** `monitoring/grafana/dashboards/api-performance.json`

**Panels:**

| Panel | Description | Query |
|-------|-------------|-------|
| **Request Rate** | Requests per second | `sum(rate(http_requests_total[5m]))` |
| **Response Time Percentiles** | p50, p95, p99 latency | `histogram_quantile(0.95, ...)` |
| **Error Rate** | 4xx and 5xx errors | `sum(rate(http_requests_total{status_code=~"4..\|5.."}[5m])) / sum(rate(http_requests_total[5m])) * 100` |
| **Active Connections** | Current open connections | `http_requests_in_progress` |
| **Requests by Route** | Top 10 endpoints | `topk(10, sum by (route) (rate(http_requests_total[5m])))` |

**Use Cases:**
- Identify slow endpoints (high p95/p99)
- Detect error spikes
- Monitor traffic patterns
- Track API health during deployments

**Screenshot:**
![API Performance Dashboard](screenshots/grafana/api-performance-dashboard.png)

---

### 2. Infrastructure & Costs

**Purpose:** Track AWS costs and cost optimization opportunities

**Location:** `monitoring/grafana/dashboards/infrastructure-costs.json`

**Panels:**

| Panel | Description | Query |
|-------|-------------|-------|
| **Total Monthly Cost** | Current AWS spend | `infrastructure_cost_monthly_total` |
| **Potential Savings** | Money savable from recommendations | `cost_optimization_potential_savings_total` |
| **Cost Trend** | 30-day cost history | `infrastructure_cost_monthly_total` (over time) |
| **Recommendations by Severity** | HIGH/MEDIUM/LOW breakdown | `cost_optimization_recommendations_active{severity="..."}` |
| **Service Counts** | Total and active services | `services_total`, `services_active` |

**Thresholds:**
- Monthly cost: Green (<$5k), Yellow ($5k-$10k), Red (>$10k)
- Potential savings: Yellow (>$100), Red (>$500)

**Use Cases:**
- Monitor monthly AWS spending
- Identify cost optimization opportunities
- Track savings from implemented recommendations
- Budget planning and forecasting

**Screenshot:**
![Infrastructure & Costs Dashboard](screenshots/grafana/infrastructure-costs-dashboard.png)

---

### 3. Service Health & Deployments

**Purpose:** Track DORA metrics and deployment success

**Location:** `monitoring/grafana/dashboards/service-health.json`

**Panels:**

| Panel | Description | Query |
|-------|-------------|-------|
| **Deployment Frequency** | Deploys per day (DORA metric) | `dora_deployment_frequency` |
| **Deployment Success Rate** | % of successful deployments | `sum(deployments_total{status="success"}) / sum(deployments_total) * 100` |
| **Change Failure Rate** | % of failed changes (DORA) | `dora_change_failure_rate` |
| **MTTR** | Mean time to recovery (DORA) | `dora_mttr_minutes` |
| **Deployments by Environment** | Production/Staging/Dev deploys | `sum by (environment) (increase(deployments_total[24h]))` |
| **Lead Time** | Hours from commit to deploy | `dora_lead_time_hours` |

**DORA Benchmarks:**

| Metric | Elite | High | Medium | Low |
|--------|-------|------|--------|-----|
| Deployment Frequency | >1/day | 1/day - 1/week | 1/week - 1/month | <1/month |
| Lead Time | <1 day | 1-7 days | 1 week - 1 month | >1 month |
| Change Failure Rate | <15% | 16-30% | 31-45% | >45% |
| MTTR | <1 hour | <1 day | 1 day - 1 week | >1 week |

**Use Cases:**
- Measure DevOps performance
- Track deployment reliability
- Identify process bottlenecks
- Compare against industry benchmarks

**Screenshot:**
![Service Health Dashboard](screenshots/grafana/service-health-dashboard.png)

---

### 4. System Resources

**Purpose:** Monitor server health and database performance

**Location:** `monitoring/grafana/dashboards/system-resources.json`

**Panels:**

| Panel | Description | Query |
|-------|-------------|-------|
| **CPU Usage** | % CPU utilization | `100 - (avg(rate(node_cpu_seconds_total{mode="idle"}[5m])) * 100)` |
| **Memory Usage** | % RAM used | `(node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100` |
| **Disk I/O** | Disk activity | `rate(node_disk_io_time_seconds_total[5m])` |
| **Database Connections** | Active vs max connections | `pg_stat_database_numbackends` / `pg_settings_max_connections` |
| **Query Performance** | Mean SQL execution time | `pg_stat_statements_mean_exec_time_ms` |
| **Disk Space** | Available storage | `node_filesystem_avail_bytes` |

**Alert Thresholds:**
- CPU: Alert at 80%
- Memory: Alert at 85%
- DB Connections: Alert when approaching max
- Query Time: Alert at >500ms

**Use Cases:**
- Prevent resource exhaustion
- Identify performance degradation
- Plan capacity upgrades
- Troubleshoot slow queries

**Screenshot:**
![System Resources Dashboard](screenshots/grafana/system-resources-dashboard.png)

---

## Prometheus Metrics

### Application Metrics

These metrics are exposed by the DevControl backend at `http://localhost:8080/metrics`:

#### HTTP Metrics
```promql
# Total HTTP requests
http_requests_total{method="GET", route="/api/services", status_code="200"}

# Request duration histogram
http_request_duration_seconds_bucket{method="POST", route="/api/deployments", le="0.5"}

# Active requests (gauge)
http_requests_in_progress
```

#### Business Metrics
```promql
# Services
services_total                    # Total number of services
services_active                   # Currently active services

# Deployments
deployments_total{environment="production", status="success"}

# Costs
infrastructure_cost_monthly_total          # Current month AWS cost
cost_optimization_potential_savings_total  # Total potential savings
cost_optimization_recommendations_active{severity="HIGH"}

# DORA Metrics
dora_deployment_frequency         # Deploys per day
dora_lead_time_hours             # Hours from commit to production
dora_change_failure_rate         # % of deployments that fail
dora_mttr_minutes                # Mean time to recovery
```

### System Metrics (Node Exporter)

```promql
# CPU
node_cpu_seconds_total{mode="idle"}
node_load1, node_load5, node_load15

# Memory
node_memory_MemTotal_bytes
node_memory_MemAvailable_bytes
node_memory_Cached_bytes

# Disk
node_disk_io_time_seconds_total
node_filesystem_avail_bytes
node_disk_read_bytes_total
node_disk_written_bytes_total

# Network
node_network_receive_bytes_total
node_network_transmit_bytes_total
```

### Database Metrics (PostgreSQL Exporter)

```promql
# Connections
pg_stat_database_numbackends{datname="platform_portal"}
pg_settings_max_connections

# Performance
pg_stat_statements_mean_exec_time_ms
pg_stat_database_tup_returned
pg_stat_database_tup_fetched

# Activity
pg_stat_activity_count
pg_stat_database_xact_commit
pg_stat_database_xact_rollback
```

## PromQL Query Examples

### Find Slow Endpoints
```promql
# 95th percentile response time by route
histogram_quantile(0.95,
  sum by (route, le) (
    rate(http_request_duration_seconds_bucket[5m])
  )
) > 1  # >1 second
```

### Calculate Error Rate
```promql
# Error rate as percentage
sum(rate(http_requests_total{status_code=~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))
* 100
```

### Detect Memory Pressure
```promql
# Available memory below 1GB
node_memory_MemAvailable_bytes < 1073741824
```

### Database Connection Utilization
```promql
# Percentage of max connections used
(pg_stat_database_numbackends{datname="platform_portal"}
/
pg_settings_max_connections) * 100
```

## Dashboard Customization

### Time Ranges

All dashboards support flexible time ranges:
- **Last 5 minutes**: Real-time monitoring
- **Last 1 hour**: Recent activity (default for API/System dashboards)
- **Last 24 hours**: Daily patterns (default for Service Health)
- **Last 30 days**: Monthly trends (default for Costs dashboard)

### Refresh Intervals

Configure auto-refresh rates:
- **5s**: High-frequency monitoring
- **10s**: Default for most panels
- **30s**: Balanced update rate
- **1m, 5m**: Longer intervals for historical analysis

### Template Variables (Future Enhancement)

You can add template variables to filter dashboards:

```json
{
  "templating": {
    "list": [
      {
        "name": "environment",
        "type": "query",
        "query": "label_values(deployments_total, environment)"
      }
    ]
  }
}
```

## Alert Configuration

Prometheus alerts are defined in `monitoring/prometheus/alerts.yml`:

### Critical Alerts

```yaml
- alert: APIDown
  expr: up{job="devcontrol-backend"} == 0
  for: 1m
  labels:
    severity: critical
  annotations:
    summary: "DevControl API is down"
```

### Warning Alerts

```yaml
- alert: HighErrorRate
  expr: |
    sum(rate(http_requests_total{status_code=~"5.."}[5m]))
    / sum(rate(http_requests_total[5m])) > 0.05
  for: 5m
  labels:
    severity: warning
```

### View Active Alerts

- Prometheus UI: http://localhost:9090/alerts
- Grafana: Coming soon in Alert History UI (Feature 4)

## Troubleshooting

### Dashboards Not Loading

**Problem:** Grafana shows "No data" or dashboards don't appear

**Solutions:**

1. **Check Prometheus connection:**
   ```bash
   # Test from inside Grafana container
   docker exec devcontrol-grafana wget -O- http://prometheus:9090/-/healthy
   ```

2. **Verify data source:**
   - Go to Grafana → Configuration → Data Sources
   - Click "Prometheus"
   - URL should be: `http://prometheus:9090`
   - Click "Save & Test" (should show green checkmark)

3. **Restart Grafana:**
   ```bash
   docker-compose -f monitoring/docker-compose.monitoring.yml restart grafana
   ```

### No Metrics Data

**Problem:** Panels show "No data points" or empty graphs

**Possible causes:**

1. **Backend not running:**
   ```bash
   curl http://localhost:8080/metrics
   # Should return Prometheus metrics
   ```

2. **Prometheus not scraping:**
   - Check Prometheus targets: http://localhost:9090/targets
   - All targets should show "UP"
   - If "DOWN", check firewall/network

3. **Metrics not exported yet:**
   - Some metrics only appear after activity
   - Deploy a service or make API requests
   - Wait 30-60 seconds for scrape

### High Query Times

**Problem:** Dashboards load slowly or timeout

**Solutions:**

1. **Reduce time range:** Use shorter ranges (1h instead of 30d)
2. **Increase scrape interval:** Edit `prometheus.yml`, change `scrape_interval: 15s` → `30s`
3. **Add recording rules:** Pre-compute expensive queries

### Missing Panels

**Problem:** Some panels show "Panel plugin not found"

**Solution:**
```bash
# Install missing plugins
docker exec devcontrol-grafana grafana-cli plugins install <plugin-name>
docker-compose -f monitoring/docker-compose.monitoring.yml restart grafana
```

### Dashboard Changes Not Persisting

**Problem:** Edits to dashboards are lost after restart

**Cause:** Dashboards loaded from provisioning are read-only by default

**Solution:**
1. Set `allowUiUpdates: true` in `dashboard.yml` (already configured)
2. Or: Export dashboard JSON and save to `monitoring/grafana/dashboards/`
3. Restart Grafana to reload from file

## Best Practices

### 1. Monitor During Deployments

Before deploying:
1. Open **API Performance** dashboard
2. Set refresh to **5s**
3. Watch error rate and response times
4. Deploy when metrics are stable

### 2. Set Up Alerts

Configure Slack/Email notifications:
```yaml
# Add to prometheus/alerts.yml
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['alertmanager:9093']
```

### 3. Regular Reviews

Weekly:
- Check **Infrastructure & Costs** for savings
- Review **Service Health** DORA metrics
- Investigate anomalies in **System Resources**

Monthly:
- Analyze cost trends
- Compare DORA metrics month-over-month
- Plan capacity based on resource usage

### 4. Custom Dashboards

Create team-specific dashboards:
1. Duplicate existing dashboard
2. Add relevant panels
3. Save JSON to `monitoring/grafana/dashboards/custom/`
4. Update `dashboard.yml` provisioning

## Additional Resources

- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Dashboard Guide](https://grafana.com/docs/grafana/latest/dashboards/)
- [PromQL Tutorial](https://prometheus.io/docs/prometheus/latest/querying/basics/)
- [DORA Metrics](https://dora.dev/)
- [Node Exporter Metrics](https://github.com/prometheus/node_exporter)

## Support

For issues or questions:
- GitHub Issues: https://github.com/GoddeyUwamari/devcontrol/issues
- Documentation: This file
- Prometheus Queries: http://localhost:9090/graph
