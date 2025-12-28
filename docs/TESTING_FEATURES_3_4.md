# Testing Guide: Features 3 & 4

Complete testing guide for Grafana Dashboard Templates and Alert History UI.

## Prerequisites

Ensure all services are running:
```bash
# 1. Start PostgreSQL (if not already running)
# Check if it's running with: psql -h localhost -U postgres -d platform_portal -c "SELECT 1"

# 2. Start monitoring stack
cd monitoring
docker-compose -f docker-compose.monitoring.yml up -d

# 3. Verify monitoring services
docker-compose -f docker-compose.monitoring.yml ps

# Expected output:
# - devcontrol-prometheus (port 9090)
# - devcontrol-grafana (port 3000)
# - devcontrol-node-exporter (port 9100)
# - devcontrol-postgres-exporter (port 9187)
```

## Feature 3: Grafana Dashboard Templates

### Test 1: Verify Dashboard Auto-Loading

```bash
# 1. Restart Grafana to load dashboards
cd monitoring
docker-compose -f docker-compose.monitoring.yml restart grafana

# 2. Wait 10 seconds for provisioning
sleep 10

# 3. Access Grafana
open http://localhost:3000
# Or visit manually: http://localhost:3000
# Login: admin / devcontrol2024
```

**Expected Results:**
- ✅ Grafana loads successfully
- ✅ Navigate to **Dashboards → Browse**
- ✅ See "DevControl" folder containing 4 dashboards:
  - DevControl - API Performance Overview
  - DevControl - Infrastructure & Costs
  - DevControl - Service Health & Deployments
  - DevControl - System Resources

### Test 2: Verify Dashboard Data

```bash
# Start the backend to generate metrics
cd /Users/user/Desktop/platform-portal
npm run dev
```

**Test each dashboard:**

1. **API Performance Overview:**
   - Open dashboard
   - ✅ Request Rate panel shows data
   - ✅ Response Time Percentiles (p50, p95, p99) display
   - ✅ Error Rate panel visible
   - ✅ Active Connections shows current value
   - ✅ Requests by Route pie chart renders

2. **Infrastructure & Costs:**
   - Open dashboard
   - ✅ Total Monthly Cost displays AWS spend
   - ✅ Potential Savings shows recommendation totals
   - ✅ Total Services and Active Services show counts
   - ✅ Cost Recommendations pie chart by severity
   - ✅ Cost Trend graph shows 30-day history

3. **Service Health & Deployments:**
   - Open dashboard
   - ✅ Deployment Frequency gauge shows DORA metric
   - ✅ Deployment Success Rate gauge (0-100%)
   - ✅ Change Failure Rate displays percentage
   - ✅ MTTR (Mean Time to Recovery) shows minutes
   - ✅ Deployments by Environment bar chart
   - ✅ Lead Time for Changes graph

4. **System Resources:**
   - Open dashboard
   - ✅ CPU Usage graph with 80% threshold
   - ✅ Memory Usage graph with 85% threshold
   - ✅ Disk I/O activity
   - ✅ Database Connections vs Max Connections
   - ✅ Database Query Performance
   - ✅ Disk Space Available

### Test 3: Time Range & Refresh

For each dashboard:
- ✅ Change time range (Last 5m, 1h, 24h, 30d)
- ✅ Set refresh interval (5s, 10s, 30s, 1m)
- ✅ Verify panels update automatically
- ✅ Check "Updated X seconds ago" indicator

### Test 4: Prometheus Integration

```bash
# Verify Prometheus is scraping metrics
open http://localhost:9090/targets

# Expected targets (all should be UP):
# - devcontrol-backend (localhost:8080/metrics)
# - prometheus (localhost:9090/metrics)
# - node-exporter (node-exporter:9100/metrics)
# - postgres-exporter (postgres-exporter:9187/metrics)
```

**Query Examples in Prometheus:**
```promql
# Test these queries at http://localhost:9090/graph

# HTTP requests
sum(rate(http_requests_total[5m]))

# Services count
services_total

# DORA deployment frequency
dora_deployment_frequency

# Infrastructure cost
infrastructure_cost_monthly_total
```

---

## Feature 4: Alert History UI

### Test 1: Database Setup

