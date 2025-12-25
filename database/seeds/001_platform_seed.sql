-- Seed Data for Platform Portal
-- Optional test data for development/testing

-- =====================================================
-- TEAMS
-- =====================================================
INSERT INTO teams (id, name, description, owner, members, slack_channel) VALUES
  (
    '11111111-1111-1111-1111-111111111111',
    'Platform Team',
    'Core platform engineering and infrastructure',
    'john@company.com',
    ARRAY['john@company.com', 'jane@company.com', 'alice@company.com'],
    '#platform-team'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'Data Team',
    'Data engineering and analytics',
    'sarah@company.com',
    ARRAY['sarah@company.com', 'mike@company.com'],
    '#data-team'
  ),
  (
    '33333333-3333-3333-3333-333333333333',
    'Frontend Team',
    'Frontend development and UX',
    'alex@company.com',
    ARRAY['alex@company.com', 'emma@company.com', 'tom@company.com'],
    '#frontend-team'
  )
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- SERVICES
-- =====================================================
INSERT INTO services (id, name, template, owner, team_id, github_url, status, description) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'user-service',
    'api',
    'john@company.com',
    '11111111-1111-1111-1111-111111111111',
    'https://github.com/company/user-service',
    'active',
    'User authentication and management API'
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'payment-service',
    'microservices',
    'jane@company.com',
    '11111111-1111-1111-1111-111111111111',
    'https://github.com/company/payment-service',
    'active',
    'Payment processing microservice'
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'analytics-pipeline',
    'api',
    'sarah@company.com',
    '22222222-2222-2222-2222-222222222222',
    'https://github.com/company/analytics',
    'active',
    'Real-time analytics data pipeline'
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'frontend-app',
    'api',
    'alex@company.com',
    '33333333-3333-3333-3333-333333333333',
    'https://github.com/company/frontend-app',
    'active',
    'Main customer-facing web application'
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'ml-service',
    'microservices',
    'sarah@company.com',
    '22222222-2222-2222-2222-222222222222',
    'https://github.com/company/ml-service',
    'deploying',
    'Machine learning inference service'
  )
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- DEPLOYMENTS
-- =====================================================
INSERT INTO deployments (
  service_id,
  environment,
  aws_region,
  status,
  cost_estimate,
  deployed_by,
  deployed_at,
  resources
) VALUES
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'production',
    'us-east-1',
    'running',
    250.00,
    'john@company.com',
    NOW() - INTERVAL '2 days',
    '{"ec2_instance_id": "i-1234567890abcdef0", "rds_instance_id": "db-ABCDEFG"}'::jsonb
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'staging',
    'us-west-2',
    'running',
    100.00,
    'john@company.com',
    NOW() - INTERVAL '5 days',
    '{"ec2_instance_id": "i-staging123", "rds_instance_id": "db-staging"}'::jsonb
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'production',
    'eu-west-1',
    'running',
    500.00,
    'jane@company.com',
    NOW() - INTERVAL '1 day',
    '{"ec2_instance_id": "i-payment-prod", "vpc_id": "vpc-payment"}'::jsonb
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'production',
    'us-east-1',
    'running',
    300.00,
    'sarah@company.com',
    NOW() - INTERVAL '3 days',
    '{"lambda_function": "analytics-processor", "s3_bucket": "analytics-data"}'::jsonb
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'production',
    'us-east-1',
    'running',
    400.00,
    'alex@company.com',
    NOW() - INTERVAL '7 days',
    '{"ec2_instance_id": "i-frontend-prod", "cloudfront_id": "E1234567890"}'::jsonb
  ),
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'development',
    'us-west-2',
    'deploying',
    50.00,
    'sarah@company.com',
    NOW() - INTERVAL '2 hours',
    '{"ec2_instance_id": "i-ml-dev"}'::jsonb
  );

-- =====================================================
-- INFRASTRUCTURE RESOURCES
-- =====================================================
INSERT INTO infrastructure_resources (
  service_id,
  resource_type,
  aws_id,
  aws_region,
  status,
  cost_per_month,
  metadata
) VALUES
  -- User Service Resources
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'ec2',
    'i-1234567890abcdef0',
    'us-east-1',
    'running',
    150.00,
    '{"instance_type": "t3.medium", "cpu": "2", "memory": "4GB"}'::jsonb
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'rds',
    'db-ABCDEFGHIJKLMNO',
    'us-east-1',
    'running',
    100.00,
    '{"engine": "postgresql", "instance_class": "db.t3.small"}'::jsonb
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    'vpc',
    'vpc-user-service',
    'us-east-1',
    'running',
    0.00,
    '{"cidr": "10.0.0.0/16"}'::jsonb
  ),
  -- Payment Service Resources
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'ec2',
    'i-payment-prod-main',
    'eu-west-1',
    'running',
    300.00,
    '{"instance_type": "t3.large", "cpu": "4", "memory": "8GB"}'::jsonb
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    's3',
    'payment-service-bucket',
    'eu-west-1',
    'running',
    50.00,
    '{"storage_class": "STANDARD", "size_gb": "500"}'::jsonb
  ),
  (
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    'rds',
    'db-payment-prod',
    'eu-west-1',
    'running',
    150.00,
    '{"engine": "postgresql", "instance_class": "db.t3.medium"}'::jsonb
  ),
  -- Analytics Pipeline Resources
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    'lambda',
    'analytics-processor-fn',
    'us-east-1',
    'running',
    100.00,
    '{"runtime": "python3.11", "memory": "1024MB"}'::jsonb
  ),
  (
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    's3',
    'analytics-data-lake',
    'us-east-1',
    'running',
    200.00,
    '{"storage_class": "INTELLIGENT_TIERING", "size_tb": "5"}'::jsonb
  ),
  -- Frontend App Resources
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'cloudfront',
    'E1234567890ABC',
    'us-east-1',
    'running',
    150.00,
    '{"price_class": "PriceClass_All"}'::jsonb
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    's3',
    'frontend-app-static',
    'us-east-1',
    'running',
    25.00,
    '{"storage_class": "STANDARD", "size_gb": "50"}'::jsonb
  ),
  (
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    'elb',
    'frontend-app-alb',
    'us-east-1',
    'running',
    50.00,
    '{"type": "application", "scheme": "internet-facing"}'::jsonb
  ),
  -- ML Service Resources
  (
    'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee',
    'ec2',
    'i-ml-dev-gpu',
    'us-west-2',
    'running',
    400.00,
    '{"instance_type": "g4dn.xlarge", "gpu": "NVIDIA T4"}'::jsonb
  );

-- =====================================================
-- SUMMARY
-- =====================================================
-- Teams: 3
-- Services: 5
-- Deployments: 6
-- Infrastructure Resources: 12
-- Total Monthly Cost: $1,625.00
