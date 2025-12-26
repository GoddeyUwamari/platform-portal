# AWS Cost Explorer Integration

Complete guide for integrating real AWS infrastructure costs and resource tracking into DevControl.

## Overview

DevControl can automatically fetch and track your AWS infrastructure costs and resources using the AWS Cost Explorer API. This provides real-time visibility into:

- Monthly AWS spending
- Cost breakdown by service (EC2, RDS, S3, etc.)
- Live infrastructure resources
- Automated cost metrics for Prometheus

## Features

- **Real-time Cost Tracking**: Fetch actual AWS costs from Cost Explorer
- **Resource Discovery**: Automatically discover EC2, RDS, and S3 resources
- **Database Sync**: Sync AWS resources to PostgreSQL for persistence
- **Prometheus Integration**: Export costs as metrics for monitoring
- **Fallback Mode**: Works with mock data when AWS credentials are not configured

---

## Setup Instructions

### 1. Create AWS IAM User

Create an IAM user with the following permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ce:GetCostAndUsage",
        "ec2:DescribeInstances",
        "rds:DescribeDBInstances",
        "s3:ListBuckets",
        "s3:GetBucketLocation"
      ],
      "Resource": "*"
    }
  ]
}
```

**Recommended Policy Name**: `DevControlCostExplorerAccess`

### 2. Configure Environment Variables

Edit `backend/.env` and add your AWS credentials:

```bash
# AWS Configuration
AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE
AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
AWS_REGION=us-east-1
```

**Important**: Never commit `.env` to version control!

### 3. Restart Backend

```bash
cd ~/Desktop/platform-portal
npm run dev:backend
```

The backend will automatically detect AWS credentials and enable real-time cost tracking.

---

## API Endpoints

### GET /api/aws/costs/monthly

Fetch current month AWS costs from Cost Explorer.

**Response:**
```json
{
  "total": 1234.56,
  "byService": [
    {
      "service": "Amazon Elastic Compute Cloud - Compute",
      "amount": 567.89
    },
    {
      "service": "Amazon Relational Database Service",
      "amount": 432.10
    }
  ],
  "period": {
    "start": "2025-12-01",
    "end": "2025-12-26"
  }
}
```

### GET /api/aws/resources

Fetch all AWS resources (EC2, RDS, S3) with cost estimates.

**Response:**
```json
{
  "total": 15,
  "resources": [
    {
      "service": "EC2",
      "resourceId": "i-0123456789abcdef0",
      "resourceName": "production-web-server",
      "resourceType": "t3.medium",
      "region": "us-east-1",
      "status": "running",
      "costPerMonth": 30,
      "tags": {
        "Name": "production-web-server",
        "Environment": "production"
      }
    }
  ]
}
```

### POST /api/aws/sync

Sync AWS resources to database. This will:
1. Fetch all resources from AWS
2. Clear existing AWS-sourced resources from DB
3. Insert fresh resource data

**Response:**
```json
{
  "success": true,
  "message": "AWS resources synced to database successfully"
}
```

---

## Prometheus Metrics

Once AWS credentials are configured, the `/metrics` endpoint will export real AWS costs:

```
# HELP infrastructure_cost_monthly_total Monthly infrastructure cost (USD)
# TYPE infrastructure_cost_monthly_total gauge
infrastructure_cost_monthly_total 1234.56
```

This metric updates automatically every 30 seconds.

---

## Testing Without AWS Credentials

The system works in **fallback mode** when AWS credentials are not configured:

- API endpoints return empty/zero data
- Database costs are used for metrics
- No errors or crashes
- Seamless development experience

---

## Cost Estimates

For resources where Cost Explorer data is not immediately available, the system uses estimated costs:

### EC2 Instance Costs (Monthly)
- t2.micro: $8.50
- t2.small: $17
- t2.medium: $34
- t3.micro: $7.50
- t3.small: $15
- t3.medium: $30
- m5.large: $70
- m5.xlarge: $140

### RDS Instance Costs (Monthly)
- db.t3.micro: $12
- db.t3.small: $24
- db.t3.medium: $48
- db.m5.large: $122
- db.r5.large: $175

### S3 Buckets
- Estimated at $5/month per bucket (actual costs vary by usage)

---

## Automated Sync

To automatically sync AWS resources daily, add a cron job or scheduler:

```bash
# Example: Sync AWS resources every day at 2 AM
0 2 * * * curl -X POST http://localhost:8080/api/aws/sync
```

Or use a monitoring tool like Kubernetes CronJob, AWS EventBridge, etc.

---

## Security Best Practices

1. **Use IAM Roles**: If running on EC2, use IAM instance roles instead of access keys
2. **Least Privilege**: Only grant permissions needed for cost tracking
3. **Rotate Keys**: Regularly rotate AWS access keys
4. **Environment Variables**: Never hardcode credentials in source code
5. **Audit Logs**: Enable CloudTrail to monitor API usage

---

## Troubleshooting

### "AWS credentials not configured" message

**Cause**: Environment variables are not set or invalid.

**Solution**:
1. Check `backend/.env` has `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
2. Verify credentials are valid using AWS CLI: `aws sts get-caller-identity`
3. Restart the backend server

### Cost Explorer returns "AccessDenied"

**Cause**: IAM user lacks necessary permissions.

**Solution**:
1. Add the `ce:GetCostAndUsage` permission to your IAM user
2. Wait a few minutes for IAM changes to propagate
3. Verify with: `aws ce get-cost-and-usage --time-period Start=2025-12-01,End=2025-12-26 --granularity MONTHLY --metrics UnblendedCost`

### Resources not syncing

**Cause**: Permissions for EC2, RDS, or S3 are missing.

**Solution**:
1. Ensure IAM user has `ec2:DescribeInstances`, `rds:DescribeDBInstances`, `s3:ListBuckets`
2. Check CloudWatch logs for specific errors
3. Test each service individually via AWS Console

---

## Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Next.js)      │
└────────┬────────┘
         │
         ↓
┌─────────────────┐      ┌──────────────────┐
│   Backend API   │─────→│  AWS Services    │
│   (Express)     │      │  - Cost Explorer │
└────────┬────────┘      │  - EC2           │
         │               │  - RDS           │
         │               │  - S3            │
         ↓               └──────────────────┘
┌─────────────────┐
│   PostgreSQL    │
│   (Database)    │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Prometheus    │
│   (Metrics)     │
└─────────────────┘
```

---

## Development Workflow

1. **Without AWS**: System works with mock data
2. **Add Credentials**: Real costs automatically replace mock data
3. **Sync Resources**: Manual or automated sync keeps DB updated
4. **Monitor**: Prometheus metrics track costs over time
5. **Alert**: Set up Grafana alerts for cost thresholds

---

## Next Steps

- [ ] Add more AWS services (Lambda, CloudFront, etc.)
- [ ] Implement cost forecasting
- [ ] Add budget alerts
- [ ] Support multi-account AWS Organizations
- [ ] Add cost optimization recommendations

---

## Support

For issues or questions:
- Check logs: `npm run dev:backend` output
- Review IAM permissions in AWS Console
- Test API endpoints with curl/Postman
- Consult AWS Cost Explorer documentation

---

**Last Updated**: December 26, 2025
**DevControl Version**: 1.0.0