```bash
# Verify alert_history table exists
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "\d alert_history"

# Expected output: Table structure with columns:
# - id (uuid)
# - alert_name (varchar)
# - service_id (uuid)
# - severity (varchar)
# - status (varchar)
# - description (text)
# - labels (jsonb)
# - annotations (jsonb)
# - started_at (timestamp)
# - etc.
```

### Test 2: Backend API Endpoints

Start the backend:
```bash
cd /Users/user/Desktop/platform-portal
npm run dev
```

**Test endpoints with curl:**

```bash
# 1. Get alert statistics
curl http://localhost:8080/api/alerts/stats

# Expected response:
# {
#   "success": true,
#   "data": {
#     "total": 0,
#     "active": 0,
#     "acknowledged": 0,
#     "resolved": 0,
#     "criticalCount": 0,
#     "warningCount": 0,
#     "avgResolutionTime": 0
#   }
# }

# 2. Get alert history
curl "http://localhost:8080/api/alerts/history?page=1&limit=50"

# Expected response:
# {
#   "success": true,
#   "data": [],
#   "pagination": {
#     "page": 1,
#     "limit": 50,
#     "total": 0,
#     "totalPages": 0
#   }
# }

# 3. Test with filters
curl "http://localhost:8080/api/alerts/history?date_range=30d&severity=critical&status=firing"
```

### Test 3: Alert Sync Job

**Verify background job is running:**

```bash
# Check backend logs for alert sync job
# You should see:
# [Alert Sync Job] Started - syncing alerts every 1 minute
# [Alert Sync Job] Running alert sync...
# [Alert Sync Job] Sync completed successfully
```

**Trigger a test alert:**

```bash
# Option 1: Stop the backend to trigger APIDown alert
# Press Ctrl+C in the terminal running npm run dev
# Wait 1 minute for Prometheus to detect it down

# Option 2: Manually insert test alert
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal << 'EOF'
INSERT INTO alert_history (
  alert_name, severity, status, description,
  labels, annotations, started_at
) VALUES (
  'TestAlert', 'critical', 'firing', 'Test alert for verification',
  '{"alertname": "TestAlert", "severity": "critical"}'::jsonb,
  '{"summary": "This is a test alert"}'::jsonb,
  NOW()
);
EOF

# Verify alert was inserted
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "SELECT * FROM alert_history;"
```

### Test 4: Frontend Alerts Page

```bash
# Start frontend
cd /Users/user/Desktop/platform-portal
npm run dev  # If not already running
```

**Access the Alerts page:**
```
http://localhost:3000/admin/alerts
```

**Test UI Components:**

1. **Stats Cards:**
   - ✅ Total Alerts displays count
   - ✅ Active Alerts shows firing alerts (red color)
   - ✅ Average Resolution Time formatted (e.g., "2h 34m")
   - ✅ Critical Alerts count displayed

2. **Filters:**
   - ✅ Time Range buttons: Last 7 Days, 30 Days, 90 Days
   - ✅ Severity dropdown: All, Critical, Warning
   - ✅ Status dropdown: All, Firing, Acknowledged, Resolved
   - ✅ "Clear Filters" button appears when filters active
   - ✅ Filters update URL and refetch data

3. **Alert Timeline Table:**
   - ✅ Status column shows icons:
     - 🔴 Pulsing red circle for "Firing"
     - 🟡 Yellow circle for "Acknowledged"
     - 🟢 Green circle for "Resolved"
   - ✅ Alert Name and description display
   - ✅ Severity badge (red for Critical, yellow for Warning)
   - ✅ Started time shows "X minutes ago"
   - ✅ Duration shows formatted time (e.g., "1h 23m")

4. **Action Buttons:**
   - ✅ "Acknowledge" button appears for firing alerts
   - ✅ "Resolve" button appears for firing/acknowledged alerts
   - ✅ Delete (trash icon) button always visible
   - ✅ Buttons disabled during API calls

5. **Real-time Updates:**
   - ✅ Page auto-refreshes every 30 seconds
   - ✅ "Updated X seconds ago" indicator updates
   - ✅ New alerts appear automatically

6. **Pagination:**
   - ✅ Shows "Page 1 of X"
   - ✅ Previous/Next buttons work
   - ✅ Buttons disabled at boundaries

### Test 5: Alert Actions Workflow

**Complete workflow test:**

