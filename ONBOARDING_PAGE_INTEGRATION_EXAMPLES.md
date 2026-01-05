# Onboarding - Page Integration Examples

**Date**: January 3, 2026
**Guide**: How to integrate EmptyState components into your pages

---

## Example 1: Services Page

```typescript
// app/(app)/services/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/onboarding/empty-state';
import { getServices } from '@/lib/services/services.service';
import { ServicesList } from '@/components/services/services-list';

export default function ServicesPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show empty state if no services
  if (!services || services.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <EmptyState
          icon="⚙️"
          headline="Track every service your team ships"
          description="Register your microservices here to monitor deployments, track ownership, and measure DORA metrics. Add your first service in 30 seconds."
          tip="Start with your most active service — you'll see deployment metrics within minutes."
          primaryCTA={{
            label: 'Create First Service',
            action: 'modal',
            modalId: 'create-service',
          }}
          secondaryCTA={{
            label: 'Learn More',
            action: 'external',
            href: '/docs/services',
          }}
          onboardingStep="create_service"
        />
      </div>
    );
  }

  // Show services list
  return (
    <div className="container mx-auto py-8">
      <ServicesList services={services} />
    </div>
  );
}
```

---

## Example 2: Deployments Page

```typescript
// app/(app)/deployments/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/onboarding/empty-state';
import { getDeployments } from '@/lib/services/deployments.service';
import { DeploymentsList } from '@/components/deployments/deployments-list';

export default function DeploymentsPage() {
  const { data: deployments, isLoading } = useQuery({
    queryKey: ['deployments'],
    queryFn: getDeployments,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show empty state if no deployments
  if (!deployments || deployments.length === 0) {
    return (
      <div className="container mx-auto py-8">
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
            label: 'Learn how deployments work',
            action: 'external',
            href: '/docs/deployments',
          }}
          onboardingStep="log_deployment"
        />
      </div>
    );
  }

  // Show deployments list
  return (
    <div className="container mx-auto py-8">
      <DeploymentsList deployments={deployments} />
    </div>
  );
}
```

---

## Example 3: AWS Resources Page

```typescript
// app/(app)/aws-resources/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/onboarding/empty-state';
import { getAwsResources } from '@/lib/services/aws.service';
import { ResourcesList } from '@/components/aws-resources/resources-list';

export default function AwsResourcesPage() {
  const { data: resources, isLoading } = useQuery({
    queryKey: ['aws-resources'],
    queryFn: getAwsResources,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show empty state if no resources
  if (!resources || resources.length === 0) {
    return (
      <div className="container mx-auto py-8">
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
            label: 'See what we'll discover',
            action: 'external',
            href: '/docs/aws-discovery',
          }}
          onboardingStep="connect_aws"
        />
      </div>
    );
  }

  // Show resources list
  return (
    <div className="container mx-auto py-8">
      <ResourcesList resources={resources} />
    </div>
  );
}
```

---

## Example 4: Dashboard with Partial Data

```typescript
// app/(app)/dashboard/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { EmptyState } from '@/components/onboarding/empty-state';
import { useOnboardingStage } from '@/lib/stores/onboarding-store';
import { getServices } from '@/lib/services/services.service';
import { DashboardMetrics } from '@/components/dashboard/metrics';

export default function DashboardPage() {
  const { data: services, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: getServices,
  });

  const createServiceStage = useOnboardingStage('create_service');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show empty state only if no services AND step not completed
  if ((!services || services.length === 0) && !createServiceStage?.completed) {
    return (
      <div className="container mx-auto py-8">
        <EmptyState
          icon="🚀"
          headline="Welcome to DevControl"
          description="Your AWS infrastructure at a glance — services, deployments, and real-time costs all in one place. Let's get started by connecting your first service or syncing AWS resources."
          tip="Start with your most active service — you'll see deployment metrics within minutes."
          primaryCTA={{
            label: 'Add Your First Service',
            action: 'modal',
            modalId: 'create-service',
          }}
          secondaryCTA={{
            label: 'Connect AWS Account',
            action: 'route',
            route: '/settings/organization?tab=aws',
          }}
          onboardingStep="create_service"
        />
      </div>
    );
  }

  // Show dashboard with metrics
  return (
    <div className="container mx-auto py-8">
      <DashboardMetrics services={services} />
    </div>
  );
}
```

---

## Example 5: Inline Prompt (Not Full Empty State)

For pages with some data but missing specific features:

