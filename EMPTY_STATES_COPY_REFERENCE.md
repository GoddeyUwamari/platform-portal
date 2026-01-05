# Empty States - Copy Reference Guide

Quick reference for all empty state copy across DevControl.

---

## Dashboard

```tsx
<EmptyState
  icon="🚀"
  headline="Welcome to DevControl"
  description="Your AWS infrastructure at a glance — services, deployments, and real-time costs all in one place. Let's get started by connecting your first service or syncing AWS resources."
  tip="Start with your most active service — you'll see deployment metrics within minutes."
  primaryCTA={{
    label: 'Create First Service',
    action: 'route',
    route: '/services/new',
  }}
  secondaryCTA={{
    label: 'Connect AWS Account',
    action: 'route',
    route: '/settings/organization?tab=aws',
  }}
  onboardingStep="create_service"
/>
```

---

## Services Page

```tsx
<EmptyState
  icon="⚙️"
  headline="Track every service your team ships"
  description="Register your microservices here to monitor deployments, track ownership, and measure DORA metrics. Add your first service in 30 seconds."
  tip="Start with your most active service — you'll see deployment metrics within minutes."
  primaryCTA={{
    label: 'Create First Service',
    action: 'route',
    route: '/services/new',
  }}
  secondaryCTA={{
    label: 'Learn About Services',
    action: 'external',
    href: 'https://docs.example.com/services',
  }}
  onboardingStep="create_service"
/>
```

---

## Deployments Page

```tsx
<EmptyState
  icon="🚀"
  headline="Your deployment history lives here"
  description="Every push to production, staging, and dev — tracked automatically. See what shipped, when, and by whom. Create a service first, then log your first deployment."
  tip="Once you have deployments, you'll unlock DORA metrics and performance benchmarks."
  primaryCTA={{
    label: 'Go to Services',
    action: 'route',
    route: '/services',
  }}
  secondaryCTA={{
    label: 'Learn About Deployments',
    action: 'external',
    href: 'https://docs.example.com/deployments',
  }}
  onboardingStep="log_deployment"
/>
```

---

## AWS Resources Page

```tsx
<EmptyState
  icon="☁️"
  headline="Discover what's running in your AWS account"
  description="Auto-scan for EC2, RDS, S3, Lambda, and more. Get cost attribution, security checks, and compliance scanning in one click. Connect your AWS credentials to start discovering resources."
  tip="Credentials encrypted with AES-256. Read-only access. No infrastructure changes."
  primaryCTA={{
    label: 'Connect AWS Account',
    action: 'route',
    route: '/settings/organization?tab=aws',
  }}
  secondaryCTA={{
    label: 'See What We Discover',
    action: 'external',
    href: 'https://docs.example.com/aws-discovery',
  }}
  onboardingStep="connect_aws"
/>
```

---

## Copy Patterns

### Headlines
All headlines follow: **Action-oriented + Benefit**
- "Track every service your team ships"
- "Your deployment history lives here"
- "Discover what's running in your AWS account"

### Descriptions
All descriptions include: **What + Why + Time**
- What: The feature/capability
- Why: The benefit/value
- Time: "30 seconds", "within minutes", "one click"

### Tips
All tips follow: **Quick win + Immediate value**
- Shows users the fastest path to value
- Emphasizes speed ("within minutes")
- Builds confidence ("your most active service")

### Primary CTAs
All primary CTAs are **imperative + specific**:
- "Create First Service" (not "Create Service")
- "Connect AWS Account" (not "Connect Account")
- "Go to Services" (not "View Services")

### Secondary CTAs
All secondary CTAs are **educational + low-commitment**:
- "Learn About [Feature]"
- "See What We Discover"
- Opens in new tab (doesn't interrupt flow)

---

## Icons by Page

| Page | Icon | Meaning |
|------|------|---------|
| Dashboard | 🚀 | Launch/getting started |
| Services | ⚙️ | Configuration/settings |
| Deployments | 🚀 | Shipping/deploying |
| AWS Resources | ☁️ | Cloud/infrastructure |

---

## Analytics Events

### View Event
```javascript
{
  event: 'onboarding_empty_state_viewed',
  step: 'create_service',
  headline: 'Track every service your team ships'
}
```

### Primary CTA Click
```javascript
{
  event: 'onboarding_cta_clicked',
  step: 'create_service',
  cta: 'Create First Service',
  action: 'route'
}
```

### Secondary CTA Click
```javascript
{
  event: 'onboarding_secondary_cta_clicked',
  step: 'create_service',
  cta: 'Learn About Services'
}
```

---

## Onboarding Steps

| Page | Step ID | Auto-completed by |
|------|---------|-------------------|
| Dashboard | `create_service` | Creating any service |
| Services | `create_service` | Creating any service |
| Deployments | `log_deployment` | Creating any deployment |
| AWS Resources | `connect_aws` | Saving AWS credentials |

---

## Testing

### Demo Mode
Enable empty states even with data:
1. Click toggle button (bottom-right)
2. Page reloads
3. All pages show empty states
4. Click toggle again to disable

### Manual Testing
1. Clear database: `DELETE FROM services; DELETE FROM deployments; DELETE FROM aws_resources;`
2. Visit each page
3. Verify empty state shows
4. Click primary CTA → verify navigation
5. Click secondary CTA → verify new tab opens

---

## Future Variations to Test

### Headlines
- Current: "Track every service your team ships"
- Variant: "See everything your team deploys"
- Variant: "Monitor all your microservices"

### CTAs
- Current: "Create First Service"
- Variant: "Add Your Service"
- Variant: "Get Started"

### Tips
- Current: "Start with your most active service"
- Variant: "Most teams start with their API service"
- Variant: "Pro tip: Add services in order of importance"