```bash
# 1. Create a firing alert (if you don't have one)
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal << 'EOF'
INSERT INTO alert_history (
  alert_name, severity, status, description,
  labels, annotations, started_at
) VALUES (
  'HighMemoryUsage', 'warning', 'firing', 'Memory usage above 85%',
  '{"alertname": "HighMemoryUsage", "severity": "warning"}'::jsonb,
  '{"summary": "Memory usage is high"}'::jsonb,
  NOW()
);
EOF
```

**In the UI:**

1. **Acknowledge Alert:**
   - Navigate to http://localhost:3000/admin/alerts
   - Find the firing alert
   - ✅ Click "Acknowledge" button
   - ✅ Alert status changes to "Acknowledged" (yellow circle)
   - ✅ Stats cards update (Active count decreases, Acknowledged increases)
   - ✅ Success toast/message appears

2. **Resolve Alert:**
   - Find the acknowledged alert
   - ✅ Click "Resolve" button
   - ✅ Alert status changes to "Resolved" (green circle)
   - ✅ Duration calculates and displays
   - ✅ Stats cards update

3. **Delete Alert:**
   - Find any alert
   - ✅ Click trash icon
   - ✅ Confirmation dialog appears
   - ✅ Click "OK"
   - ✅ Alert removed from list
   - ✅ Total count decreases

### Test 6: Navigation Integration

**Verify Alerts link in navigation:**

1. ✅ Top navigation bar shows "Alerts" link
2. ✅ AlertTriangle icon displays next to "Alerts"
3. ✅ Link highlights when on /admin/alerts page
4. ✅ Clicking navigates to alerts page

### Test 7: Prometheus Metrics

**Verify alert metrics are exported:**

```bash
# Check metrics endpoint
curl http://localhost:8080/metrics | grep alerts

# Expected metrics:
# alerts_active_total{severity="critical"} 0
# alerts_active_total{severity="warning"} 1
# alerts_acknowledged_total 0
# alerts_mttr_minutes 0
```

**Query in Prometheus:**
```
http://localhost:9090/graph

# Test these queries:
alerts_active_total{severity="critical"}
alerts_acknowledged_total
alerts_mttr_minutes
```

---

## Integration Tests

### End-to-End Alert Flow

**Test complete alert lifecycle:**

1. **Trigger Real Alert:**
   ```bash
   # Stop backend to trigger APIDown alert
   # (Stop npm run dev in backend terminal)

   # Wait 1-2 minutes for Prometheus to detect
   # Check Prometheus alerts: http://localhost:9090/alerts
   ```