```typescript
// app/(app)/infrastructure/page.tsx

'use client';

import { useQuery } from '@tanstack/react-query';
import { useOnboarding } from '@/lib/stores/onboarding-store';
import { Button } from '@/components/ui/button';

export default function InfrastructurePage() {
  const { completedStages } = useOnboarding();
  const hasAwsConnected = completedStages.includes('connect_aws');

  return (
    <div className="container mx-auto py-8">
      <h1>Infrastructure Costs</h1>

      {/* Inline prompt if AWS not connected */}
      {!hasAwsConnected && (
        <div className="bg-blue-50 dark:bg-blue-950 p-6 rounded-lg my-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💰</div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">
                Connect AWS to see real-time costs
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                See your AWS spend by service (EC2, RDS, S3, etc.) with live updates
                from Cost Explorer API.
              </p>
              <Button onClick={() => router.push('/settings/organization?tab=aws')}>
                Connect AWS Account
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Rest of page content */}
    </div>
  );
}
```

---

## Opening Modals from EmptyState

To make the modal action work, listen for the custom event:

```typescript
// components/modals/create-service-modal.tsx

'use client';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function CreateServiceModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Listen for open-modal event
    const handleOpenModal = (e: CustomEvent) => {
      if (e.detail.modalId === 'create-service') {
        setOpen(true);
      }
    };

    window.addEventListener('open-modal', handleOpenModal as EventListener);
    return () => {
      window.removeEventListener('open-modal', handleOpenModal as EventListener);
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        {/* Modal content */}
      </DialogContent>
    </Dialog>
  );
}
```

---

## Best Practices

### 1. **Always Check Data Before Showing Empty State**
```typescript
// ✅ Good
if (!services || services.length === 0) {
  return <EmptyState ... />;
}

// ❌ Bad - Shows empty state even if loading
return <EmptyState ... />;
```

### 2. **Use onboardingStep for Tracking**
```typescript
// ✅ Good - Tracks which empty state user sees
<EmptyState
  onboardingStep="create_service"
  ...
/>

// ❌ Bad - No tracking
<EmptyState ... />
```

### 3. **Provide Clear Next Steps**
```typescript
// ✅ Good - Tells user exactly what to do
description="Create a service first, then log your first deployment."
primaryCTA={{ label: 'Go to Services', route: '/services' }}

// ❌ Bad - Vague
description="No deployments found."
primaryCTA={{ label: 'Click here' }}
```

### 4. **Use Appropriate Icons**
- Services: ⚙️ or 🛠️
- Deployments: 🚀 or 📦
- AWS/Cloud: ☁️ or 💰
- Monitoring: 📊 or 📈
- Teams: 👥 or 🤝

### 5. **Keep Copy Short**
- Headline: 5-10 words max
- Description: 2-3 sentences max
- Tip: 1 sentence

---

## Testing Checklist

- [ ] Empty state shows when data is empty
- [ ] Empty state hides when data exists
- [ ] Primary CTA opens correct modal/route
- [ ] Secondary CTA works (if present)
- [ ] Tip displays correctly
- [ ] Analytics events fire on view/click
- [ ] onboardingStep completes when action taken
- [ ] Mobile responsive (all breakpoints)
- [ ] Dark mode looks good
- [ ] Loading states show during async actions

---

## Next: Analytics Dashboard

To see onboarding metrics:

```typescript
// app/(app)/admin/onboarding/page.tsx

import { useQuery } from '@tanstack/react-query';
import { getOnboardingMetrics, getOnboardingFunnel } from '@/lib/services/onboarding.service';

export default function OnboardingAnalytics() {
  const { data: metrics } = useQuery({
    queryKey: ['onboarding-metrics'],
    queryFn: () => getOnboardingMetrics(),
  });

  const { data: funnel } = useQuery({
    queryKey: ['onboarding-funnel'],
    queryFn: () => getOnboardingFunnel(),
  });

  return (
    <div>
      <h1>Onboarding Analytics</h1>

      {/* Completion Rate */}
      <div>
        <h2>Overall Metrics</h2>
        <p>Completion Rate: {metrics?.completion_rate_pct}%</p>
        <p>Avg Time: {metrics?.avg_hours_to_complete} hours</p>
      </div>

      {/* Funnel */}
      <div>
        <h2>Conversion Funnel</h2>
        {funnel?.funnel.map(stage => (
          <div key={stage.stage}>
            {stage.stage}: {stage.count} ({stage.rate}%)
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

**Ready to integrate!** 🎉

Start with the Services page, then Deployments, then Dashboard.