2. **Verify Alert Sync:**
   - ✅ Alert appears in Prometheus (http://localhost:9090/alerts)
   - ✅ Wait 1 minute for sync job to run
   - ✅ Alert appears in database:
     ```bash
     PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "SELECT * FROM alert_history WHERE alert_name = 'APIDown';"
     ```

3. **Verify UI Updates:**
   - ✅ Open http://localhost:3000/admin/alerts
   - ✅ Alert appears in timeline
   - ✅ Status shows "Firing" with pulsing red icon
   - ✅ Stats cards show active count increased

4. **Resolve Flow:**
   - ✅ Restart backend: `npm run dev`
   - ✅ Wait 1-2 minutes
   - ✅ Alert auto-resolves in Prometheus
   - ✅ Sync job updates database
   - ✅ UI shows alert as resolved

---

## Troubleshooting

### Dashboards Not Loading

**Problem:** Grafana shows no dashboards or "No data"

**Solutions:**

1. Check Grafana logs:
   ```bash
   docker logs devcontrol-grafana
   ```

2. Verify provisioning:
   ```bash
   ls -la monitoring/grafana/dashboards/
   # Should show 4 .json files

   cat monitoring/grafana/provisioning/dashboards/dashboard.yml
   # Verify path is /etc/grafana/provisioning/dashboards
   ```

3. Restart Grafana:
   ```bash
   docker-compose -f monitoring/docker-compose.monitoring.yml restart grafana
   ```

### No Alert Data

**Problem:** Alerts page shows "No alerts found"

**Solutions:**

1. Check backend is running:
   ```bash
   curl http://localhost:8080/health
   ```

2. Verify alert sync job:
   ```bash
   # Check backend logs for:
   # [Alert Sync Job] Started
   # [Alert Sync Job] Running alert sync...
   ```

3. Check database:
   ```bash
   PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "SELECT COUNT(*) FROM alert_history;"
   ```

4. Manually trigger alert (see Test 3)

### Metrics Not Updating

**Problem:** Prometheus metrics show 0 or no data

**Solutions:**

1. Check Prometheus targets:
   ```
   http://localhost:9090/targets
   ```
   All should be "UP"

2. Verify backend metrics endpoint:
   ```bash
   curl http://localhost:8080/metrics | head -20
   ```

3. Check business metrics update:
   ```bash
   # Backend logs should show:
   # Updated infrastructure cost from AWS Cost Explorer: $X
   ```

---

## Success Criteria

### Feature 3: Grafana Dashboards ✅

- [x] 4 dashboards auto-load in Grafana
- [x] All panels display data when backend running
- [x] Time range selection works
- [x] Refresh intervals update panels
- [x] Prometheus queries return data
- [x] Documentation accessible in docs/MONITORING.md

### Feature 4: Alert History ✅

- [x] Database table created and queryable
- [x] 6 API endpoints respond correctly
- [x] Background job syncs alerts every minute
- [x] Frontend displays stats cards
- [x] Filters update results
- [x] Timeline table shows alerts with correct icons
- [x] Acknowledge/Resolve/Delete actions work
- [x] Real-time auto-refresh (30s)
- [x] Pagination works
- [x] Navigation link appears and works
- [x] Prometheus metrics exported

---

## Quick Verification Script

Run this to verify everything:

```bash
#!/bin/bash

echo "=== DevControl Features 3 & 4 Verification ==="
echo ""

echo "1. Checking Grafana..."
curl -s http://localhost:3000/api/health > /dev/null && echo "✅ Grafana running" || echo "❌ Grafana not accessible"

echo "2. Checking Prometheus..."
curl -s http://localhost:9090/-/healthy > /dev/null && echo "✅ Prometheus running" || echo "❌ Prometheus not accessible"

echo "3. Checking Backend..."
curl -s http://localhost:8080/health > /dev/null && echo "✅ Backend running" || echo "❌ Backend not accessible"

echo "4. Checking Database..."
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "SELECT 1" > /dev/null 2>&1 && echo "✅ Database connected" || echo "❌ Database not accessible"

echo "5. Checking Alert History table..."
PGPASSWORD=postgres psql -h localhost -U postgres -d platform_portal -c "SELECT COUNT(*) FROM alert_history" > /dev/null 2>&1 && echo "✅ Alert history table exists" || echo "❌ Alert history table missing"

echo "6. Checking Alerts API..."
curl -s http://localhost:8080/api/alerts/stats > /dev/null && echo "✅ Alerts API responding" || echo "❌ Alerts API not responding"

echo "7. Checking Dashboard files..."
[ -f "monitoring/grafana/dashboards/api-performance.json" ] && echo "✅ API Performance dashboard exists" || echo "❌ Dashboard missing"
[ -f "monitoring/grafana/dashboards/infrastructure-costs.json" ] && echo "✅ Infrastructure Costs dashboard exists" || echo "❌ Dashboard missing"
[ -f "monitoring/grafana/dashboards/service-health.json" ] && echo "✅ Service Health dashboard exists" || echo "❌ Dashboard missing"
[ -f "monitoring/grafana/dashboards/system-resources.json" ] && echo "✅ System Resources dashboard exists" || echo "❌ Dashboard missing"

echo ""
echo "=== Verification Complete ==="
echo ""
echo "Next steps:"
echo "1. Access Grafana: http://localhost:3000 (admin/devcontrol2024)"
echo "2. Access Alerts UI: http://localhost:3000/admin/alerts"
echo "3. Access Prometheus: http://localhost:9090"
```

Save this as `verify.sh`, make it executable with `chmod +x verify.sh`, and run `./verify.sh`.

---

## Documentation

- **Grafana Dashboards:** See `docs/MONITORING.md`
- **API Reference:** See `docs/API.md`
- **Prometheus Queries:** See `docs/MONITORING.md` PromQL section
- **Alert Workflow:** This document, Test 5

---

**Implementation Date:** December 28, 2025
**Features:** Grafana Dashboard Templates, Alert History UI
**Status:** ✅ Complete and Production-Ready
